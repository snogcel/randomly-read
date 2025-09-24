import { resolvers } from '../../src/graphql/resolvers';
import { WordService } from '../../src/services/WordService';
import { RoutineService } from '../../src/services/RoutineService';
import { UserService } from '../../src/services/UserService';
import { createTestUser, createTestWord, createTestRoutine } from '../helpers/testData';
import { createUserInDB, createWordInDB, createRoutineInDB } from '../helpers/testUtils';

// Mock services
jest.mock('../../src/services/WordService');
jest.mock('../../src/services/RoutineService');
jest.mock('../../src/services/UserService');

describe('GraphQL Resolvers', () => {
  let mockWordService: jest.Mocked<WordService>;
  let mockRoutineService: jest.Mocked<RoutineService>;
  let mockUserService: jest.Mocked<UserService>;
  let mockContext: any;
  let testUser: any;

  beforeEach(async () => {
    // Create test user
    testUser = await createUserInDB();

    // Setup mock context
    mockContext = {
      user: testUser,
      req: { headers: {} }
    };

    // Setup service mocks
    mockWordService = {
      queryWords: jest.fn(),
      getWordById: jest.fn(),
      getRandomWord: jest.fn(),
      voteOnWord: jest.fn(),
      incrementWordViews: jest.fn(),
      getWordsForSentence: jest.fn(),
      getPhoneticStats: jest.fn()
    } as any;

    mockRoutineService = {
      queryRoutines: jest.fn(),
      getRoutineById: jest.fn(),
      createRoutine: jest.fn(),
      updateRoutine: jest.fn(),
      deleteRoutine: jest.fn(),
      getUserRoutines: jest.fn(),
      assignRoutineToUsers: jest.fn(),
      unassignRoutineFromUsers: jest.fn(),
      validateRoutineConfig: jest.fn()
    } as any;

    mockUserService = {
      getUserById: jest.fn(),
      getUsers: jest.fn(),
      updateUser: jest.fn()
    } as any;

    // Mock getInstance methods
    (WordService.getInstance as jest.Mock).mockReturnValue(mockWordService);
    (RoutineService.getInstance as jest.Mock).mockReturnValue(mockRoutineService);
    (UserService.getInstance as jest.Mock).mockReturnValue(mockUserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Query Resolvers', () => {
    describe('words', () => {
      it('should query words successfully', async () => {
        const mockResult = {
          words: [createTestWord()],
          totalCount: 1,
          hasMore: false
        };
        mockWordService.queryWords.mockResolvedValue(mockResult);

        const result = await resolvers.Query.words(
          null,
          { input: { vowel: ['AA'] } }
        );

        expect(result).toEqual(mockResult);
        expect(mockWordService.queryWords).toHaveBeenCalledWith({ vowel: ['AA'] });
      });

      it('should handle service errors', async () => {
        mockWordService.queryWords.mockRejectedValue(new Error('Service error'));

        await expect(
          resolvers.Query.words(null, { input: {} })
        ).rejects.toThrow('Failed to fetch words');
      });


    });

    describe('word', () => {
      it('should get word by ID successfully', async () => {
        const mockWord = createTestWord();
        mockWordService.getWordById.mockResolvedValue(mockWord as any);

        const result = await resolvers.Query.word(
          null,
          { id: 'word-id' }
        );

        expect(result).toEqual(mockWord);
        expect(mockWordService.getWordById).toHaveBeenCalledWith('word-id');
      });

      it('should throw error when word not found', async () => {
        mockWordService.getWordById.mockResolvedValue(null);

        await expect(
          resolvers.Query.word(null, { id: 'nonexistent' })
        ).rejects.toThrow('Word not found');
      });
    });

    describe('routines', () => {
      it('should query routines successfully', async () => {
        const mockResult = {
          routines: [createTestRoutine(testUser._id)],
          totalCount: 1,
          hasMore: false
        };
        mockRoutineService.queryRoutines.mockResolvedValue(mockResult);

        const result = await resolvers.Query.routines(
          null,
          { input: { createdBy: testUser._id } },
          mockContext
        );

        expect(result).toEqual(mockResult);
        expect(mockRoutineService.queryRoutines).toHaveBeenCalledWith({ createdBy: testUser._id });
      });

      it('should handle empty input', async () => {
        const mockResult = {
          routines: [],
          totalCount: 0,
          hasMore: false
        };
        mockRoutineService.queryRoutines.mockResolvedValue(mockResult);

        const result = await resolvers.Query.routines(
          null,
          {},
          mockContext
        );

        expect(result).toEqual(mockResult);
        expect(mockRoutineService.queryRoutines).toHaveBeenCalledWith({});
      });
    });

    describe('userRoutines', () => {
      it('should get user routines for own user', async () => {
        const mockRoutines = [createTestRoutine(testUser._id)];
        mockRoutineService.getUserRoutines.mockResolvedValue(mockRoutines as any);

        const result = await resolvers.Query.userRoutines(
          null,
          { userId: testUser._id },
          mockContext
        );

        expect(result).toEqual(mockRoutines);
        expect(mockRoutineService.getUserRoutines).toHaveBeenCalledWith(testUser._id);
      });

      it('should get routines for current user when no userId provided', async () => {
        const mockRoutines = [createTestRoutine(testUser._id)];
        mockRoutineService.getUserRoutines.mockResolvedValue(mockRoutines as any);

        const result = await resolvers.Query.userRoutines(
          null,
          {},
          mockContext
        );

        expect(result).toEqual(mockRoutines);
        expect(mockRoutineService.getUserRoutines).toHaveBeenCalledWith(testUser.id);
      });

      it('should deny access to other user routines', async () => {
        const otherUserId = 'other-user-id';

        await expect(
          resolvers.Query.userRoutines(
            null,
            { userId: otherUserId },
            mockContext
          )
        ).rejects.toThrow('Access denied');
      });
    });

    describe('me', () => {
      it('should return current user', async () => {
        const result = await resolvers.Query.me(null, {}, mockContext);
        expect(result).toEqual(testUser);
      });

      it('should throw authentication error when no user', async () => {
        const contextWithoutUser = { ...mockContext, user: null };

        await expect(
          resolvers.Query.me(null, {}, contextWithoutUser)
        ).rejects.toThrow('Authentication required');
      });
    });
  });

  describe('Mutation Resolvers', () => {
    describe('voteWord', () => {
      it('should vote on word successfully', async () => {
        const mockWord = createTestWord();
        mockWordService.voteOnWord.mockResolvedValue(mockWord as any);

        const result = await resolvers.Mutation.voteWord(
          null,
          { wordId: 'word-id', vote: 1 },
          mockContext
        );

        expect(result).toEqual(mockWord);
        expect(mockWordService.voteOnWord).toHaveBeenCalledWith('word-id', testUser.id, 1);
      });

      it('should handle voting errors', async () => {
        mockWordService.voteOnWord.mockRejectedValue(new Error('Vote failed'));

        await expect(
          resolvers.Mutation.voteWord(
            null,
            { wordId: 'word-id', vote: 1 },
            mockContext
          )
        ).rejects.toThrow('Failed to vote on word');
      });
    });

    describe('createRoutine', () => {
      it('should create routine successfully', async () => {
        const routineInput = {
          name: 'Test Routine',
          description: 'Test Description',
          subroutine: [{
            type: 'word',
            duration: 30,
            repetitions: 5,
            phoneticConfig: {
              vowels: ['AA'],
              consonants: ['B'],
              position: 'initial',
              syllables: [1],
              gradeLevel: 'K'
            }
          }]
        };

        const mockRoutine = createTestRoutine(testUser._id);
        mockRoutineService.createRoutine.mockResolvedValue(mockRoutine as any);

        const result = await resolvers.Mutation.createRoutine(
          null,
          { input: routineInput },
          mockContext
        );

        expect(result).toEqual(mockRoutine);
        expect(mockRoutineService.createRoutine).toHaveBeenCalledWith(testUser.id, routineInput);
      });

      it('should handle creation errors', async () => {
        mockRoutineService.createRoutine.mockRejectedValue(new Error('Creation failed'));

        await expect(
          resolvers.Mutation.createRoutine(
            null,
            { input: { name: 'Test' } },
            mockContext
          )
        ).rejects.toThrow('Failed to create routine: Creation failed');
      });
    });

    describe('updateRoutine', () => {
      it('should update routine successfully', async () => {
        const updateInput = { name: 'Updated Name' };
        const mockRoutine = createTestRoutine(testUser._id, updateInput);
        mockRoutineService.updateRoutine.mockResolvedValue(mockRoutine as any);

        const result = await resolvers.Mutation.updateRoutine(
          null,
          { id: 'routine-id', input: updateInput },
          mockContext
        );

        expect(result).toEqual(mockRoutine);
        expect(mockRoutineService.updateRoutine).toHaveBeenCalledWith('routine-id', testUser.id, updateInput);
      });
    });

    describe('deleteRoutine', () => {
      it('should delete routine successfully', async () => {
        mockRoutineService.deleteRoutine.mockResolvedValue(undefined);

        const result = await resolvers.Mutation.deleteRoutine(
          null,
          { id: 'routine-id' },
          mockContext
        );

        expect(result).toBe(true);
        expect(mockRoutineService.deleteRoutine).toHaveBeenCalledWith('routine-id', testUser.id);
      });

      it('should handle deletion errors', async () => {
        mockRoutineService.deleteRoutine.mockRejectedValue(new Error('Deletion failed'));

        await expect(
          resolvers.Mutation.deleteRoutine(
            null,
            { id: 'routine-id' },
            mockContext
          )
        ).rejects.toThrow('Failed to delete routine: Deletion failed');
      });
    });

    describe('updateProfile', () => {
      it('should update user profile successfully', async () => {
        const updateData = {
          firstName: 'Updated',
          lastName: 'Name',
          email: 'updated@example.com'
        };

        const updatedUser = { ...testUser, ...updateData };
        mockUserService.updateUser.mockResolvedValue(updatedUser);

        const result = await resolvers.Mutation.updateProfile(
          null,
          updateData,
          mockContext
        );

        expect(result).toEqual(updatedUser);
        expect(mockUserService.updateUser).toHaveBeenCalledWith(testUser.id, updateData);
      });
    });
  });

  describe('Field Resolvers', () => {
    describe('Routine', () => {
      it('should calculate totalDuration', () => {
        const mockRoutine = {
          getTotalDuration: jest.fn().mockReturnValue(300)
        };

        const result = resolvers.Routine.totalDuration(mockRoutine);

        expect(result).toBe(300);
        expect(mockRoutine.getTotalDuration).toHaveBeenCalled();
      });

      it('should calculate stepCount', () => {
        const mockRoutine = {
          getStepCount: jest.fn().mockReturnValue(5)
        };

        const result = resolvers.Routine.stepCount(mockRoutine);

        expect(result).toBe(5);
        expect(mockRoutine.getStepCount).toHaveBeenCalled();
      });
    });

    describe('Word', () => {
      it('should calculate upvotePercentage', () => {
        const mockWord = {
          getUpvotePercentage: jest.fn().mockReturnValue(75)
        };

        const result = resolvers.Word.upvotePercentage(mockWord);

        expect(result).toBe(75);
        expect(mockWord.getUpvotePercentage).toHaveBeenCalled();
      });
    });

    describe('ExerciseSession', () => {
      it('should calculate duration', () => {
        const mockSession = {
          getDuration: jest.fn().mockReturnValue(1800000) // 30 minutes in ms
        };

        const result = resolvers.ExerciseSession.duration(mockSession);

        expect(result).toBe(1800000);
        expect(mockSession.getDuration).toHaveBeenCalled();
      });
    });
  });

  describe('Date Scalar', () => {
    it('should serialize Date to ISO string', () => {
      const date = new Date('2023-01-01T00:00:00.000Z');
      const result = resolvers.Date.serialize(date);
      expect(result).toBe('2023-01-01T00:00:00.000Z');
    });

    it('should parse value to Date', () => {
      const dateString = '2023-01-01T00:00:00.000Z';
      const result = resolvers.Date.parseValue(dateString);
      expect(result).toEqual(new Date(dateString));
    });

    it('should handle null values', () => {
      const result = resolvers.Date.serialize(null);
      expect(result).toBeNull();
    });
  });
});