import { Word, IWord } from '../models/Word';
import { logger } from '../utils/logger';
import { config } from '../config';

export interface WordQueryOptions {
  vowel?: string[];
  consonant?: string[];
  type?: string[];
  subtype?: string[];
  syllables?: number[];
  position?: 'initial' | 'medial' | 'final';
  age?: string;
  limit?: number;
  gradeLevel?: string;
}

export interface WordFilterResult {
  words: IWord[];
  totalCount: number;
  hasMore: boolean;
}

export class WordService {
  private static instance: WordService;
  
  public static getInstance(): WordService {
    if (!WordService.instance) {
      WordService.instance = new WordService();
    }
    return WordService.instance;
  }

  /**
   * Query words with phonetic filtering
   */
  async queryWords(options: WordQueryOptions): Promise<WordFilterResult> {
    try {
      const filter = this.buildWordFilter(options);
      // Ensure limit is positive and within bounds
      const rawLimit = options.limit || config.wordDatabase.defaultLimit;
      const limit = Math.max(1, Math.min(rawLimit, config.wordDatabase.maxQueryLimit));
      
      logger.info('Querying words with filter:', { filter, limit });
      
      // Get total count for pagination
      const totalCount = await Word.countDocuments(filter);
      
      // If no words match, return empty result
      if (totalCount === 0) {
        return {
          words: [],
          totalCount: 0,
          hasMore: false
        };
      }
      
      // Execute query with random sampling
      const words = await Word.aggregate([
        { $match: filter },
        { $sample: { size: Math.min(limit, totalCount) } }, // Don't sample more than available
        { $lookup: {
          from: 'users',
          localField: 'votes.user',
          foreignField: '_id',
          as: 'voteUsers'
        }},
        { $project: {
          cmudict_id: 1,
          wordid: 1,
          lexeme: 1,
          consonant: 1,
          vowel: 1,
          type: 1,
          subtype: 1,
          stress: 1,
          syllables: 1,
          position: 1,
          age_of_acquisition: 1,
          wordsXsensesXsynsets: 1,
          score: 1,
          votes: 1,
          views: 1,
          upvotePercentage: {
            $cond: {
              if: { $eq: [{ $size: '$votes' }, 0] },
              then: 0,
              else: {
                $multiply: [
                  { $divide: [
                    { $size: { $filter: {
                      input: '$votes',
                      cond: { $eq: ['$$this.vote', 1] }
                    }}},
                    { $size: '$votes' }
                  ]},
                  100
                ]
              }
            }
          }
        }}
      ]);
      
      return {
        words,
        totalCount,
        hasMore: totalCount > limit
      };
      
    } catch (error) {
      logger.error('Error querying words:', error);
      throw new Error('Failed to query words');
    }
  }

  /**
   * Get a single random word matching criteria
   */
  async getRandomWord(options: WordQueryOptions): Promise<IWord | null> {
    try {
      const result = await this.queryWords({ ...options, limit: 1 });
      return result.words[0] || null;
    } catch (error) {
      logger.error('Error getting random word:', error);
      throw new Error('Failed to get random word');
    }
  }

  /**
   * Get word by ID
   */
  async getWordById(id: string): Promise<IWord | null> {
    try {
      return await Word.findById(id);
    } catch (error) {
      logger.error('Error getting word by ID:', error);
      throw new Error('Failed to get word');
    }
  }

  /**
   * Vote on a word
   */
  async voteOnWord(wordId: string, userId: string, vote: number): Promise<IWord> {
    try {
      const word = await Word.findById(wordId);
      if (!word) {
        throw new Error('Word not found');
      }
      
      return await word.vote(userId as any, vote);
    } catch (error) {
      logger.error('Error voting on word:', error);
      // Preserve original error message if it's already a meaningful error
      if (error instanceof Error && error.message === 'Word not found') {
        throw error;
      }
      throw new Error('Failed to vote on word');
    }
  }

  /**
   * Increment word views
   */
  async incrementWordViews(wordId: string): Promise<IWord> {
    try {
      const word = await Word.findById(wordId);
      if (!word) {
        throw new Error('Word not found');
      }
      
      return await word.incrementViews();
    } catch (error) {
      logger.error('Error incrementing word views:', error);
      // Preserve original error message if it's already a meaningful error
      if (error instanceof Error && error.message === 'Word not found') {
        throw error;
      }
      throw new Error('Failed to increment word views');
    }
  }

  /**
   * Get words for sentence generation
   */
  async getWordsForSentence(options: WordQueryOptions): Promise<{
    nouns: IWord[];
    adjectives: IWord[];
    filteredNouns: {
      animal: IWord[];
      location: IWord[];
      person: IWord[];
      food: IWord[];
      artifact: IWord[];
    };
  }> {
    try {
      const filter = this.buildWordFilter({
        ...options,
        type: ['noun', 'adj']
      });
      
      const dataLimit = Math.min(options.limit || 100, 250);
      
      const words = await Word.find(filter)
        .limit(dataLimit)
        .sort({ score: -1 });
      
      const nouns = words.filter(word => word.type === 'noun');
      const adjectives = words.filter(word => word.type === 'adj');
      
      const filteredNouns = {
        animal: nouns.filter(word => word.subtype === 'animal'),
        location: nouns.filter(word => word.subtype === 'location'),
        person: nouns.filter(word => word.subtype === 'person'),
        food: nouns.filter(word => word.subtype === 'food'),
        artifact: nouns.filter(word => word.subtype === 'artifact')
      };
      
      return {
        nouns,
        adjectives,
        filteredNouns
      };
      
    } catch (error) {
      logger.error('Error getting words for sentence:', error);
      throw new Error('Failed to get words for sentence generation');
    }
  }

  /**
   * Build MongoDB filter from query options
   */
  private buildWordFilter(options: WordQueryOptions): any {
    const filter: any = {};
    
    // Basic phonetic filters
    if (options.vowel && options.vowel.length > 0) {
      filter.vowel = { $in: options.vowel };
    }
    
    if (options.consonant && options.consonant.length > 0) {
      filter.consonant = { $in: options.consonant };
    }
    
    if (options.position) {
      filter.position = options.position;
    }
    
    // Type filters
    if (options.type && options.type.length > 0) {
      filter.type = { $in: options.type };
    }
    
    if (options.subtype && options.subtype.length > 0) {
      filter.subtype = { $in: options.subtype };
    }
    
    // Syllable filter
    if (options.syllables && options.syllables.length > 0) {
      filter.syllables = { $in: options.syllables };
    } else {
      // Default syllable range
      filter.syllables = { $in: [1, 2, 3, 4, 5] };
    }
    
    // Age of acquisition filter
    if (options.age && options.age !== '0') {
      filter.age_of_acquisition = {
        $gt: 0,
        $lte: parseInt(options.age, 10)
      };
    }
    
    return filter;
  }

  /**
   * Get phonetic statistics for a user's progress
   */
  async getPhoneticStats(userId: string): Promise<{
    consonantAccuracy: { [key: string]: number };
    vowelAccuracy: { [key: string]: number };
    positionAccuracy: { [key: string]: number };
  }> {
    try {
      // This would typically aggregate from ProgressRecord
      // For now, return empty stats
      return {
        consonantAccuracy: {},
        vowelAccuracy: {},
        positionAccuracy: {}
      };
    } catch (error) {
      logger.error('Error getting phonetic stats:', error);
      throw new Error('Failed to get phonetic statistics');
    }
  }
}