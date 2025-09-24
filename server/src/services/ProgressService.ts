import { ExerciseSession, IExerciseSession, ProgressRecord, IProgressRecord, FluencyReport, IFluencyReport, IWordAttempt } from '../models/Progress';
import { Routine } from '../models/Routine';
import { User } from '../models/User';
import { logger } from '../utils/logger';
import mongoose from 'mongoose';

export interface CreateExerciseSessionData {
  routineId: string;
  sessionId: string;
  totalWords: number;
  notes?: string;
}

export interface UpdateExerciseSessionData {
  endTime?: Date;
  wordsAttempted?: IWordAttempt[];
  totalWords?: number;
  notes?: string;
}

export interface ExerciseSessionQueryOptions {
  routineId?: string;
  limit?: number;
  offset?: number;
  startDate?: Date;
  endDate?: Date;
}

export interface ProgressRecordQueryOptions {
  routineId?: string;
  startDate?: Date;
  endDate?: Date;
  consonant?: string;
  vowel?: string;
  position?: string;
}

export class ProgressService {
  private static instance: ProgressService;
  
  public static getInstance(): ProgressService {
    if (!ProgressService.instance) {
      ProgressService.instance = new ProgressService();
    }
    return ProgressService.instance;
  }

  /**
   * Create a new exercise session
   */
  async createExerciseSession(userId: string, data: CreateExerciseSessionData): Promise<IExerciseSession> {
    try {
      // Validate user exists
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Validate routine exists and user has access
      const routine = await Routine.findById(data.routineId);
      if (!routine) {
        throw new Error('Routine not found');
      }

      if (!routine.createdBy.equals(userId) && !routine.assignedUsers.includes(userId as any)) {
        throw new Error('Access denied to this routine');
      }

      // Check if session ID is unique
      const existingSession = await ExerciseSession.findOne({ sessionId: data.sessionId });
      if (existingSession) {
        throw new Error('Session ID already exists');
      }

      const session = new ExerciseSession({
        userId,
        routineId: data.routineId,
        sessionId: data.sessionId,
        totalWords: data.totalWords,
        notes: data.notes,
        startTime: new Date()
      });

      const savedSession = await session.save();
      logger.info(`Exercise session created: ${savedSession.sessionId} for user ${userId}`);
      
      return savedSession;
      
    } catch (error) {
      logger.error('Error creating exercise session:', error);
      throw new Error(`Failed to create exercise session: ${error.message}`);
    }
  }

  /**
   * Update exercise session
   */
  async updateExerciseSession(sessionId: string, userId: string, data: UpdateExerciseSessionData): Promise<IExerciseSession> {
    try {
      const session = await ExerciseSession.findById(sessionId);
      if (!session) {
        throw new Error('Exercise session not found');
      }

      // Check if user owns this session
      if (!session.userId.equals(userId)) {
        throw new Error('Access denied to this session');
      }

      // Update session data
      if (data.endTime) session.endTime = data.endTime;
      if (data.totalWords !== undefined) session.totalWords = data.totalWords;
      if (data.notes !== undefined) session.notes = data.notes;
      
      if (data.wordsAttempted) {
        session.wordsAttempted = data.wordsAttempted;
        session.completedWords = data.wordsAttempted.length;
        session.accuracy = session.calculateAccuracy();
        session.completionRate = session.calculateCompletionRate();
      }

      const updatedSession = await session.save();
      logger.info(`Exercise session updated: ${updatedSession.sessionId}`);
      
      return updatedSession;
      
    } catch (error) {
      logger.error('Error updating exercise session:', error);
      throw new Error(`Failed to update exercise session: ${error.message}`);
    }
  }

  /**
   * Add word attempt to session
   */
  async addWordAttempt(sessionId: string, userId: string, attempt: IWordAttempt): Promise<IExerciseSession> {
    try {
      const session = await ExerciseSession.findById(sessionId);
      if (!session) {
        throw new Error('Exercise session not found');
      }

      // Check if user owns this session
      if (!session.userId.equals(userId)) {
        throw new Error('Access denied to this session');
      }

      // Add timestamp if not provided
      if (!attempt.timestamp) {
        attempt.timestamp = new Date();
      }

      // Add word attempt
      session.addWordAttempt(attempt);
      
      // Create progress record
      const progressRecord = new ProgressRecord({
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
        syllables: 1 // This should be derived from the word data
      });

      await progressRecord.save();
      
      const updatedSession = await session.save();
      logger.info(`Word attempt added to session: ${session.sessionId}`);
      
      return updatedSession;
      
    } catch (error) {
      logger.error('Error adding word attempt:', error);
      throw new Error(`Failed to add word attempt: ${error.message}`);
    }
  }

  /**
   * Complete exercise session
   */
  async completeExerciseSession(sessionId: string, userId: string): Promise<IExerciseSession> {
    try {
      const session = await ExerciseSession.findById(sessionId);
      if (!session) {
        throw new Error('Exercise session not found');
      }

      // Check if user owns this session
      if (!session.userId.equals(userId)) {
        throw new Error('Access denied to this session');
      }

      session.markComplete();
      
      const completedSession = await session.save();
      logger.info(`Exercise session completed: ${session.sessionId}`);
      
      return completedSession;
      
    } catch (error) {
      logger.error('Error completing exercise session:', error);
      throw new Error(`Failed to complete exercise session: ${error.message}`);
    }
  }

  /**
   * Get exercise sessions for a user
   */
  async getExerciseSessions(userId: string, options: ExerciseSessionQueryOptions = {}): Promise<IExerciseSession[]> {
    try {
      const filter: any = { userId };
      
      if (options.routineId) {
        filter.routineId = options.routineId;
      }
      
      if (options.startDate || options.endDate) {
        filter.startTime = {};
        if (options.startDate) filter.startTime.$gte = options.startDate;
        if (options.endDate) filter.startTime.$lte = options.endDate;
      }

      const limit = options.limit || 20;
      const offset = options.offset || 0;

      const sessions = await ExerciseSession.find(filter)
        .populate('routineId', 'name description')
        .sort({ startTime: -1 })
        .skip(offset)
        .limit(limit);

      return sessions;
      
    } catch (error) {
      logger.error('Error getting exercise sessions:', error);
      throw new Error('Failed to get exercise sessions');
    }
  }

  /**
   * Get exercise session by ID
   */
  async getExerciseSessionById(sessionId: string): Promise<IExerciseSession | null> {
    try {
      return await ExerciseSession.findById(sessionId)
        .populate('routineId', 'name description')
        .populate('difficultWords');
    } catch (error) {
      logger.error('Error getting exercise session by ID:', error);
      throw new Error('Failed to get exercise session');
    }
  }

  /**
   * Get progress records for a user
   */
  async getProgressRecords(userId: string, options: ProgressRecordQueryOptions = {}): Promise<IProgressRecord[]> {
    try {
      const filter: any = { userId };
      
      if (options.routineId) {
        filter.routineId = options.routineId;
      }
      
      if (options.startDate || options.endDate) {
        filter.timestamp = {};
        if (options.startDate) filter.timestamp.$gte = options.startDate;
        if (options.endDate) filter.timestamp.$lte = options.endDate;
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

      const records = await ProgressRecord.find(filter)
        .populate('wordId', 'lexeme type subtype')
        .populate('routineId', 'name')
        .sort({ timestamp: -1 });

      return records;
      
    } catch (error) {
      logger.error('Error getting progress records:', error);
      throw new Error('Failed to get progress records');
    }
  }

  /**
   * Generate fluency report
   */
  async generateFluencyReport(userId: string, routineId: string, startDate: Date, endDate: Date): Promise<IFluencyReport> {
    try {
      // Check if report already exists
      const existingReport = await FluencyReport.findOne({
        userId,
        routineId,
        'dateRange.start': startDate,
        'dateRange.end': endDate
      });

      if (existingReport) {
        return existingReport;
      }

      // Get progress records for the date range
      const progressRecords = await this.getProgressRecords(userId, {
        routineId,
        startDate,
        endDate
      });

      // Get exercise sessions for the date range
      const sessions = await this.getExerciseSessions(userId, {
        routineId,
        startDate,
        endDate
      });

      // Calculate statistics
      const totalSessions = sessions.length;
      const totalWords = progressRecords.length;
      const averageAccuracy = totalWords > 0 
        ? Math.round(progressRecords.reduce((sum, record) => sum + record.accuracy, 0) / totalWords)
        : 0;
      
      const completedSessions = sessions.filter(session => session.endTime);
      const averageSessionDuration = completedSessions.length > 0
        ? Math.round(completedSessions.reduce((sum, session) => sum + session.getDuration(), 0) / completedSessions.length)
        : 0;

      // Calculate improvement trend
      const improvementTrend = this.calculateImprovementTrend(progressRecords);

      // Calculate difficult phonemes
      const difficultPhonemes = this.calculateDifficultPhonemes(progressRecords);

      // Generate recommendations
      const recommendations = this.generateRecommendations(averageAccuracy, difficultPhonemes);

      // Create fluency report
      const report = new FluencyReport({
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
      logger.info(`Fluency report generated for user ${userId}, routine ${routineId}`);
      
      return savedReport;
      
    } catch (error) {
      logger.error('Error generating fluency report:', error);
      throw new Error('Failed to generate fluency report');
    }
  }

  /**
   * Calculate improvement trend from progress records
   */
  private calculateImprovementTrend(records: IProgressRecord[]): 'improving' | 'stable' | 'declining' {
    if (records.length < 10) return 'stable';

    // Sort by timestamp
    const sortedRecords = records.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    
    // Split into first and second half
    const midPoint = Math.floor(sortedRecords.length / 2);
    const firstHalf = sortedRecords.slice(0, midPoint);
    const secondHalf = sortedRecords.slice(midPoint);
    
    const firstHalfAvg = firstHalf.reduce((sum, record) => sum + record.accuracy, 0) / firstHalf.length;
    const secondHalfAvg = secondHalf.reduce((sum, record) => sum + record.accuracy, 0) / secondHalf.length;
    
    const improvement = secondHalfAvg - firstHalfAvg;
    
    if (improvement > 5) return 'improving';
    if (improvement < -5) return 'declining';
    return 'stable';
  }

  /**
   * Calculate difficult phonemes from progress records
   */
  private calculateDifficultPhonemes(records: IProgressRecord[]): Array<{
    consonant: string;
    vowel: string;
    position: string;
    accuracy: number;
    frequency: number;
  }> {
    const phonemeStats = new Map<string, { totalAccuracy: number; count: number }>();
    
    records.forEach(record => {
      const key = `${record.consonant}-${record.vowel}-${record.position}`;
      const existing = phonemeStats.get(key) || { totalAccuracy: 0, count: 0 };
      
      phonemeStats.set(key, {
        totalAccuracy: existing.totalAccuracy + record.accuracy,
        count: existing.count + 1
      });
    });
    
    const difficultPhonemes: Array<{
      consonant: string;
      vowel: string;
      position: string;
      accuracy: number;
      frequency: number;
    }> = [];
    
    phonemeStats.forEach((stats, key) => {
      const [consonant, vowel, position] = key.split('-');
      const accuracy = Math.round(stats.totalAccuracy / stats.count);
      
      // Consider phonemes with accuracy < 70% as difficult
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
    
    // Sort by accuracy (lowest first) and limit to top 10
    return difficultPhonemes
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 10);
  }

  /**
   * Generate recommendations based on performance
   */
  private generateRecommendations(averageAccuracy: number, difficultPhonemes: any[]): string[] {
    const recommendations: string[] = [];
    
    if (averageAccuracy < 60) {
      recommendations.push('Consider slowing down the exercise pace to improve accuracy');
      recommendations.push('Focus on fewer phoneme combinations to build confidence');
    } else if (averageAccuracy < 80) {
      recommendations.push('Good progress! Try increasing exercise difficulty gradually');
    } else {
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