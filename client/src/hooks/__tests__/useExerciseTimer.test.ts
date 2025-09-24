import { renderHook, act } from '@testing-library/react';
import { useExerciseTimer } from '../useExerciseTimer';

// Mock timers
jest.useFakeTimers();

describe('useExerciseTimer', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useExerciseTimer());

    expect(result.current.timerState.time).toBe(0);
    expect(result.current.timerState.timeLeft).toBe(3);
    expect(result.current.timerState.isRunning).toBe(false);
    expect(result.current.timerState.isPaused).toBe(false);
    expect(result.current.timerState.duration).toBe(3);
  });

  it('should initialize with custom duration', () => {
    const { result } = renderHook(() => useExerciseTimer({ initialDuration: 5 }));

    expect(result.current.timerState.timeLeft).toBe(5);
    expect(result.current.timerState.duration).toBe(5);
  });

  it('should start timer correctly', () => {
    const { result } = renderHook(() => useExerciseTimer({ initialDuration: 3 }));

    act(() => {
      result.current.controls.start();
    });

    expect(result.current.timerState.isRunning).toBe(true);
    expect(result.current.timerState.isPaused).toBe(false);
    expect(result.current.timerState.startTime).toBeGreaterThan(0);
  });

  it('should pause and resume timer correctly', () => {
    const { result } = renderHook(() => useExerciseTimer({ initialDuration: 3 }));

    // Start timer
    act(() => {
      result.current.controls.start();
    });

    expect(result.current.timerState.isRunning).toBe(true);

    // Pause timer
    act(() => {
      result.current.controls.pause();
    });

    expect(result.current.timerState.isRunning).toBe(false);
    expect(result.current.timerState.isPaused).toBe(true);

    // Resume timer
    act(() => {
      result.current.controls.resume();
    });

    expect(result.current.timerState.isRunning).toBe(true);
    expect(result.current.timerState.isPaused).toBe(false);
  });

  it('should reset timer correctly', () => {
    const { result } = renderHook(() => useExerciseTimer({ initialDuration: 3 }));

    // Start timer
    act(() => {
      result.current.controls.start();
    });

    // Reset timer
    act(() => {
      result.current.controls.reset();
    });

    expect(result.current.timerState.time).toBe(0);
    expect(result.current.timerState.timeLeft).toBe(3);
    expect(result.current.timerState.isRunning).toBe(false);
    expect(result.current.timerState.isPaused).toBe(false);
    expect(result.current.timerState.startTime).toBe(0);
  });

  it('should update duration correctly', () => {
    const { result } = renderHook(() => useExerciseTimer({ initialDuration: 3 }));

    act(() => {
      result.current.controls.setDuration(5);
    });

    expect(result.current.timerState.duration).toBe(5);
    expect(result.current.timerState.timeLeft).toBe(5);
  });

  it('should call onTick callback during timer execution', () => {
    const onTick = jest.fn();
    const { result } = renderHook(() => useExerciseTimer({ 
      initialDuration: 3,
      onTick,
      precision: 100 // Use larger precision for testing
    }));

    act(() => {
      result.current.controls.start();
    });

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(onTick).toHaveBeenCalled();
  });

  it('should call onComplete callback when timer finishes', () => {
    const onComplete = jest.fn();
    const { result } = renderHook(() => useExerciseTimer({ 
      initialDuration: 1, // 1 second for quick test
      onComplete,
      precision: 100
    }));

    act(() => {
      result.current.controls.start();
    });

    // Fast-forward past the duration
    act(() => {
      jest.advanceTimersByTime(1100);
    });

    expect(onComplete).toHaveBeenCalled();
    expect(result.current.timerState.isRunning).toBe(false);
    expect(result.current.timerState.timeLeft).toBe(0);
  });

  it('should maintain timing accuracy with high precision', () => {
    const onTick = jest.fn();
    const { result } = renderHook(() => useExerciseTimer({ 
      initialDuration: 2,
      onTick,
      precision: 25 // 25ms precision
    }));

    act(() => {
      result.current.controls.start();
    });

    // Advance by exactly 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Should have approximately 1 second left (allowing for small precision differences)
    expect(result.current.timerState.timeLeft).toBe(1);
  });

  it('should handle pause and resume timing correctly', () => {
    const { result } = renderHook(() => useExerciseTimer({ 
      initialDuration: 3,
      precision: 100
    }));

    // Start timer
    act(() => {
      result.current.controls.start();
    });

    // Run for 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.timerState.timeLeft).toBe(2);

    // Pause for 2 seconds
    act(() => {
      result.current.controls.pause();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Time should still be 2 seconds left
    expect(result.current.timerState.timeLeft).toBe(2);

    // Resume and run for 1 more second
    act(() => {
      result.current.controls.resume();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Should have 1 second left
    expect(result.current.timerState.timeLeft).toBe(1);
  });

  it('should not allow resume when not paused', () => {
    const { result } = renderHook(() => useExerciseTimer());

    // Try to resume without starting
    act(() => {
      result.current.controls.resume();
    });

    expect(result.current.timerState.isRunning).toBe(false);
    expect(result.current.timerState.isPaused).toBe(false);
  });

  it('should cleanup timer on unmount', () => {
    const { result, unmount } = renderHook(() => useExerciseTimer());

    act(() => {
      result.current.controls.start();
    });

    expect(result.current.timerState.isRunning).toBe(true);

    unmount();

    // Timer should be cleaned up (no way to directly test, but ensures no memory leaks)
    expect(jest.getTimerCount()).toBe(0);
  });
});