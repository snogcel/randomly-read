import { resolvers } from '../../src/graphql/resolvers';
import { WordServiceOptimized } from '../../src/services/WordServiceOptimized';
import { RoutineService } from '../../src/services/RoutineService';
import { ProgressService } from '../../src/services/ProgressService';
import { UserService } from '../../src/services/UserService';
import { createMockContext, getTestUser, getTestWord, getTestRoutine } from '../setup/testSetup';
import { UserInputError, AuthenticationError, ForbiddenError } from 'apollo-server-express';

// Mock services
jest.mock('../../src/services/WordServiceOptimized');
jest.mock('../../src/services/RoutineService');
jest.mock('../../src/services/ProgressService');
jest.mock('../../src/services/UserService');

const MockedWordService = WordServiceOptimized as jest.Mocked<typeof WordServiceOptimized>;
const MockedRoutineService = RoutineService as jest.Mocked<typeof RoutineService>;
const MockedProgressService = ProgressService as jest.Mocked<typeof ProgressService>;
const MockedUserService = UserService as jest.Mocked<typeof UserService>;

describe('GraphQL Resolvers - Comprehensive Test Suite', () => {
  let mockWordService: any;
  let mockRoutineService: any;
  let mockProgressService: any;
  let mockUserService: any;

  beforeEach(() => {
    // Setup service mocks
    mockWordService = {
      queryWords: jest.fn(),
      getWordById: jest.fn(),
      getRandomWord: jest.fn(),
      voteOnWord: jest.fn(),
      incrementWordViews: jest.fn(),
      getWordsForSentence: jest.fn()
    };

    mockRoutineService = {
      queryRoutines: jest.fn(),
      getRoutineById: jest.fn(),
      getUserRoutines: jest.fn(),
      createRoutine: jest.fn(),
      updateRoutine: jest.fn(),
      deleteRoutine: jest.fn(),
      assignRoutineToUsers: jest.fn(),
      unassignRoutineFromUsers: jest.fn(),
      getDefaultRoutines: jest.fn(),
      getDefaultRoutineById: jest.fn(),
      createRoutineFromDefault: jest.fn(),
      getRecommendedRoutine: jest.fn()
    };

    mockProgressService = {
      getExerciseSessions: jest.fn(),
      getExerciseSessionById: jest.fn(),
      getProgressRecords: jest.fn(),
      generateFluencyReport: jest.fn(),
      createExerciseSession: jest.fn(),
      updateExerciseSession: jest.fn(),
      addWordAttempt: jest.fn(),
      completeExerciseSession: jest.fn()
    };

    mockUserService = {
      getUsers: jest.fn(),
      getUserById: jest.fn(),
      updateUser: jest.fn()
    };

    MockedWordService.getInstance.mockReturnValue(mockWordService);
    MockedRoutineService.getInstance.mockReturnValue(mockRoutineService);
    MockedProgressService.getInstance.mockReturnValue(mockProgressService);
    MockedUserService.getInstance.mockReturnValue(mockUserService);
  });

  describe('Word Queries', () => {
    describe('words query', () => {
      it('should return words with phonetic filtering', async () => {
        const mockResult = {
          words: [
            {
              id: '1',
              lexeme: 'apple',
              consonant: 'P',
              vowel: 'AE',
              syllables: 2,
              position: 'medial',
              type: 'noun',
              score: 10
            }
          ],
          totalCount: 1,
          hasMore: false,
          queryStats: {
            executionTimeMs: 50,
            docsExamined: 1,
            indexUsed: 'phonetic_search_primary'
          }
        };

        mockWordService.queryWords.mockResolvedValue(mockResult);

        const input = {
          vowel: ['AE'],
          consonant: ['P'],
          syllables: [2],
          position: 'medial',
          limit: 10
        };

        const result = await resolvers.Query.words(null, { input }, {});

        expect(mockWordService.queryWords).toHaveBeenCalledWith(input);
        expect(result).toEqual(mockResult);
      });

      it('should handle invalid input gracefully', async () => {
        mockWordService.queryWords.mockRejectedValue(new Error('Invalid phonetic filter'));

        const input = {
          vowel: ['INVALID'],
          consonant: ['P']
        };

        await expect(resolvers.Query.words(null, { input }, {}))
          .rejects.toThrow('Failed to fetch words');
      });

      it('should validate phonetic parameters', async () => {
        const input = {
          vowel: ['AE', 'IY'],
          consonant: ['B', 'T'],
          syllables: [1, 2, 3],
          position: 'initial',
          limit: 50,
          gradeLevel: '5'
        };

        const mockResult = {
          words: [],
          totalCount: 0,
          hasMore: false
        };

        mockWordService.queryWords.mockResolvedValue(mockResult);

        const result = await resolvers.Query.words(null, { input }, {});

        expect(mockWordService.queryWords).toHaveBeenCalledWith(input);
        expect(result).toEqual(mockResult);
      });
    });

    describe('word query', () => {
      it('should return single word by ID', async () => {
        const mockWord = {
          id: '507f1f77bcf86cd799439011',
          lexeme: 'apple',
          consonant: 'P',
          vowel: 'AE',
          syllables: 2
        };

        mockWordService.getWordById.mockResolvedValue(mockWord);

        const result = await resolvers.Query.word(null, { id: '507f1f77bcf86cd799439011' }, {});

        expect(mockWordService.getWordById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
        expect(result).toEqual(mockWord);
      });

      it('should throw error for non-existent word', async () => {
        mockWordService.getWordById.mockResolvedValue(null);

        await expect(resolvers.Query.word(null, { id: '507f1f77bcf86cd799439011' }, {}))
          .rejects.toThrow(UserInputError);
      });
    });

    describe('randomWord query', () => {
      it('should return random word with filters', async () => {
        const mockWord = {
          id: '507f1f77bcf86cd799439012',
          lexeme: 'ball',
          consonant: 'B',
          vowel: 'AO',
          syllables: 1
        };

        mockWordService.getRandomWord.mockResolvedValue(mockWord);

        const input = {
          consonant: ['B'],
          syllables: [1]
        };

        const result = await resolvers.Query.randomWord(null, { input }, {});

        expect(mockWordService.getRandomWord).toHaveBeenCalledWith(input);
        expect(result).toEqual(mockWord);
      });

      it('should handle no matching words', async () => {
        mockWordService.getRandomWord.mockResolvedValue(null);

        const input = {
          consonant: ['X'], // Non-existent consonant
          syllables: [1]
        };

        const result = await resolvers.Query.randomWord(null, { input }, {});

        expect(result).toBeNull();
      });
    });
  });

  describe('Routine Queries', () => {
    describe('routines query', () => {
      it('should return routines for authenticated user', async () => {
        const context = await createMockContext('therapist');
        const mockResult = {
          routines: [
            {
              id: '1',
              name: 'Beginner Easy Onset',
              description: 'Basic exercises',
              gradeLevel: 'K-2',
              isActive: true
            }
          ],
          totalCount: 1,
          hasMore: false
        };

        mockRoutineService.queryRoutines.mockResolvedValue(mockResult);

        const input = {
          isActive: true,
          gradeLevel: 'K-2'
        };

        const result = await resolvers.Query.routines(null, { input }, context);

        expect(mockRoutineService.queryRoutines).toHaveBeenCalledWith(input);
        expect(result).toEqual(mockResult);
      });

      it('should require authentication', async () => {
        const context = { user: null };

        await expect(resolvers.Query.routines(null, {}, context))
          .rejects.toThrow(AuthenticationError);
      });
    });

    describe('userRoutines query', () => {
      it('should return user routines for authenticated user', async () => {
        const context = await createMockContext('patient');
        const mockRoutines = [
          {
            id: '1',
            name: 'My Routine',
            description: 'Personal routine',
            isActive: true
          }
        ];

        mockRoutineService.getUserRoutines.mockResolvedValue(mockRoutines);

        const result = await resolvers.Query.userRoutines(null, {}, context);

        expect(mockRoutineService.getUserRoutines).toHaveBeenCalledWith(context.user.id);
        expect(result).toEqual(mockRoutines);
      });

      it('should prevent access to other users routines', async () => {
        const context = await createMockContext('patient');
        const otherUserId = '507f1f77bcf86cd799439999';

        await expect(resolvers.Query.userRoutines(null, { userId: otherUserId }, context))
          .rejects.toThrow(ForbiddenError);
      });
    });
  });

  describe('Progress Queries', () => {
    describe('exerciseSessions query', () => {
      it('should return exercise sessions for user', async () => {
        const context = await createMockContext('patient');
        const mockSessions = [
          {
            id: '1',
            userId: context.user.id,
            routineId: '1',
            startTime: new Date(),
            totalWords: 10,
            completedWords: 8,
            accuracy: 80
          }
        ];

        mockProgressService.getExerciseSessions.mockResolvedValue(mockSessions);

        const result = await resolvers.Query.exerciseSessions(
          null, 
          { userId: context.user.id, limit: 10 }, 
          context
        );

        expect(mockProgressService.getExerciseSessions).toHaveBeenCalledWith(
          context.user.id, 
          { routineId: undefined, limit: 10, offset: undefined }
        );
        expect(result).toEqual(mockSessions);
      });

      it('should prevent access to other users sessions', async () => {
        const context = await createMockContext('patient');
        const otherUserId = '507f1f77bcf86cd799439999';

        await expect(resolvers.Query.exerciseSessions(
          null, 
          { userId: otherUserId }, 
          context
        )).rejects.toThrow(ForbiddenError);
      });
    });

    describe('fluencyReport query', () => {
      it('should generate fluency report for user', async () => {
        const context = await createMockContext('patient');
        const mockReport = {
          id: '1',
          userId: context.user.id,
          routineId: '1',
          reportDate: new Date(),
          totalSessions: 5,
          averageAccuracy: 85,
          improvementTrend: 'improving',
          difficultPhonemes: [
            {
              consonant: 'R',
              vowel: 'ER',
              position: 'initial',
              accuracy: 60,
              frequency: 10
            }
          ],
          recommendations: [
            'Focus on R sound practice',
            'Increase session frequency'
          ]
        };

        mockProgressService.generateFluencyReport.mockResolvedValue(mockReport);

        const result = await resolvers.Query.fluencyReport(
          null,
          {
            userId: context.user.id,
            routineId: '1',
            startDate: '2024-01-01',
            endDate: '2024-01-31'
          },
          context
        );

        expect(mockProgressService.generateFluencyReport).toHaveBeenCalledWith(
          context.user.id,
          '1',
          '2024-01-01',
          '2024-01-31'
        );
        expect(result).toEqual(mockReport);
      });
    });
  });

  describe('Mutations', () => {
    describe('voteWord mutation', () => {
      it('should allow authenticated user to vote on word', async () => {
        const context = await createMockContext('patient');
        const mockWord = {
          id: '507f1f77bcf86cd799439011',
          lexeme: 'apple',
          score: 11,
          votes: [{ user: context.user.id, vote: 1 }]
        };

        mockWordService.voteOnWord.mockResolvedValue(mockWord);

        const result = await resolvers.Mutation.voteWord(
          null,
          { wordId: '507f1f77bcf86cd799439011', vote: 1 },
          context
        );

        expect(mockWordService.voteOnWord).toHaveBeenCalledWith(
          '507f1f77bcf86cd799439011',
          context.user.id,
          1
        );
        expect(result).toEqual(mockWord);
      });

      it('should require authentication for voting', async () => {
        const context = { user: null };

        await expect(resolvers.Mutation.voteWord(
          null,
          { wordId: '507f1f77bcf86cd799439011', vote: 1 },
          context
        )).rejects.toThrow(AuthenticationError);
      });
    });

    describe('createRoutine mutation', () => {
      it('should create routine for authenticated user', async () => {
        const context = await createMockContext('therapist');
        const input = {
          name: 'New Routine',
          description: 'Test routine',
          gradeLevel: '3-5',
          subroutine: [
            {
              type: 'word_practice',
              duration: 300,
              repetitions: 10,
              phoneticConfig: {
                vowels: ['AE'],
                consonants: ['B'],
                position: 'initial',
                syllables: [1],
                gradeLevel: '3-5'
              }
            }
          ],
          assignedUsers: []
        };

        const mockRoutine = {
          id: '1',
          ...input,
          createdBy: context.user.id,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        mockRoutineService.createRoutine.mockResolvedValue(mockRoutine);

        const result = await resolvers.Mutation.createRoutine(
          null,
          { input },
          context
        );

        expect(mockRoutineService.createRoutine).toHaveBeenCalledWith(
          context.user.id,
          input
        );
        expect(result).toEqual(mockRoutine);
      });

      it('should require authentication for routine creation', async () => {
        const context = { user: null };
        const input = {
          name: 'New Routine',
          subroutine: []
        };

        await expect(resolvers.Mutation.createRoutine(
          null,
          { input },
          context
        )).rejects.toThrow(AuthenticationError);
      });
    });

    describe('createExerciseSession mutation', () => {
      it('should create exercise session for authenticated user', async () => {
        const context = await createMockContext('patient');
        const input = {
          routineId: '1',
          sessionId: 'session_123',
          totalWords: 20,
          notes: 'Practice session'
        };

        const mockSession = {
          id: '1',
          userId: context.user.id,
          ...input,
          startTime: new Date(),
          wordsAttempted: [],
          completedWords: 0,
          accuracy: 0,
          completionRate: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        mockProgressService.createExerciseSession.mockResolvedValue(mockSession);

        const result = await resolvers.Mutation.createExerciseSession(
          null,
          { input },
          context
        );

        expect(mockProgressService.createExerciseSession).toHaveBeenCalledWith(
          context.user.id,
          input
        );
        expect(result).toEqual(mockSession);
      });
    });
  });

  describe('Field Resolvers', () => {
    describe('Routine field resolvers', () => {
      it('should calculate totalDuration correctly', () => {
        const routine = {
          getTotalDuration: jest.fn().mockReturnValue(900) // 15 minutes
        };

        const result = resolvers.Routine.totalDuration(routine);

        expect(routine.getTotalDuration).toHaveBeenCalled();
        expect(result).toBe(900);
      });

      it('should calculate stepCount correctly', () => {
        const routine = {
          getStepCount: jest.fn().mockReturnValue(3)
        };

        const result = resolvers.Routine.stepCount(routine);

        expect(routine.getStepCount).toHaveBeenCalled();
        expect(result).toBe(3);
      });
    });

    describe('Word field resolvers', () => {
      it('should calculate upvotePercentage correctly', () => {
        const word = {
          getUpvotePercentage: jest.fn().mockReturnValue(75)
        };

        const result = resolvers.Word.upvotePercentage(word);

        expect(word.getUpvotePercentage).toHaveBeenCalled();
        expect(result).toBe(75);
      });
    });

    describe('ExerciseSession field resolvers', () => {
      it('should calculate duration correctly', () => {
        const session = {
          getDuration: jest.fn().mockReturnValue(1200) // 20 minutes
        };

        const result = resolvers.ExerciseSession.duration(session);

        expect(session.getDuration).toHaveBeenCalled();
        expect(result).toBe(1200);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle service errors gracefully', async () => {
      mockWordService.queryWords.mockRejectedValue(new Error('Database connection failed'));

      const input = { vowel: ['AE'] };

      await expect(resolvers.Query.words(null, { input }, {}))
        .rejects.toThrow('Failed to fetch words');
    });

    it('should preserve UserInputError messages', async () => {
      const userError = new UserInputError('Invalid phonetic combination');
      mockWordService.getWordById.mockRejectedValue(userError);

      await expect(resolvers.Query.word(null, { id: '123' }, {}))
        .rejects.toThrow(UserInputError);
    });

    it('should handle authentication errors properly', async () => {
      const context = { user: null };

      await expect(resolvers.Query.routines(null, {}, context))
        .rejects.toThrow(AuthenticationError);
    });

    it('should handle authorization errors properly', async () => {
      const context = await createMockContext('patient');
      const otherUserId = '507f1f77bcf86cd799439999';

      await expect(resolvers.Query.userRoutines(null, { userId: otherUserId }, context))
        .rejects.toThrow(ForbiddenError);
    });
  });

  describe('Performance and Optimization', () => {
    it('should handle large result sets efficiently', async () => {
      const largeResultSet = {
        words: Array(1000).fill(null).map((_, i) => ({
          id: i.toString(),
          lexeme: `word${i}`,
          consonant: 'B',
          vowel: 'AE',
          syllables: 1
        })),
        totalCount: 1000,
        hasMore: false,
        queryStats: {
          executionTimeMs: 150,
          docsExamined: 1000,
          indexUsed: 'phonetic_search_primary'
        }
      };

      mockWordService.queryWords.mockResolvedValue(largeResultSet);

      const input = { consonant: ['B'], limit: 1000 };
      const result = await resolvers.Query.words(null, { input }, {});

      expect(result.words).toHaveLength(1000);
      expect(result.queryStats.executionTimeMs).toBeLessThan(1000); // Should be fast
    });

    it('should handle concurrent requests properly', async () => {
      const mockResults = Array(10).fill(null).map((_, i) => ({
        words: [{ id: i.toString(), lexeme: `word${i}` }],
        totalCount: 1,
        hasMore: false
      }));

      mockWordService.queryWords.mockImplementation((input) => {
        const index = input.consonant[0].charCodeAt(0) - 65; // A=0, B=1, etc.
        return Promise.resolve(mockResults[index] || mockResults[0]);
      });

      const requests = Array(10).fill(null).map((_, i) => {
        const consonant = String.fromCharCode(65 + i); // A, B, C, etc.
        return resolvers.Query.words(null, { input: { consonant: [consonant] } }, {});
      });

      const results = await Promise.all(requests);

      expect(results).toHaveLength(10);
      results.forEach((result, i) => {
        expect(result.words[0].lexeme).toBe(`word${i}`);
      });
    });
  });
});