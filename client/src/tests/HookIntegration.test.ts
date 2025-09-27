import { renderHook, act } from '@testing-library/react';
import { useExerciseTimer, useRoutineExecution, useProgressTracking } from '../hooks';
import type { Routine } from '../hooks/useRoutineExecution';

// Mock timers for precise testing
jest.useFakeTimers();

describe('Hook Integration Tests', () => {
  const mockRoutine: Routine = {
    id: 'integration-routine',
    name: 'Hook Integration Test Routine',
    description: 'Testing hook integration',
    age: '4',
    subroutine: [
      {
        id: 'step-1',
        type: 'word',
        duration: 3,
        repetitions: 2,
        mode: 'Word',
        vowels: ['A', 'I'],
        consonants: ['B', 'T'],
        syllables: [1],
        position: 'initial',
        rangeVal: 3
      },
      {
        id: 'step-2',
        type: 'sentence',
        duration: 5,
        repetitions: 1,
        mode: 'Sentence',
        vowels: ['E', 'O'],
        consonants: ['D', 'G'],
        syllables: [2, 3],
        position: 'medial',
        rangeVal: 5
      }
    ]
  };

  beforeEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  describe('Timer and Routine Execution Integration', () => {
    it('should integrate timer with routine execution flow', () => {
      const onExerciseChange = jest.fn();
      const onRoutineComplete = jest.fn();

      const { result: routineResult } = renderHook(() => 
        useRoutineExecution({
          onExerciseChange,
          onRoutineComplete
        })
      );

      const { result: timerResult } = renderHook(() => 
        useExerciseTimer({
          initialDuration: 3,
          onComplete: () => {
            routineResult.current.controls.skipToNext();
          }
        })
      );

      // Load routine
      act(() => {
        routineResult.current.controls.loadRoutine(mockRoutine);
      });

      expect(routineResult.current.state.exerciseStack).toHaveLength(2);

      // Start execution
      act(() => {
        routineResult.current.controls.startExecution();
        timerResult.current.controls.start();
      });

      expect(routineResult.current.state.isExecuting).toBe(true);
      expect(timerResult.current.timerState.isRunning).toBe(true);

      // Simulate timer completion
      act(() => {
        jest.advanceTimersByTime(3100); // Slightly over 3 seconds
      });

      expect(onExerciseChange).toHaveBeenCalled();
    });

    it('should handle pause and resume across hooks', () => {
      const { result: routineResult } = renderHook(() => useRoutineExecution());
      const { result: timerResult } = renderHook(() => useExerciseTimer());

      // Load and start routine
      act(() => {
        routineResult.current.controls.loadRoutine(mockRoutine);
        routineResult.current.controls.startExecution();
        timerResult.current.controls.start();
      });

      // Pause both
      act(() => {
        routineResult.current.controls.pauseExecution();
        timerResult.current.controls.pause();
      });

      expect(routineResult.current.state.isExecuting).toBe(false);
      expect(timerResult.current.timerState.isPaused).toBe(true);

      // Resume both
      act(() => {
        routineResult.current.controls.resumeExecution();
        timerResult.current.controls.resume();
      });

      expect(routineResult.current.state.isExecuting).toBe(true);
      expect(timerResult.current.timerState.isRunning).toBe(true);
    });
  });

  describe('Progress Tracking Integration', () => {
    it('should integrate progress tracking with routine execution', () => {
      const onProgressUpdate = jest.fn();
      const onSessionComplete = jest.fn();

      const { result: progressResult } = renderHook(() => 
        useProgressTracking({
          userId: 'test-user',
          onProgressUpdate,
          onSessionComplete
        })
      );

      const { result: routineResult } = renderHook(() => 
        useRoutineExecution({
          onExerciseComplete: (exercise, index) => {
            if (exercise.type !== 'intermission') {
              progressResult.current.recordWordAttempt({
                wordId: `word-${index}`,
                lexeme: `test-word-${index}`,
                timeSpent: exercise.duration * 1000,
                difficulty: 3,
                exerciseType: exercise.type,
                position: exercise.position,
                phonetics: {
                  vowels: exercise.vowels,
                  consonants: exercise.consonants,
                  syllables: exercise.syllables.length
                }
              });
            }
          }
        })
      );

      // Start session and routine
      act(() => {
        progressResult.current.startSession('integration-routine', 'Integration Test');
        routineResult.current.controls.loadRoutine(mockRoutine);
        routineResult.current.controls.startExecution();
      });

      expect(progressResult.current.currentProgress).not.toBeNull();
      expect(routineResult.current.state.isExecuting).toBe(true);

      // Simulate exercise completion
      act(() => {
        routineResult.current.controls.skipToNext();
      });

      expect(progressResult.current.currentProgress?.wordsAttempted).toHaveLength(1);
    });

    it('should calculate accurate statistics during routine execution', () => {
      const { result: progressResult } = renderHook(() => 
        useProgressTracking({ userId: 'test-user' })
      );

      // Start session
      act(() => {
        progressResult.current.startSession('stats-routine', 'Statistics Test');
      });

      // Record multiple attempts with different accuracies
      const attempts = [
        { accuracy: 0.9, timeSpent: 2000, difficulty: 2 },
        { accuracy: 0.7, timeSpent: 3500, difficulty: 4 },
        { accuracy: 0.95, timeSpent: 1800, difficulty: 1 },
        { accuracy: 0.6, timeSpent: 4200, difficulty: 5 }
      ];

      attempts.forEach((attempt, index) => {
        act(() => {
          progressResult.current.recordWordAttempt({
            wordId: `word-${index}`,
            lexeme: `word-${index}`,
            accuracy: attempt.accuracy,
            timeSpent: attempt.timeSpent,
            difficulty: attempt.difficulty,
            exerciseType: 'word',
            position: 'initial',
            phonetics: {
              vowels: ['A'],
              consonants: ['B'],
              syllables: 1
            }
          });
        });
      });

      const currentProgress = progressResult.current.currentProgress!;
      
      // Verify statistics calculations
      expect(currentProgress.completedWords).toBe(4);
      expect(currentProgress.accuracy).toBeCloseTo(0.8125, 2); // Average of accuracies
      expect(currentProgress.averageTimePerWord).toBe(2875); // Average time
      expect(currentProgress.difficultWords).toHaveLength(1); // One word with accuracy < 0.7
    });
  });

  describe('Cross-Hook State Synchronization', () => {
    it('should maintain consistent state across all hooks', () => {
      const { result: timerResult } = renderHook(() => useExerciseTimer({ initialDuration: 4 }));
      const { result: routineResult } = renderHook(() => useRoutineExecution());
      const { result: progressResult } = renderHook(() => useProgressTracking({ userId: 'sync-user' }));

      // Initialize all hooks
      act(() => {
        progressResult.current.startSession('sync-routine', 'Sync Test');
        routineResult.current.controls.loadRoutine(mockRoutine);
        timerResult.current.controls.setDuration(mockRoutine.subroutine[0].duration);
      });

      // Start execution
      act(() => {
        routineResult.current.controls.startExecution();
        timerResult.current.controls.start();
      });

      // Verify synchronized state
      expect(timerResult.current.timerState.isRunning).toBe(true);
      expect(routineResult.current.state.isExecuting).toBe(true);
      expect(progressResult.current.currentProgress?.routineId).toBe('sync-routine');

      // Pause all
      act(() => {
        timerResult.current.controls.pause();
        routineResult.current.controls.pauseExecution();
      });

      expect(timerResult.current.timerState.isPaused).toBe(true);
      expect(routineResult.current.state.isExecuting).toBe(false);
    });

    it('should handle duration changes across hooks', () => {
      const { result: timerResult } = renderHook(() => useExerciseTimer());
      const { result: routineResult } = renderHook(() => useRoutineExecution());

      // Load routine with different durations
      act(() => {
        routineResult.current.controls.loadRoutine(mockRoutine);
      });

      // Set timer to first exercise duration
      act(() => {
        timerResult.current.controls.setDuration(mockRoutine.subroutine[0].duration);
      });

      expect(timerResult.current.timerState.duration).toBe(3);

      // Advance to next exercise
      act(() => {
        routineResult.current.controls.skipToNext();
        timerResult.current.controls.setDuration(mockRoutine.subroutine[1].duration);
      });

      expect(timerResult.current.timerState.duration).toBe(5);
    });
  });

  describe('Error Handling and Recovery', () => {
    it('should handle errors gracefully across hooks', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const { result: timerResult } = renderHook(() => useExerciseTimer());
      const { result: routineResult } = renderHook(() => useRoutineExecution());

      // Simulate error condition
      act(() => {
        // Try to start timer without proper setup
        timerResult.current.controls.start();
        routineResult.current.controls.startExecution();
      });

      // Should not crash
      expect(timerResult.current.timerState.isRunning).toBe(true);
      expect(routineResult.current.state.isExecuting).toBe(false); // No routine loaded

      consoleSpy.mockRestore();
    });

    it('should recover from hook state corruption', () => {
      const { result: timerResult } = renderHook(() => useExerciseTimer());
      const { result: routineResult } = renderHook(() => useRoutineExecution());

      // Start normal operation
      act(() => {
        routineResult.current.controls.loadRoutine(mockRoutine);
        routineResult.current.controls.startExecution();
        timerResult.current.controls.start();
      });

      // Reset to recover from error
      act(() => {
        timerResult.current.controls.reset();
        routineResult.current.controls.resetExecution();
      });

      expect(timerResult.current.timerState.isRunning).toBe(false);
      expect(timerResult.current.timerState.time).toBe(0);
      expect(routineResult.current.state.isExecuting).toBe(false);
      expect(routineResult.current.state.currentExerciseIndex).toBe(-1);
    });
  });

  describe('Performance and Memory Management', () => {
    it('should not create memory leaks with hook interactions', () => {
      const { result: timerResult, unmount: unmountTimer } = renderHook(() => useExerciseTimer());
      const { result: routineResult, unmount: unmountRoutine } = renderHook(() => useRoutineExecution());
      const { result: progressResult, unmount: unmountProgress } = renderHook(() => useProgressTracking({ userId: 'perf-user' }));

      // Perform intensive operations
      act(() => {
        for (let i = 0; i < 100; i++) {
          timerResult.current.controls.setDuration(i % 10 + 1);
          progressResult.current.recordWordAttempt({
            wordId: `perf-word-${i}`,
            lexeme: `word-${i}`,
            timeSpent: 1000 + i,
            difficulty: i % 5 + 1,
            exerciseType: 'word',
            position: 'initial',
            phonetics: {
              vowels: ['A'],
              consonants: ['B'],
              syllables: 1
            }
          });
        }
      });

      // Cleanup should not cause issues
      unmountTimer();
      unmountRoutine();
      unmountProgress();

      // Verify no timers are left running
      expect(jest.getTimerCount()).toBe(0);
    });

    it('should handle rapid hook state changes efficiently', () => {
      const { result: timerResult } = renderHook(() => useExerciseTimer());
      const { result: routineResult } = renderHook(() => useRoutineExecution());

      const startTime = performance.now();

      // Rapid state changes
      act(() => {
        for (let i = 0; i < 50; i++) {
          timerResult.current.controls.setDuration(i % 5 + 1);
          if (i % 10 === 0) {
            routineResult.current.controls.loadRoutine(mockRoutine);
          }
        }
      });

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete within reasonable time
      expect(duration).toBeLessThan(100);
    });
  });
});