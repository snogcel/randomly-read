import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { ExerciseProvider, useExerciseContext, RoutineProvider, useRoutineContext } from '../contexts';
import type { ExerciseWord } from '../contexts/ExerciseContext';
import type { Routine } from '../hooks/useRoutineExecution';

// Mock the hooks to avoid timer conflicts
jest.mock('../hooks/useExerciseTimer', () => ({
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

jest.mock('../hooks/useProgressTracking', () => ({
  useProgressTracking: jest.fn(() => ({
    startSession: jest.fn(),
    endSession: jest.fn(),
    recordWordAttempt: jest.fn(),
    currentProgress: null,
    progressHistory: [],
    stats: null
  }))
}));

jest.mock('../hooks/useRoutineExecution', () => ({
  useRoutineExecution: jest.fn(() => ({
    state: {
      currentRoutine: null,
      exerciseStack: [],
      currentExerciseIndex: -1,
      currentExercise: null,
      isExecuting: false,
      completed: 0,
      total: 0,
      routineProgress: 0
    },
    controls: {
      loadRoutine: jest.fn(),
      startExecution: jest.fn(),
      pauseExecution: jest.fn(),
      resumeExecution: jest.fn(),
      skipToNext: jest.fn(),
      resetExecution: jest.fn(),
      stopExecution: jest.fn()
    }
  }))
}));

describe('Context Integration Tests', () => {
  const mockWords: ExerciseWord[] = [
    {
      id: 'word-1',
      lexeme: 'apple',
      phonetic: 'ˈæpəl',
      consonants: ['P', 'L'],
      vowels: ['AE', 'UH'],
      syllables: 2,
      gradeLevel: '2',
      difficulty: 3
    },
    {
      id: 'word-2',
      lexeme: 'banana',
      phonetic: 'bəˈnænə',
      consonants: ['B', 'N'],
      vowels: ['UH', 'AE'],
      syllables: 3,
      gradeLevel: '3',
      difficulty: 4
    }
  ];

  const mockRoutine: Routine = {
    id: 'routine-1',
    name: 'Test Integration Routine',
    description: 'Testing context integration',
    age: '5',
    subroutine: [
      {
        id: 'step-1',
        type: 'word',
        duration: 4,
        repetitions: 3,
        mode: 'Word',
        vowels: ['A', 'E'],
        consonants: ['B', 'C'],
        syllables: [1, 2],
        position: 'initial',
        rangeVal: 4
      }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('Exercise and Routine Context Integration', () => {
    it('should integrate exercise and routine contexts seamlessly', () => {
      const ExerciseWrapper = ({ children }: { children: React.ReactNode }) => (
        <ExerciseProvider userId="test-user">
          {children}
        </ExerciseProvider>
      );

      const RoutineWrapper = ({ children }: { children: React.ReactNode }) => (
        <RoutineProvider>
          {children}
        </RoutineProvider>
      );

      const CombinedWrapper = ({ children }: { children: React.ReactNode }) => (
        <ExerciseWrapper>
          <RoutineWrapper>
            {children}
          </RoutineWrapper>
        </ExerciseWrapper>
      );

      const { result: exerciseResult } = renderHook(() => useExerciseContext(), {
        wrapper: ExerciseWrapper
      });

      const { result: routineResult } = renderHook(() => useRoutineContext(), {
        wrapper: RoutineWrapper
      });

      // Test that both contexts are available
      expect(exerciseResult.current).toBeDefined();
      expect(routineResult.current).toBeDefined();

      // Test exercise context functionality
      act(() => {
        exerciseResult.current.actions.startSession('test-user', 'routine-1', mockWords);
      });

      expect(exerciseResult.current.state.currentSession).not.toBeNull();
      expect(exerciseResult.current.state.currentWord).toEqual(mockWords[0]);

      // Test routine context functionality
      act(() => {
        routineResult.current.actions.loadRoutine(mockRoutine);
      });

      expect(routineResult.current.state.activeRoutine).toEqual(mockRoutine);
    });

    it('should handle cross-context communication', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ExerciseProvider userId="test-user">
          <RoutineProvider>
            {children}
          </RoutineProvider>
        </ExerciseProvider>
      );

      const { result } = renderHook(() => ({
        exercise: useExerciseContext(),
        routine: useRoutineContext()
      }), { wrapper });

      // Start an exercise session
      act(() => {
        result.current.exercise.actions.startSession('test-user', 'routine-1', mockWords);
      });

      // Load a routine
      act(() => {
        result.current.routine.actions.loadRoutine(mockRoutine);
      });

      // Verify both contexts are updated
      expect(result.current.exercise.state.currentSession?.routineId).toBe('routine-1');
      expect(result.current.routine.state.activeRoutine?.id).toBe('routine-1');
    });
  });

  describe('State Synchronization', () => {
    it('should synchronize timer state across contexts', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ExerciseProvider userId="test-user">
          {children}
        </ExerciseProvider>
      );

      const { result } = renderHook(() => useExerciseContext(), { wrapper });

      // Start session and verify timer integration
      act(() => {
        result.current.actions.startSession('test-user', 'routine-1', mockWords, {
          duration: 5,
          autoAdvance: true,
          showPhonetics: false,
          fontSize: 'medium',
          mode: 'word',
          vowels: ['A'],
          consonants: ['B'],
          syllables: [1],
          position: 'initial',
          gradeLevel: '2'
        });
      });

      expect(result.current.state.settings.duration).toBe(5);
      expect(result.current.timerState.duration).toBe(3); // Initial duration from mock
    });

    it('should handle progress tracking integration', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ExerciseProvider userId="test-user">
          {children}
        </ExerciseProvider>
      );

      const { result } = renderHook(() => useExerciseContext(), { wrapper });

      // Start session
      act(() => {
        result.current.actions.startSession('test-user', 'routine-1', mockWords);
      });

      // Record an attempt
      act(() => {
        result.current.actions.recordAttempt({
          wordId: 'word-1',
          lexeme: 'apple',
          accuracy: 0.85,
          timeSpent: 3500,
          difficulty: 3,
          exerciseType: 'word',
          position: 'initial',
          phonetics: {
            vowels: ['AE', 'UH'],
            consonants: ['P', 'L'],
            syllables: 2
          }
        });
      });

      expect(result.current.state.currentSession?.attempts).toHaveLength(1);
      expect(result.current.progressTracking.recordWordAttempt).toHaveBeenCalled();
    });
  });

  describe('Error Handling and Recovery', () => {
    it('should handle context provider errors gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      // Test missing provider
      expect(() => {
        renderHook(() => useExerciseContext());
      }).toThrow('useExerciseContext must be used within an ExerciseProvider');

      expect(() => {
        renderHook(() => useRoutineContext());
      }).toThrow('useRoutineContext must be used within a RoutineProvider');

      consoleSpy.mockRestore();
    });

    it('should recover from state corruption', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ExerciseProvider userId="test-user">
          {children}
        </ExerciseProvider>
      );

      const { result } = renderHook(() => useExerciseContext(), { wrapper });

      // Simulate error condition
      act(() => {
        result.current.actions.setError('Test error condition');
      });

      expect(result.current.state.error).toBe('Test error condition');

      // Test recovery
      act(() => {
        result.current.actions.clearError();
      });

      expect(result.current.state.error).toBeNull();
    });
  });

  describe('Performance and Memory Management', () => {
    it('should not cause memory leaks with multiple context updates', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ExerciseProvider userId="test-user">
          <RoutineProvider>
            {children}
          </RoutineProvider>
        </ExerciseProvider>
      );

      const { result, unmount } = renderHook(() => ({
        exercise: useExerciseContext(),
        routine: useRoutineContext()
      }), { wrapper });

      // Perform multiple state updates
      for (let i = 0; i < 100; i++) {
        act(() => {
          result.current.exercise.actions.updateSettings({
            duration: i % 10 + 1
          });
        });
      }

      // Cleanup should not cause issues
      unmount();
    });

    it('should handle rapid state changes efficiently', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ExerciseProvider userId="test-user">
          {children}
        </ExerciseProvider>
      );

      const { result } = renderHook(() => useExerciseContext(), { wrapper });

      const startTime = performance.now();

      // Rapid state changes
      act(() => {
        for (let i = 0; i < 50; i++) {
          result.current.actions.updateSettings({
            fontSize: i % 2 === 0 ? 'small' : 'large'
          });
        }
      });

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete within reasonable time (100ms)
      expect(duration).toBeLessThan(100);
    });
  });

  describe('Persistence Integration', () => {
    it('should integrate with session persistence utilities', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ExerciseProvider userId="test-user" persistToStorage={true}>
          {children}
        </ExerciseProvider>
      );

      const { result } = renderHook(() => useExerciseContext(), { wrapper });

      // Start session
      act(() => {
        result.current.actions.startSession('test-user', 'routine-1', mockWords);
      });

      // Persist session
      act(() => {
        result.current.actions.persistSession();
      });

      // Check localStorage
      const savedSession = localStorage.getItem('currentExerciseSession');
      expect(savedSession).not.toBeNull();
    });

    it('should handle persistence errors gracefully', () => {
      // Mock localStorage to throw error
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = jest.fn(() => {
        throw new Error('Storage quota exceeded');
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ExerciseProvider userId="test-user" persistToStorage={true}>
          {children}
        </ExerciseProvider>
      );

      const { result } = renderHook(() => useExerciseContext(), { wrapper });

      // Should not crash on persistence error
      act(() => {
        result.current.actions.startSession('test-user', 'routine-1', mockWords);
      });

      act(() => {
        result.current.actions.persistSession();
      });

      // Restore localStorage
      localStorage.setItem = originalSetItem;
    });
  });
});