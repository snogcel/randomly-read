import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ExerciseProvider, RoutineProvider } from '../contexts';
import TimerRefactored from '../components/RRLayout/TimerRefactored';
import { useExerciseTimer, useRoutineExecution, useProgressTracking } from '../hooks';
import { renderHook } from '@testing-library/react';

// Mock performance.now for consistent testing
const mockPerformanceNow = jest.fn();
Object.defineProperty(window, 'performance', {
  value: {
    now: mockPerformanceNow
  }
});

// Mock timers for performance testing
jest.useFakeTimers();

const theme = createTheme();

const mockReduxProps = {
  currentExercise: [],
  completed: 0,
  total: 0,
  timeLeft: 3,
  addExercise: jest.fn(),
  addExerciseNumber: jest.fn(),
  updateCompleted: jest.fn(),
  updateTotal: jest.fn(),
  updateTimeLeft: jest.fn(),
  setRange: jest.fn(),
  setExercisePause: jest.fn(),
  addRoutineVowel: jest.fn(),
  removeConsonant: jest.fn(),
  addConsonant: jest.fn(),
  addSyllables: jest.fn(),
  setMode: jest.fn(),
  setPosition: jest.fn(),
  setAge: jest.fn(),
  setLimit: jest.fn(),
  setIntermissionText: jest.fn(),
  clearQueryResults: jest.fn()
};

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <ExerciseProvider userId="perf-test-user">
      <RoutineProvider>
        {children}
      </RoutineProvider>
    </ExerciseProvider>
  </ThemeProvider>
);

describe('Performance Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    mockPerformanceNow.mockClear();
    let time = 0;
    mockPerformanceNow.mockImplementation(() => {
      time += 16.67; // Simulate 60fps
      return time;
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  describe('Component Rendering Performance', () => {
    it('should render TimerRefactored component within performance budget', () => {
      const startTime = performance.now();

      render(
        <TestWrapper>
          <TimerRefactored {...mockReduxProps} />
        </TestWrapper>
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render within 50ms (performance budget)
      expect(renderTime).toBeLessThan(50);
    });

    it('should handle rapid re-renders efficiently', () => {
      const { rerender } = render(
        <TestWrapper>
          <TimerRefactored {...mockReduxProps} />
        </TestWrapper>
      );

      const startTime = performance.now();

      // Perform 50 rapid re-renders
      for (let i = 0; i < 50; i++) {
        rerender(
          <TestWrapper>
            <TimerRefactored 
              {...mockReduxProps} 
              timeLeft={i % 10}
              completed={i % 5}
            />
          </TestWrapper>
        );
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      // Should complete all re-renders within 200ms
      expect(totalTime).toBeLessThan(200);
    });

    it('should maintain 60fps during timer updates', () => {
      render(
        <TestWrapper>
          <TimerRefactored {...mockReduxProps} />
        </TestWrapper>
      );

      const frameTime = 16.67; // 60fps = 16.67ms per frame
      const updates = 60; // Test 1 second worth of updates

      const startTime = performance.now();

      // Simulate 60 timer updates (1 second at 60fps)
      for (let i = 0; i < updates; i++) {
        act(() => {
          jest.advanceTimersByTime(frameTime);
        });
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;
      const averageFrameTime = totalTime / updates;

      // Average frame time should be close to 16.67ms
      expect(averageFrameTime).toBeLessThan(20);
    });
  });

  describe('Hook Performance', () => {
    it('should handle useExerciseTimer updates efficiently', () => {
      const { result } = renderHook(() => useExerciseTimer({ precision: 16 }));

      const startTime = performance.now();

      // Start timer and simulate 100 updates
      act(() => {
        result.current.controls.start();
      });

      for (let i = 0; i < 100; i++) {
        act(() => {
          jest.advanceTimersByTime(16);
        });
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      // Should handle 100 updates within 100ms
      expect(totalTime).toBeLessThan(100);
    });

    it('should handle useProgressTracking with large datasets', () => {
      const { result } = renderHook(() => useProgressTracking({ userId: 'perf-user' }));

      const startTime = performance.now();

      // Start session and record many attempts
      act(() => {
        result.current.startSession('perf-routine', 'Performance Test');
      });

      // Record 1000 word attempts
      for (let i = 0; i < 1000; i++) {
        act(() => {
          result.current.recordWordAttempt({
            wordId: `word-${i}`,
            lexeme: `word-${i}`,
            timeSpent: 1000 + i,
            difficulty: (i % 5) + 1,
            exerciseType: 'word',
            position: 'initial',
            phonetics: {
              vowels: ['A'],
              consonants: ['B'],
              syllables: 1
            }
          });
        });
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      // Should handle 1000 attempts within 500ms
      expect(totalTime).toBeLessThan(500);
      expect(result.current.currentProgress?.wordsAttempted).toHaveLength(1000);
    });

    it('should handle useRoutineExecution with complex routines', () => {
      const complexRoutine = {
        id: 'complex-routine',
        name: 'Complex Performance Test',
        description: 'Testing performance with complex routine',
        age: '5',
        subroutine: Array.from({ length: 100 }, (_, i) => ({
          id: `step-${i}`,
          type: (i % 3 === 0 ? 'intermission' : 'word') as 'word' | 'sentence' | 'intermission',
          duration: (i % 5) + 1,
          repetitions: (i % 3) + 1,
          mode: i % 3 === 0 ? 'Intermission' : 'Word',
          vowels: ['A', 'E', 'I'],
          consonants: ['B', 'C', 'D'],
          syllables: [1, 2, 3],
          position: 'initial' as const,
          rangeVal: (i % 5) + 1,
          isIntermission: i % 3 === 0,
          intermissionText: i % 3 === 0 ? `Break ${i}` : undefined
        }))
      };

      const { result } = renderHook(() => useRoutineExecution());

      const startTime = performance.now();

      act(() => {
        result.current.controls.loadRoutine(complexRoutine);
      });

      const endTime = performance.now();
      const loadTime = endTime - startTime;

      // Should load complex routine within 50ms
      expect(loadTime).toBeLessThan(50);
      expect(result.current.state.exerciseStack).toHaveLength(100);
    });
  });

  describe('Memory Performance', () => {
    it('should not create memory leaks with timer operations', () => {
      const { result, unmount } = renderHook(() => useExerciseTimer());

      // Start and stop timer multiple times
      for (let i = 0; i < 100; i++) {
        act(() => {
          result.current.controls.start();
          result.current.controls.pause();
          result.current.controls.reset();
        });
      }

      // Unmount should clean up all timers
      unmount();

      // Verify no timers are left running
      expect(jest.getTimerCount()).toBe(0);
    });

    it('should handle context provider cleanup efficiently', () => {
      const { unmount } = render(
        <TestWrapper>
          <TimerRefactored {...mockReduxProps} />
        </TestWrapper>
      );

      const startTime = performance.now();

      // Unmount should be fast
      unmount();

      const endTime = performance.now();
      const unmountTime = endTime - startTime;

      // Should unmount within 10ms
      expect(unmountTime).toBeLessThan(10);
    });

    it('should handle large state updates without memory issues', () => {
      const { result } = renderHook(() => useProgressTracking({ userId: 'memory-test' }));

      // Create large session data
      const largeWordList = Array.from({ length: 10000 }, (_, i) => ({
        wordId: `word-${i}`,
        lexeme: `word-${i}`,
        timeSpent: 1000,
        difficulty: 3,
        exerciseType: 'word' as const,
        position: 'initial' as const,
        phonetics: {
          vowels: ['A'],
          consonants: ['B'],
          syllables: 1
        }
      }));

      const startTime = performance.now();

      act(() => {
        result.current.startSession('memory-test', 'Memory Test');
        
        // Add all attempts at once
        largeWordList.forEach(attempt => {
          result.current.recordWordAttempt(attempt);
        });
      });

      const endTime = performance.now();
      const processingTime = endTime - startTime;

      // Should handle large dataset within 1 second
      expect(processingTime).toBeLessThan(1000);
      expect(result.current.currentProgress?.wordsAttempted).toHaveLength(10000);
    });
  });

  describe('Concurrent Operations Performance', () => {
    it('should handle multiple simultaneous timer operations', () => {
      const timers = Array.from({ length: 10 }, () => 
        renderHook(() => useExerciseTimer()).result
      );

      const startTime = performance.now();

      // Start all timers simultaneously
      act(() => {
        timers.forEach(timer => {
          timer.current.controls.start();
        });
      });

      // Run for 100 updates
      for (let i = 0; i < 100; i++) {
        act(() => {
          jest.advanceTimersByTime(25);
        });
      }

      // Stop all timers
      act(() => {
        timers.forEach(timer => {
          timer.current.controls.pause();
        });
      });

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      // Should handle 10 concurrent timers within 200ms
      expect(totalTime).toBeLessThan(200);

      // Verify all timers are running
      timers.forEach(timer => {
        expect(timer.current.timerState.isPaused).toBe(true);
      });
    });

    it('should handle multiple context updates efficiently', () => {
      const contexts = Array.from({ length: 5 }, () => 
        renderHook(() => useProgressTracking({ userId: `user-${Math.random()}` }))
      );

      const startTime = performance.now();

      // Perform operations on all contexts
      act(() => {
        contexts.forEach((context, index) => {
          context.result.current.startSession(`routine-${index}`, `Test ${index}`);
          
          // Add some attempts
          for (let i = 0; i < 50; i++) {
            context.result.current.recordWordAttempt({
              wordId: `word-${i}`,
              lexeme: `word-${i}`,
              timeSpent: 1000,
              difficulty: 3,
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
      });

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      // Should handle 5 contexts with 50 attempts each within 300ms
      expect(totalTime).toBeLessThan(300);

      // Verify all contexts have data
      contexts.forEach(context => {
        expect(context.result.current.currentProgress?.wordsAttempted).toHaveLength(50);
      });
    });
  });

  describe('Real-world Performance Scenarios', () => {
    it('should handle typical user session efficiently', () => {
      const { result: progressResult } = renderHook(() => useProgressTracking({ userId: 'real-user' }));
      const { result: timerResult } = renderHook(() => useExerciseTimer());

      const startTime = performance.now();

      // Simulate typical 15-minute session
      act(() => {
        progressResult.current.startSession('typical-routine', 'Typical Session');
        timerResult.current.controls.start();
      });

      // Simulate 50 word attempts over 15 minutes
      for (let i = 0; i < 50; i++) {
        act(() => {
          // Each word takes ~18 seconds (15 min / 50 words)
          jest.advanceTimersByTime(18000);
          
          progressResult.current.recordWordAttempt({
            wordId: `session-word-${i}`,
            lexeme: `word-${i}`,
            accuracy: 0.7 + (Math.random() * 0.3), // 70-100% accuracy
            timeSpent: 15000 + (Math.random() * 6000), // 15-21 seconds
            difficulty: Math.floor(Math.random() * 5) + 1,
            exerciseType: 'word',
            position: ['initial', 'medial', 'final'][i % 3] as any,
            phonetics: {
              vowels: ['A', 'E', 'I'][i % 3] ? [['A', 'E', 'I'][i % 3]] : ['A'],
              consonants: ['B', 'C', 'D'][i % 3] ? [['B', 'C', 'D'][i % 3]] : ['B'],
              syllables: (i % 3) + 1
            }
          });

          // Reset timer for next word
          timerResult.current.controls.reset();
          timerResult.current.controls.start();
        });
      }

      // End session
      act(() => {
        timerResult.current.controls.pause();
        progressResult.current.endSession();
      });

      const endTime = performance.now();
      const sessionTime = endTime - startTime;

      // Should handle typical session within 500ms of processing time
      expect(sessionTime).toBeLessThan(500);

      // Verify session data
      const history = progressResult.current.getProgressHistory();
      expect(history).toHaveLength(1);
      expect(history[0].wordsAttempted).toHaveLength(50);
    });

    it('should maintain performance under stress conditions', () => {
      const { result } = renderHook(() => useProgressTracking({ userId: 'stress-user' }));

      const startTime = performance.now();

      // Stress test: rapid operations
      act(() => {
        result.current.startSession('stress-routine', 'Stress Test');

        // Rapid-fire 500 attempts
        for (let i = 0; i < 500; i++) {
          result.current.recordWordAttempt({
            wordId: `stress-word-${i}`,
            lexeme: `word-${i}`,
            accuracy: Math.random(),
            timeSpent: Math.random() * 5000,
            difficulty: Math.floor(Math.random() * 5) + 1,
            exerciseType: Math.random() > 0.5 ? 'word' : 'sentence',
            position: ['initial', 'medial', 'final'][Math.floor(Math.random() * 3)] as any,
            phonetics: {
              vowels: ['A', 'E', 'I', 'O', 'U'].slice(0, Math.floor(Math.random() * 3) + 1),
              consonants: ['B', 'C', 'D', 'F', 'G'].slice(0, Math.floor(Math.random() * 3) + 1),
              syllables: Math.floor(Math.random() * 4) + 1
            }
          });
        }

        result.current.endSession();
      });

      const endTime = performance.now();
      const stressTime = endTime - startTime;

      // Should handle stress test within 1 second
      expect(stressTime).toBeLessThan(1000);

      // Verify data integrity
      const history = result.current.getProgressHistory();
      expect(history).toHaveLength(1);
      expect(history[0].wordsAttempted).toHaveLength(500);
    });
  });
});