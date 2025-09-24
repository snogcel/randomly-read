import { WordService } from '../services/WordService';
import { RoutineService } from '../services/RoutineService';
import { ProgressService } from '../services/ProgressService';
import { UserService } from '../services/UserService';
import { SentenceService } from '../services/SentenceService';
import { UserInputError } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';
import { logger } from '../utils/logger';

// Custom Date scalar
const DateType = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value: any) {
    return value instanceof Date ? value.toISOString() : null;
  },
  parseValue(value: any) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

export const resolvers = {
  Date: DateType,

  Query: {
    // Word queries
    async words(_: any, { input }: any) {
      try {
        const wordService = WordService.getInstance();
        return await wordService.queryWords(input);
      } catch (error) {
        logger.error('Error in words query:', error);
        throw new Error('Failed to fetch words');
      }
    },

    async word(_: any, { id }: any) {
      try {
        const wordService = WordService.getInstance();
        const word = await wordService.getWordById(id);
        if (!word) throw new UserInputError('Word not found');
        return word;
      } catch (error) {
        logger.error('Error in word query:', error);
        throw new Error('Failed to fetch word');
      }
    },

    async randomWord(_: any, { input }: any) {
      try {
        const wordService = WordService.getInstance();
        return await wordService.getRandomWord(input);
      } catch (error) {
        logger.error('Error in randomWord query:', error);
        throw new Error('Failed to fetch random word');
      }
    },

    // Sentence queries
    async sentences(_: any, { input }: any) {
      try {
        const sentenceService = SentenceService.getInstance();
        return await sentenceService.generateSentence(input, 'anonymous');
      } catch (error) {
        logger.error('Error in sentences query:', error);
        throw new Error('Failed to generate sentences');
      }
    },

    // Routine queries
    async routines(_: any, { input }: any, { user }: any) {
      if (!user) throw new AuthenticationError('Authentication required');
      
      try {
        const routineService = RoutineService.getInstance();
        return await routineService.queryRoutines(input || {});
      } catch (error) {
        logger.error('Error in routines query:', error);
        throw new Error('Failed to fetch routines');
      }
    },

    async routine(_: any, { id }: any) {
      try {
        const routineService = RoutineService.getInstance();
        const routine = await routineService.getRoutineById(id);
        if (!routine) throw new UserInputError('Routine not found');
        return routine;
      } catch (error) {
        logger.error('Error in routine query:', error);
        throw new Error('Failed to fetch routine');
      }
    },

    async userRoutines(_: any, { userId }: any, { user }: any) {
      if (!user) throw new AuthenticationError('Authentication required');
      
      // Users can only see their own routines
      const targetUserId = userId || user.id;
      if (targetUserId !== user.id) {
        throw new ForbiddenError('Access denied');
      }
      
      try {
        const routineService = RoutineService.getInstance();
        return await routineService.getUserRoutines(targetUserId);
      } catch (error) {
        logger.error('Error in userRoutines query:', error);
        throw new Error('Failed to fetch user routines');
      }
    },

    // Progress queries
    async exerciseSessions(_: any, { userId, routineId, limit, offset }: any, { user }: any) {
      if (!user) throw new AuthenticationError('Authentication required');
      
      // Users can only see their own sessions
      if (userId !== user.id) {
        throw new ForbiddenError('Access denied');
      }
      
      try {
        const progressService = ProgressService.getInstance();
        return await progressService.getExerciseSessions(userId, { routineId, limit, offset });
      } catch (error) {
        logger.error('Error in exerciseSessions query:', error);
        throw new Error('Failed to fetch exercise sessions');
      }
    },

    async exerciseSession(_: any, { id }: any, { user }: any) {
      if (!user) throw new AuthenticationError('Authentication required');
      
      try {
        const progressService = ProgressService.getInstance();
        const session = await progressService.getExerciseSessionById(id);
        if (!session) throw new UserInputError('Exercise session not found');
        
        // Check access
        if (session.userId.toString() !== user.id) {
          throw new ForbiddenError('Access denied');
        }
        
        return session;
      } catch (error) {
        logger.error('Error in exerciseSession query:', error);
        throw new Error('Failed to fetch exercise session');
      }
    },

    async progressRecords(_: any, { userId, routineId, startDate, endDate }: any, { user }: any) {
      if (!user) throw new AuthenticationError('Authentication required');
      
      // Users can only see their own progress
      if (userId !== user.id) {
        throw new ForbiddenError('Access denied');
      }
      
      try {
        const progressService = ProgressService.getInstance();
        return await progressService.getProgressRecords(userId, { routineId, startDate, endDate });
      } catch (error) {
        logger.error('Error in progressRecords query:', error);
        throw new Error('Failed to fetch progress records');
      }
    },

    async fluencyReport(_: any, { userId, routineId, startDate, endDate }: any, { user }: any) {
      if (!user) throw new AuthenticationError('Authentication required');
      
      // Users can only see their own reports
      if (userId !== user.id) {
        throw new ForbiddenError('Access denied');
      }
      
      try {
        const progressService = ProgressService.getInstance();
        return await progressService.generateFluencyReport(userId, routineId, startDate, endDate);
      } catch (error) {
        logger.error('Error in fluencyReport query:', error);
        throw new Error('Failed to generate fluency report');
      }
    },

    // User queries
    async me(_: any, __: any, { user }: any) {
      if (!user) throw new AuthenticationError('Authentication required');
      return user;
    },

    async users(_: any, { limit, offset }: any, { user }: any) {
      if (!user) throw new AuthenticationError('Authentication required');
      
      try {
        const userService = UserService.getInstance();
        return await userService.getUsers({ limit, offset });
      } catch (error) {
        logger.error('Error in users query:', error);
        throw new Error('Failed to fetch users');
      }
    },

    async user(_: any, { id }: any, { user }: any) {
      if (!user) throw new AuthenticationError('Authentication required');
      
      // Users can only see their own profile
      if (id !== user.id) {
        throw new ForbiddenError('Access denied');
      }
      
      try {
        const userService = UserService.getInstance();
        return await userService.getUserById(id);
      } catch (error) {
        logger.error('Error in user query:', error);
        throw new Error('Failed to fetch user');
      }
    },

    // Default routine queries
    async defaultRoutines() {
      try {
        const routineService = RoutineService.getInstance();
        return routineService.getDefaultRoutines();
      } catch (error) {
        logger.error('Error in defaultRoutines query:', error);
        throw new Error('Failed to fetch default routines');
      }
    },

    async defaultRoutine(_: any, { id }: any) {
      try {
        const routineService = RoutineService.getInstance();
        const routine = routineService.getDefaultRoutineById(id);
        if (!routine) {
          throw new Error('Default routine not found');
        }
        return routine;
      } catch (error) {
        logger.error('Error in defaultRoutine query:', error);
        throw new Error('Failed to fetch default routine');
      }
    },

    async recommendedRoutine(_: any, { userLevel }: any) {
      try {
        const routineService = RoutineService.getInstance();
        return routineService.getRecommendedRoutine(userLevel);
      } catch (error) {
        logger.error('Error in recommendedRoutine query:', error);
        throw new Error('Failed to fetch recommended routine');
      }
    },
  },

  Mutation: {
    // Word mutations
    async voteWord(_: any, { wordId, vote }: any, { user }: any) {
      if (!user) throw new AuthenticationError('Authentication required');
      
      try {
        const wordService = WordService.getInstance();
        return await wordService.voteOnWord(wordId, user.id, vote);
      } catch (error) {
        logger.error('Error in voteWord mutation:', error);
        throw new Error('Failed to vote on word');
      }
    },

    // Routine mutations
    async createRoutine(_: any, { input }: any, { user }: any) {
      if (!user) throw new AuthenticationError('Authentication required');
      
      try {
        const routineService = RoutineService.getInstance();
        return await routineService.createRoutine(user.id, input);
      } catch (error) {
        logger.error('Error in createRoutine mutation:', error);
        throw new Error(`Failed to create routine: ${error.message}`);
      }
    },

    async createRoutineFromDefault(_: any, { defaultRoutineId }: any, { user }: any) {
      if (!user) throw new AuthenticationError('Authentication required');
      
      try {
        const routineService = RoutineService.getInstance();
        return await routineService.createRoutineFromDefault(user.id, defaultRoutineId);
      } catch (error) {
        logger.error('Error in createRoutineFromDefault mutation:', error);
        throw new Error(`Failed to create routine from default: ${error.message}`);
      }
    },

    async updateRoutine(_: any, { id, input }: any, { user }: any) {
      if (!user) throw new AuthenticationError('Authentication required');
      
      try {
        const routineService = RoutineService.getInstance();
        return await routineService.updateRoutine(id, user.id, input);
      } catch (error) {
        logger.error('Error in updateRoutine mutation:', error);
        throw new Error(`Failed to update routine: ${error.message}`);
      }
    },

    async deleteRoutine(_: any, { id }: any, { user }: any) {
      if (!user) throw new AuthenticationError('Authentication required');
      
      try {
        const routineService = RoutineService.getInstance();
        await routineService.deleteRoutine(id, user.id);
        return true;
      } catch (error) {
        logger.error('Error in deleteRoutine mutation:', error);
        throw new Error(`Failed to delete routine: ${error.message}`);
      }
    },

    async assignRoutine(_: any, { routineId, userIds }: any, { user }: any) {
      if (!user) throw new AuthenticationError('Authentication required');
      
      try {
        const routineService = RoutineService.getInstance();
        await routineService.assignRoutineToUsers(routineId, userIds, user.id);
        return true;
      } catch (error) {
        logger.error('Error in assignRoutine mutation:', error);
        throw new Error(`Failed to assign routine: ${error.message}`);
      }
    },

    async unassignRoutine(_: any, { routineId, userIds }: any, { user }: any) {
      if (!user) throw new AuthenticationError('Authentication required');
      
      try {
        const routineService = RoutineService.getInstance();
        await routineService.unassignRoutineFromUsers(routineId, userIds, user.id);
        return true;
      } catch (error) {
        logger.error('Error in unassignRoutine mutation:', error);
        throw new Error(`Failed to unassign routine: ${error.message}`);
      }
    },

    // Progress mutations
    async createExerciseSession(_: any, { input }: any, { user }: any) {
      if (!user) throw new AuthenticationError('Authentication required');
      
      try {
        const progressService = ProgressService.getInstance();
        return await progressService.createExerciseSession(user.id, input);
      } catch (error) {
        logger.error('Error in createExerciseSession mutation:', error);
        throw new Error('Failed to create exercise session');
      }
    },

    async updateExerciseSession(_: any, { id, input }: any, { user }: any) {
      if (!user) throw new AuthenticationError('Authentication required');
      
      try {
        const progressService = ProgressService.getInstance();
        return await progressService.updateExerciseSession(id, user.id, input);
      } catch (error) {
        logger.error('Error in updateExerciseSession mutation:', error);
        throw new Error('Failed to update exercise session');
      }
    },

    async addWordAttempt(_: any, { sessionId, attempt }: any, { user }: any) {
      if (!user) throw new AuthenticationError('Authentication required');
      
      try {
        const progressService = ProgressService.getInstance();
        return await progressService.addWordAttempt(sessionId, user.id, attempt);
      } catch (error) {
        logger.error('Error in addWordAttempt mutation:', error);
        throw new Error('Failed to add word attempt');
      }
    },

    async completeExerciseSession(_: any, { id }: any, { user }: any) {
      if (!user) throw new AuthenticationError('Authentication required');
      
      try {
        const progressService = ProgressService.getInstance();
        return await progressService.completeExerciseSession(id, user.id);
      } catch (error) {
        logger.error('Error in completeExerciseSession mutation:', error);
        throw new Error('Failed to complete exercise session');
      }
    },

    // User mutations
    async updateProfile(_: any, { firstName, lastName, email }: any, { user }: any) {
      if (!user) throw new AuthenticationError('Authentication required');
      
      try {
        const userService = UserService.getInstance();
        return await userService.updateUser(user.id, { firstName, lastName, email });
      } catch (error) {
        logger.error('Error in updateProfile mutation:', error);
        throw new Error('Failed to update profile');
      }
    },
  },

  // Field resolvers
  Routine: {
    totalDuration(routine: any) {
      return routine.getTotalDuration();
    },
    stepCount(routine: any) {
      return routine.getStepCount();
    },
  },

  ExerciseSession: {
    duration(session: any) {
      return session.getDuration();
    },
  },

  Word: {
    upvotePercentage(word: any) {
      return word.getUpvotePercentage();
    },
  },
};