import mongoose from 'mongoose';
import { config } from '../config';
import { DatabaseManager } from '../config/database';
import { logger } from '../utils/logger';

/**
 * Script to create optimized database indexes for word queries
 */
async function createOptimizedIndexes() {
  try {
    logger.info('Starting database index creation...');
    
    // Connect to database
    const dbManager = DatabaseManager.getInstance();
    await dbManager.connect();
    
    const db = mongoose.connection.db;
    
    // Create indexes for words collection
    await createWordIndexes(db);
    
    // Create indexes for other collections
    await createProgressIndexes(db);
    await createRoutineIndexes(db);
    
    logger.info('All database indexes created successfully');
    
    // Get index information
    const indexInfo = await getIndexInformation(db);
    logger.info('Index summary:', indexInfo);
    
  } catch (error) {
    logger.error('Failed to create database indexes:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

/**
 * Create optimized indexes for words collection
 */
async function createWordIndexes(db: any) {
  const wordsCollection = db.collection('words');
  
  logger.info('Creating word collection indexes...');
  
  const wordIndexes = [
    // Primary phonetic search index - most common query pattern
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
      background: true,
      partialFilterExpression: { age_of_acquisition: { $gt: 0 } }
    },
    
    // Syllable and type combination (routine building)
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
    },
    
    // Compound index for sentence generation
    {
      key: { type: 1, subtype: 1, score: -1 },
      name: 'sentence_generation',
      background: true
    },
    
    // Vowel-only queries (common in exercises)
    {
      key: { vowel: 1, syllables: 1, position: 1 },
      name: 'vowel_syllable_position',
      background: true
    },
    
    // Consonant-only queries (common in exercises)
    {
      key: { consonant: 1, syllables: 1, position: 1 },
      name: 'consonant_syllable_position',
      background: true
    }
  ];

  for (const index of wordIndexes) {
    try {
      await wordsCollection.createIndex(index.key, {
        name: index.name,
        background: index.background,
        unique: index.unique || false,
        partialFilterExpression: index.partialFilterExpression
      });
      logger.info(`✓ Created word index: ${index.name}`);
    } catch (error: any) {
      if (error.code === 85) { // Index already exists
        logger.info(`- Word index already exists: ${index.name}`);
      } else {
        logger.warn(`Failed to create word index ${index.name}:`, error.message);
      }
    }
  }
}

/**
 * Create indexes for progress tracking collections
 */
async function createProgressIndexes(db: any) {
  logger.info('Creating progress tracking indexes...');
  
  try {
    // Progress records indexes
    const progressCollection = db.collection('progressrecords');
    
    const progressIndexes = [
      {
        key: { userId: 1, routineId: 1, timestamp: -1 },
        name: 'user_routine_progress'
      },
      {
        key: { userId: 1, timestamp: -1 },
        name: 'user_progress_timeline'
      },
      {
        key: { routineId: 1, timestamp: -1 },
        name: 'routine_progress_timeline'
      }
    ];
    
    for (const index of progressIndexes) {
      try {
        await progressCollection.createIndex(index.key, { 
          name: index.name, 
          background: true 
        });
        logger.info(`✓ Created progress index: ${index.name}`);
      } catch (error: any) {
        if (error.code === 85) {
          logger.info(`- Progress index already exists: ${index.name}`);
        } else {
          logger.warn(`Failed to create progress index ${index.name}:`, error.message);
        }
      }
    }
    
    // Exercise sessions indexes
    const sessionsCollection = db.collection('exercisesessions');
    
    const sessionIndexes = [
      {
        key: { userId: 1, startTime: -1 },
        name: 'user_sessions_timeline'
      },
      {
        key: { userId: 1, routineId: 1, startTime: -1 },
        name: 'user_routine_sessions'
      },
      {
        key: { sessionId: 1 },
        name: 'session_id_lookup'
      }
    ];
    
    for (const index of sessionIndexes) {
      try {
        await sessionsCollection.createIndex(index.key, { 
          name: index.name, 
          background: true 
        });
        logger.info(`✓ Created session index: ${index.name}`);
      } catch (error: any) {
        if (error.code === 85) {
          logger.info(`- Session index already exists: ${index.name}`);
        } else {
          logger.warn(`Failed to create session index ${index.name}:`, error.message);
        }
      }
    }
    
  } catch (error) {
    logger.warn('Progress indexes creation warning:', error);
  }
}

/**
 * Create indexes for routine collections
 */
async function createRoutineIndexes(db: any) {
  logger.info('Creating routine indexes...');
  
  try {
    const routinesCollection = db.collection('routines');
    
    const routineIndexes = [
      {
        key: { createdBy: 1, isActive: 1 },
        name: 'user_active_routines'
      },
      {
        key: { assignedUsers: 1, isActive: 1 },
        name: 'assigned_active_routines'
      },
      {
        key: { gradeLevel: 1, isActive: 1 },
        name: 'grade_active_routines'
      },
      {
        key: { createdAt: -1 },
        name: 'routine_creation_timeline'
      }
    ];
    
    for (const index of routineIndexes) {
      try {
        await routinesCollection.createIndex(index.key, { 
          name: index.name, 
          background: true 
        });
        logger.info(`✓ Created routine index: ${index.name}`);
      } catch (error: any) {
        if (error.code === 85) {
          logger.info(`- Routine index already exists: ${index.name}`);
        } else {
          logger.warn(`Failed to create routine index ${index.name}:`, error.message);
        }
      }
    }
    
  } catch (error) {
    logger.warn('Routine indexes creation warning:', error);
  }
}

/**
 * Get information about created indexes
 */
async function getIndexInformation(db: any) {
  const collections = ['words', 'progressrecords', 'exercisesessions', 'routines'];
  const indexInfo: any = {};
  
  for (const collectionName of collections) {
    try {
      const collection = db.collection(collectionName);
      const indexes = await collection.listIndexes().toArray();
      
      indexInfo[collectionName] = {
        count: indexes.length,
        indexes: indexes.map((idx: any) => ({
          name: idx.name,
          keys: Object.keys(idx.key).join(', '),
          unique: idx.unique || false,
          background: idx.background || false
        }))
      };
    } catch (error) {
      indexInfo[collectionName] = { error: 'Collection not found or accessible' };
    }
  }
  
  return indexInfo;
}

// Run the script if called directly
if (require.main === module) {
  createOptimizedIndexes();
}

export { createOptimizedIndexes };