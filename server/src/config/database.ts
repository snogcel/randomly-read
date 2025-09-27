import mongoose from 'mongoose';
import { config } from './index';
import { logger } from '../utils/logger';

export class DatabaseManager {
  private static instance: DatabaseManager;
  private isConnected = false;

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  async connect(): Promise<void> {
    if (this.isConnected) {
      return;
    }

    try {
      await mongoose.connect(config.database.url, config.database.options);
      this.isConnected = true;
      logger.info('Connected to MongoDB');
      
      // Create optimized indexes after connection
      await this.createOptimizedIndexes();
    } catch (error) {
      logger.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    try {
      await mongoose.disconnect();
      this.isConnected = false;
      logger.info('Disconnected from MongoDB');
    } catch (error) {
      logger.error('Failed to disconnect from MongoDB:', error);
      throw error;
    }
  }

  /**
   * Create optimized indexes for word database queries
   * These indexes are specifically designed for phonetic filtering performance
   */
  private async createOptimizedIndexes(): Promise<void> {
    try {
      const db = mongoose.connection.db;
      const wordsCollection = db.collection('words');

      // Compound indexes for phonetic queries (most common query patterns)
      const indexes = [
        // Primary phonetic search index - covers most common queries
        {
          key: { consonant: 1, vowel: 1, position: 1, syllables: 1 },
          name: 'phonetic_search_primary',
          background: true
        },
        
        // Secondary phonetic index with type filtering
        {
          key: { consonant: 1, vowel: 1, type: 1, syllables: 1 },
          name: 'phonetic_type_search',
          background: true
        },
        
        // Position-based queries with grade level
        {
          key: { position: 1, age_of_acquisition: 1, syllables: 1 },
          name: 'position_grade_search',
          background: true
        },
        
        // Syllable and type combination (common for routine building)
        {
          key: { syllables: 1, type: 1, subtype: 1 },
          name: 'syllable_type_search',
          background: true
        },
        
        // Score-based sorting with phonetic filters
        {
          key: { consonant: 1, vowel: 1, score: -1 },
          name: 'phonetic_score_sort',
          background: true
        },
        
        // Age of acquisition filtering
        {
          key: { age_of_acquisition: 1, syllables: 1 },
          name: 'age_syllable_search',
          background: true,
          partialFilterExpression: { age_of_acquisition: { $gt: 0 } }
        },
        
        // Text search for lexeme
        {
          key: { lexeme: 'text' },
          name: 'lexeme_text_search',
          background: true
        },
        
        // Voting and popularity queries
        {
          key: { score: -1, views: -1 },
          name: 'popularity_sort',
          background: true
        },
        
        // Unique constraint on cmudict_id
        {
          key: { cmudict_id: 1 },
          name: 'cmudict_id_unique',
          unique: true,
          background: true
        }
      ];

      // Create indexes
      for (const index of indexes) {
        try {
          await wordsCollection.createIndex(index.key, {
            name: index.name,
            background: index.background,
            unique: index.unique || false,
            partialFilterExpression: index.partialFilterExpression
          });
          logger.info(`Created index: ${index.name}`);
        } catch (error) {
          // Index might already exist, log but don't fail
          logger.warn(`Index ${index.name} creation warning:`, error);
        }
      }

      // Create indexes for other collections
      await this.createProgressIndexes();
      await this.createRoutineIndexes();
      
      logger.info('All database indexes created successfully');
    } catch (error) {
      logger.error('Failed to create database indexes:', error);
      // Don't throw - indexes are optimization, not critical for basic functionality
    }
  }

  /**
   * Create indexes for progress tracking collections
   */
  private async createProgressIndexes(): Promise<void> {
    try {
      const db = mongoose.connection.db;
      
      // Progress records indexes
      const progressCollection = db.collection('progressrecords');
      await progressCollection.createIndex(
        { userId: 1, routineId: 1, timestamp: -1 },
        { name: 'user_routine_progress', background: true }
      );
      await progressCollection.createIndex(
        { userId: 1, timestamp: -1 },
        { name: 'user_progress_timeline', background: true }
      );
      
      // Exercise sessions indexes
      const sessionsCollection = db.collection('exercisesessions');
      await sessionsCollection.createIndex(
        { userId: 1, startTime: -1 },
        { name: 'user_sessions_timeline', background: true }
      );
      await sessionsCollection.createIndex(
        { userId: 1, routineId: 1, startTime: -1 },
        { name: 'user_routine_sessions', background: true }
      );
      
      logger.info('Progress tracking indexes created');
    } catch (error) {
      logger.warn('Progress indexes creation warning:', error);
    }
  }

  /**
   * Create indexes for routine collections
   */
  private async createRoutineIndexes(): Promise<void> {
    try {
      const db = mongoose.connection.db;
      
      // Routines indexes
      const routinesCollection = db.collection('routines');
      await routinesCollection.createIndex(
        { createdBy: 1, isActive: 1 },
        { name: 'user_active_routines', background: true }
      );
      await routinesCollection.createIndex(
        { assignedUsers: 1, isActive: 1 },
        { name: 'assigned_active_routines', background: true }
      );
      await routinesCollection.createIndex(
        { gradeLevel: 1, isActive: 1 },
        { name: 'grade_active_routines', background: true }
      );
      
      logger.info('Routine indexes created');
    } catch (error) {
      logger.warn('Routine indexes creation warning:', error);
    }
  }

  /**
   * Get database statistics for monitoring
   */
  async getStats(): Promise<any> {
    try {
      const db = mongoose.connection.db;
      const stats = await db.stats();
      return {
        collections: stats.collections,
        dataSize: stats.dataSize,
        indexSize: stats.indexSize,
        storageSize: stats.storageSize
      };
    } catch (error) {
      logger.error('Failed to get database stats:', error);
      return null;
    }
  }

  /**
   * Analyze query performance
   */
  async analyzeQuery(collection: string, query: any): Promise<any> {
    try {
      const db = mongoose.connection.db;
      const coll = db.collection(collection);
      const explanation = await coll.find(query).explain('executionStats');
      
      return {
        executionTimeMillis: explanation.executionStats.executionTimeMillis,
        totalDocsExamined: explanation.executionStats.totalDocsExamined,
        totalDocsReturned: explanation.executionStats.totalDocsReturned,
        indexesUsed: explanation.executionStats.executionStages?.indexName || 'COLLSCAN'
      };
    } catch (error) {
      logger.error('Failed to analyze query:', error);
      return null;
    }
  }
}