import { renderHook, act } from '@testing-library/react';
import { useProgressTracking, WordAttempt } from '../useProgressTracking';

// Mock timers for auto-save functionality
jest.useFakeTimers();

describe('useProgressTracking', () => {
  const mockUserId = 'user-123';
  const mockRoutineId = 'routine-456';
  const mockRoutineName = 'Test Routine';

  beforeEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useProgressTracking({ userId: mockUserId }));

    expect(result.current.currentProgress).toBeNull();
    expect(result.current.progressHistory).toEqual([]);
    expect(result.current.stats).toBeNull();
  });

  it('should start a new session correctly', () => {
    const { result } = renderHook(() => useProgressTracking({ userId: mockUserId }));

    let sessionId: string;
    act(() => {
      sessionId = result.current.startSession(mockRoutineId, mockRoutineName);
    });

    expect(result.current.currentProgress).not.toBeNull();
    expect(result.current.currentProgress!.sessionId).toBe(sessionId);
    expect(result.current.currentProgress!.userId).toBe(mockUserId);
    expect(result.current.currentProgress!.routineId).toBe(mockRoutineId);
    expect(result.current.currentProgress!.routineName).toBe(mockRoutineName);
    expect(result.current.currentProgress!.wordsAttempted).toEqual([]);
    expect(result.current.currentProgress!.completedWords).toBe(0);
  });

  it('should record word attempts correctly', () => {
    const { result } = renderHook(() => useProgressTracking({ userId: mockUserId }));

    act(() => {
      result.current.startSession(mockRoutineId, mockRoutineName);
    });

    const wordAttempt: Omit<WordAttempt, 'timestamp'> = {
      wordId: 'word-1',
      lexeme: 'cat',
      accuracy: 0.9,
      timeSpent: 2500,
      difficulty: 3,
      exerciseType: 'word',
      position: 'initial',
      phonetics: {
        vowels: ['A'],
        consonants: ['C', 'T'],
        syllables: 1
      }
    };

    act(() => {
      result.current.recordWordAttempt(wordAttempt);
    });

    expect(result.current.currentProgress!.wordsAttempted).toHaveLength(1);
    expect(result.current.currentProgress!.completedWords).toBe(1);
    expect(result.current.currentProgress!.wordsAttempted[0].lexeme).toBe('cat');
    expect(result.current.currentProgress!.wordsAttempted[0].timestamp).toBeInstanceOf(Date);
  });

  it('should calculate accuracy correctly', () => {
    const { result } = renderHook(() => useProgressTracking({ userId: mockUserId }));

    act(() => {
      result.current.startSession(mockRoutineId, mockRoutineName);
    });

    // Record multiple attempts with different accuracies
    act(() => {
      result.current.recordWordAttempt({
        wordId: 'word-1',
        lexeme: 'cat',
        accuracy: 0.8,
        timeSpent: 2000,
        difficulty: 2,
        exerciseType: 'word',
        position: 'initial',
        phonetics: { vowels: ['A'], consonants: ['C', 'T'], syllables: 1 }
      });
    });

    act(() => {
      result.current.recordWordAttempt({
        wordId: 'word-2',
        lexeme: 'dog',
        accuracy: 1.0,
        timeSpent: 1500,
        difficulty: 1,
        exerciseType: 'word',
        position: 'initial',
        phonetics: { vowels: ['O'], consonants: ['D', 'G'], syllables: 1 }
      });
    });

    // Average accuracy should be (0.8 + 1.0) / 2 = 0.9
    expect(result.current.currentProgress!.accuracy).toBeCloseTo(0.9, 1);
  });

  it('should calculate average time per word correctly', () => {
    const { result } = renderHook(() => useProgressTracking({ userId: mockUserId }));

    act(() => {
      result.current.startSession(mockRoutineId, mockRoutineName);
    });

    act(() => {
      result.current.recordWordAttempt({
        wordId: 'word-1',
        lexeme: 'cat',
        timeSpent: 2000,
        difficulty: 2,
        exerciseType: 'word',
        position: 'initial',
        phonetics: { vowels: ['A'], consonants: ['C', 'T'], syllables: 1 }
      });
    });

    act(() => {
      result.current.recordWordAttempt({
        wordId: 'word-2',
        lexeme: 'dog',
        timeSpent: 3000,
        difficulty: 1,
        exerciseType: 'word',
        position: 'initial',
        phonetics: { vowels: ['O'], consonants: ['D', 'G'], syllables: 1 }
      });
    });

    // Average time should be (2000 + 3000) / 2 = 2500
    expect(result.current.currentProgress!.averageTimePerWord).toBe(2500);
  });

  it('should identify difficult words correctly', () => {
    const { result } = renderHook(() => useProgressTracking({ userId: mockUserId }));

    act(() => {
      result.current.startSession(mockRoutineId, mockRoutineName);
    });

    // Add a word with low accuracy (should be marked as difficult)
    act(() => {
      result.current.recordWordAttempt({
        wordId: 'word-1',
        lexeme: 'difficult',
        accuracy: 0.5, // Low accuracy
        timeSpent: 2000,
        difficulty: 5,
        exerciseType: 'word',
        position: 'initial',
        phonetics: { vowels: ['I'], consonants: ['D', 'F', 'C', 'L', 'T'], syllables: 3 }
      });
    });

    // Add a normal word
    act(() => {
      result.current.recordWordAttempt({
        wordId: 'word-2',
        lexeme: 'easy',
        accuracy: 0.9,
        timeSpent: 1000,
        difficulty: 1,
        exerciseType: 'word',
        position: 'initial',
        phonetics: { vowels: ['E'], consonants: ['S', 'Y'], syllables: 2 }
      });
    });

    expect(result.current.currentProgress!.difficultWords).toHaveLength(1);
    expect(result.current.currentProgress!.difficultWords[0].lexeme).toBe('difficult');
  });

  it('should end session correctly', () => {
    const onSessionComplete = jest.fn();
    const { result } = renderHook(() => useProgressTracking({ 
      userId: mockUserId,
      onSessionComplete 
    }));

    act(() => {
      result.current.startSession(mockRoutineId, mockRoutineName);
    });

    act(() => {
      result.current.recordWordAttempt({
        wordId: 'word-1',
        lexeme: 'test',
        timeSpent: 2000,
        difficulty: 2,
        exerciseType: 'word',
        position: 'initial',
        phonetics: { vowels: ['E'], consonants: ['T', 'S'], syllables: 1 }
      });
    });

    let finalProgress;
    act(() => {
      finalProgress = result.current.endSession();
    });

    expect(finalProgress).not.toBeNull();
    expect(finalProgress!.endTime).toBeInstanceOf(Date);
    expect(result.current.currentProgress).toBeNull();
    expect(result.current.progressHistory).toHaveLength(1);
    expect(onSessionComplete).toHaveBeenCalledWith(finalProgress);
  });

  it('should handle auto-save functionality', () => {
    const onProgressUpdate = jest.fn();
    const { result } = renderHook(() => useProgressTracking({ 
      userId: mockUserId,
      onProgressUpdate,
      autoSave: true,
      saveInterval: 1000
    }));

    act(() => {
      result.current.startSession(mockRoutineId, mockRoutineName);
    });

    // Fast-forward time to trigger auto-save
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(onProgressUpdate).toHaveBeenCalled();
  });

  it('should calculate statistics correctly', () => {
    const { result } = renderHook(() => useProgressTracking({ userId: mockUserId }));

    // Create multiple sessions
    act(() => {
      result.current.startSession(mockRoutineId, mockRoutineName);
    });

    act(() => {
      result.current.recordWordAttempt({
        wordId: 'word-1',
        lexeme: 'cat',
        accuracy: 0.8,
        timeSpent: 2000,
        difficulty: 2,
        exerciseType: 'word',
        position: 'initial',
        phonetics: { vowels: ['A'], consonants: ['C', 'T'], syllables: 1 }
      });
    });

    act(() => {
      result.current.endSession();
    });

    // Start second session
    act(() => {
      result.current.startSession(mockRoutineId, mockRoutineName);
    });

    act(() => {
      result.current.recordWordAttempt({
        wordId: 'word-2',
        lexeme: 'dog',
        accuracy: 0.9,
        timeSpent: 1500,
        difficulty: 1,
        exerciseType: 'word',
        position: 'initial',
        phonetics: { vowels: ['O'], consonants: ['D', 'G'], syllables: 1 }
      });
    });

    act(() => {
      result.current.endSession();
    });

    act(() => {
      result.current.updateStats();
    });

    const stats = result.current.getStats();
    expect(stats).not.toBeNull();
    expect(stats!.totalSessions).toBe(2);
    expect(stats!.totalWordsAttempted).toBe(2);
    expect(stats!.averageAccuracy).toBeCloseTo(0.85, 1);
  });

  it('should not record attempts without active session', () => {
    const { result } = renderHook(() => useProgressTracking({ userId: mockUserId }));

    act(() => {
      result.current.recordWordAttempt({
        wordId: 'word-1',
        lexeme: 'test',
        timeSpent: 2000,
        difficulty: 2,
        exerciseType: 'word',
        position: 'initial',
        phonetics: { vowels: ['E'], consonants: ['T', 'S'], syllables: 1 }
      });
    });

    expect(result.current.currentProgress).toBeNull();
  });

  it('should cleanup auto-save timer', () => {
    const { result } = renderHook(() => useProgressTracking({ 
      userId: mockUserId,
      autoSave: true,
      saveInterval: 1000
    }));

    act(() => {
      result.current.startSession(mockRoutineId, mockRoutineName);
    });

    act(() => {
      result.current.cleanup();
    });

    // Timer should be cleaned up
    expect(jest.getTimerCount()).toBe(0);
  });

  it('should handle sessions without accuracy data', () => {
    const { result } = renderHook(() => useProgressTracking({ userId: mockUserId }));

    act(() => {
      result.current.startSession(mockRoutineId, mockRoutineName);
    });

    act(() => {
      result.current.recordWordAttempt({
        wordId: 'word-1',
        lexeme: 'test',
        // No accuracy provided
        timeSpent: 2000,
        difficulty: 2,
        exerciseType: 'word',
        position: 'initial',
        phonetics: { vowels: ['E'], consonants: ['T', 'S'], syllables: 1 }
      });
    });

    expect(result.current.currentProgress!.accuracy).toBe(0);
  });
});