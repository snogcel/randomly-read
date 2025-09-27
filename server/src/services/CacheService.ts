import Redis from 'redis';
import { config } from '../config';
import { logger } from '../utils/logger';
import { WordFilterResult, WordQueryOptions } from './WordServiceOptimized';
import { IWord } from '../models/Word';

export interface CacheOptions {
  ttl?: number; // Time to live in seconds
  prefix?: string;
  compress?: boolean;
}

export interface CacheStats {
  hits: number;
  misses: number;
  sets: number;
  deletes: number;
  hitRate: number;
  memoryUsage: number;
  keyCount: number;
}

export class CacheService {
  private static instance: CacheService;
  private client: Redis.RedisClientType | null = null;
  private isConnected = false;
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    sets: 0,
    deletes: 0,
    hitRate: 0,
    memoryUsage: 0,
    keyCount: 0
  };

  private constructor() {
    this.initializeClient();
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  /**
   * Initialize Redis client
   */
  private async initializeClient(): Promise<void> {
    try {
      this.client = Redis.createClient({
        url: config.redis.url,
        socket: {
          connectTimeout: 5000,
          lazyConnect: true
        }
      });

      this.client.on('error', (error) => {
        logger.error('Redis client error:', error);
        this.isConnected = false;
      });

      this.client.on('connect', () => {
        logger.info('Connected to Redis');
        this.isConnected = true;
      });

      this.client.on('disconnect', () => {
        logger.warn('Disconnected from Redis');
        this.isConnected = false;
      });

      await this.client.connect();
    } catch (error) {
      logger.error('Failed to initialize Redis client:', error);
      this.client = null;
      this.isConnected = false;
    }
  }

  /**
   * Check if cache is available
   */
  isAvailable(): boolean {
    return this.isConnected && this.client !== null;
  }

  /**
   * Generate cache key for word queries
   */
  private generateWordQueryKey(options: WordQueryOptions): string {
    const sortedOptions = Object.keys(options)
      .sort()
      .reduce((result: any, key) => {
        result[key] = options[key as keyof WordQueryOptions];
        return result;
      }, {});
    
    const hash = Buffer.from(JSON.stringify(sortedOptions)).toString('base64');
    return `word_query:${hash}`;
  }

  /**
   * Generate cache key for individual words
   */
  private generateWordKey(wordId: string): string {
    return `word:${wordId}`;
  }

  /**
   * Cache word query results
   */
  async cacheWordQuery(
    options: WordQueryOptions, 
    result: WordFilterResult, 
    cacheOptions: CacheOptions = {}
  ): Promise<void> {
    if (!this.isAvailable()) {
      return;
    }

    try {
      const key = this.generateWordQueryKey(options);
      const ttl = cacheOptions.ttl || config.wordDatabase.cacheTTL;
      
      const cacheData = {
        ...result,
        cachedAt: Date.now(),
        ttl
      };

      await this.client!.setEx(key, ttl, JSON.stringify(cacheData));
      this.stats.sets++;
      
      logger.debug('Cached word query result', { key, resultCount: result.words.length, ttl });
    } catch (error) {
      logger.error('Failed to cache word query:', error);
    }
  }

  /**
   * Get cached word query results
   */
  async getCachedWordQuery(options: WordQueryOptions): Promise<WordFilterResult | null> {
    if (!this.isAvailable()) {
      this.stats.misses++;
      return null;
    }

    try {
      const key = this.generateWordQueryKey(options);
      const cached = await this.client!.get(key);
      
      if (!cached) {
        this.stats.misses++;
        return null;
      }

      const data = JSON.parse(cached);
      this.stats.hits++;
      
      // Add cache hit indicator to query stats
      if (data.queryStats) {
        data.queryStats.cacheHit = true;
      }
      
      logger.debug('Cache hit for word query', { key, resultCount: data.words?.length || 0 });
      return data;
    } catch (error) {
      logger.error('Failed to get cached word query:', error);
      this.stats.misses++;
      return null;
    }
  }

  /**
   * Cache individual word
   */
  async cacheWord(word: IWord, cacheOptions: CacheOptions = {}): Promise<void> {
    if (!this.isAvailable()) {
      return;
    }

    try {
      const key = this.generateWordKey(word._id.toString());
      const ttl = cacheOptions.ttl || config.wordDatabase.cacheTTL;
      
      const cacheData = {
        ...word.toObject(),
        cachedAt: Date.now(),
        ttl
      };

      await this.client!.setEx(key, ttl, JSON.stringify(cacheData));
      this.stats.sets++;
      
      logger.debug('Cached word', { wordId: word._id, lexeme: word.lexeme, ttl });
    } catch (error) {
      logger.error('Failed to cache word:', error);
    }
  }

  /**
   * Get cached word
   */
  async getCachedWord(wordId: string): Promise<IWord | null> {
    if (!this.isAvailable()) {
      this.stats.misses++;
      return null;
    }

    try {
      const key = this.generateWordKey(wordId);
      const cached = await this.client!.get(key);
      
      if (!cached) {
        this.stats.misses++;
        return null;
      }

      const data = JSON.parse(cached);
      this.stats.hits++;
      
      logger.debug('Cache hit for word', { wordId, lexeme: data.lexeme });
      return data;
    } catch (error) {
      logger.error('Failed to get cached word:', error);
      this.stats.misses++;
      return null;
    }
  }

  /**
   * Prefetch words for exercise sequences
   */
  async prefetchWordsForExercise(
    routineSteps: any[], 
    prefetchCount: number = 50
  ): Promise<void> {
    if (!this.isAvailable()) {
      return;
    }

    try {
      logger.info('Starting word prefetch for exercise', { 
        stepCount: routineSteps.length, 
        prefetchCount 
      });

      // Extract unique phonetic configurations from routine steps
      const phoneticConfigs = routineSteps
        .filter(step => step.phoneticConfig)
        .map(step => ({
          vowel: step.phoneticConfig.vowels,
          consonant: step.phoneticConfig.consonants,
          position: step.phoneticConfig.position,
          syllables: step.phoneticConfig.syllables,
          gradeLevel: step.phoneticConfig.gradeLevel,
          limit: Math.ceil(prefetchCount / routineSteps.length)
        }));

      // Remove duplicates
      const uniqueConfigs = phoneticConfigs.filter((config, index, self) => 
        index === self.findIndex(c => JSON.stringify(c) === JSON.stringify(config))
      );

      logger.debug('Prefetching for unique configurations', { 
        configCount: uniqueConfigs.length 
      });

      // Prefetch words for each configuration
      const prefetchPromises = uniqueConfigs.map(async (config) => {
        const key = this.generateWordQueryKey(config);
        const exists = await this.client!.exists(key);
        
        if (!exists) {
          // Mark for prefetch - actual fetching would be done by WordService
          await this.client!.setEx(
            `prefetch:${key}`, 
            300, // 5 minutes
            JSON.stringify({ config, requestedAt: Date.now() })
          );
          logger.debug('Marked for prefetch', { key });
        }
      });

      await Promise.all(prefetchPromises);
      
      logger.info('Word prefetch preparation completed', { 
        configCount: uniqueConfigs.length 
      });
    } catch (error) {
      logger.error('Failed to prefetch words for exercise:', error);
    }
  }

  /**
   * Get pending prefetch requests
   */
  async getPendingPrefetchRequests(): Promise<WordQueryOptions[]> {
    if (!this.isAvailable()) {
      return [];
    }

    try {
      const keys = await this.client!.keys('prefetch:*');
      const requests: WordQueryOptions[] = [];

      for (const key of keys) {
        const data = await this.client!.get(key);
        if (data) {
          const parsed = JSON.parse(data);
          requests.push(parsed.config);
          // Remove the prefetch request
          await this.client!.del(key);
        }
      }

      return requests;
    } catch (error) {
      logger.error('Failed to get pending prefetch requests:', error);
      return [];
    }
  }

  /**
   * Invalidate cache for word updates
   */
  async invalidateWord(wordId: string): Promise<void> {
    if (!this.isAvailable()) {
      return;
    }

    try {
      const wordKey = this.generateWordKey(wordId);
      await this.client!.del(wordKey);
      this.stats.deletes++;
      
      // Also invalidate related query caches
      // This is a simplified approach - in production, you might want more sophisticated invalidation
      const queryKeys = await this.client!.keys('word_query:*');
      const deletePromises = queryKeys.map(key => this.client!.del(key));
      await Promise.all(deletePromises);
      
      this.stats.deletes += queryKeys.length;
      
      logger.debug('Invalidated word cache', { wordId, relatedQueries: queryKeys.length });
    } catch (error) {
      logger.error('Failed to invalidate word cache:', error);
    }
  }

  /**
   * Invalidate query caches based on criteria
   */
  async invalidateQueryCache(criteria?: {
    consonant?: string[];
    vowel?: string[];
    position?: string;
  }): Promise<void> {
    if (!this.isAvailable()) {
      return;
    }

    try {
      // For simplicity, invalidate all query caches
      // In production, you might want more granular invalidation
      const queryKeys = await this.client!.keys('word_query:*');
      
      if (queryKeys.length > 0) {
        await this.client!.del(queryKeys);
        this.stats.deletes += queryKeys.length;
        
        logger.info('Invalidated query caches', { 
          count: queryKeys.length, 
          criteria 
        });
      }
    } catch (error) {
      logger.error('Failed to invalidate query cache:', error);
    }
  }

  /**
   * Get cache statistics
   */
  async getStats(): Promise<CacheStats> {
    if (!this.isAvailable()) {
      return this.stats;
    }

    try {
      // Update memory usage and key count from Redis
      const info = await this.client!.info('memory');
      const memoryMatch = info.match(/used_memory:(\d+)/);
      const memoryUsage = memoryMatch ? parseInt(memoryMatch[1]) : 0;

      const keyCount = await this.client!.dbSize();

      // Calculate hit rate
      const totalRequests = this.stats.hits + this.stats.misses;
      const hitRate = totalRequests > 0 ? (this.stats.hits / totalRequests) * 100 : 0;

      return {
        ...this.stats,
        hitRate: Math.round(hitRate * 100) / 100,
        memoryUsage,
        keyCount
      };
    } catch (error) {
      logger.error('Failed to get cache stats:', error);
      return this.stats;
    }
  }

  /**
   * Clear all cache
   */
  async clearAll(): Promise<void> {
    if (!this.isAvailable()) {
      return;
    }

    try {
      await this.client!.flushDb();
      
      // Reset stats
      this.stats = {
        hits: 0,
        misses: 0,
        sets: 0,
        deletes: 0,
        hitRate: 0,
        memoryUsage: 0,
        keyCount: 0
      };
      
      logger.info('Cleared all cache');
    } catch (error) {
      logger.error('Failed to clear cache:', error);
    }
  }

  /**
   * Warm up cache with common queries
   */
  async warmUpCache(commonQueries: WordQueryOptions[]): Promise<void> {
    if (!this.isAvailable()) {
      return;
    }

    try {
      logger.info('Starting cache warm-up', { queryCount: commonQueries.length });

      // Mark queries for warm-up
      const warmUpPromises = commonQueries.map(async (query) => {
        const key = this.generateWordQueryKey(query);
        const exists = await this.client!.exists(key);
        
        if (!exists) {
          await this.client!.setEx(
            `warmup:${key}`, 
            600, // 10 minutes
            JSON.stringify({ query, requestedAt: Date.now() })
          );
        }
      });

      await Promise.all(warmUpPromises);
      
      logger.info('Cache warm-up preparation completed');
    } catch (error) {
      logger.error('Failed to warm up cache:', error);
    }
  }

  /**
   * Get pending warm-up requests
   */
  async getPendingWarmUpRequests(): Promise<WordQueryOptions[]> {
    if (!this.isAvailable()) {
      return [];
    }

    try {
      const keys = await this.client!.keys('warmup:*');
      const requests: WordQueryOptions[] = [];

      for (const key of keys) {
        const data = await this.client!.get(key);
        if (data) {
          const parsed = JSON.parse(data);
          requests.push(parsed.query);
          // Remove the warm-up request
          await this.client!.del(key);
        }
      }

      return requests;
    } catch (error) {
      logger.error('Failed to get pending warm-up requests:', error);
      return [];
    }
  }

  /**
   * Disconnect from Redis
   */
  async disconnect(): Promise<void> {
    if (this.client && this.isConnected) {
      try {
        await this.client.disconnect();
        logger.info('Disconnected from Redis');
      } catch (error) {
        logger.error('Failed to disconnect from Redis:', error);
      }
    }
  }
}