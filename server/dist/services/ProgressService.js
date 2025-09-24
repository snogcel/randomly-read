"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressService = void 0;
const Progress_1 = require("../models/Progress");
const Routine_1 = require("../models/Routine");
const User_1 = require("../models/User");
const logger_1 = require("../utils/logger");
class ProgressService {
    static getInstance() {
        if (!ProgressService.instance) {
            ProgressService.instance = new ProgressService();
        }
        return ProgressService.instance;
    }
    async createExerciseSession(userId, data) {
        try {
            const user = await User_1.User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            const routine = await Routine_1.Routine.findById(data.routineId);
            if (!routine) {
                throw new Error('Routine not found');
            }
            if (!routine.createdBy.equals(userId) && !routine.assignedUsers.includes(userId)) {
                throw new Error('Access denied to this routine');
            }
            const existingSession = await Progress_1.ExerciseSession.findOne({ sessionId: data.sessionId });
            if (existingSession) {
                throw new Error('Session ID already exists');
            }
            const session = new Progress_1.ExerciseSession({
                userId,
                routineId: data.routineId,
                sessionId: data.sessionId,
                totalWords: data.totalWords,
                notes: data.notes,
                startTime: new Date()
            });
            const savedSession = await session.save();
            logger_1.logger.info(`Exercise session created: ${savedSession.sessionId} for user ${userId}`);
            return savedSession;
        }
        catch (error) {
            logger_1.logger.error('Error creating exercise session:', error);
            throw new Error(`Failed to create exercise session: ${error.message}`);
        }
    }
    async updateExerciseSession(sessionId, userId, data) {
        try {
            const session = await Progress_1.ExerciseSession.findById(sessionId);
            if (!session) {
                throw new Error('Exercise session not found');
            }
            if (!session.userId.equals(userId)) {
                throw new Error('Access denied to this session');
            }
            if (data.endTime)
                session.endTime = data.endTime;
            if (data.totalWords !== undefined)
                session.totalWords = data.totalWords;
            if (data.notes !== undefined)
                session.notes = data.notes;
            if (data.wordsAttempted) {
                session.wordsAttempted = data.wordsAttempted;
                session.completedWords = data.wordsAttempted.length;
                session.accuracy = session.calculateAccuracy();
                session.completionRate = session.calculateCompletionRate();
            }
            const updatedSession = await session.save();
            logger_1.logger.info(`Exercise session updated: ${updatedSession.sessionId}`);
            return updatedSession;
        }
        catch (error) {
            logger_1.logger.error('Error updating exercise session:', error);
            throw new Error(`Failed to update exercise session: ${error.message}`);
        }
    }
    async addWordAttempt(sessionId, userId, attempt) {
        try {
            const session = await Progress_1.ExerciseSession.findById(sessionId);
            if (!session) {
                throw new Error('Exercise session not found');
            }
            if (!session.userId.equals(userId)) {
                throw new Error('Access denied to this session');
            }
            if (!attempt.timestamp) {
                attempt.timestamp = new Date();
            }
            session.addWordAttempt(attempt);
            const progressRecord = new Progress_1.ProgressRecord({
                userId,
                routineId: session.routineId,
                sessionId: session._id,
                wordId: attempt.wordId,
                timestamp: attempt.timestamp,
                accuracy: attempt.accuracy,
                timeSpent: attempt.timeSpent,
                difficulty: attempt.difficulty,
                position: attempt.position,
                consonant: attempt.consonant,
                vowel: attempt.vowel,
                syllables: 1
            });
            await progressRecord.save();
            const updatedSession = await session.save();
            logger_1.logger.info(`Word attempt added to session: ${session.sessionId}`);
            return updatedSession;
        }
        catch (error) {
            logger_1.logger.error('Error adding word attempt:', error);
            throw new Error(`Failed to add word attempt: ${error.message}`);
        }
    }
    async completeExerciseSession(sessionId, userId) {
        try {
            const session = await Progress_1.ExerciseSession.findById(sessionId);
            if (!session) {
                throw new Error('Exercise session not found');
            }
            if (!session.userId.equals(userId)) {
                throw new Error('Access denied to this session');
            }
            session.markComplete();
            const completedSession = await session.save();
            logger_1.logger.info(`Exercise session completed: ${session.sessionId}`);
            return completedSession;
        }
        catch (error) {
            logger_1.logger.error('Error completing exercise session:', error);
            throw new Error(`Failed to complete exercise session: ${error.message}`);
        }
    }
    async getExerciseSessions(userId, options = {}) {
        try {
            const filter = { userId };
            if (options.routineId) {
                filter.routineId = options.routineId;
            }
            if (options.startDate || options.endDate) {
                filter.startTime = {};
                if (options.startDate)
                    filter.startTime.$gte = options.startDate;
                if (options.endDate)
                    filter.startTime.$lte = options.endDate;
            }
            const limit = options.limit || 20;
            const offset = options.offset || 0;
            const sessions = await Progress_1.ExerciseSession.find(filter)
                .populate('routineId', 'name description')
                .sort({ startTime: -1 })
                .skip(offset)
                .limit(limit);
            return sessions;
        }
        catch (error) {
            logger_1.logger.error('Error getting exercise sessions:', error);
            throw new Error('Failed to get exercise sessions');
        }
    }
    async getExerciseSessionById(sessionId) {
        try {
            return await Progress_1.ExerciseSession.findById(sessionId)
                .populate('routineId', 'name description')
                .populate('difficultWords');
        }
        catch (error) {
            logger_1.logger.error('Error getting exercise session by ID:', error);
            throw new Error('Failed to get exercise session');
        }
    }
    async getProgressRecords(userId, options = {}) {
        try {
            const filter = { userId };
            if (options.routineId) {
                filter.routineId = options.routineId;
            }
            if (options.startDate || options.endDate) {
                filter.timestamp = {};
                if (options.startDate)
                    filter.timestamp.$gte = options.startDate;
                if (options.endDate)
                    filter.timestamp.$lte = options.endDate;
            }
            if (options.consonant) {
                filter.consonant = options.consonant;
            }
            if (options.vowel) {
                filter.vowel = options.vowel;
            }
            if (options.position) {
                filter.position = options.position;
            }
            const records = await Progress_1.ProgressRecord.find(filter)
                .populate('wordId', 'lexeme type subtype')
                .populate('routineId', 'name')
                .sort({ timestamp: -1 });
            return records;
        }
        catch (error) {
            logger_1.logger.error('Error getting progress records:', error);
            throw new Error('Failed to get progress records');
        }
    }
    async generateFluencyReport(userId, routineId, startDate, endDate) {
        try {
            const existingReport = await Progress_1.FluencyReport.findOne({
                userId,
                routineId,
                'dateRange.start': startDate,
                'dateRange.end': endDate
            });
            if (existingReport) {
                return existingReport;
            }
            const progressRecords = await this.getProgressRecords(userId, {
                routineId,
                startDate,
                endDate
            });
            const sessions = await this.getExerciseSessions(userId, {
                routineId,
                startDate,
                endDate
            });
            const totalSessions = sessions.length;
            const totalWords = progressRecords.length;
            const averageAccuracy = totalWords > 0
                ? Math.round(progressRecords.reduce((sum, record) => sum + record.accuracy, 0) / totalWords)
                : 0;
            const completedSessions = sessions.filter(session => session.endTime);
            const averageSessionDuration = completedSessions.length > 0
                ? Math.round(completedSessions.reduce((sum, session) => sum + session.getDuration(), 0) / completedSessions.length)
                : 0;
            const improvementTrend = this.calculateImprovementTrend(progressRecords);
            const difficultPhonemes = this.calculateDifficultPhonemes(progressRecords);
            const recommendations = this.generateRecommendations(averageAccuracy, difficultPhonemes);
            const report = new Progress_1.FluencyReport({
                userId,
                routineId,
                reportDate: new Date(),
                dateRange: { start: startDate, end: endDate },
                totalSessions,
                totalWords,
                averageAccuracy,
                averageSessionDuration,
                improvementTrend,
                difficultPhonemes,
                recommendations
            });
            const savedReport = await report.save();
            logger_1.logger.info(`Fluency report generated for user ${userId}, routine ${routineId}`);
            return savedReport;
        }
        catch (error) {
            logger_1.logger.error('Error generating fluency report:', error);
            throw new Error('Failed to generate fluency report');
        }
    }
    calculateImprovementTrend(records) {
        if (records.length < 10)
            return 'stable';
        const sortedRecords = records.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        const midPoint = Math.floor(sortedRecords.length / 2);
        const firstHalf = sortedRecords.slice(0, midPoint);
        const secondHalf = sortedRecords.slice(midPoint);
        const firstHalfAvg = firstHalf.reduce((sum, record) => sum + record.accuracy, 0) / firstHalf.length;
        const secondHalfAvg = secondHalf.reduce((sum, record) => sum + record.accuracy, 0) / secondHalf.length;
        const improvement = secondHalfAvg - firstHalfAvg;
        if (improvement > 5)
            return 'improving';
        if (improvement < -5)
            return 'declining';
        return 'stable';
    }
    calculateDifficultPhonemes(records) {
        const phonemeStats = new Map();
        records.forEach(record => {
            const key = `${record.consonant}-${record.vowel}-${record.position}`;
            const existing = phonemeStats.get(key) || { totalAccuracy: 0, count: 0 };
            phonemeStats.set(key, {
                totalAccuracy: existing.totalAccuracy + record.accuracy,
                count: existing.count + 1
            });
        });
        const difficultPhonemes = [];
        phonemeStats.forEach((stats, key) => {
            const [consonant, vowel, position] = key.split('-');
            const accuracy = Math.round(stats.totalAccuracy / stats.count);
            if (accuracy < 70 && stats.count >= 3) {
                difficultPhonemes.push({
                    consonant,
                    vowel,
                    position,
                    accuracy,
                    frequency: stats.count
                });
            }
        });
        return difficultPhonemes
            .sort((a, b) => a.accuracy - b.accuracy)
            .slice(0, 10);
    }
    generateRecommendations(averageAccuracy, difficultPhonemes) {
        const recommendations = [];
        if (averageAccuracy < 60) {
            recommendations.push('Consider slowing down the exercise pace to improve accuracy');
            recommendations.push('Focus on fewer phoneme combinations to build confidence');
        }
        else if (averageAccuracy < 80) {
            recommendations.push('Good progress! Try increasing exercise difficulty gradually');
        }
        else {
            recommendations.push('Excellent accuracy! Consider advancing to more complex exercises');
        }
        if (difficultPhonemes.length > 0) {
            const topDifficult = difficultPhonemes[0];
            recommendations.push(`Focus additional practice on ${topDifficult.consonant}-${topDifficult.vowel} combinations in ${topDifficult.position} position`);
        }
        if (difficultPhonemes.length > 5) {
            recommendations.push('Consider working with a speech therapist to address multiple challenging phoneme patterns');
        }
        return recommendations;
    }
}
exports.ProgressService = ProgressService;
//# sourceMappingURL=ProgressService.js.map