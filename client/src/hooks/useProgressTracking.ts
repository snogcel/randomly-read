import { useState, useCallback, useRef } from 'react';

export interface WordAttempt {
  wordId: string;
  lexeme: string;
  timestamp: Date;
  accuracy?: number;
  timeSpent: number;
  difficulty: number;
  exerciseType: 'word' | 'sentence';
  position: 'initial' | 'medial' | 'final';
  phonetics: {
    vowels: string[];
    consonants: string[];
    syllables: number;
  };
}

export interface ExerciseProgress {
  sessionId: string;
  userId: string;
  routineId: string;
  routineName: string;
  startTime: Date;
  endTime?: Date;
  wordsAttempted: WordAttempt[];
  totalWords: number;
  completedWords: number;
  accuracy: number;
  averageTimePerWord: number;
  difficultWords: WordAttempt[];
  exerciseType: string;
  sessionDuration: number;
}

export interface ProgressStats {
  totalSessions: number;
  totalWordsAttempted: number;
  averageAccuracy: number;
  averageSessionDuration: number;
  improvementTrend: 'improving' | 'stable' | 'declining';
  strongAreas: string[];
  weakAreas: string[];
  recentSessions: ExerciseProgress[];
}

export interface UseProgressTrackingOptions {
  userId: string;
  onProgressUpdate?: (progress: ExerciseProgress) => void;
  onSessionComplete?: (progress: ExerciseProgress) => void;
  autoSave?: boolean;
  saveInterval?: number; // milliseconds
}

/**
 * Hook for tracking exercise progress and word attempts during speech therapy sessions
 */
export const useProgressTracking = (options: UseProgressTrackingOptions) => {
  const { userId, onProgressUpdate, onSessionComplete, autoSave = true, saveInterval = 5000 } = options;

  const [currentProgress, setCurrentProgress] = useState<ExerciseProgress | null>(null);
  const [progressHistory, setProgressHistory] = useState<ExerciseProgress[]>([]);
  const [stats, setStats] = useState<ProgressStats | null>(null);

  const sessionStartTime = useRef<Date | null>(null);
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null);

  // Start a new progress tracking session
  const startSession = useCallback((routineId: string, routineName: string) => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const startTime = new Date();
    sessionStartTime.current = startTime;

    const newProgress: ExerciseProgress = {
      sessionId,
      userId,
      routineId,
      routineName,
      startTime,
      wordsAttempted: [],
      totalWords: 0,
      completedWords: 0,
      accuracy: 0,
      averageTimePerWord: 0,
      difficultWords: [],
      exerciseType: 'mixed',
      sessionDuration: 0
    };

    setCurrentProgress(newProgress);

    // Start auto-save timer if enabled
    if (autoSave) {
      autoSaveTimer.current = setInterval(() => {
        if (onProgressUpdate) {
          onProgressUpdate(newProgress);
        }
      }, saveInterval);
    }

    return sessionId;
  }, [userId, autoSave, saveInterval, onProgressUpdate]);

  // Record a word attempt
  const recordWordAttempt = useCallback((attempt: Omit<WordAttempt, 'timestamp'>) => {
    if (!currentProgress) return;

    const wordAttempt: WordAttempt = {
      ...attempt,
      timestamp: new Date()
    };

    setCurrentProgress(prev => {
      if (!prev) return null;

      const updatedWordsAttempted = [...prev.wordsAttempted, wordAttempt];
      const completedWords = prev.completedWords + 1;
      const totalTimeSpent = updatedWordsAttempted.reduce((sum, w) => sum + w.timeSpent, 0);
      const averageTimePerWord = completedWords > 0 ? totalTimeSpent / completedWords : 0;
      
      // Calculate accuracy (if accuracy data is available)
      const attemptsWithAccuracy = updatedWordsAttempted.filter(w => w.accuracy !== undefined);
      const accuracy = attemptsWithAccuracy.length > 0 
        ? attemptsWithAccuracy.reduce((sum, w) => sum + (w.accuracy || 0), 0) / attemptsWithAccuracy.length
        : 0;

      // Identify difficult words (low accuracy or high time spent)
      const difficultWords = updatedWordsAttempted.filter(w => 
        (w.accuracy !== undefined && w.accuracy < 0.7) || 
        w.timeSpent > averageTimePerWord * 1.5
      );

      const updated = {
        ...prev,
        wordsAttempted: updatedWordsAttempted,
        completedWords,
        accuracy,
        averageTimePerWord,
        difficultWords,
        sessionDuration: Date.now() - prev.startTime.getTime()
      };

      // Call progress update callback
      if (onProgressUpdate) {
        onProgressUpdate(updated);
      }

      return updated;
    });
  }, [currentProgress, onProgressUpdate]);

  // End the current session
  const endSession = useCallback(() => {
    if (!currentProgress) return null;

    const endTime = new Date();
    const finalProgress: ExerciseProgress = {
      ...currentProgress,
      endTime,
      sessionDuration: endTime.getTime() - currentProgress.startTime.getTime()
    };

    // Clear auto-save timer
    if (autoSaveTimer.current) {
      clearInterval(autoSaveTimer.current);
      autoSaveTimer.current = null;
    }

    // Add to history
    setProgressHistory(prev => [...prev, finalProgress]);

    // Call session complete callback
    if (onSessionComplete) {
      onSessionComplete(finalProgress);
    }

    // Clear current progress
    setCurrentProgress(null);
    sessionStartTime.current = null;

    return finalProgress;
  }, [currentProgress, onSessionComplete]);

  // Calculate progress statistics
  const calculateStats = useCallback((sessions: ExerciseProgress[]): ProgressStats => {
    if (sessions.length === 0) {
      return {
        totalSessions: 0,
        totalWordsAttempted: 0,
        averageAccuracy: 0,
        averageSessionDuration: 0,
        improvementTrend: 'stable',
        strongAreas: [],
        weakAreas: [],
        recentSessions: []
      };
    }

    const totalSessions = sessions.length;
    const totalWordsAttempted = sessions.reduce((sum, s) => sum + s.completedWords, 0);
    const averageAccuracy = sessions.reduce((sum, s) => sum + s.accuracy, 0) / totalSessions;
    const averageSessionDuration = sessions.reduce((sum, s) => sum + s.sessionDuration, 0) / totalSessions;

    // Calculate improvement trend (compare recent vs older sessions)
    const recentSessions = sessions.slice(-5); // Last 5 sessions
    const olderSessions = sessions.slice(0, -5);
    
    let improvementTrend: 'improving' | 'stable' | 'declining' = 'stable';
    
    if (olderSessions.length > 0 && recentSessions.length > 0) {
      const recentAvgAccuracy = recentSessions.reduce((sum, s) => sum + s.accuracy, 0) / recentSessions.length;
      const olderAvgAccuracy = olderSessions.reduce((sum, s) => sum + s.accuracy, 0) / olderSessions.length;
      
      const improvement = recentAvgAccuracy - olderAvgAccuracy;
      if (improvement > 0.05) improvementTrend = 'improving';
      else if (improvement < -0.05) improvementTrend = 'declining';
    }

    // Analyze phonetic areas (simplified)
    const allAttempts = sessions.flatMap(s => s.wordsAttempted);
    const phoneticPerformance = new Map<string, { total: number; accurate: number }>();

    allAttempts.forEach(attempt => {
      [...attempt.phonetics.vowels, ...attempt.phonetics.consonants].forEach(phoneme => {
        if (!phoneticPerformance.has(phoneme)) {
          phoneticPerformance.set(phoneme, { total: 0, accurate: 0 });
        }
        const perf = phoneticPerformance.get(phoneme)!;
        perf.total++;
        if (attempt.accuracy && attempt.accuracy > 0.8) {
          perf.accurate++;
        }
      });
    });

    const phoneticAccuracies = Array.from(phoneticPerformance.entries())
      .map(([phoneme, perf]) => ({
        phoneme,
        accuracy: perf.total > 0 ? perf.accurate / perf.total : 0,
        attempts: perf.total
      }))
      .filter(p => p.attempts >= 3); // Only consider phonemes with sufficient data

    const strongAreas = phoneticAccuracies
      .filter(p => p.accuracy > 0.8)
      .sort((a, b) => b.accuracy - a.accuracy)
      .slice(0, 5)
      .map(p => p.phoneme);

    const weakAreas = phoneticAccuracies
      .filter(p => p.accuracy < 0.6)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 5)
      .map(p => p.phoneme);

    return {
      totalSessions,
      totalWordsAttempted,
      averageAccuracy,
      averageSessionDuration,
      improvementTrend,
      strongAreas,
      weakAreas,
      recentSessions: recentSessions.slice(-10) // Last 10 sessions
    };
  }, []);

  // Update stats when history changes
  const updateStats = useCallback(() => {
    const newStats = calculateStats(progressHistory);
    setStats(newStats);
  }, [progressHistory, calculateStats]);

  // Get current session progress
  const getCurrentProgress = useCallback(() => {
    return currentProgress;
  }, [currentProgress]);

  // Get progress history
  const getProgressHistory = useCallback(() => {
    return progressHistory;
  }, [progressHistory]);

  // Get statistics
  const getStats = useCallback(() => {
    if (!stats) {
      updateStats();
    }
    return stats;
  }, [stats, updateStats]);

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    if (autoSaveTimer.current) {
      clearInterval(autoSaveTimer.current);
      autoSaveTimer.current = null;
    }
  }, []);

  return {
    // State
    currentProgress,
    progressHistory,
    stats,
    
    // Actions
    startSession,
    recordWordAttempt,
    endSession,
    getCurrentProgress,
    getProgressHistory,
    getStats,
    updateStats,
    cleanup
  };
};