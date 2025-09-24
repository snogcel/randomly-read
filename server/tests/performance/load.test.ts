import { WordService } from '../../src/services/WordService';
import { RoutineService } from '../../src/services/RoutineService';
import { UserService } from '../../src/services/UserService';
import { Word } from '../../src/models/Word';
import { User } from '../../src/models/User';
import { Routine } from '../../src/models/Routine';
import { createTestUser, createTestWord, createTestRoutine } from '../helpers/testData';
import { createUserInDB, createWordInDB, createRoutineInDB } from '../helpers/testUtils';

describe('Performance Tests', () => {
  let wordService: WordService;
  let routineService: RoutineService;
  let userService: UserService;

  beforeEach(() => {
    wordService = WordService.getInstance();
    routineService = RoutineService.getInstance();
    userService = UserService.getInstance();
  });

  describe('Word Query Performance', () => {
    beforeEach(async () => {
      // Create a large dataset of words for performance testing
      const words = [];
      const consonants = ['B', 'D', 'F', 'G', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T'];
      const vowels = ['AA', 'AE', 'AH', 'AO', 'EH', 'IH', 'IY', 'OW', 'UH', 'UW'];
      const positions = ['initial', 'medial', 'final'];
      const types = ['noun', 'verb', 'adj', 'adv'];

      for (let i = 0; i < 1000; i++) {
        words.push(createTestWord({
          cmudict_id: i + 1,
          lexeme: `word${i}`,
          consonant: consonants[i % consonants.length],
          vowel: vowels[i % vowels.length],
          position: positions[i % positions.length] as any,
          type: types[i % types.length],
          syllables: (i % 5) + 1
        }));
      }

      await Word.insertMany(words);
    });

    it('should query words efficiently with filters', async () => {
      const startTime = Date.now();

      const result = await wordService.queryWords({
        consonant: ['B', 'D'],
        vowel: ['AA', 'AE'],
        syllables: [1, 2],
        limit: 50
      });

      const queryTime = Date.now() - startTime;

      expect(queryTime).toBeLessThan(500); // Should complete within 500ms
      expect(result.words.length).toBeGreaterThan(0);
      expect(result.words.length).toBeLessThanOrEqual(50);
    });

    it('should handle concurrent word queries', async () => {
      const queries = Array(20).fill(null).map(() =>
        wordService.queryWords({
          consonant: ['B'],
          limit: 10
        })
      );

      const startTime = Date.now();
      const results = await Promise.all(queries);
      const totalTime = Date.now() - startTime;

      expect(totalTime).toBeLessThan(2000); // All queries within 2 seconds
      expect(results).toHaveLength(20);
      results.forEach(result => {
        expect(result.words.length).toBeGreaterThan(0);
      });
    });

    it('should perform random word selection efficiently', async () => {
      const selections = [];
      const startTime = Date.now();

      for (let i = 0; i < 100; i++) {
        const word = await wordService.getRandomWord({
          syllables: [1, 2]
        });
        selections.push(word);
      }

      const totalTime = Date.now() - startTime;

      expect(totalTime).toBeLessThan(3000); // 100 selections within 3 seconds
      expect(selections.filter(w => w !== null)).toHaveLength(100);
    });

    it('should handle complex phonetic filters efficiently', async () => {
      const startTime = Date.now();

      const result = await wordService.queryWords({
        consonant: ['B', 'D', 'F', 'G'],
        vowel: ['AA', 'AE', 'AH'],
        position: 'initial',
        syllables: [1, 2, 3],
        type: ['noun', 'verb'],
        age: '10',
        limit: 100
      });

      const queryTime = Date.now() - startTime;

      expect(queryTime).toBeLessThan(1000); // Complex query within 1 second
      expect(result.words).toBeDefined();
    });
  });

  describe('User Service Performance', () => {
    beforeEach(async () => {
      // Create multiple users for testing
      const users = [];
      for (let i = 0; i < 500; i++) {
        users.push(createTestUser({
          username: `user${i}`,
          email: `user${i}@example.com`,
          firstName: `User${i}`,
          admin: i % 10 === 0 // Every 10th user is admin
        }));
      }

      await User.insertMany(users);
    });

    it('should query users efficiently with pagination', async () => {
      const startTime = Date.now();

      const result = await userService.getUsers({
        limit: 50,
        offset: 0,
        sortBy: 'username',
        sortOrder: 'asc'
      });

      const queryTime = Date.now() - startTime;

      expect(queryTime).toBeLessThan(300); // Should complete within 300ms
      expect(result.users).toHaveLength(50);
      expect(result.totalCount).toBeGreaterThan(500);
    });

    it('should handle user authentication efficiently', async () => {
      const testUser = await createUserInDB({
        username: 'perftest',
        password: 'password123'
      });

      const logins = Array(50).fill(null).map(() =>
        userService.login({
          username: 'perftest',
          password: 'password123'
        })
      );

      const startTime = Date.now();
      const results = await Promise.all(logins);
      const totalTime = Date.now() - startTime;

      expect(totalTime).toBeLessThan(5000); // 50 logins within 5 seconds
      expect(results).toHaveLength(50);
      results.forEach(result => {
        expect(result.user).toBeDefined();
        expect(result.token).toBeDefined();
      });
    });

    it('should filter users efficiently', async () => {
      const startTime = Date.now();

      const adminUsers = await userService.getUsers({
        admin: true,
        limit: 100
      });

      const queryTime = Date.now() - startTime;

      expect(queryTime).toBeLessThan(200); // Filter query within 200ms
      expect(adminUsers.users.length).toBeGreaterThan(0);
      adminUsers.users.forEach(user => {
        expect(user.admin).toBe(true);
      });
    });
  });

  describe('Routine Service Performance', () => {
    let testUser: any;

    beforeEach(async () => {
      testUser = await createUserInDB();

      // Create multiple routines
      const routines = [];
      for (let i = 0; i < 200; i++) {
        routines.push(createTestRoutine(testUser._id, {
          name: `Routine ${i}`,
          description: `Test routine ${i} for performance testing`
        }));
      }

      await Routine.insertMany(routines);
    });

    it('should query routines efficiently', async () => {
      const startTime = Date.now();

      const result = await routineService.queryRoutines({
        createdBy: testUser._id.toString(),
        limit: 50,
        sortBy: 'name'
      });

      const queryTime = Date.now() - startTime;

      expect(queryTime).toBeLessThan(300); // Should complete within 300ms
      expect(result.routines.length).toBeLessThanOrEqual(50);
      expect(result.totalCount).toBeGreaterThan(100);
    });

    it('should handle routine creation efficiently', async () => {
      const routineData = createTestRoutine(testUser._id, {
        name: 'Performance Test Routine'
      });

      const creations = Array(20).fill(null).map((_, i) =>
        routineService.createRoutine(testUser._id.toString(), {
          ...routineData,
          name: `Bulk Routine ${i}`
        })
      );

      const startTime = Date.now();
      const results = await Promise.all(creations);
      const totalTime = Date.now() - startTime;

      expect(totalTime).toBeLessThan(2000); // 20 creations within 2 seconds
      expect(results).toHaveLength(20);
      results.forEach(routine => {
        expect(routine._id).toBeDefined();
        expect(routine.name).toContain('Bulk Routine');
      });
    });

    it('should validate routine configurations efficiently', async () => {
      const complexRoutine = {
        name: 'Complex Routine',
        subroutine: Array(30).fill(null).map((_, i) => ({
          id: `step-${i}`,
          type: i % 3 === 0 ? 'intermission' : 'word',
          duration: 30,
          repetitions: 5,
          phoneticConfig: i % 3 !== 0 ? {
            vowels: ['AA', 'AE'],
            consonants: ['B', 'D'],
            position: 'initial',
            syllables: [1, 2],
            gradeLevel: 'K'
          } : undefined,
          intermissionText: i % 3 === 0 ? 'Take a break' : undefined
        }))
      };

      const startTime = Date.now();

      const routine = await routineService.createRoutine(
        testUser._id.toString(),
        complexRoutine as any
      );

      const creationTime = Date.now() - startTime;

      expect(creationTime).toBeLessThan(500); // Complex routine within 500ms
      expect(routine.subroutine).toHaveLength(30);
    });
  });

  describe('Memory Usage', () => {
    it('should not leak memory during repeated operations', async () => {
      const initialMemory = process.memoryUsage().heapUsed;

      // Perform many operations
      for (let i = 0; i < 100; i++) {
        await wordService.queryWords({
          consonant: ['B'],
          limit: 10
        });

        const user = await createUserInDB({
          username: `memtest${i}`
        });

        await routineService.createRoutine(user._id.toString(), createTestRoutine(user._id));
      }

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;

      // Memory increase should be reasonable (less than 50MB)
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
    });

    it('should handle large result sets efficiently', async () => {
      const startMemory = process.memoryUsage().heapUsed;

      // Query large dataset
      const result = await wordService.queryWords({
        limit: 1000 // Large limit
      });

      const endMemory = process.memoryUsage().heapUsed;
      const memoryUsed = endMemory - startMemory;

      expect(result.words.length).toBeLessThanOrEqual(1000);
      // Memory usage should be reasonable for the dataset size
      expect(memoryUsed).toBeLessThan(20 * 1024 * 1024); // Less than 20MB
    });
  });

  describe('Database Connection Performance', () => {
    it('should handle connection pooling efficiently', async () => {
      // Simulate concurrent database operations
      const operations = [];

      for (let i = 0; i < 50; i++) {
        operations.push(
          Word.findOne({ consonant: 'B' }),
          User.findOne({ username: { $exists: true } }),
          Routine.findOne({ isActive: true })
        );
      }

      const startTime = Date.now();
      await Promise.all(operations);
      const totalTime = Date.now() - startTime;

      expect(totalTime).toBeLessThan(3000); // All operations within 3 seconds
    });

    it('should handle database indexes efficiently', async () => {
      // Test that indexes are being used for common queries
      const startTime = Date.now();

      await Promise.all([
        Word.find({ consonant: 'B', vowel: 'AA' }).limit(10),
        User.find({ username: 'user1' }),
        Routine.find({ createdBy: testUser?._id }).limit(10)
      ]);

      const queryTime = Date.now() - startTime;

      expect(queryTime).toBeLessThan(100); // Indexed queries should be very fast
    });
  });
});