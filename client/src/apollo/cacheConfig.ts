import { InMemoryCache, TypePolicies } from '@apollo/client';
import { logger } from '../utils/logger';

/**
 * Apollo Client cache configuration with intelligent caching policies
 * for word database queries and exercise data
 */

export interface CacheConfig {
  typePolicies: TypePolicies;
  possibleTypes?: any;
}

/**
 * Type policies for intelligent caching
 */
const typePolicies: TypePolicies = {
  Query: {
    fields: {
      // Word queries with intelligent caching
      words: {
        keyArgs: ['input', ['vowel', 'consonant', 'position', 'syllables', 'type', 'subtype', 'age', 'gradeLevel']],
        merge(existing, incoming, { args }) {
          // Merge strategy for paginated word results
          if (!existing) {
            return incoming;
          }

          // If it's a new query (different filters), replace existing
          const existingWords = existing.words || [];
          const incomingWords = incoming.words || [];

          // Check if this is pagination (offset > 0) or new query
          const offset = args?.input?.offset || 0;
          
          if (offset > 0) {
            // Pagination: append new words
            return {
              ...incoming,
              words: [...existingWords, ...incomingWords],
              totalCount: incoming.totalCount,
              hasMore: incoming.hasMore
            };
          } else {
            // New query: replace existing
            return incoming;
          }
        },
        read(existing, { args }) {
          if (!existing) return existing;

          // Handle pagination reads
          const offset = args?.input?.offset || 0;
          const limit = args?.input?.limit || 10;

          if (offset === 0) {
            return existing;
          }

          // For paginated reads, return subset if we have enough cached data
          const words = existing.words || [];
          if (words.length >= offset + limit) {
            return {
              ...existing,
              words: words.slice(offset, offset + limit),
              hasMore: offset + limit < existing.totalCount
            };
          }

          // Not enough cached data, let Apollo fetch from network
          return undefined;
        }
      },

      // Random word queries - don't cache these as they should be random
      randomWord: {
        keyArgs: false, // Don't cache random words
        merge: false
      },

      // Individual word queries
      word: {
        keyArgs: ['id'],
        merge: (existing, incoming) => incoming
      },

      // Routine queries
      routines: {
        keyArgs: ['input', ['createdBy', 'assignedTo', 'isActive', 'gradeLevel']],
        merge: (existing, incoming, { args }) => {
          if (!existing) return incoming;

          const offset = args?.input?.offset || 0;
          
          if (offset > 0) {
            return {
              ...incoming,
              routines: [...(existing.routines || []), ...(incoming.routines || [])],
              totalCount: incoming.totalCount,
              hasMore: incoming.hasMore
            };
          }
          
          return incoming;
        }
      },

      // User routines - cache by user ID
      userRoutines: {
        keyArgs: ['userId'],
        merge: (existing, incoming) => incoming
      },

      // Exercise sessions
      exerciseSessions: {
        keyArgs: ['userId', 'routineId'],
        merge: (existing, incoming, { args }) => {
          if (!existing) return incoming;

          const offset = args?.offset || 0;
          
          if (offset > 0) {
            return [...existing, ...incoming];
          }
          
          return incoming;
        }
      },

      // Progress records
      progressRecords: {
        keyArgs: ['userId', 'routineId', 'startDate', 'endDate'],
        merge: (existing, incoming) => incoming
      },

      // Fluency reports
      fluencyReport: {
        keyArgs: ['userId', 'routineId', 'startDate', 'endDate'],
        merge: (existing, incoming) => incoming
      }
    }
  },

  Word: {
    fields: {
      // Word votes - merge vote updates
      votes: {
        merge: (existing, incoming) => incoming
      },
      
      // Word views - always use latest
      views: {
        merge: (existing, incoming) => incoming
      },

      // Computed upvote percentage
      upvotePercentage: {
        read(existing, { readField }) {
          const votes = readField('votes') as any[] || [];
          if (votes.length === 0) return 0;
          
          const upvotes = votes.filter(vote => vote.vote === 1);
          return Math.round((upvotes.length / votes.length) * 100);
        }
      }
    }
  },

  WordFilterResult: {
    fields: {
      words: {
        merge: (existing, incoming, { args }) => {
          // Handle word list merging for pagination
          if (!existing) return incoming;
          
          // Check if this is pagination or new query
          const offset = args?.offset || 0;
          
          if (offset > 0) {
            return [...existing, ...incoming];
          }
          
          return incoming;
        }
      }
    }
  },

  Routine: {
    fields: {
      // Computed total duration
      totalDuration: {
        read(existing, { readField }) {
          const subroutine = readField('subroutine') as any[] || [];
          return subroutine.reduce((total, step) => {
            const duration = step.duration || 0;
            const repetitions = step.repetitions || 1;
            return total + (duration * repetitions);
          }, 0);
        }
      },

      // Computed step count
      stepCount: {
        read(existing, { readField }) {
          const subroutine = readField('subroutine') as any[] || [];
          return subroutine.length;
        }
      }
    }
  },

  ExerciseSession: {
    fields: {
      // Computed session duration
      duration: {
        read(existing, { readField }) {
          const startTime = readField('startTime') as string;
          const endTime = readField('endTime') as string;
          
          if (!startTime || !endTime) return 0;
          
          return new Date(endTime).getTime() - new Date(startTime).getTime();
        }
      },

      // Computed completion rate
      completionRate: {
        read(existing, { readField }) {
          const totalWords = readField('totalWords') as number || 0;
          const completedWords = readField('completedWords') as number || 0;
          
          if (totalWords === 0) return 0;
          
          return Math.round((completedWords / totalWords) * 100);
        }
      }
    }
  }
};

/**
 * Create configured Apollo Client cache
 */
export function createApolloCache(): InMemoryCache {
  const cache = new InMemoryCache({
    typePolicies,
    
    // Add result caching for better performance
    resultCaching: true,
    
    // Configure garbage collection
    possibleTypes: {
      // Add any union/interface types here if needed
    }
  });

  // Add cache persistence if needed
  if (typeof window !== 'undefined') {
    try {
      const persistedCache = localStorage.getItem('apollo-cache-persist');
      if (persistedCache) {
        cache.restore(JSON.parse(persistedCache));
        logger.debug('Restored Apollo cache from localStorage');
      }
    } catch (error) {
      logger.warn('Failed to restore Apollo cache:', error);
    }

    // Persist cache changes
    let persistTimeout: NodeJS.Timeout;
    cache.watch({
      query: { query: {} } as any,
      callback: () => {
        // Debounce cache persistence
        clearTimeout(persistTimeout);
        persistTimeout = setTimeout(() => {
          try {
            const cacheData = cache.extract();
            localStorage.setItem('apollo-cache-persist', JSON.stringify(cacheData));
            logger.debug('Persisted Apollo cache to localStorage');
          } catch (error) {
            logger.warn('Failed to persist Apollo cache:', error);
          }
        }, 1000);
      }
    });
  }

  return cache;
}

/**
 * Cache optimization utilities
 */
export class CacheOptimizer {
  private cache: InMemoryCache;

  constructor(cache: InMemoryCache) {
    this.cache = cache;
  }

  /**
   * Prefetch words for exercise sequence
   */
  async prefetchWordsForExercise(routineSteps: any[], client: any): Promise<void> {
    try {
      const prefetchPromises = routineSteps
        .filter(step => step.phoneticConfig)
        .slice(0, 3) // Prefetch first 3 steps
        .map(async (step) => {
          const queryOptions = {
            vowel: step.phoneticConfig.vowels,
            consonant: step.phoneticConfig.consonants,
            position: step.phoneticConfig.position,
            syllables: step.phoneticConfig.syllables,
            gradeLevel: step.phoneticConfig.gradeLevel,
            limit: 20
          };

          try {
            await client.query({
              query: require('../graphql/queries/wordQueries').WORDS_QUERY,
              variables: { input: queryOptions },
              fetchPolicy: 'cache-first'
            });
            
            logger.debug('Prefetched words for exercise step', { queryOptions });
          } catch (error) {
            logger.warn('Failed to prefetch words for step:', error);
          }
        });

      await Promise.all(prefetchPromises);
      logger.info('Completed word prefetching for exercise', { stepCount: routineSteps.length });
    } catch (error) {
      logger.error('Error prefetching words for exercise:', error);
    }
  }

  /**
   * Warm up cache with common queries
   */
  async warmUpCache(client: any): Promise<void> {
    try {
      const commonQueries = [
        { vowel: ['AE'], syllables: [1], limit: 10 },
        { consonant: ['B'], position: 'initial', syllables: [1], limit: 10 },
        { type: ['noun'], syllables: [1], limit: 15 }
      ];

      const warmUpPromises = commonQueries.map(async (queryOptions) => {
        try {
          await client.query({
            query: require('../graphql/queries/wordQueries').WORDS_QUERY,
            variables: { input: queryOptions },
            fetchPolicy: 'cache-first'
          });
        } catch (error) {
          logger.warn('Failed to warm up cache for query:', error);
        }
      });

      await Promise.all(warmUpPromises);
      logger.info('Cache warm-up completed');
    } catch (error) {
      logger.error('Error warming up cache:', error);
    }
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    size: number;
    queries: number;
    mutations: number;
  } {
    try {
      const cacheData = this.cache.extract();
      const rootQuery = cacheData.ROOT_QUERY || {};
      const rootMutation = cacheData.ROOT_MUTATION || {};

      return {
        size: JSON.stringify(cacheData).length,
        queries: Object.keys(rootQuery).length,
        mutations: Object.keys(rootMutation).length
      };
    } catch (error) {
      logger.error('Error getting cache stats:', error);
      return { size: 0, queries: 0, mutations: 0 };
    }
  }

  /**
   * Clear cache selectively
   */
  clearWordCache(): void {
    try {
      this.cache.evict({ fieldName: 'words' });
      this.cache.evict({ fieldName: 'word' });
      this.cache.evict({ fieldName: 'randomWord' });
      this.cache.gc();
      
      logger.info('Word cache cleared');
    } catch (error) {
      logger.error('Error clearing word cache:', error);
    }
  }

  /**
   * Clear all cache
   */
  clearAllCache(): void {
    try {
      this.cache.reset();
      
      // Clear persisted cache
      if (typeof window !== 'undefined') {
        localStorage.removeItem('apollo-cache-persist');
      }
      
      logger.info('All cache cleared');
    } catch (error) {
      logger.error('Error clearing all cache:', error);
    }
  }
}