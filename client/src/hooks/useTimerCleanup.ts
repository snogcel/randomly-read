import { useEffect, useRef } from 'react';

/**
 * Hook for managing timer cleanup and memory management
 */
export const useTimerCleanup = () => {
  const timersRef = useRef<Set<NodeJS.Timeout>>(new Set());
  const intervalsRef = useRef<Set<NodeJS.Timeout>>(new Set());
  const timeoutsRef = useRef<Set<NodeJS.Timeout>>(new Set());

  // Register a timer for cleanup
  const registerTimer = (timer: NodeJS.Timeout, type: 'interval' | 'timeout' = 'interval') => {
    if (type === 'interval') {
      intervalsRef.current.add(timer);
    } else {
      timeoutsRef.current.add(timer);
    }
    timersRef.current.add(timer);
  };

  // Unregister a specific timer
  const unregisterTimer = (timer: NodeJS.Timeout) => {
    timersRef.current.delete(timer);
    intervalsRef.current.delete(timer);
    timeoutsRef.current.delete(timer);
  };

  // Clear a specific timer
  const clearTimer = (timer: NodeJS.Timeout, type: 'interval' | 'timeout' = 'interval') => {
    if (type === 'interval') {
      clearInterval(timer);
    } else {
      clearTimeout(timer);
    }
    unregisterTimer(timer);
  };

  // Clear all timers
  const clearAllTimers = () => {
    // Clear all intervals
    intervalsRef.current.forEach(timer => {
      clearInterval(timer);
    });

    // Clear all timeouts
    timeoutsRef.current.forEach(timer => {
      clearTimeout(timer);
    });

    // Clear all sets
    timersRef.current.clear();
    intervalsRef.current.clear();
    timeoutsRef.current.clear();
  };

  // Create a managed interval
  const createInterval = (callback: () => void, delay: number): NodeJS.Timeout => {
    const timer = setInterval(callback, delay);
    registerTimer(timer, 'interval');
    return timer;
  };

  // Create a managed timeout
  const createTimeout = (callback: () => void, delay: number): NodeJS.Timeout => {
    const timer = setTimeout(() => {
      callback();
      unregisterTimer(timer); // Auto-cleanup completed timeouts
    }, delay);
    registerTimer(timer, 'timeout');
    return timer;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  return {
    registerTimer,
    unregisterTimer,
    clearTimer,
    clearAllTimers,
    createInterval,
    createTimeout,
    activeTimers: timersRef.current.size,
    activeIntervals: intervalsRef.current.size,
    activeTimeouts: timeoutsRef.current.size
  };
};