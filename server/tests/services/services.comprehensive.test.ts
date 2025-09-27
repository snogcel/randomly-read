import { WordServiceOptimized } from '../../src/services/WordServiceOptimized';
import { RoutineService } from '../../src/services/RoutineService';
import { ProgressService } from '../../src/services/ProgressService';
import { UserService } from '../../src/services/UserService';
import { CacheService } from '../../src/services/CacheService';
import { WordQueryPerformanceService } from '../../src/services/WordQueryPerformanceService';
import { createMockContext, getTestUser, getTestWord, getTestRoutine } from '../setup/testSetup';

describe('Business Services - Comprehensive Test Suite', () => {
  describe('WordServiceOptimized', () => {
    let wordService: WordServiceOptimized;

    beforeEach(() => {
      wordService = WordServiceOptimized.getInstance();
    });

    describe('Word Querying', () => {
      it('should query words with phonetic filters', async () => {
        const options = {
          vowel: ['AE', 'IY'],
          consonant: ['B', 'T'],
          position: 'initial' as const,
          syllables: [1, 2],
          limit: 20
        };

        const result = await wordService.queryWords(options);

        expect(result).toBeDefined();
        expect(result.words).toBeInstanceOf(Array);
        expect(result.totalCount).toBeGreaterThanOrEqual(0);
        expect(result.hasMore).toBeDefined();
        expect(result.queryStats).toBeDefined();
        expect(result.queryStats?.executionTimeMs).toBeGreaterThan(0);
      });

      it('should handle empty results gracefully', async () => {
        const options = {
          vowel: ['AE'],
          consonant: ['ZH'], // Rare consonant
          position: 'initial' as const,
          syllables: [1],
          limit: 10
        };

        const result = await wordService.queryWords(options);

        expect(result.words).toBeInstanceOf(Array);
        expect(result.totalCount).toBeGreaterThanOrEqual(0);
        expect(result.hasMore).toBe(false);
      });

      it('should validate phonetic filters', async () => {
        const options = {
          vowel: ['INVALID_VOWEL'],
          consonant: ['B'],
          limit: 10
        };

        const validation = wordService.validatePhoneticFilter(options);

        expect(validation.isValid).toBe(false);
        expect(validation.errors.length).toBeGreaterThan(0);
        expect(validation.errors[0]).toContain('Invalid vowel sounds');
      });

      it('should optimize filters for performance', async () => {
        const options = {
          vowel: ['AA', 'AE', 'AH', 'AO', 'AW', 'AY', 'EH', 'ER', 'EY', 'IH', 'IY', 'OW'], // Many vowels
          consonant: ['B', 'CH', 'D', 'DH', 'F', 'G', 'HH', 'JH', 'K', 'L', 'M', 'N', 'NG', 'P', 'R'], // Many consonants
          limit: 50
        };

        const result = await wordService.queryWords(options);

        expect(result).toBeDefined();
        expect(result.queryStats?.executionTimeMs).toBeLessThan(5000); // Should complete reasonably fast
      });

      it('should get random words', async () => {
        const options = {
          consonant: ['B'],
          syllables: [1],
          type: ['noun']
        };

        const word = await wordService.getRandomWord(options);

        if (word) {
          expect(word.consonant).toBe('B');
          expect(word.syllables).toBe(1);
          expect(word.type).toBe('noun');
        }
      });

      it('should get words by ID efficiently', async () => {
        const testWord = await getTestWord('apple');
        
        if (testWord) {
          const word = await wordService.getWordById(testWord._id.toString());
          
          expect(word).toBeDefined();
          expect(word?.lexeme).toBe('apple');
        }
      });

      it('should handle batch word queries', async () => {
        const queries = [
          {
            id: 'query1',
            options: { consonant: ['B'], syllables: [1], limit: 5 }
          },
          {
            id: 'query2',
            options: { vowel: ['AE'], syllables: [1], limit: 5 }
          },
          {
            id: 'query3',
            options: { position: 'initial' as const, syllables: [1], limit: 5 }
          }
        ];

        const results = await wordService.batchQueryWords(queries);

        expect(results.size).toBe(3);
        expect(results.has('query1')).toBe(true);
        expect(results.has('query2')).toBe(true);
        expect(results.has('query3')).toBe(true);
      });
    });

    describe('Word Interactions', () => {
      it('should handle word voting', async () => {
        const testWord = await getTestWord('apple');
        const testUser = await getTestUser('patient');
        
        if (testWord && testUser) {
          const originalScore = testWord.score;
          
          const updatedWord = await wordService.voteOnWord(
            testWord._id.toString(),
            testUser._id.toString(),
            1
          );
          
          expect(updatedWord.score).toBe(originalScore + 1);
        }
      });

      it('should increment word views', async () => {
        const testWord = await getTestWord('ball');
        
        if (testWord) {
          const originalViews = testWord.views;
          
          const updatedWord = await wordService.incrementWordViews(
            testWord._id.toString()
          );
          
          expect(updatedWord.views).toBe(originalViews + 1);
        }
      });
    });

    describe('Sentence Generation', () => {
      it('should get words for sentence generation', async () => {
        const options = {
          vowel: ['AE'],
          consonant: ['B'],
          syllables: [1],
          type: ['noun', 'adj'],
          limit: 20
        };

        const result = await wordService.getWordsForSentence(options);

        expect(result).toBeDefined();
        expect(result.nouns).toBeInstanceOf(Array);
        expect(result.adjectives).toBeInstanceOf(Array);
        expect(result.filteredNouns).toBeDefined();
        expect(result.filteredNouns.animal).toBeInstanceOf(Array);
        expect(result.filteredNouns.food).toBeInstanceOf(Array);
      });
    });

    describe('Performance Monitoring', () => {
      it('should provide real-time performance metrics', async () => {
        const metrics = wordService.getRealTimePerformanceMetrics();

        expect(metrics).toBeDefined();
        expect(metrics.currentQueries).toBeGreaterThanOrEqual(0);
        expect(metrics.averageResponseTime).toBeGreaterThanOrEqual(0);
        expect(metrics.cacheHitRate).toBeGreaterThanOrEqual(0);
        expect(metrics.memoryUsage).toBeGreaterThanOrEqual(0);
        expect(metrics.alertCount).toBeGreaterThanOrEqual(0);
      });

      it('should analyze query performance', async () => {
        const options = {
          vowel: ['AE'],
          consonant: ['B'],
          syllables: [1]
        };

        const analysis = await wordService.analyzeQueryPerformance(options);

        expect(analysis).toBeDefined();
        expect(analysis.recommendations).toBeInstanceOf(Array);
      });

      it('should suggest filter optimizations', async () => {
        const options = {
          vowel: ['AA', 'AE', 'AH', 'AO', 'AW', 'AY', 'EH', 'ER'], // Many vowels
          consonant: ['B', 'CH', 'D', 'DH', 'F', 'G', 'HH', 'JH'], // Many consonants
          limit: 100
        };

        const result = await wordService.queryWords(options);
        const suggestions = wordService.suggestFilterOptimizations(options, result.words);

        expect(suggestions).toBeInstanceOf(Array);
        if (suggestions.length > 0) {
          expect(suggestions[0]).toContain('performance');
        }
      });
    });

    describe('Caching and Prefetching', () => {
      it('should prefetch words for exercise sequences', async () => {
        const routineSteps = [
          {
            phoneticConfig: {
              vowels: ['AE'],
              consonants: ['B'],
              position: 'initial',
              syllables: [1],
              gradeLevel: 'K-2'
            },
            type: 'word_practice',
            duration: 300,
            repetitions: 10
          }
        ];

        await expect(wordService.prefetchWordsForExercise(routineSteps))
          .resolves.not.toThrow();
      });

      it('should warm up cache with common queries', async () => {
        await expect(wordService.warmUpCache()).resolves.not.toThrow();
      });

      it('should provide cache statistics', async () => {
        const stats = await wordService.getCombinedCacheStats();

        expect(stats).toBeDefined();
        expect(stats.redis).toBeDefined();
        expect(stats.memory).toBeDefined();
        expect(stats.dataLoader).toBeDefined();
      });

      it('should clear caches when needed', async () => {
        await expect(wordService.clearAllCaches()).resolves.not.toThrow();
      });
    });

    describe('Phonetic Validation', () => {
      it('should validate consonant/vowel combinations', async () => {
        const result = wordService.validatePhoneticCombination(['B', 'P'], ['AE', 'IY']);

        expect(result.isValid).toBe(true);
        expect(result.warnings).toBeInstanceOf(Array);
        expect(result.suggestions).toBeInstanceOf(Array);
      });

      it('should warn about difficult combinations', async () => {
        const result = wordService.validatePhoneticCombination(['ZH', 'TH'], ['OY', 'AW']);

        expect(result.isValid).toBe(true);
        expect(result.warnings.length).toBeGreaterThan(0);
        expect(result.suggestions.length).toBeGreaterThan(0);
      });
    });
  });

  describe('RoutineService', () => {
    let routineService: RoutineService;

    beforeEach(() => {
      routineService = RoutineService.getInstance();
    });

    describe('Routine Management', () => {
      it('should create new routine', async () => {
        const therapist = await getTestUser('therapist');
        const patient = await getTestUser('patient');
        
        if (therapist && patient) {
          const routineData = {
            name: 'Service Test Routine',
            description: 'Created by service test',
            gradeLevel: '3-5',
            subroutine: [
              {
                id: '1',
                type: 'word_practice',
                duration: 300,
                repetitions: 15,
                phoneticConfig: {
                  vowels: ['AE', 'IY'],
                  consonants: ['B', 'T'],
                  position: 'initial',
                  syllables: [1, 2],
                  gradeLevel: '3-5'
                }
              }
            ],
            assignedUsers: [patient._id.toString()]
          };

          const routine = await routineService.createRoutine(
            therapist._id.toString(),
            routineData
          );

          expect(routine).toBeDefined();
          expect(routine.name).toBe('Service Test Routine');
          expect(routine.subroutine).toHaveLength(1);
          expect(routine.assignedUsers).toHaveLength(1);
        }
      });

      it('should update existing routine', async () => {
        const testRoutine = await getTestRoutine('Beginner Easy Onset');
        const therapist = await getTestUser('therapist');
        
        if (testRoutine && therapist) {
          const updateData = {
            name: 'Updated Service Test Routine',
            description: 'Updated by service test',
            isActive: true
          };

          const updatedRoutine = await routineService.updateRoutine(
            testRoutine._id.toString(),
            therapist._id.toString(),
            updateData
          );

          expect(updatedRoutine.name).toBe('Updated Service Test Routine');
          expect(updatedRoutine.description).toBe('Updated by service test');
        }
      });

      it('should query routines with filters', async () => {
        const queryOptions = {
          isActive: true,
          gradeLevel: 'K-2',
          limit: 10,
          offset: 0
        };

        const result = await routineService.queryRoutines(queryOptions);

        expect(result).toBeDefined();
        expect(result.routines).toBeInstanceOf(Array);
        expect(result.totalCount).toBeGreaterThanOrEqual(0);
        expect(result.hasMore).toBeDefined();
      });

      it('should get user routines', async () => {
        const therapist = await getTestUser('therapist');
        
        if (therapist) {
          const routines = await routineService.getUserRoutines(
            therapist._id.toString()
          );

          expect(routines).toBeInstanceOf(Array);
        }
      });

      it('should assign routine to users', async () => {
        const testRoutine = await getTestRoutine('Beginner Easy Onset');
        const therapist = await getTestUser('therapist');
        const patient = await getTestUser('patient');
        
        if (testRoutine && therapist && patient) {
          await expect(routineService.assignRoutineToUsers(
            testRoutine._id.toString(),
            [patient._id.toString()],
            therapist._id.toString()
          )).resolves.not.toThrow();
        }
      });
    });

    describe('Default Routines', () => {
      it('should get default routines', async () => {
        const defaultRoutines = routineService.getDefaultRoutines();

        expect(defaultRoutines).toBeInstanceOf(Array);
      });

      it('should get default routine by ID', async () => {
        const defaultRoutines = routineService.getDefaultRoutines();
        
        if (defaultRoutines.length > 0) {
          const routine = routineService.getDefaultRoutineById(defaultRoutines[0].id);
          
          expect(routine).toBeDefined();
          expect(routine?.name).toBeDefined();
        }
      });

      it('should create routine from default', async () => {
        const therapist = await getTestUser('therapist');
        const defaultRoutines = routineService.getDefaultRoutines();
        
        if (therapist && defaultRoutines.length > 0) {
          const routine = await routineService.createRoutineFromDefault(
            therapist._id.toString(),
            defaultRoutines[0].id
          );

          expect(routine).toBeDefined();
          expect(routine.name).toContain(defaultRoutines[0].name);
        }
      });

      it('should get recommended routine', async () => {
        const recommendation = routineService.getRecommendedRoutine('beginner');

        expect(recommendation).toBeDefined();
        expect(recommendation?.difficulty).toBe('beginner');
      });
    });
  });

  describe('ProgressService', () => {
    let progressService: ProgressService;

    beforeEach(() => {
      progressService = ProgressService.getInstance();
    });

    describe('Exercise Session Management', () => {
      it('should create exercise session', async () => {
        const patient = await getTestUser('patient');
        const routine = await getTestRoutine('Beginner Easy Onset');
        
        if (patient && routine) {
          const sessionData = {
            routineId: routine._id.toString(),
            sessionId: `service_test_${Date.now()}`,
            totalWords: 20,
            notes: 'Service test session'
          };

          const session = await progressService.createExerciseSession(
            patient._id.toString(),
            sessionData
          );

          expect(session).toBeDefined();
          expect(session.routineId.toString()).toBe(routine._id.toString());
          expect(session.totalWords).toBe(20);
          expect(session.completedWords).toBe(0);
        }
      });

      it('should update exercise session', async () => {
        const patient = await getTestUser('patient');
        const routine = await getTestRoutine('Beginner Easy Onset');
        
        if (patient && routine) {
          // Create session first
          const sessionData = {
            routineId: routine._id.toString(),
            sessionId: `update_test_${Date.now()}`,
            totalWords: 15
          };

          const session = await progressService.createExerciseSession(
            patient._id.toString(),
            sessionData
          );

          // Update session
          const updateData = {
            endTime: new Date(),
            notes: 'Updated by service test',
            wordsAttempted: [
              {
                wordId: 'test_word_id',
                word: 'test',
                accuracy: 90,
                timeSpent: 2000,
                difficulty: 2,
                position: 'initial',
                consonant: 'T',
                vowel: 'EH'
              }
            ]
          };

          const updatedSession = await progressService.updateExerciseSession(
            session.id,
            patient._id.toString(),
            updateData
          );

          expect(updatedSession.endTime).toBeDefined();
          expect(updatedSession.notes).toBe('Updated by service test');
          expect(updatedSession.wordsAttempted).toHaveLength(1);
        }
      });

      it('should add word attempts to session', async () => {
        const patient = await getTestUser('patient');
        const routine = await getTestRoutine('Beginner Easy Onset');
        const word = await getTestWord('apple');
        
        if (patient && routine && word) {
          // Create session
          const sessionData = {
            routineId: routine._id.toString(),
            sessionId: `attempt_test_${Date.now()}`,
            totalWords: 10
          };

          const session = await progressService.createExerciseSession(
            patient._id.toString(),
            sessionData
          );

          // Add word attempt
          const attempt = {
            wordId: word._id.toString(),
            word: word.lexeme,
            accuracy: 85,
            timeSpent: 3000,
            difficulty: 2,
            position: word.position,
            consonant: word.consonant,
            vowel: word.vowel
          };

          const updatedSession = await progressService.addWordAttempt(
            session.id,
            patient._id.toString(),
            attempt
          );

          expect(updatedSession.wordsAttempted).toHaveLength(1);
          expect(updatedSession.completedWords).toBe(1);
          expect(updatedSession.wordsAttempted[0].accuracy).toBe(85);
        }
      });

      it('should complete exercise session', async () => {
        const patient = await getTestUser('patient');
        const routine = await getTestRoutine('Beginner Easy Onset');
        
        if (patient && routine) {
          // Create session
          const sessionData = {
            routineId: routine._id.toString(),
            sessionId: `complete_test_${Date.now()}`,
            totalWords: 5
          };

          const session = await progressService.createExerciseSession(
            patient._id.toString(),
            sessionData
          );

          // Complete session
          const completedSession = await progressService.completeExerciseSession(
            session.id,
            patient._id.toString()
          );

          expect(completedSession.endTime).toBeDefined();
          expect(completedSession.completionRate).toBeGreaterThanOrEqual(0);
        }
      });
    });

    describe('Progress Analytics', () => {
      it('should get exercise sessions for user', async () => {
        const patient = await getTestUser('patient');
        
        if (patient) {
          const sessions = await progressService.getExerciseSessions(
            patient._id.toString(),
            { limit: 10, offset: 0 }
          );

          expect(sessions).toBeInstanceOf(Array);
        }
      });

      it('should get progress records', async () => {
        const patient = await getTestUser('patient');
        const routine = await getTestRoutine('Beginner Easy Onset');
        
        if (patient && routine) {
          const records = await progressService.getProgressRecords(
            patient._id.toString(),
            {
              routineId: routine._id.toString(),
              startDate: new Date('2024-01-01'),
              endDate: new Date('2024-12-31')
            }
          );

          expect(records).toBeInstanceOf(Array);
        }
      });

      it('should generate fluency report', async () => {
        const patient = await getTestUser('patient');
        const routine = await getTestRoutine('Beginner Easy Onset');
        
        if (patient && routine) {
          const report = await progressService.generateFluencyReport(
            patient._id.toString(),
            routine._id.toString(),
            new Date('2024-01-01'),
            new Date('2024-01-31')
          );

          expect(report).toBeDefined();
          expect(report.userId.toString()).toBe(patient._id.toString());
          expect(report.routineId.toString()).toBe(routine._id.toString());
          expect(report.dateRange).toBeDefined();
          expect(report.recommendations).toBeInstanceOf(Array);
        }
      });
    });
  });

  describe('UserService', () => {
    let userService: UserService;

    beforeEach(() => {
      userService = UserService.getInstance();
    });

    describe('User Management', () => {
      it('should get users with pagination', async () => {
        const users = await userService.getUsers({ limit: 10, offset: 0 });

        expect(users).toBeInstanceOf(Array);
        expect(users.length).toBeLessThanOrEqual(10);
      });

      it('should get user by ID', async () => {
        const testUser = await getTestUser('therapist');
        
        if (testUser) {
          const user = await userService.getUserById(testUser._id.toString());
          
          expect(user).toBeDefined();
          expect(user?.username).toBe(testUser.username);
        }
      });

      it('should update user profile', async () => {
        const testUser = await getTestUser('patient');
        
        if (testUser) {
          const updateData = {
            firstName: 'Updated',
            lastName: 'Name',
            email: 'updated@example.com'
          };

          const updatedUser = await userService.updateUser(
            testUser._id.toString(),
            updateData
          );

          expect(updatedUser.firstName).toBe('Updated');
          expect(updatedUser.lastName).toBe('Name');
          expect(updatedUser.email).toBe('updated@example.com');
        }
      });
    });
  });

  describe('CacheService', () => {
    let cacheService: CacheService;

    beforeEach(() => {
      cacheService = CacheService.getInstance();
    });

    describe('Cache Operations', () => {
      it('should check cache availability', () => {
        const isAvailable = cacheService.isAvailable();
        expect(typeof isAvailable).toBe('boolean');
      });

      it('should cache and retrieve word queries', async () => {
        if (cacheService.isAvailable()) {
          const options = {
            vowel: ['AE'],
            consonant: ['B'],
            syllables: [1]
          };

          const result = {
            words: [{ id: '1', lexeme: 'test' }],
            totalCount: 1,
            hasMore: false
          };

          await cacheService.cacheWordQuery(options, result);
          const cached = await cacheService.getCachedWordQuery(options);

          expect(cached).toBeDefined();
          if (cached) {
            expect(cached.words).toHaveLength(1);
            expect(cached.totalCount).toBe(1);
          }
        }
      });

      it('should provide cache statistics', async () => {
        const stats = await cacheService.getStats();

        expect(stats).toBeDefined();
        expect(stats.hits).toBeGreaterThanOrEqual(0);
        expect(stats.misses).toBeGreaterThanOrEqual(0);
        expect(stats.hitRate).toBeGreaterThanOrEqual(0);
      });

      it('should clear cache', async () => {
        if (cacheService.isAvailable()) {
          await expect(cacheService.clearAll()).resolves.not.toThrow();
        }
      });
    });

    describe('Prefetching', () => {
      it('should prefetch words for exercise', async () => {
        const routineSteps = [
          {
            phoneticConfig: {
              vowels: ['AE'],
              consonants: ['B'],
              position: 'initial',
              syllables: [1],
              gradeLevel: 'K-2'
            },
            type: 'word_practice',
            duration: 300,
            repetitions: 10
          }
        ];

        if (cacheService.isAvailable()) {
          await expect(cacheService.prefetchWordsForExercise(routineSteps))
            .resolves.not.toThrow();
        }
      });

      it('should warm up cache with common queries', async () => {
        const commonQueries = [
          { vowel: ['AE'], syllables: [1], limit: 10 },
          { consonant: ['B'], syllables: [1], limit: 10 }
        ];

        if (cacheService.isAvailable()) {
          await expect(cacheService.warmUpCache(commonQueries))
            .resolves.not.toThrow();
        }
      });
    });
  });

  describe('WordQueryPerformanceService', () => {
    let performanceService: WordQueryPerformanceService;

    beforeEach(() => {
      performanceService = WordQueryPerformanceService.getInstance();
    });

    describe('Performance Monitoring', () => {
      it('should record query metrics', () => {
        const queryId = 'test_query_123';
        const filter = { consonant: 'B', vowel: 'AE' };
        
        expect(() => {
          performanceService.recordQueryMetrics(
            queryId,
            filter,
            150, // execution time
            10,  // docs examined
            5,   // docs returned
            'phonetic_search_primary',
            false // cache hit
          );
        }).not.toThrow();
      });

      it('should provide real-time metrics', () => {
        const metrics = performanceService.getRealTimeMetrics();

        expect(metrics).toBeDefined();
        expect(metrics.currentQueries).toBeGreaterThanOrEqual(0);
        expect(metrics.averageResponseTime).toBeGreaterThanOrEqual(0);
        expect(metrics.cacheHitRate).toBeGreaterThanOrEqual(0);
        expect(metrics.memoryUsage).toBeGreaterThanOrEqual(0);
        expect(metrics.alertCount).toBeGreaterThanOrEqual(0);
      });

      it('should generate performance reports', () => {
        const report = performanceService.generatePerformanceReport(24);

        expect(report).toBeDefined();
        expect(report.period).toBeDefined();
        expect(report.totalQueries).toBeGreaterThanOrEqual(0);
        expect(report.averageExecutionTime).toBeGreaterThanOrEqual(0);
        expect(report.recommendations).toBeInstanceOf(Array);
      });

      it('should monitor queries with wrapper', async () => {
        const queryId = 'monitor_test_123';
        const filter = { consonant: 'B' };
        
        const mockQueryFunction = jest.fn().mockResolvedValue(['result1', 'result2']);

        const result = await performanceService.monitorQuery(
          queryId,
          filter,
          mockQueryFunction
        );

        expect(mockQueryFunction).toHaveBeenCalled();
        expect(result).toEqual(['result1', 'result2']);
      });

      it('should get current alerts', () => {
        const alerts = performanceService.getCurrentAlerts();

        expect(alerts).toBeInstanceOf(Array);
      });

      it('should clear metrics', () => {
        expect(() => performanceService.clearAll()).not.toThrow();
      });
    });
  });

  describe('Service Integration', () => {
    it('should handle service interdependencies', async () => {
      const wordService = WordServiceOptimized.getInstance();
      const routineService = RoutineService.getInstance();
      const progressService = ProgressService.getInstance();
      
      // Test that services can work together
      const therapist = await getTestUser('therapist');
      const patient = await getTestUser('patient');
      
      if (therapist && patient) {
        // Create routine
        const routineData = {
          name: 'Integration Test Routine',
          subroutine: [
            {
              id: '1',
              type: 'word_practice',
              duration: 300,
              repetitions: 10,
              phoneticConfig: {
                vowels: ['AE'],
                consonants: ['B'],
                position: 'initial',
                syllables: [1],
                gradeLevel: 'K-2'
              }
            }
          ],
          assignedUsers: [patient._id.toString()]
        };

        const routine = await routineService.createRoutine(
          therapist._id.toString(),
          routineData
        );

        // Create exercise session
        const sessionData = {
          routineId: routine.id,
          sessionId: `integration_${Date.now()}`,
          totalWords: 10
        };

        const session = await progressService.createExerciseSession(
          patient._id.toString(),
          sessionData
        );

        // Query words for the session
        const wordOptions = {
          vowel: ['AE'],
          consonant: ['B'],
          syllables: [1],
          limit: 10
        };

        const words = await wordService.queryWords(wordOptions);

        expect(routine).toBeDefined();
        expect(session).toBeDefined();
        expect(words.words).toBeInstanceOf(Array);
      }
    });

    it('should handle service errors gracefully', async () => {
      const wordService = WordServiceOptimized.getInstance();
      
      // Test with invalid parameters
      const invalidOptions = {
        vowel: ['INVALID'],
        consonant: ['INVALID'],
        limit: -1
      };

      await expect(wordService.queryWords(invalidOptions))
        .rejects.toThrow();
    });

    it('should maintain performance under load', async () => {
      const wordService = WordServiceOptimized.getInstance();
      
      const queries = Array(10).fill(null).map((_, i) => {
        return wordService.queryWords({
          consonant: [String.fromCharCode(65 + i)], // A, B, C, etc.
          syllables: [1],
          limit: 5
        });
      });

      const startTime = Date.now();
      const results = await Promise.all(queries);
      const executionTime = Date.now() - startTime;

      expect(results).toHaveLength(10);
      expect(executionTime).toBeLessThan(5000); // Should complete within 5 seconds
      
      results.forEach(result => {
        expect(result.words).toBeInstanceOf(Array);
      });
    });
  });
});