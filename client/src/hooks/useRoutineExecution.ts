import { useState, useCallback, useRef } from 'react';
import { useExerciseTimer } from './useExerciseTimer';

export interface ExerciseStep {
  id: string;
  type: 'word' | 'sentence' | 'intermission';
  duration: number;
  repetitions: number;
  mode: string;
  vowels: string[];
  consonants: string[];
  syllables: number[];
  position: 'initial' | 'medial' | 'final';
  age?: string;
  isIntermission?: boolean;
  intermissionText?: string;
  rangeVal: number;
  map?: string;
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  age: string;
  subroutine: ExerciseStep[];
}

export interface RoutineExecutionState {
  currentRoutine: Routine | null;
  exerciseStack: ExerciseStep[];
  currentExerciseIndex: number;
  currentExercise: ExerciseStep | null;
  isExecuting: boolean;
  completed: number;
  total: number;
  routineProgress: number;
}

export interface RoutineExecutionControls {
  loadRoutine: (routine: Routine) => void;
  startExecution: () => void;
  pauseExecution: () => void;
  resumeExecution: () => void;
  skipToNext: () => void;
  resetExecution: () => void;
  stopExecution: () => void;
}

export interface UseRoutineExecutionOptions {
  onExerciseChange?: (exercise: ExerciseStep, index: number) => void;
  onRoutineComplete?: (results: RoutineExecutionResults) => void;
  onExerciseComplete?: (exercise: ExerciseStep, index: number) => void;
}

export interface RoutineExecutionResults {
  routine: Routine;
  completedExercises: number;
  totalExercises: number;
  totalDuration: number;
  startTime: Date;
  endTime: Date;
}

/**
 * Hook for managing routine execution flow and exercise progression
 */
export const useRoutineExecution = (options: UseRoutineExecutionOptions = {}) => {
  const { onExerciseChange, onRoutineComplete, onExerciseComplete } = options;

  const [state, setState] = useState<RoutineExecutionState>({
    currentRoutine: null,
    exerciseStack: [],
    currentExerciseIndex: -1,
    currentExercise: null,
    isExecuting: false,
    completed: 0,
    total: 0,
    routineProgress: 0
  });

  const executionStartTime = useRef<Date | null>(null);

  // Timer for current exercise
  const { timerState, controls: timerControls } = useExerciseTimer({
    onComplete: handleExerciseComplete
  });

  // Handle exercise completion and advance to next
  function handleExerciseComplete() {
    const { currentExercise, currentExerciseIndex, exerciseStack } = state;
    
    if (!currentExercise) return;

    // Mark exercise as completed if it's not an intermission
    const newCompleted = currentExercise.type !== 'intermission' 
      ? state.completed + 1 
      : state.completed;

    // Call exercise complete callback
    if (onExerciseComplete) {
      onExerciseComplete(currentExercise, currentExerciseIndex);
    }

    // Check if routine is complete
    if (currentExerciseIndex >= exerciseStack.length - 1) {
      completeRoutine(newCompleted);
      return;
    }

    // Advance to next exercise
    const nextIndex = currentExerciseIndex + 1;
    const nextExercise = exerciseStack[nextIndex];

    setState(prev => ({
      ...prev,
      currentExerciseIndex: nextIndex,
      currentExercise: nextExercise,
      completed: newCompleted,
      routineProgress: ((nextIndex + 1) / exerciseStack.length) * 100
    }));

    // Set timer duration for next exercise
    timerControls.setDuration(nextExercise.duration);

    // Call exercise change callback
    if (onExerciseChange) {
      onExerciseChange(nextExercise, nextIndex);
    }

    // Auto-start next exercise
    timerControls.start();
  }

  // Complete the entire routine
  const completeRoutine = useCallback((completedCount: number) => {
    const endTime = new Date();
    
    setState(prev => ({
      ...prev,
      isExecuting: false,
      completed: completedCount,
      routineProgress: 100
    }));

    if (onRoutineComplete && state.currentRoutine && executionStartTime.current) {
      const results: RoutineExecutionResults = {
        routine: state.currentRoutine,
        completedExercises: completedCount,
        totalExercises: state.total,
        totalDuration: endTime.getTime() - executionStartTime.current.getTime(),
        startTime: executionStartTime.current,
        endTime
      };
      onRoutineComplete(results);
    }
  }, [state.currentRoutine, state.total, onRoutineComplete]);

  // Load a routine for execution
  const loadRoutine = useCallback((routine: Routine) => {
    if (!routine || !routine.subroutine) {
      setState({
        currentRoutine: null,
        exerciseStack: [],
        currentExerciseIndex: -1,
        currentExercise: null,
        isExecuting: false,
        completed: 0,
        total: 0,
        routineProgress: 0
      });
      return;
    }

    // Process routine and create exercise stack
    const exerciseStack = routine.subroutine.map(step => ({
      ...step,
      age: routine.age || "0"
    }));

    // Calculate total non-intermission exercises
    const total = exerciseStack.filter(ex => ex.type !== 'intermission').length;

    setState({
      currentRoutine: routine,
      exerciseStack,
      currentExerciseIndex: -1,
      currentExercise: null,
      isExecuting: false,
      completed: 0,
      total,
      routineProgress: 0
    });

    // Reset timer
    timerControls.reset();
  }, [timerControls]);

  // Start routine execution
  const startExecution = useCallback(() => {
    if (state.exerciseStack.length === 0) return;

    const firstExercise = state.exerciseStack[0];
    executionStartTime.current = new Date();

    setState(prev => ({
      ...prev,
      currentExerciseIndex: 0,
      currentExercise: firstExercise,
      isExecuting: true,
      completed: 0,
      routineProgress: (1 / prev.exerciseStack.length) * 100
    }));

    // Set timer duration and start
    timerControls.setDuration(firstExercise.duration);
    timerControls.start();

    // Call exercise change callback
    if (onExerciseChange) {
      onExerciseChange(firstExercise, 0);
    }
  }, [state.exerciseStack, timerControls, onExerciseChange]);

  // Pause execution
  const pauseExecution = useCallback(() => {
    timerControls.pause();
    setState(prev => ({ ...prev, isExecuting: false }));
  }, [timerControls]);

  // Resume execution
  const resumeExecution = useCallback(() => {
    timerControls.resume();
    setState(prev => ({ ...prev, isExecuting: true }));
  }, [timerControls]);

  // Skip to next exercise
  const skipToNext = useCallback(() => {
    handleExerciseComplete();
  }, []);

  // Reset execution
  const resetExecution = useCallback(() => {
    timerControls.reset();
    executionStartTime.current = null;

    setState(prev => ({
      ...prev,
      currentExerciseIndex: -1,
      currentExercise: null,
      isExecuting: false,
      completed: 0,
      routineProgress: 0
    }));
  }, [timerControls]);

  // Stop execution
  const stopExecution = useCallback(() => {
    timerControls.reset();
    executionStartTime.current = null;

    setState(prev => ({
      ...prev,
      isExecuting: false
    }));
  }, [timerControls]);

  const controls: RoutineExecutionControls = {
    loadRoutine,
    startExecution,
    pauseExecution,
    resumeExecution,
    skipToNext,
    resetExecution,
    stopExecution
  };

  return {
    state,
    timerState,
    controls
  };
};