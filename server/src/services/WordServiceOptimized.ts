import { Word, IWord } from '../models/Word';
import { logger } from '../utils/logger';
import { config } from '../config';
import DataLoader from 'dataloader';
import { CacheService } from './CacheService';
import { PhoneticFilterOptimizer, PhoneticFilter } from '../utils/phoneticFiltering';
import { WordQueryPerformanceService } from './WordQueryPerformanceService';

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
  offset?: number;
  sortBy?: 'score' | 'lexeme' | 'syllables' | 'random';
  sortOrder?: 'asc' | 'desc';
}

export interface WordFilterResult {
  words: IWord[];
  totalCount: number;
  hasMore: boolean;
  queryStats?: QueryStats;
}

export interface QueryStats {
  executionTimeMs: number;
  docsExamined: number;
  indexUsed: string;
  cacheHit?: boolean;
}

export interface BatchWordQuery {
  id: string;
  options: WordQueryOptions;
}

export class WordServiceOptimized {
  private static instance: WordServiceOptimized;
  private wordLoader: DataLoader<string, IWord | null>;
  private batchQueryLoader: DataLoader<string, WordFilterResult>;
  private queryCache: Map<string, { result: WordFilterResult; timestamp: number }>;
  private cacheService: CacheService;
  private phoneticOptimizer: PhoneticFilterOptimizer;
  private performanceService: WordQueryPerformanceService;
  private readonly CACHE_TTL = 30 * 60 * 1000; // 30 minutes

  private constructor() {
    this.queryCache = new Map();
    this.cacheService = CacheService.getInstance();
    this.phoneticOptimizer = PhoneticFilterOptimizer.getInstance();
    this.performanceService = WordQueryPerformanceService.getInstance();
    
    // DataLoader for individual word lookups
    this.wordLoader = new DataLoader<string, IWord | null>(
      async (ids: readonly string[]) => {
        try {
          const words = await Word.find({ _id: { $in: ids } });
          const wordMap = new Map(words.map(word => [word._id.toString(), word]));
          return ids.map(id => wordMap.get(id) || null);
        } catch (error) {
          logger.error('Error in word batch loader:', error);
          return ids.map(() => null);
        }
      },
      {
        maxBatchSize: 100,
        cacheKeyFn: (key) => key.toString()
      }
    );

    // DataLoader for batch word queries
    this.batchQueryLoader = new DataLoader<string, WordFilterResult>(
      async (queryKeys: readonly string[]) => {
        const results: WordFilterResult[] = [];
        
        for (const queryKey of queryKeys) {
          try {
            const options = JSON.parse(queryKey) as WordQueryOptions;
            const result = await this.executeWordQuery(options);
            results.push(result);
          } catch (error) {
            logger.error('Error in batch query loader:', error);
            results.push({
              words: [],
              totalCount: 0,
              hasMore: false,
              queryStats: {
                executionTimeMs: 0,
                docsExamined: 0,
                indexUsed: 'ERROR'
              }
            });
          }
        }
        
        return results;
      },
      {
        maxBatchSize: 10,
        cacheKeyFn: (key) => key
      }
    );

    // Clean cache periodically
    setInterval(() => this.cleanCache(), 5 * 60 * 1000); // Every 5 minutes
  }

  public static getInstance(): WordServiceOptimized {
    if (!WordServiceOptimized.instance) {
      WordServiceOptimized.instance = new WordServiceOptimized();
    }
    return WordServiceOptimized.instance;
  }

  /**
   * Query words with phonetic filtering (with intelligent caching and batching)
   */
  async queryWords(options: WordQueryOptions): Promise<WordFilterResult> {
    try {
      // Check Redis cache first
      if (config.wordDatabase.cacheEnabled && this.cacheService.isAvailable()) {
        const cached = await this.cacheService.getCachedWordQuery(options);
        if (cached) {
          logger.debug('Redis cache hit for word query');
          return cached;
        }
      }

      // Check in-memory cache as fallback
      const cacheKey = this.generateCacheKey(options);
      if (config.wordDatabase.cacheEnabled) {
        const cached = this.queryCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
          logger.debug('Memory cache hit for word query');
          return {
            ...cached.result,
            queryStats: {
              ...cached.result.queryStats!,
              cacheHit: true
            }
          };
        }
      }

      // Use batch loader for consistent queries
      const result = await this.batchQueryLoader.load(cacheKey);
      
      // Cache the result in both Redis and memory
      if (config.wordDatabase.cacheEnabled) {
        // Cache in Redis
        if (this.cacheService.isAvailable()) {
          await this.cacheService.cacheWordQuery(options, result);
        }
        
        // Cache in memory as fallback
        this.queryCache.set(cacheKey, {
          result,
          timestamp: Date.now()
        });
      }
      
      return result;
    } catch (error) {
      logger.error('Error querying words:', error);
      throw new Error('Failed to query words');
    }
  }

  /**
   * Execute the actual word query with performance monitoring and optimization
   */
  private async executeWordQuery(options: WordQueryOptions): Promise<WordFilterResult> {
    const queryId = `query_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const startTime = Date.now();
    
    try {
      // Validate and optimize phonetic filter
      const phoneticFilter: PhoneticFilter = {
        vowels: options.vowel,
        consonants: options.consonant,
        position: options.position,
        syllables: options.syllables,
        gradeLevel: options.gradeLevel,
        type: options.type,
        subtype: options.subtype
      };

      const validation = this.phoneticOptimizer.validateFilter(phoneticFilter);
      if (!validation.isValid) {
        throw new Error(`Invalid phonetic filter: ${validation.errors.join(', ')}`);
      }

      // Log warnings and optimizations
      if (validation.warnings.length > 0) {
        logger.warn('Phonetic filter warnings', { warnings: validation.warnings });
      }
      if (validation.optimizations.length > 0) {
        logger.info('Phonetic filter optimizations available', { optimizations: validation.optimizations });
      }

      // Optimize filter for better performance
      const optimizedFilter = this.phoneticOptimizer.optimizeFilter(phoneticFilter);
      
      // Build optimized MongoDB filter
      const { mongoFilter, indexHint, estimatedSelectivity } = 
        this.phoneticOptimizer.buildOptimizedMongoFilter(optimizedFilter);
      
      const limit = Math.max(1, Math.min(
        options.limit || config.wordDatabase.defaultLimit,
        config.wordDatabase.maxQueryLimit
      ));
      const offset = Math.max(0, options.offset || 0);
      
      logger.debug('Executing optimized word query:', { 
        mongoFilter, 
        indexHint, 
        estimatedSelectivity,
        limit, 
        offset 
      });
      
      // Monitor query performance
      const result = await this.performanceService.monitorQuery(
        queryId,
        mongoFilter,
        async () => {
          // Get total count efficiently
          const totalCount = await Word.countDocuments(mongoFilter);
          
          if (totalCount === 0) {
            return {
              words: [],
              totalCount: 0,
              hasMore: false,
              queryStats: {
                executionTimeMs: Date.now() - startTime,
                docsExamined: 0,
                indexUsed: 'NONE',
                estimatedSelectivity
              }
            };
          }
          
          // Build aggregation pipeline with index hint
          const pipeline = this.buildAggregationPipeline(mongoFilter, options, limit, offset, indexHint);
          
          // Execute query
          let words = await Word.aggregate(pipeline);
          
          // Apply blacklist filtering
          words = this.phoneticOptimizer.applyBlacklistFilter(words, optimizedFilter);
          
          const executionTime = Date.now() - startTime;
          
          return {
            words,
            totalCount,
            hasMore: offset + words.length < totalCount,
            queryStats: {
              executionTimeMs: executionTime,
              docsExamined: words.length,
              indexUsed: indexHint || 'AUTO',
              estimatedSelectivity
            }
          };
        }
      );
      
      return result;
      
    } catch (error) {
      const executionTime = Date.now() - startTime;
      
      // Record failed query performance
      this.performanceService.recordQueryMetrics(
        queryId,
        options,
        executionTime,
        0,
        0,
        'ERROR',
        false
      );
      
      logger.error('Error executing word query:', error);
      throw error;
    }
  }

  /**
   * Build optimized aggregation pipeline with index hints
   */
  private buildAggregationPipeline(
    filter: any, 
    options: WordQueryOptions, 
    limit: number, 
    offset: number,
    indexHint?: string
  ): any[] {
    const pipeline: any[] = [];

    // Add index hint if provided
    if (indexHint) {
      pipeline.push({ $hint: indexHint });
    }

    pipeline.push({ $match: filter });

    // Add sorting stage
    if (options.sortBy === 'random') {
      // For random sampling, use $sample
      pipeline.push({ $sample: { size: Math.min(limit, 1000) } });
    } else {
      // Add sorting with index-friendly sort orders
      const sortStage: any = {};
      switch (options.sortBy) {
        case 'score':
          sortStage.score = options.sortOrder === 'asc' ? 1 : -1;
          // Add secondary sort for consistency
          sortStage._id = 1;
          break;
        case 'lexeme':
          sortStage.lexeme = options.sortOrder === 'asc' ? 1 : -1;
          sortStage._id = 1;
          break;
        case 'syllables':
          sortStage.syllables = options.sortOrder === 'asc' ? 1 : -1;
          sortStage.score = -1; // Secondary sort by score
          break;
        default:
          // Default sort optimized for most common use case
          sortStage.score = -1;
          sortStage.views = -1;
      }
      pipeline.push({ $sort: sortStage });
      
      // Add pagination
      if (offset > 0) {
        pipeline.push({ $skip: offset });
      }
      pipeline.push({ $limit: limit });
    }

    // Optimized projection - only include necessary fields
    const projection: any = {
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
      score: 1,
      votes: 1,
      views: 1,
      createdAt: 1,
      updatedAt: 1
    };

    // Always include definitions for now
    projection.wordsXsensesXsynsets = 1;

    // Computed upvote percentage
    projection.upvotePercentage = {
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
    };

    pipeline.push({ $project: projection });

    return pipeline;
  }

  /**
   * Batch query multiple word sets efficiently
   */
  async batchQueryWords(queries: BatchWordQuery[]): Promise<Map<string, WordFilterResult>> {
    try {
      const results = new Map<string, WordFilterResult>();
      
      // Group similar queries for better caching
      const queryPromises = queries.map(async (query) => {
        const result = await this.queryWords(query.options);
        return { id: query.id, result };
      });
      
      const resolvedResults = await Promise.all(queryPromises);
      
      resolvedResults.forEach(({ id, result }) => {
        results.set(id, result);
      });
      
      return results;
    } catch (error) {
      logger.error('Error in batch query words:', error);
      throw new Error('Failed to execute batch word queries');
    }
  }

  /**
   * Get a single random word matching criteria
   */
  async getRandomWord(options: WordQueryOptions): Promise<IWord | null> {
    try {
      const result = await this.queryWords({ 
        ...options, 
        limit: 1, 
        sortBy: 'random' 
      });
      return result.words[0] || null;
    } catch (error) {
      logger.error('Error getting random word:', error);
      throw new Error('Failed to get random word');
    }
  }

  /**
   * Get word by ID using DataLoader for batching with Redis caching
   */
  async getWordById(id: string): Promise<IWord | null> {
    try {
      // Check Redis cache first
      if (this.cacheService.isAvailable()) {
        const cached = await this.cacheService.getCachedWord(id);
        if (cached) {
          logger.debug('Redis cache hit for word', { wordId: id });
          return cached;
        }
      }

      // Use DataLoader (which has its own caching)
      const word = await this.wordLoader.load(id);
      
      // Cache in Redis for future requests
      if (word && this.cacheService.isAvailable()) {
        await this.cacheService.cacheWord(word);
      }
      
      return word;
    } catch (error) {
      logger.error('Error getting word by ID:', error);
      throw new Error('Failed to get word');
    }
  }

  /**
   * Get multiple words by IDs efficiently
   */
  async getWordsByIds(ids: string[]): Promise<(IWord | null)[]> {
    try {
      const results = await this.wordLoader.loadMany(ids);
      return results.map(result => result instanceof Error ? null : result);
    } catch (error) {
      logger.error('Error getting words by IDs:', error);
      throw new Error('Failed to get words');
    }
  }

  /**
   * Vote on a word with cache invalidation
   */
  async voteOnWord(wordId: string, userId: string, vote: number): Promise<IWord> {
    try {
      const word = await this.getWordById(wordId);
      if (!word) {
        throw new Error('Word not found');
      }
      
      const result = await word.vote(userId as any, vote);
      
      // Invalidate caches for this word
      this.wordLoader.clear(wordId);
      if (this.cacheService.isAvailable()) {
        await this.cacheService.invalidateWord(wordId);
      }
      
      return result;
    } catch (error) {
      logger.error('Error voting on word:', error);
      if (error instanceof Error && error.message === 'Word not found') {
        throw error;
      }
      throw new Error('Failed to vote on word');
    }
  }

  /**
   * Increment word views with cache invalidation
   */
  async incrementWordViews(wordId: string): Promise<IWord> {
    try {
      const word = await this.getWordById(wordId);
      if (!word) {
        throw new Error('Word not found');
      }
      
      const result = await word.incrementViews();
      
      // Invalidate caches for this word
      this.wordLoader.clear(wordId);
      if (this.cacheService.isAvailable()) {
        await this.cacheService.invalidateWord(wordId);
      }
      
      return result;
    } catch (error) {
      logger.error('Error incrementing word views:', error);
      if (error instanceof Error && error.message === 'Word not found') {
        throw error;
      }
      throw new Error('Failed to increment word views');
    }
  }

  /**
   * Get words for sentence generation with optimized queries
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
      // Use batch queries for different word types
      const batchQueries: BatchWordQuery[] = [
        {
          id: 'nouns',
          options: { ...options, type: ['noun'], limit: options.limit || 100 }
        },
        {
          id: 'adjectives',
          options: { ...options, type: ['adj'], limit: options.limit || 50 }
        }
      ];

      // Add subtype queries for nouns
      const subtypes = ['animal', 'location', 'person', 'food', 'artifact'];
      subtypes.forEach(subtype => {
        batchQueries.push({
          id: `nouns_${subtype}`,
          options: { 
            ...options, 
            type: ['noun'], 
            subtype: [subtype], 
            limit: Math.floor((options.limit || 100) / subtypes.length)
          }
        });
      });

      const results = await this.batchQueryWords(batchQueries);
      
      const nouns = results.get('nouns')?.words || [];
      const adjectives = results.get('adjectives')?.words || [];
      
      const filteredNouns = {
        animal: results.get('nouns_animal')?.words || [],
        location: results.get('nouns_location')?.words || [],
        person: results.get('nouns_person')?.words || [],
        food: results.get('nouns_food')?.words || [],
        artifact: results.get('nouns_artifact')?.words || []
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
   * Build MongoDB filter from query options with optimizations
   */
  private buildWordFilter(options: WordQueryOptions): any {
    const filter: any = {};
    
    // Basic phonetic filters - order matters for index usage
    if (options.consonant && options.consonant.length > 0) {
      filter.consonant = { $in: options.consonant };
    }
    
    if (options.vowel && options.vowel.length > 0) {
      filter.vowel = { $in: options.vowel };
    }
    
    if (options.position) {
      filter.position = options.position;
    }
    
    // Syllable filter - commonly used, should be early in compound index
    if (options.syllables && options.syllables.length > 0) {
      filter.syllables = { $in: options.syllables };
    } else {
      // Default syllable range for better performance
      filter.syllables = { $in: [1, 2, 3, 4, 5] };
    }
    
    // Type filters
    if (options.type && options.type.length > 0) {
      filter.type = { $in: options.type };
    }
    
    if (options.subtype && options.subtype.length > 0) {
      filter.subtype = { $in: options.subtype };
    }
    
    // Age of acquisition filter with optimization
    if (options.age && options.age !== '0') {
      const ageLimit = parseInt(options.age, 10);
      if (ageLimit > 0) {
        filter.age_of_acquisition = {
          $gt: 0,
          $lte: ageLimit
        };
      }
    }
    
    return filter;
  }

  /**
   * Generate cache key for query options
   */
  private generateCacheKey(options: WordQueryOptions): string {
    // Sort keys for consistent cache keys
    const sortedOptions = Object.keys(options)
      .sort()
      .reduce((result: any, key) => {
        result[key] = options[key as keyof WordQueryOptions];
        return result;
      }, {});
    
    return JSON.stringify(sortedOptions);
  }

  /**
   * Clean expired cache entries
   */
  private cleanCache(): void {
    const now = Date.now();
    let cleaned = 0;
    
    for (const [key, value] of this.queryCache.entries()) {
      if (now - value.timestamp > this.CACHE_TTL) {
        this.queryCache.delete(key);
        cleaned++;
      }
    }
    
    if (cleaned > 0) {
      logger.debug(`Cleaned ${cleaned} expired cache entries`);
    }
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    size: number;
    hitRate: number;
    memoryUsage: number;
  } {
    return {
      size: this.queryCache.size,
      hitRate: 0, // Would need to track hits/misses
      memoryUsage: JSON.stringify([...this.queryCache.entries()]).length
    };
  }

  /**
   * Clear all caches
   */
  clearCache(): void {
    this.queryCache.clear();
    this.wordLoader.clearAll();
    this.batchQueryLoader.clearAll();
    logger.info('All caches cleared');
  }

  /**
   * Prefetch words for exercise sequences
   */
  async prefetchWordsForExercise(routineSteps: any[]): Promise<void> {
    try {
      if (!this.cacheService.isAvailable()) {
        logger.debug('Cache service not available, skipping prefetch');
        return;
      }

      await this.cacheService.prefetchWordsForExercise(routineSteps);
      
      // Process pending prefetch requests
      const pendingRequests = await this.cacheService.getPendingPrefetchRequests();
      
      if (pendingRequests.length > 0) {
        logger.info('Processing prefetch requests', { count: pendingRequests.length });
        
        // Execute prefetch queries in batches to avoid overwhelming the database
        const batchSize = 5;
        for (let i = 0; i < pendingRequests.length; i += batchSize) {
          const batch = pendingRequests.slice(i, i + batchSize);
          
          const prefetchPromises = batch.map(async (options) => {
            try {
              const result = await this.executeWordQuery(options);
              await this.cacheService.cacheWordQuery(options, result);
              logger.debug('Prefetched word query', { 
                options, 
                resultCount: result.words.length 
              });
            } catch (error) {
              logger.warn('Failed to prefetch word query:', error);
            }
          });
          
          await Promise.all(prefetchPromises);
          
          // Small delay between batches to avoid overwhelming the database
          if (i + batchSize < pendingRequests.length) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }
        
        logger.info('Completed prefetch processing', { 
          processed: pendingRequests.length 
        });
      }
    } catch (error) {
      logger.error('Error prefetching words for exercise:', error);
    }
  }

  /**
   * Prefetch next words in exercise sequence
   */
  async prefetchNextWords(
    currentOptions: WordQueryOptions, 
    nextOptions: WordQueryOptions[], 
    prefetchCount: number = 10
  ): Promise<void> {
    try {
      if (!this.cacheService.isAvailable()) {
        return;
      }

      // Prefetch words for upcoming exercise steps
      const prefetchPromises = nextOptions.slice(0, 3).map(async (options) => {
        const cached = await this.cacheService.getCachedWordQuery(options);
        if (!cached) {
          // Prefetch in background
          this.executeWordQuery({ ...options, limit: prefetchCount })
            .then(result => this.cacheService.cacheWordQuery(options, result))
            .catch(error => logger.warn('Background prefetch failed:', error));
        }
      });

      await Promise.all(prefetchPromises);
      
      logger.debug('Initiated prefetch for next words', { 
        nextSteps: nextOptions.length 
      });
    } catch (error) {
      logger.error('Error prefetching next words:', error);
    }
  }

  /**
   * Warm up cache with common queries
   */
  async warmUpCache(): Promise<void> {
    try {
      if (!this.cacheService.isAvailable()) {
        logger.debug('Cache service not available, skipping warm-up');
        return;
      }

      // Define common query patterns for warm-up
      const commonQueries: WordQueryOptions[] = [
        // Common vowel sounds
        { vowel: ['AE'], syllables: [1], limit: 20 },
        { vowel: ['IY'], syllables: [1], limit: 20 },
        { vowel: ['AH'], syllables: [1, 2], limit: 20 },
        
        // Common consonant sounds
        { consonant: ['B'], position: 'initial', syllables: [1], limit: 20 },
        { consonant: ['T'], position: 'initial', syllables: [1], limit: 20 },
        { consonant: ['S'], position: 'initial', syllables: [1], limit: 20 },
        
        // Common combinations
        { consonant: ['B'], vowel: ['AE'], syllables: [1], limit: 15 },
        { consonant: ['T'], vowel: ['IY'], syllables: [1], limit: 15 },
        
        // Grade level queries
        { age: '5', syllables: [1], limit: 25 },
        { age: '8', syllables: [1, 2], limit: 25 },
        
        // Type-based queries
        { type: ['noun'], syllables: [1], limit: 30 },
        { type: ['verb'], syllables: [1], limit: 20 },
        
        // Position-based queries
        { position: 'initial', syllables: [1], limit: 25 },
        { position: 'final', syllables: [1], limit: 25 }
      ];

      await this.cacheService.warmUpCache(commonQueries);
      
      // Process warm-up requests
      const warmUpRequests = await this.cacheService.getPendingWarmUpRequests();
      
      if (warmUpRequests.length > 0) {
        logger.info('Processing cache warm-up requests', { count: warmUpRequests.length });
        
        // Execute warm-up queries in batches
        const batchSize = 3;
        for (let i = 0; i < warmUpRequests.length; i += batchSize) {
          const batch = warmUpRequests.slice(i, i + batchSize);
          
          const warmUpPromises = batch.map(async (options) => {
            try {
              const result = await this.executeWordQuery(options);
              await this.cacheService.cacheWordQuery(options, result);
              logger.debug('Warmed up query cache', { 
                options, 
                resultCount: result.words.length 
              });
            } catch (error) {
              logger.warn('Failed to warm up query cache:', error);
            }
          });
          
          await Promise.all(warmUpPromises);
          
          // Delay between batches
          if (i + batchSize < warmUpRequests.length) {
            await new Promise(resolve => setTimeout(resolve, 200));
          }
        }
        
        logger.info('Completed cache warm-up', { processed: warmUpRequests.length });
      }
    } catch (error) {
      logger.error('Error warming up cache:', error);
    }
  }

  /**
   * Get combined cache statistics
   */
  async getCombinedCacheStats(): Promise<{
    redis: any;
    memory: any;
    dataLoader: any;
  }> {
    try {
      const redisStats = this.cacheService.isAvailable() 
        ? await this.cacheService.getStats()
        : { error: 'Redis not available' };

      const memoryStats = {
        size: this.queryCache.size,
        memoryUsage: JSON.stringify([...this.queryCache.entries()]).length
      };

      const dataLoaderStats = {
        wordLoader: {
          cacheSize: 0 // DataLoader cache size is internal
        },
        batchQueryLoader: {
          cacheSize: 0 // DataLoader cache size is internal
        }
      };

      return {
        redis: redisStats,
        memory: memoryStats,
        dataLoader: dataLoaderStats
      };
    } catch (error) {
      logger.error('Error getting combined cache stats:', error);
      return {
        redis: { error: 'Failed to get Redis stats' },
        memory: { error: 'Failed to get memory stats' },
        dataLoader: { error: 'Failed to get DataLoader stats' }
      };
    }
  }

  /**
   * Clear all caches
   */
  async clearAllCaches(): Promise<void> {
    try {
      // Clear Redis cache
      if (this.cacheService.isAvailable()) {
        await this.cacheService.clearAll();
      }
      
      // Clear memory cache
      this.queryCache.clear();
      
      // Clear DataLoader caches
      this.wordLoader.clearAll();
      this.batchQueryLoader.clearAll();
      
      logger.info('All caches cleared');
    } catch (error) {
      logger.error('Error clearing all caches:', error);
    }
  }

  /**
   * Validate phonetic filter before querying
   */
  validatePhoneticFilter(options: WordQueryOptions): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
    optimizations: string[];
  } {
    const phoneticFilter: PhoneticFilter = {
      vowels: options.vowel,
      consonants: options.consonant,
      position: options.position,
      syllables: options.syllables,
      gradeLevel: options.gradeLevel,
      type: options.type,
      subtype: options.subtype
    };

    return this.phoneticOptimizer.validateFilter(phoneticFilter);
  }

  /**
   * Get query performance analysis
   */
  async analyzeQueryPerformance(options: WordQueryOptions): Promise<{
    executionStats: any;
    indexUsage: any;
    recommendations: string[];
  }> {
    try {
      const phoneticFilter: PhoneticFilter = {
        vowels: options.vowel,
        consonants: options.consonant,
        position: options.position,
        syllables: options.syllables,
        gradeLevel: options.gradeLevel,
        type: options.type,
        subtype: options.subtype
      };

      const { mongoFilter } = this.phoneticOptimizer.buildOptimizedMongoFilter(phoneticFilter);
      
      return await this.performanceService.analyzeQueryPerformance(mongoFilter);
    } catch (error) {
      logger.error('Error analyzing query performance:', error);
      return {
        executionStats: null,
        indexUsage: null,
        recommendations: ['Failed to analyze query performance']
      };
    }
  }

  /**
   * Get real-time performance metrics
   */
  getRealTimePerformanceMetrics(): {
    currentQueries: number;
    averageResponseTime: number;
    cacheHitRate: number;
    memoryUsage: number;
    alertCount: number;
  } {
    return this.performanceService.getRealTimeMetrics();
  }

  /**
   * Generate performance report
   */
  generatePerformanceReport(periodHours: number = 24): any {
    return this.performanceService.generatePerformanceReport(periodHours);
  }

  /**
   * Get current performance alerts
   */
  getCurrentPerformanceAlerts(): any[] {
    return this.performanceService.getCurrentAlerts();
  }

  /**
   * Suggest filter optimizations
   */
  suggestFilterOptimizations(options: WordQueryOptions, results: any[]): string[] {
    const phoneticFilter: PhoneticFilter = {
      vowels: options.vowel,
      consonants: options.consonant,
      position: options.position,
      syllables: options.syllables,
      gradeLevel: options.gradeLevel,
      type: options.type,
      subtype: options.subtype
    };

    const stats = this.phoneticOptimizer.getFilterStats(phoneticFilter, results);
    return this.phoneticOptimizer.suggestOptimizations(phoneticFilter, stats);
  }

  /**
   * Validate consonant/vowel combinations
   */
  validatePhoneticCombination(consonants: string[], vowels: string[]): {
    isValid: boolean;
    warnings: string[];
    suggestions: string[];
  } {
    return this.phoneticOptimizer.validatePhoneticCombination(consonants, vowels);
  }

  /**
   * Get comprehensive service statistics
   */
  async getServiceStats(): Promise<{
    cache: any;
    performance: any;
    phonetic: any;
  }> {
    try {
      const cacheStats = await this.getCombinedCacheStats();
      const performanceStats = this.performanceService.getRealTimeMetrics();
      const phoneticStats = {
        validVowels: 15,
        validConsonants: 24,
        validPositions: 3,
        blacklistPatterns: Object.keys(this.phoneticOptimizer['BLACKLIST_PATTERNS']).length
      };

      return {
        cache: cacheStats,
        performance: performanceStats,
        phonetic: phoneticStats
      };
    } catch (error) {
      logger.error('Error getting service stats:', error);
      return {
        cache: { error: 'Failed to get cache stats' },
        performance: { error: 'Failed to get performance stats' },
        phonetic: { error: 'Failed to get phonetic stats' }
      };
    }
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