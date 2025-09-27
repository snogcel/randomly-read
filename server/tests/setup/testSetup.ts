import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createClient } from 'redis';
import { config } from '../../src/config';
import { logger } from '../../src/utils/logger';

// Global test setup for the Easy Onset speech therapy platform
export class TestEnvironment {
  private static instance: TestEnvironment;
  private mongoServer: MongoMemoryServer | null = null;
  private redisClient: any = null;
  private isSetup = false;

  public static getInstance(): TestEnvironment {
    if (!TestEnvironment.instance) {
      TestEnvironment.instance = new TestEnvironment();
    }
    return TestEnvironment.instance;
  }

  /**
   * Setup test environment with in-memory databases
   */
  async setup(): Promise<void> {
    if (this.isSetup) {
      return;
    }

    try {
      // Setup in-memory MongoDB
      await this.setupMongoDB();
      
      // Setup in-memory Redis
      await this.setupRedis();
      
      // Seed test data
      await this.seedTestData();
      
      this.isSetup = true;
      logger.info('Test environment setup completed');
    } catch (error) {
      logger.error('Failed to setup test environment:', error);
      throw error;
    }
  }

  /**
   * Setup in-memory MongoDB for testing
   */
  private async setupMongoDB(): Promise<void> {
    this.mongoServer = await MongoMemoryServer.create({
      instance: {
        dbName: 'easy_onset_test',
        port: 27017
      }
    });

    const mongoUri = this.mongoServer.getUri();
    
    await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
    });

    logger.info('In-memory MongoDB connected for testing');
  }

  /**
   * Setup in-memory Redis for testing
   */
  private async setupRedis(): Promise<void> {
    // Use redis-memory-server or mock Redis for testing
    this.redisClient = createClient({
      socket: {
        host: 'localhost',
        port: 6380 // Different port for testing
      }
    });

    // Mock Redis if real Redis not available
    if (!this.redisClient.isOpen) {
      this.redisClient = {
        connect: jest.fn(),
        disconnect: jest.fn(),
        get: jest.fn(),
        set: jest.fn(),
        setEx: jest.fn(),
        del: jest.fn(),
        exists: jest.fn(),
        keys: jest.fn(),
        flushDb: jest.fn(),
        info: jest.fn().mockResolvedValue('used_memory:1024'),
        dbSize: jest.fn().mockResolvedValue(0),
        isOpen: true
      };
    }

    logger.info('Redis mock setup for testing');
  }

  /**
   * Seed test data for speech therapy platform
   */
  private async seedTestData(): Promise<void> {
    const { User } = await import('../../src/models/User');
    const { Word } = await import('../../src/models/Word');
    const { Routine } = await import('../../src/models/Routine');

    // Create test users
    const testUsers = [
      {
        username: 'therapist1',
        email: 'therapist1@test.com',
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: 'therapist',
        isActive: true
      },
      {
        username: 'patient1',
        email: 'patient1@test.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'patient',
        isActive: true,
        age: 8
      },
      {
        username: 'admin1',
        email: 'admin1@test.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        isActive: true
      }
    ];

    await User.insertMany(testUsers);

    // Create test words for phonetic exercises
    const testWords = [
      {
        cmudict_id: 1,
        wordid: 1,
        lexeme: 'apple',
        consonant: 'P',
        vowel: 'AE',
        type: 'noun',
        subtype: 'food',
        stress: 1,
        syllables: 2,
        position: 'medial',
        age_of_acquisition: 3,
        score: 10,
        votes: [],
        views: 5,
        wordsXsensesXsynsets: [{
          synsetid: 1,
          wordid: 1,
          lemma: 'apple',
          casedwordid: 1,
          senseid: 1,
          sensenum: 1,
          lexid: 1,
          tagcount: 10,
          sensekey: 'apple%1:13:00::',
          pos: 'n',
          lexdomainid: 13,
          definition: 'fruit with red or yellow or green skin'
        }]
      },
      {
        cmudict_id: 2,
        wordid: 2,
        lexeme: 'ball',
        consonant: 'B',
        vowel: 'AO',
        type: 'noun',
        subtype: 'artifact',
        stress: 1,
        syllables: 1,
        position: 'initial',
        age_of_acquisition: 2,
        score: 15,
        votes: [],
        views: 8,
        wordsXsensesXsynsets: [{
          synsetid: 2,
          wordid: 2,
          lemma: 'ball',
          casedwordid: 2,
          senseid: 2,
          sensenum: 1,
          lexid: 2,
          tagcount: 15,
          sensekey: 'ball%1:06:00::',
          pos: 'n',
          lexdomainid: 6,
          definition: 'round object that is hit or thrown in games'
        }]
      },
      {
        cmudict_id: 3,
        wordid: 3,
        lexeme: 'cat',
        consonant: 'K',
        vowel: 'AE',
        type: 'noun',
        subtype: 'animal',
        stress: 1,
        syllables: 1,
        position: 'initial',
        age_of_acquisition: 2,
        score: 20,
        votes: [],
        views: 12,
        wordsXsensesXsynsets: [{
          synsetid: 3,
          wordid: 3,
          lemma: 'cat',
          casedwordid: 3,
          senseid: 3,
          sensenum: 1,
          lexid: 3,
          tagcount: 20,
          sensekey: 'cat%1:05:00::',
          pos: 'n',
          lexdomainid: 5,
          definition: 'feline mammal usually having thick soft fur'
        }]
      }
    ];

    await Word.insertMany(testWords);

    // Create test routines for Easy Onset therapy
    const therapist = await User.findOne({ username: 'therapist1' });
    const patient = await User.findOne({ username: 'patient1' });

    const testRoutines = [
      {
        name: 'Beginner Easy Onset',
        description: 'Basic Easy Onset exercises for beginners',
        gradeLevel: 'K-2',
        createdBy: therapist!._id,
        assignedUsers: [patient!._id],
        isActive: true,
        subroutine: [
          {
            id: '1',
            type: 'word_practice',
            duration: 300, // 5 minutes
            repetitions: 10,
            phoneticConfig: {
              vowels: ['AE', 'IY'],
              consonants: ['B', 'P'],
              position: 'initial',
              syllables: [1],
              gradeLevel: 'K-2'
            }
          },
          {
            id: '2',
            type: 'sentence_practice',
            duration: 600, // 10 minutes
            repetitions: 5,
            phoneticConfig: {
              vowels: ['AE'],
              consonants: ['B'],
              position: 'initial',
              syllables: [1, 2],
              gradeLevel: 'K-2'
            },
            intermissionText: 'Take a deep breath and relax your throat'
          }
        ]
      },
      {
        name: 'Intermediate Vowel Focus',
        description: 'Intermediate exercises focusing on vowel sounds',
        gradeLevel: '3-5',
        createdBy: therapist!._id,
        assignedUsers: [patient!._id],
        isActive: true,
        subroutine: [
          {
            id: '1',
            type: 'word_practice',
            duration: 450, // 7.5 minutes
            repetitions: 15,
            phoneticConfig: {
              vowels: ['AE', 'IY', 'AH'],
              consonants: ['B', 'T', 'K'],
              position: 'initial',
              syllables: [1, 2],
              gradeLevel: '3-5'
            }
          }
        ]
      }
    ];

    await Routine.insertMany(testRoutines);

    logger.info('Test data seeded successfully');
  }

  /**
   * Cleanup test environment
   */
  async cleanup(): Promise<void> {
    try {
      // Disconnect from MongoDB
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
      }

      // Stop MongoDB server
      if (this.mongoServer) {
        await this.mongoServer.stop();
        this.mongoServer = null;
      }

      // Disconnect Redis
      if (this.redisClient && this.redisClient.disconnect) {
        await this.redisClient.disconnect();
        this.redisClient = null;
      }

      this.isSetup = false;
      logger.info('Test environment cleaned up');
    } catch (error) {
      logger.error('Failed to cleanup test environment:', error);
      throw error;
    }
  }

  /**
   * Reset test data between tests
   */
  async resetData(): Promise<void> {
    try {
      // Clear all collections
      const collections = mongoose.connection.collections;
      
      for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
      }

      // Clear Redis cache
      if (this.redisClient && this.redisClient.flushDb) {
        await this.redisClient.flushDb();
      }

      // Re-seed test data
      await this.seedTestData();
      
      logger.debug('Test data reset completed');
    } catch (error) {
      logger.error('Failed to reset test data:', error);
      throw error;
    }
  }

  /**
   * Get test database connections
   */
  getConnections() {
    return {
      mongoose: mongoose.connection,
      redis: this.redisClient,
      mongoServer: this.mongoServer
    };
  }
}

// Global test setup and teardown
beforeAll(async () => {
  const testEnv = TestEnvironment.getInstance();
  await testEnv.setup();
}, 30000); // 30 second timeout for setup

afterAll(async () => {
  const testEnv = TestEnvironment.getInstance();
  await testEnv.cleanup();
}, 10000); // 10 second timeout for cleanup

beforeEach(async () => {
  // Reset data before each test to ensure isolation
  const testEnv = TestEnvironment.getInstance();
  await testEnv.resetData();
});

// Export test utilities
export const getTestUser = async (role: 'therapist' | 'patient' | 'admin' = 'patient') => {
  const { User } = await import('../../src/models/User');
  const roleMap = {
    therapist: 'therapist1',
    patient: 'patient1',
    admin: 'admin1'
  };
  return await User.findOne({ username: roleMap[role] });
};

export const getTestWord = async (lexeme: string = 'apple') => {
  const { Word } = await import('../../src/models/Word');
  return await Word.findOne({ lexeme });
};

export const getTestRoutine = async (name: string = 'Beginner Easy Onset') => {
  const { Routine } = await import('../../src/models/Routine');
  return await Routine.findOne({ name });
};

export const createMockContext = async (userRole: 'therapist' | 'patient' | 'admin' = 'patient') => {
  const user = await getTestUser(userRole);
  return {
    user,
    req: {
      headers: {
        authorization: `Bearer mock-jwt-token-${userRole}`
      }
    },
    res: {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
  };
};

// Jest configuration helpers
export const jestConfig = {
  testEnvironment: 'node',
  setupFilesAfterEnv: [__filename],
  testTimeout: 10000,
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.d.ts',
    '!src/tests/**',
    '!src/scripts/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};