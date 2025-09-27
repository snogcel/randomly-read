import { ApolloClient } from '@apollo/client';
import { WORDS_QUERY, WORD_QUERY } from '../graphql/queries/wordQueries';
import { logger } from '../utils/logger';

export interface PrefetchOptions {
  priority?: 'high' | 'medium' | 'low';
  maxConcurrent?: number;
  delay?: number;
}

export interface ExerciseStep {
  phoneticConfig?: {
    vowels: string[];
    consonants: string[];
    position: string;
    syllables: number[];
    gradeLevel: string;
  };
  type: string;
  duration: number;
  repetitions: number;
}

export class WordPrefetchService {
  private static instance: WordPrefetchService;
  private client: ApolloClient<any> | null = null;
  private prefetchQueue: Array<{ query: any; variables: any; priority: string }> = [];
  private isProcessing = false;
  private prefetchStats = {
    queued: 0,
    completed: 0,
    failed: 0,
    cacheHits: 0
  };

  private constructor() {}

  public static getInstance(): WordPrefetchService {
    if (!WordPrefetchService.instance) {
      WordPrefetchService.instance = new WordPrefetchService();
    }
    return WordPrefetchService.instance;
  }

  /**
   * Initialize with Apollo Client
   */
  initialize(client: ApolloClient<any>): void {
    this.client = client;
    logger.info('WordPrefetchService initialized');
  }

  /**
   * Prefetch words for an entire exercise routine
   */
  async prefetchForRoutine(
    routineSteps: ExerciseStep[], 
    options: PrefetchOptions = {}
  ): Promise<void> {
    if (!this.client) {
      logger.warn('WordPrefetchService not initialized with Apollo Client');
      return;
    }

    try {
      logger.info('Starting routine prefetch', { stepCount: routineSteps.length });

      // Extract unique phonetic configurations
      const phoneticConfigs = this.extractPhoneticConfigs(routineSteps);
      
      // Queue prefetch requests
      phoneticConfigs.forEach((config, index) => {
        this.queuePrefetch(
          WORDS_QUERY,
          { input: config },
          options.priority || (index < 3 ? 'high' : 'medium')
        );
      });

      // Start processing queue
      this.processQueue(options);

      logger.info('Routine prefetch queued', { 
        configCount: phoneticConfigs.length,
        queueSize: this.prefetchQueue.length 
      });
    } catch (error) {
      logger.error('Error prefetching for routine:', error);
    }
  }

  /**
   * Prefetch words for next exercise steps
   */
  async prefetchNextSteps(
    currentStepIndex: number,
    routineSteps: ExerciseStep[],
    lookAhead: number = 3,
    options: PrefetchOptions = {}
  ): Promise<void> {
    if (!this.client) return;

    try {
      const nextSteps = routineSteps.slice(
        currentStepIndex + 1, 
        currentStepIndex + 1 + lookAhead
      );

      if (nextSteps.length === 0) {
        logger.debug('No next steps to prefetch');
        return;
      }

      const phoneticConfigs = this.extractPhoneticConfigs(nextSteps);
      
      // Queue with high priority for immediate next steps
      phoneticConfigs.forEach((config, index) => {
        this.queuePrefetch(
          WORDS_QUERY,
          { input: config },
          index === 0 ? 'high' : 'medium'
        );
      });

      this.processQueue(options);

      logger.debug('Next steps prefetch queued', { 
        nextStepCount: nextSteps.length,
        configCount: phoneticConfigs.length 
      });
    } catch (error) {
      logger.error('Error prefetching next steps:', error);
    }
  }

  /**
   * Prefetch specific words by IDs
   */
  async prefetchWordsByIds(
    wordIds: string[], 
    options: PrefetchOptions = {}
  ): Promise<void> {
    if (!this.client) return;

    try {
      wordIds.forEach(wordId => {
        this.queuePrefetch(
          WORD_QUERY,
          { id: wordId },
          options.priority || 'medium'
        );
      });

      this.processQueue(options);

      logger.debug('Word IDs prefetch queued', { wordCount: wordIds.length });
    } catch (error) {
      logger.error('Error prefetching words by IDs:', error);
    }
  }

  /**
   * Prefetch common word combinations
   */
  async prefetchCommonCombinations(options: PrefetchOptions = {}): Promise<void> {
    if (!this.client) return;

    try {
      const commonQueries = [
        // Common vowel sounds
        { vowel: ['AE'], syllables: [1], limit: 15 },
        { vowel: ['IY'], syllables: [1], limit: 15 },
        { vowel: ['AH'], syllables: [1, 2], limit: 15 },
        
        // Common consonant sounds
        { consonant: ['B'], position: 'initial', syllables: [1], limit: 15 },
        { consonant: ['T'], position: 'initial', syllables: [1], limit: 15 },
        { consonant: ['S'], position: 'initial', syllables: [1], limit: 15 },
        
        // Common combinations
        { consonant: ['B'], vowel: ['AE'], syllables: [1], limit: 10 },
        { consonant: ['T'], vowel: ['IY'], syllables: [1], limit: 10 },
        
        // Grade level queries
        { age: '5', syllables: [1], limit: 20 },
        { age: '8', syllables: [1, 2], limit: 20 },
        
        // Type-based queries
        { type: ['noun'], syllables: [1], limit: 25 },
        { type: ['verb'], syllables: [1], limit: 15 }
      ];

      commonQueries.forEach(query => {
        this.queuePrefetch(
          WORDS_QUERY,
          { input: query },
          'low'
        );
      });

      this.processQueue({ ...options, delay: 500 }); // Slower processing for background prefetch

      logger.info('Common combinations prefetch queued', { 
        queryCount: commonQueries.length 
      });
    } catch (error) {
      logger.error('Error prefetching common combinations:', error);
    }
  }

  /**
   * Extract unique phonetic configurations from routine steps
   */
  private extractPhoneticConfigs(steps: ExerciseStep[]): any[] {
    const configs = steps
      .filter(step => step.phoneticConfig)
      .map(step => ({
        vowel: step.phoneticConfig!.vowels,
        consonant: step.phoneticConfig!.consonants,
        position: step.phoneticConfig!.position,
        syllables: step.phoneticConfig!.syllables,
        gradeLevel: step.phoneticConfig!.gradeLevel,
        limit: Math.min(20, step.repetitions * 2) // Prefetch based on repetitions
      }));

    // Remove duplicates
    const uniqueConfigs = configs.filter((config, index, self) => 
      index === self.findIndex(c => JSON.stringify(c) === JSON.stringify(config))
    );

    return uniqueConfigs;
  }

  /**
   * Queue a prefetch request
   */
  private queuePrefetch(query: any, variables: any, priority: string): void {
    // Check if already queued
    const exists = this.prefetchQueue.some(item => 
      JSON.stringify(item.variables) === JSON.stringify(variables)
    );

    if (!exists) {
      this.prefetchQueue.push({ query, variables, priority });
      this.prefetchStats.queued++;
    }
  }

  /**
   * Process the prefetch queue
   */
  private async processQueue(options: PrefetchOptions = {}): Promise<void> {
    if (this.isProcessing || this.prefetchQueue.length === 0) {
      return;
    }

    this.isProcessing = true;
    const maxConcurrent = options.maxConcurrent || 3;
    const delay = options.delay || 100;

    try {
      // Sort queue by priority
      this.prefetchQueue.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority as keyof typeof priorityOrder] - 
               priorityOrder[a.priority as keyof typeof priorityOrder];
      });

      // Process in batches
      while (this.prefetchQueue.length > 0) {
        const batch = this.prefetchQueue.splice(0, maxConcurrent);
        
        const batchPromises = batch.map(async (item) => {
          try {
            // Check cache first
            const cached = this.client!.cache.readQuery({
              query: item.query,
              variables: item.variables
            });

            if (cached) {
              this.prefetchStats.cacheHits++;
              logger.debug('Prefetch cache hit', { variables: item.variables });
              return;
            }

            // Fetch from network
            await this.client!.query({
              query: item.query,
              variables: item.variables,
              fetchPolicy: 'cache-first',
              errorPolicy: 'ignore' // Don't fail entire batch on single error
            });

            this.prefetchStats.completed++;
            logger.debug('Prefetch completed', { variables: item.variables });
          } catch (error) {
            this.prefetchStats.failed++;
            logger.warn('Prefetch failed', { 
              variables: item.variables, 
              error: error instanceof Error ? error.message : 'Unknown error' 
            });
          }
        });

        await Promise.all(batchPromises);

        // Delay between batches to avoid overwhelming the server
        if (this.prefetchQueue.length > 0 && delay > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }

      logger.debug('Prefetch queue processing completed', this.prefetchStats);
    } catch (error) {
      logger.error('Error processing prefetch queue:', error);
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Clear prefetch queue
   */
  clearQueue(): void {
    this.prefetchQueue = [];
    logger.debug('Prefetch queue cleared');
  }

  /**
   * Get prefetch statistics
   */
  getStats(): typeof this.prefetchStats {
    return { ...this.prefetchStats };
  }

  /**
   * Reset statistics
   */
  resetStats(): void {
    this.prefetchStats = {
      queued: 0,
      completed: 0,
      failed: 0,
      cacheHits: 0
    };
  }

  /**
   * Check if prefetching is active
   */
  isActive(): boolean {
    return this.isProcessing || this.prefetchQueue.length > 0;
  }

  /**
   * Get queue status
   */
  getQueueStatus(): {
    size: number;
    isProcessing: boolean;
    byPriority: { [key: string]: number };
  } {
    const byPriority = this.prefetchQueue.reduce((acc, item) => {
      acc[item.priority] = (acc[item.priority] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return {
      size: this.prefetchQueue.length,
      isProcessing: this.isProcessing,
      byPriority
    };
  }
}