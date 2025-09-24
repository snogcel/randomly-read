import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { ExerciseProvider, useExerciseContext } from '../ExerciseContext';
import type { ExerciseWord } from '../ExerciseContext';

// Mock the hooks
jest.mock('../../hooks/useExerciseTimer', () => ({
  useExerciseTimer: jest.fn(() => ({
    timerState: {
      time: 0,
      timeLeft: 3,
      isRunning: false,
      isPaused: false,
      duration: 3,
      startTime: 0,
      lastUpdated: 0
    },
    controls: {
      start: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      reset: jest.fn(),
      setDuration: jest.fn()
    }
  }))
}));

jest.mock('../../hooks/useProgressTracking', () => ({
  useProgressTracking: jest.fn(() => ({
    startSession: jest.fn(),
    endSession: jest.fn(),
    recordWordAttempt: jest.fn(),
    currentProgress: null,
    progressHistory: [],
    stats: null
  }))
}));

describe('ExerciseContext', () => {
  const mockWords: ExerciseWord[] = [
    {
      id: 'word-1',
      lexeme: 'cat',
      phonetic: 'kæt',
      consonants: ['K', 'T'],
      vowels: ['AE'],
      syllables: 1,
      gradeLevel: '1',
      difficulty: 2
    },
    {
      id: 'word-2',
      lexeme: 'dog',
      phonetic: 'dɔg',
      consonants: ['D', 'G'],
      vowels: ['AO'],
      syllables: 1,
      gradeLevel: '1',
      difficulty: 1
    }
  ];

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ExerciseProvider userId="test-user">
      {children}
    </ExerciseProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should provide initial state', () => {
    const { result } = renderHook(() => useExerciseContext(), { wrapper });

    expect(result.current.state.currentSession).toBeNull();
    expect(result.current.state.currentWord).toBeNull();
    expect(result.current.state.sessionHistory).toEqual([]);
    expect(result.current.state.isLoading).toBe(false);
    expect(result.current.state.error).toBeNull();
  });

  it('should start a new session', () => {
    const { result } = renderHook(() => useExerciseContext(), { wrapper });

    act(() => {
      result.current.actions.startSession('test-user', 'routine-1', mockWords);
    });

    expect(result.current.state.currentSession).not.toBeNull();
    expect(result.current.state.currentSession!.userId).toBe('test-user');
    expect(result.current.state.currentSession!.routineId).toBe('routine-1');
    expect(result.current.state.currentSession!.words).toEqual(mockWords);
    expect(result.current.state.currentWord).toEqual(mockWords[0]);
    expect(result.current.state.currentSession!.isActive).toBe(true);
    expect(result.current.state.currentSession!.isPaused).toBe(false);
  });

  it('should end a session', () => {
    const { result } = renderHook(() => useExerciseContext(), { wrapper });

    // Start session first
    act(() => {
      result.current.actions.startSession('test-user', 'routine-1', mockWords);
    });

    expect(result.current.state.currentSession).not.toBeNull();

    // End session
    act(() => {
      result.current.actions.endSession();
    });

    expect(result.current.state.currentSession).toBeNull();
    expect(result.current.state.currentWord).toBeNull();
    expect(result.current.state.sessionHistory).toHaveLength(1);
    expect(result.current.state.sessionHistory[0].endTime).toBeInstanceOf(Date);
  });

  it('should pause and resume session', () => {
    const { result } = renderHook(() => useExerciseContext(), { wrapper });

    // Start session
    act(() => {
      result.current.actions.startSession('test-user', 'routine-1', mockWords);
    });

    // Pause session
    act(() => {
      result.current.actions.pauseSession();
    });

    expect(result.current.state.currentSession!.isPaused).toBe(true);

    // Resume session
    act(() => {
      result.current.actions.resumeSession();
    });

    expect(result.current.state.currentSession!.isPaused).toBe(false);
  });

  it('should navigate to next word', () => {
    const { result } = renderHook(() => useExerciseContext(), { wrapper });

    // Start session
    act(() => {
      result.current.actions.startSession('test-user', 'routine-1', mockWords);
    });

    expect(result.current.state.currentWord).toEqual(mockWords[0]);

    // Go to next word
    act(() => {
      result.current.actions.nextWord();
    });

    expect(result.current.state.currentWord).toEqual(mockWords[1]);
    expect(result.current.state.currentSession!.currentWordIndex).toBe(1);
  });

  it('should navigate to previous word', () => {
    const { result } = renderHook(() => useExerciseContext(), { wrapper });

    // Start session and go to second word
    act(() => {
      result.current.actions.startSession('test-user', 'routine-1', mockWords);
    });

    act(() => {
      result.current.actions.nextWord();
    });

    expect(result.current.state.currentWord).toEqual(mockWords[1]);

    // Go to previous word
    act(() => {
      result.current.actions.previousWord();
    });

    expect(result.current.state.currentWord).toEqual(mockWords[0]);
    expect(result.current.state.currentSession!.currentWordIndex).toBe(0);
  });

  it('should record word attempts', () => {
    const { result } = renderHook(() => useExerciseContext(), { wrapper });

    // Start session
    act(() => {
      result.current.actions.startSession('test-user', 'routine-1', mockWords);
    });

    const attempt = {
      wordId: 'word-1',
      lexeme: 'cat',
      accuracy: 0.9,
      timeSpent: 2500,
      difficulty: 2,
      exerciseType: 'word' as const,
      position: 'initial' as const,
      phonetics: {
        vowels: ['AE'],
        consonants: ['K', 'T'],
        syllables: 1
      }
    };

    act(() => {
      result.current.actions.recordAttempt(attempt);
    });

    expect(result.current.state.currentSession!.attempts).toHaveLength(1);
    expect(result.current.state.currentSession!.attempts[0].lexeme).toBe('cat');
    expect(result.current.state.currentSession!.attempts[0].timestamp).toBeInstanceOf(Date);
  });

  it('should update settings', () => {
    const { result } = renderHook(() => useExerciseContext(), { wrapper });

    const newSettings = {
      duration: 5,
      autoAdvance: false,
      fontSize: 'large' as const
    };

    act(() => {
      result.current.actions.updateSettings(newSettings);
    });

    expect(result.current.state.settings.duration).toBe(5);
    expect(result.current.state.settings.autoAdvance).toBe(false);
    expect(result.current.state.settings.fontSize).toBe('large');
  });

  it('should handle loading and error states', () => {
    const { result } = renderHook(() => useExerciseContext(), { wrapper });

    // Set loading
    act(() => {
      result.current.actions.setLoading(true);
    });

    expect(result.current.state.isLoading).toBe(true);

    // Set error
    act(() => {
      result.current.actions.setError('Test error');
    });

    expect(result.current.state.error).toBe('Test error');
    expect(result.current.state.isLoading).toBe(false);

    // Clear error
    act(() => {
      result.current.actions.clearError();
    });

    expect(result.current.state.error).toBeNull();
  });

  it('should load session history', () => {
    const { result } = renderHook(() => useExerciseContext(), { wrapper });

    const mockHistory = [
      {
        id: 'session-1',
        userId: 'test-user',
        routineId: 'routine-1',
        startTime: new Date(),
        endTime: new Date(),
        currentWordIndex: 0,
        words: mockWords,
        attempts: [],
        isActive: false,
        isPaused: false,
        settings: result.current.state.settings
      }
    ];

    act(() => {
      result.current.actions.loadSessionHistory(mockHistory);
    });

    expect(result.current.state.sessionHistory).toEqual(mockHistory);
  });

  it('should throw error when used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      renderHook(() => useExerciseContext());
    }).toThrow('useExerciseContext must be used within an ExerciseProvider');

    consoleSpy.mockRestore();
  });

  it('should handle session persistence', () => {
    const { result } = renderHook(() => useExerciseContext(), { 
      wrapper: ({ children }) => (
        <ExerciseProvider userId="test-user" persistToStorage={true}>
          {children}
        </ExerciseProvider>
      )
    });

    // Start session
    act(() => {
      result.current.actions.startSession('test-user', 'routine-1', mockWords);
    });

    // Persist session
    act(() => {
      result.current.actions.persistSession();
    });

    // Check if session was saved to localStorage
    const savedSession = localStorage.getItem('currentExerciseSession');
    expect(savedSession).not.toBeNull();
    
    if (savedSession) {
      const parsed = JSON.parse(savedSession);
      expect(parsed.userId).toBe('test-user');
      expect(parsed.routineId).toBe('routine-1');
    }
  });
});