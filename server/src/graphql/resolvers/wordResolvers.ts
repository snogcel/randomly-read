import { WordServiceOptimized } from '../../services/WordServiceOptimized';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import { logger } from '../../utils/logger';
import { performance } from 'perf_hooks';

export interface WordResolverContext {
  user?: any;
  dataSources?: any;
}

export const wordResolvers = {
  Query: {
    /**
     * Query words with enhanced error handling and performance monitoring
     */
    async words(_: any, { input }: any, context: WordResolverContext) {
      const startTime = performance.now();
      
      try {
        // Validate input
        if (!input) {
          throw new UserInputError('Query input is required');
        }

        // Validate phonetic parameters
        if (input.vowel && !Array.isArray(input.vowel)) {
          throw new UserInputError('Vowel parameter must be an array');
        }

        if (input.consonant && !Array.isArray(input.consonant)) {
          throw new UserInputError('Consonant parameter must be an array');
        }

        // Validate limit
        if (input.limit && (input.limit < 1 || input.limit > 1000)) {
          throw new UserInputError('Limit must be between 1 and 1000');
        }

        // Validate syllables
        if (input.syllables && input.syllables.some((s: number) => s < 1 || s > 10)) {
          throw new UserInputError('Syllables must be between 1 and 10');
        }

        const wordService = WordServiceOptimized.getInstance();
        const result = await wordService.queryWords(input);
        
        const executionTime = performance.now() - startTime;
        
        // Log performance metrics
        logger.info('Word query executed', {
          executionTime: Math.round(executionTime),
          resultCount: result.words.length,
          totalCount: result.totalCount,
          cacheHit: result.queryStats?.cacheHit || false,
          filter: {
            vowel: input.vowel?.length || 0,
            consonant: input.consonant?.length || 0,
            syllables: input.syllables?.length || 0,
            position: input.position || 'any'
          }
        });

        return result;
      } catch (error) {
        const executionTime = performance.now() - startTime;
        
        logger.error('Error in words query:', {
          error: error instanceof Error ? error.message : 'Unknown error',
          executionTime: Math.round(executionTime),
          input
        });

        // Preserve specific error types
        if (error instanceof UserInputError) {
          throw error;
        }
        
        throw new Error('Failed to fetch words');
      }
    },

    /**
     * Get single word by ID with caching
     */
    async word(_: any, { id }: any, context: WordResolverContext) {
      const startTime = performance.now();
      
      try {
        if (!id) {
          throw new UserInputError('Word ID is required');
        }

        // Validate ObjectId format
        if (!/^[0-9a-fA-F]{24}$/.test(id)) {
          throw new UserInputError('Invalid word ID format');
        }

        const wordService = WordServiceOptimized.getInstance();
        const word = await wordService.getWordById(id);
        
        if (!word) {
          throw new UserInputError('Word not found');
        }

        const executionTime = performance.now() - startTime;
        
        logger.debug('Word fetched by ID', {
          wordId: id,
          executionTime: Math.round(executionTime)
        });

        return word;
      } catch (error) {
        const executionTime = performance.now() - startTime;
        
        logger.error('Error in word query:', {
          error: error instanceof Error ? error.message : 'Unknown error',
          wordId: id,
          executionTime: Math.round(executionTime)
        });

        if (error instanceof UserInputError) {
          throw error;
        }
        
        throw new Error('Failed to fetch word');
      }
    },

    /**
     * Get random word with optimized sampling
     */
    async randomWord(_: any, { input }: any, context: WordResolverContext) {
      const startTime = performance.now();
      
      try {
        if (!input) {
          throw new UserInputError('Query input is required');
        }

        const wordService = WordServiceOptimized.getInstance();
        const word = await wordService.getRandomWord(input);
        
        const executionTime = performance.now() - startTime;
        
        logger.debug('Random word fetched', {
          executionTime: Math.round(executionTime),
          found: !!word,
          filter: {
            vowel: input.vowel?.length || 0,
            consonant: input.consonant?.length || 0,
            syllables: input.syllables?.length || 0
          }
        });

        return word;
      } catch (error) {
        const executionTime = performance.now() - startTime;
        
        logger.error('Error in randomWord query:', {
          error: error instanceof Error ? error.message : 'Unknown error',
          executionTime: Math.round(executionTime),
          input
        });
        
        throw new Error('Failed to fetch random word');
      }
    },

    /**
     * Batch query multiple word sets
     */
    async batchWords(_: any, { queries }: any, context: WordResolverContext) {
      const startTime = performance.now();
      
      try {
        if (!queries || !Array.isArray(queries)) {
          throw new UserInputError('Queries array is required');
        }

        if (queries.length > 10) {
          throw new UserInputError('Maximum 10 batch queries allowed');
        }

        // Validate each query
        queries.forEach((query: any, index: number) => {
          if (!query.id) {
            throw new UserInputError(`Query ${index} missing id`);
          }
          if (!query.options) {
            throw new UserInputError(`Query ${index} missing options`);
          }
        });

        const wordService = WordServiceOptimized.getInstance();
        const results = await wordService.batchQueryWords(queries);
        
        const executionTime = performance.now() - startTime;
        
        logger.info('Batch word queries executed', {
          executionTime: Math.round(executionTime),
          queryCount: queries.length,
          resultCount: Array.from(results.values()).reduce((sum, result) => sum + result.words.length, 0)
        });

        // Convert Map to array format for GraphQL
        return Array.from(results.entries()).map(([id, result]) => ({
          id,
          ...result
        }));
      } catch (error) {
        const executionTime = performance.now() - startTime;
        
        logger.error('Error in batchWords query:', {
          error: error instanceof Error ? error.message : 'Unknown error',
          executionTime: Math.round(executionTime),
          queryCount: queries?.length || 0
        });

        if (error instanceof UserInputError) {
          throw error;
        }
        
        throw new Error('Failed to execute batch word queries');
      }
    }
  },

  Mutation: {
    /**
     * Vote on word with optimized caching
     */
    async voteWord(_: any, { wordId, vote }: any, context: WordResolverContext) {
      const startTime = performance.now();
      
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }
      
      try {
        // Validate input
        if (!wordId) {
          throw new UserInputError('Word ID is required');
        }

        if (!/^[0-9a-fA-F]{24}$/.test(wordId)) {
          throw new UserInputError('Invalid word ID format');
        }

        if (![-1, 0, 1].includes(vote)) {
          throw new UserInputError('Vote must be -1, 0, or 1');
        }

        const wordService = WordServiceOptimized.getInstance();
        const result = await wordService.voteOnWord(wordId, context.user.id, vote);
        
        const executionTime = performance.now() - startTime;
        
        logger.info('Word vote recorded', {
          wordId,
          userId: context.user.id,
          vote,
          executionTime: Math.round(executionTime)
        });

        return result;
      } catch (error) {
        const executionTime = performance.now() - startTime;
        
        logger.error('Error in voteWord mutation:', {
          error: error instanceof Error ? error.message : 'Unknown error',
          wordId,
          userId: context.user?.id,
          vote,
          executionTime: Math.round(executionTime)
        });

        if (error instanceof UserInputError) {
          throw error;
        }
        
        throw new Error('Failed to vote on word');
      }
    },

    /**
     * Increment word views with batching
     */
    async incrementWordViews(_: any, { wordIds }: any, context: WordResolverContext) {
      const startTime = performance.now();
      
      try {
        if (!wordIds || !Array.isArray(wordIds)) {
          throw new UserInputError('Word IDs array is required');
        }

        if (wordIds.length > 50) {
          throw new UserInputError('Maximum 50 words can be updated at once');
        }

        // Validate all IDs
        wordIds.forEach((id: string) => {
          if (!/^[0-9a-fA-F]{24}$/.test(id)) {
            throw new UserInputError(`Invalid word ID format: ${id}`);
          }
        });

        const wordService = WordServiceOptimized.getInstance();
        
        // Process in parallel but limit concurrency
        const batchSize = 10;
        const results = [];
        
        for (let i = 0; i < wordIds.length; i += batchSize) {
          const batch = wordIds.slice(i, i + batchSize);
          const batchPromises = batch.map((id: string) => 
            wordService.incrementWordViews(id).catch(error => {
              logger.warn(`Failed to increment views for word ${id}:`, error);
              return null;
            })
          );
          
          const batchResults = await Promise.all(batchPromises);
          results.push(...batchResults.filter(result => result !== null));
        }
        
        const executionTime = performance.now() - startTime;
        
        logger.info('Word views incremented', {
          requestedCount: wordIds.length,
          successCount: results.length,
          executionTime: Math.round(executionTime)
        });

        return results;
      } catch (error) {
        const executionTime = performance.now() - startTime;
        
        logger.error('Error in incrementWordViews mutation:', {
          error: error instanceof Error ? error.message : 'Unknown error',
          wordCount: wordIds?.length || 0,
          executionTime: Math.round(executionTime)
        });

        if (error instanceof UserInputError) {
          throw error;
        }
        
        throw new Error('Failed to increment word views');
      }
    }
  },

  // Field resolvers with caching
  Word: {
    /**
     * Compute upvote percentage efficiently
     */
    upvotePercentage(word: any) {
      if (!word.votes || word.votes.length === 0) {
        return 0;
      }
      
      const upvotes = word.votes.filter((vote: any) => vote.vote === 1);
      return Math.round((upvotes.length / word.votes.length) * 100);
    },

    /**
     * Lazy load definitions if not already populated
     */
    async wordsXsensesXsynsets(word: any, _: any, context: WordResolverContext) {
      // If definitions are already loaded, return them
      if (word.wordsXsensesXsynsets && word.wordsXsensesXsynsets.length > 0) {
        return word.wordsXsensesXsynsets;
      }

      // Otherwise, fetch the full word with definitions
      try {
        const wordService = WordServiceOptimized.getInstance();
        const fullWord = await wordService.getWordById(word._id || word.id);
        return fullWord?.wordsXsensesXsynsets || [];
      } catch (error) {
        logger.error('Error loading word definitions:', error);
        return [];
      }
    }
  },

  // Custom scalars and types
  WordFilterResult: {
    /**
     * Add computed fields to result
     */
    queryPerformance(result: any) {
      return {
        executionTime: result.queryStats?.executionTimeMs || 0,
        cacheHit: result.queryStats?.cacheHit || false,
        indexUsed: result.queryStats?.indexUsed || 'UNKNOWN'
      };
    }
  }
};