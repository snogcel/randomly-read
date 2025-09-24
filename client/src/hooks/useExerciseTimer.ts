import { useState, useEffect, useRef, useCallback } from 'react';
import { useTimerCleanup } from './useTimerCleanup';

export interface TimerState {
  time: number;
  timeLeft: number;
  isRunning: boolean;
  isPaused: boolean;
  duration: number;
  startTime: number;
  lastUpdated: number;
}

export interface TimerControls {
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  setDuration: (duration: number) => void;
}

export interface UseExerciseTimerReturn {
  timerState: TimerState;
  controls: TimerControls;
  onTick?: (timeLeft: number) => void;
  onComplete?: () => void;
}

export interface UseExerciseTimerOptions {
  initialDuration?: number;
  onTick?: (timeLeft: number) => void;
  onComplete?: () => void;
  precision?: number; // milliseconds between updates
}

/**
 * High-precision exercise timer hook with accurate timing for speech therapy exercises
 */
export const useExerciseTimer = (options: UseExerciseTimerOptions = {}): UseExerciseTimerReturn => {
  const {
    initialDuration = 3,
    onTick,
    onComplete,
    precision = 25 // 25ms for smooth updates
  } = options;

  const [timerState, setTimerState] = useState<TimerState>({
    time: 0,
    timeLeft: initialDuration,
    isRunning: false,
    isPaused: false,
    duration: initialDuration,
    startTime: 0,
    lastUpdated: 0
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);
  const timerCleanup = useTimerCleanup();

  // High-precision timer update function
  const updateTimer = useCallback(() => {
    const now = Date.now();
    const elapsed = now - startTimeRef.current - pausedTimeRef.current;
    const remaining = Math.max(0, timerState.duration * 1000 - elapsed);
    const timeLeft = Math.round(remaining / 1000);

    setTimerState(prev => ({
      ...prev,
      time: now,
      timeLeft,
      lastUpdated: now
    }));

    // Call onTick callback
    if (onTick) {
      onTick(timeLeft);
    }

    // Check if timer completed
    if (remaining <= 0) {
      setTimerState(prev => ({
        ...prev,
        isRunning: false,
        isPaused: false,
        timeLeft: 0
      }));

      if (timerRef.current) {
        timerCleanup.clearTimer(timerRef.current, 'interval');
        timerRef.current = null;
      }

      if (onComplete) {
        onComplete();
      }
    }
  }, [timerState.duration, onTick, onComplete]);

  // Start timer
  const start = useCallback(() => {
    if (timerRef.current) {
      timerCleanup.clearTimer(timerRef.current, 'interval');
    }

    const now = Date.now();
    startTimeRef.current = now;
    pausedTimeRef.current = 0;

    setTimerState(prev => ({
      ...prev,
      isRunning: true,
      isPaused: false,
      startTime: now,
      lastUpdated: now,
      timeLeft: prev.duration
    }));

    timerRef.current = timerCleanup.createInterval(updateTimer, precision);
  }, [updateTimer, precision]);

  // Pause timer
  const pause = useCallback(() => {
    if (timerRef.current) {
      timerCleanup.clearTimer(timerRef.current, 'interval');
      timerRef.current = null;
    }

    setTimerState(prev => ({
      ...prev,
      isRunning: false,
      isPaused: true
    }));
  }, []);

  // Resume timer
  const resume = useCallback(() => {
    if (!timerState.isPaused) return;

    const now = Date.now();
    const pauseDuration = now - timerState.lastUpdated;
    pausedTimeRef.current += pauseDuration;

    setTimerState(prev => ({
      ...prev,
      isRunning: true,
      isPaused: false,
      lastUpdated: now
    }));

    timerRef.current = timerCleanup.createInterval(updateTimer, precision);
  }, [timerState.isPaused, timerState.lastUpdated, updateTimer, precision]);

  // Reset timer
  const reset = useCallback(() => {
    if (timerRef.current) {
      timerCleanup.clearTimer(timerRef.current, 'interval');
      timerRef.current = null;
    }

    startTimeRef.current = 0;
    pausedTimeRef.current = 0;

    setTimerState(prev => ({
      ...prev,
      time: 0,
      timeLeft: prev.duration,
      isRunning: false,
      isPaused: false,
      startTime: 0,
      lastUpdated: 0
    }));
  }, []);

  // Set duration
  const setDuration = useCallback((duration: number) => {
    setTimerState(prev => ({
      ...prev,
      duration,
      timeLeft: prev.isRunning ? prev.timeLeft : duration
    }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timerCleanup.clearAllTimers();
    };
  }, [timerCleanup]);

  const controls: TimerControls = {
    start,
    pause,
    resume,
    reset,
    setDuration
  };

  return {
    timerState,
    controls,
    onTick,
    onComplete
  };
};