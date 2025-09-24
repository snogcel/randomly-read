"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const WordService_1 = require("../services/WordService");
const RoutineService_1 = require("../services/RoutineService");
const ProgressService_1 = require("../services/ProgressService");
const UserService_1 = require("../services/UserService");
const SentenceService_1 = require("../services/SentenceService");
const apollo_server_express_1 = require("apollo-server-express");
const graphql_1 = require("graphql");
const logger_1 = require("../utils/logger");
const DateType = new graphql_1.GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        return value instanceof Date ? value.toISOString() : null;
    },
    parseValue(value) {
        return new Date(value);
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_1.Kind.STRING) {
            return new Date(ast.value);
        }
        return null;
    },
});
exports.resolvers = {
    Date: DateType,
    Query: {
        async words(_, { input }) {
            try {
                const wordService = WordService_1.WordService.getInstance();
                return await wordService.queryWords(input);
            }
            catch (error) {
                logger_1.logger.error('Error in words query:', error);
                throw new Error('Failed to fetch words');
            }
        },
        async word(_, { id }) {
            try {
                const wordService = WordService_1.WordService.getInstance();
                const word = await wordService.getWordById(id);
                if (!word)
                    throw new apollo_server_express_1.UserInputError('Word not found');
                return word;
            }
            catch (error) {
                logger_1.logger.error('Error in word query:', error);
                throw new Error('Failed to fetch word');
            }
        },
        async randomWord(_, { input }) {
            try {
                const wordService = WordService_1.WordService.getInstance();
                return await wordService.getRandomWord(input);
            }
            catch (error) {
                logger_1.logger.error('Error in randomWord query:', error);
                throw new Error('Failed to fetch random word');
            }
        },
        async sentences(_, { input }) {
            try {
                const sentenceService = SentenceService_1.SentenceService.getInstance();
                return await sentenceService.generateSentence(input, 'anonymous');
            }
            catch (error) {
                logger_1.logger.error('Error in sentences query:', error);
                throw new Error('Failed to generate sentences');
            }
        },
        async routines(_, { input }, { user }) {
            if (!user)
                throw new AuthenticationError('Authentication required');
            try {
                const routineService = RoutineService_1.RoutineService.getInstance();
                return await routineService.queryRoutines(input || {});
            }
            catch (error) {
                logger_1.logger.error('Error in routines query:', error);
                throw new Error('Failed to fetch routines');
            }
        },
        async routine(_, { id }) {
            try {
                const routineService = RoutineService_1.RoutineService.getInstance();
                const routine = await routineService.getRoutineById(id);
                if (!routine)
                    throw new apollo_server_express_1.UserInputError('Routine not found');
                return routine;
            }
            catch (error) {
                logger_1.logger.error('Error in routine query:', error);
                throw new Error('Failed to fetch routine');
            }
        },
        async userRoutines(_, { userId }, { user }) {
            if (!user)
                throw new AuthenticationError('Authentication required');
            const targetUserId = userId || user.id;
            if (targetUserId !== user.id) {
                throw new ForbiddenError('Access denied');
            }
            try {
                const routineService = RoutineService_1.RoutineService.getInstance();
                return await routineService.getUserRoutines(targetUserId);
            }
            catch (error) {
                logger_1.logger.error('Error in userRoutines query:', error);
                throw new Error('Failed to fetch user routines');
            }
        },
        async exerciseSessions(_, { userId, routineId, limit, offset }, { user }) {
            if (!user)
                throw new AuthenticationError('Authentication required');
            if (userId !== user.id) {
                throw new ForbiddenError('Access denied');
            }
            try {
                const progressService = ProgressService_1.ProgressService.getInstance();
                return await progressService.getExerciseSessions(userId, { routineId, limit, offset });
            }
            catch (error) {
                logger_1.logger.error('Error in exerciseSessions query:', error);
                throw new Error('Failed to fetch exercise sessions');
            }
        },
        async exerciseSession(_, { id }, { user }) {
            if (!user)
                throw new AuthenticationError('Authentication required');
            try {
                const progressService = ProgressService_1.ProgressService.getInstance();
                const session = await progressService.getExerciseSessionById(id);
                if (!session)
                    throw new apollo_server_express_1.UserInputError('Exercise session not found');
                if (session.userId.toString() !== user.id) {
                    throw new ForbiddenError('Access denied');
                }
                return session;
            }
            catch (error) {
                logger_1.logger.error('Error in exerciseSession query:', error);
                throw new Error('Failed to fetch exercise session');
            }
        },
        async progressRecords(_, { userId, routineId, startDate, endDate }, { user }) {
            if (!user)
                throw new AuthenticationError('Authentication required');
            if (userId !== user.id) {
                throw new ForbiddenError('Access denied');
            }
            try {
                const progressService = ProgressService_1.ProgressService.getInstance();
                return await progressService.getProgressRecords(userId, { routineId, startDate, endDate });
            }
            catch (error) {
                logger_1.logger.error('Error in progressRecords query:', error);
                throw new Error('Failed to fetch progress records');
            }
        },
        async fluencyReport(_, { userId, routineId, startDate, endDate }, { user }) {
            if (!user)
                throw new AuthenticationError('Authentication required');
            if (userId !== user.id) {
                throw new ForbiddenError('Access denied');
            }
            try {
                const progressService = ProgressService_1.ProgressService.getInstance();
                return await progressService.generateFluencyReport(userId, routineId, startDate, endDate);
            }
            catch (error) {
                logger_1.logger.error('Error in fluencyReport query:', error);
                throw new Error('Failed to generate fluency report');
            }
        },
        async me(_, __, { user }) {
            if (!user)
                throw new AuthenticationError('Authentication required');
            return user;
        },
        async users(_, { limit, offset }, { user }) {
            if (!user)
                throw new AuthenticationError('Authentication required');
            try {
                const userService = UserService_1.UserService.getInstance();
                return await userService.getUsers({ limit, offset });
            }
            catch (error) {
                logger_1.logger.error('Error in users query:', error);
                throw new Error('Failed to fetch users');
            }
        },
        async user(_, { id }, { user }) {
            if (!user)
                throw new AuthenticationError('Authentication required');
            if (id !== user.id) {
                throw new ForbiddenError('Access denied');
            }
            try {
                const userService = UserService_1.UserService.getInstance();
                return await userService.getUserById(id);
            }
            catch (error) {
                logger_1.logger.error('Error in user query:', error);
                throw new Error('Failed to fetch user');
            }
        },
        async defaultRoutines() {
            try {
                const routineService = RoutineService_1.RoutineService.getInstance();
                return routineService.getDefaultRoutines();
            }
            catch (error) {
                logger_1.logger.error('Error in defaultRoutines query:', error);
                throw new Error('Failed to fetch default routines');
            }
        },
        async defaultRoutine(_, { id }) {
            try {
                const routineService = RoutineService_1.RoutineService.getInstance();
                const routine = routineService.getDefaultRoutineById(id);
                if (!routine) {
                    throw new Error('Default routine not found');
                }
                return routine;
            }
            catch (error) {
                logger_1.logger.error('Error in defaultRoutine query:', error);
                throw new Error('Failed to fetch default routine');
            }
        },
        async recommendedRoutine(_, { userLevel }) {
            try {
                const routineService = RoutineService_1.RoutineService.getInstance();
                return routineService.getRecommendedRoutine(userLevel);
            }
            catch (error) {
                logger_1.logger.error('Error in recommendedRoutine query:', error);
                throw new Error('Failed to fetch recommended routine');
            }
        },
    },
    Mutation: {
        async voteWord(_, { wordId, vote }, { user }) {
            if (!user)
                throw new AuthenticationError('Authentication required');
            try {
                const wordService = WordService_1.WordService.getInstance();
                return await wordService.voteOnWord(wordId, user.id, vote);
            }
            catch (error) {
                logger_1.logger.error('Error in voteWord mutation:', error);
                throw new Error('Failed to vote on word');
            }
        },
        async createRoutine(_, { input }, { user }) {
            if (!user)
                throw new AuthenticationError('Authentication required');
            try {
                const routineService = RoutineService_1.RoutineService.getInstance();
                return await routineService.createRoutine(user.id, input);
            }
            catch (error) {
                logger_1.logger.error('Error in createRoutine mutation:', error);
                throw new Error(`Failed to create routine: ${error.message}`);
            }
        },
        async createRoutineFromDefault(_, { defaultRoutineId }, { user }) {
            if (!user)
                throw new AuthenticationError('Authentication required');
            try {
                const routineService = RoutineService_1.RoutineService.getInstance();
                return await routineService.createRoutineFromDefault(user.id, defaultRoutineId);
            }
            catch (error) {
                logger_1.logger.error('Error in createRoutineFromDefault mutation:', error);
                throw new Error(`Failed to create routine from default: ${error.message}`);
            }
        },
        async updateRoutine(_, { id, input }, { user }) {
            if (!user)
                throw new AuthenticationError('Authentication required');
            try {
                const routineService = RoutineService_1.RoutineService.getInstance();
                return await routineService.updateRoutine(id, user.id, input);
            }
            catch (error) {
                logger_1.logger.error('Error in updateRoutine mutation:', error);
                throw new Error(`Failed to update routine: ${error.message}`);
            }
        },
        async deleteRoutine(_, { id }, { user }) {
            if (!user)
                throw new AuthenticationError('Authentication required');
            try {
                const routineService = RoutineService_1.RoutineService.getInstance();
                await routineService.deleteRoutine(id, user.id);
                return true;
            }
            catch (error) {
                logger_1.logger.error('Error in deleteRoutine mutation:', error);
                throw new Error(`Failed to delete routine: ${error.message}`);
            }
        },
        async assignRoutine(_, { routineId, userIds }, { user }) {
            if (!user)
                throw new AuthenticationError('Authentication required');
            try {
                const routineService = RoutineService_1.RoutineService.getInstance();
                await routineService.assignRoutineToUsers(routineId, userIds, user.id);
                return true;
            }
            catch (error) {
                logger_1.logger.error('Error in assignRoutine mutation:', error);
                throw new Error(`Failed to assign routine: ${error.message}`);
            }
        },
        async unassignRoutine(_, { routineId, userIds }, { user }) {
            if (!user)
                throw new AuthenticationError('Authentication required');
            try {
                const routineService = RoutineService_1.RoutineService.getInstance();
                await routineService.unassignRoutineFromUsers(routineId, userIds, user.id);
                return true;
            }
            catch (error) {
                logger_1.logger.error('Error in unassignRoutine mutation:', error);
                throw new Error(`Failed to unassign routine: ${error.message}`);
            }
        },
        async createExerciseSession(_, { input }, { user }) {
            if (!user)
                throw new AuthenticationError('Authentication required');
            try {
                const progressService = ProgressService_1.ProgressService.getInstance();
                return await progressService.createExerciseSession(user.id, input);
            }
            catch (error) {
                logger_1.logger.error('Error in createExerciseSession mutation:', error);
                throw new Error('Failed to create exercise session');
            }
        },
        async updateExerciseSession(_, { id, input }, { user }) {
            if (!user)
                throw new AuthenticationError('Authentication required');
            try {
                const progressService = ProgressService_1.ProgressService.getInstance();
                return await progressService.updateExerciseSession(id, user.id, input);
            }
            catch (error) {
                logger_1.logger.error('Error in updateExerciseSession mutation:', error);
                throw new Error('Failed to update exercise session');
            }
        },
        async addWordAttempt(_, { sessionId, attempt }, { user }) {
            if (!user)
                throw new AuthenticationError('Authentication required');
            try {
                const progressService = ProgressService_1.ProgressService.getInstance();
                return await progressService.addWordAttempt(sessionId, user.id, attempt);
            }
            catch (error) {
                logger_1.logger.error('Error in addWordAttempt mutation:', error);
                throw new Error('Failed to add word attempt');
            }
        },
        async completeExerciseSession(_, { id }, { user }) {
            if (!user)
                throw new AuthenticationError('Authentication required');
            try {
                const progressService = ProgressService_1.ProgressService.getInstance();
                return await progressService.completeExerciseSession(id, user.id);
            }
            catch (error) {
                logger_1.logger.error('Error in completeExerciseSession mutation:', error);
                throw new Error('Failed to complete exercise session');
            }
        },
        async updateProfile(_, { firstName, lastName, email }, { user }) {
            if (!user)
                throw new AuthenticationError('Authentication required');
            try {
                const userService = UserService_1.UserService.getInstance();
                return await userService.updateUser(user.id, { firstName, lastName, email });
            }
            catch (error) {
                logger_1.logger.error('Error in updateProfile mutation:', error);
                throw new Error('Failed to update profile');
            }
        },
    },
    Routine: {
        totalDuration(routine) {
            return routine.getTotalDuration();
        },
        stepCount(routine) {
            return routine.getStepCount();
        },
    },
    ExerciseSession: {
        duration(session) {
            return session.getDuration();
        },
    },
    Word: {
        upvotePercentage(word) {
            return word.getUpvotePercentage();
        },
    },
};
//# sourceMappingURL=resolvers.js.map