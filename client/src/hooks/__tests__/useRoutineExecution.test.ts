import { renderHook, act } from '@testing-library/react';
import { useRoutineExecution, Routine, ExerciseStep } from '../useRoutineExecution';

// Mock the useExerciseTimer hook
jest.mock('../useExerciseTimer', () => ({
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

describe('useRoutineExecution', () => {
  const mockRoutine: Routine = {
    id: 'routine-1',
    name: 'Test Routine',
    description: 'A test routine',
    age: '5',
    subroutine: [
      {
        id: 'step-1',
        type: 'word',
        duration: 3,
        repetitions: 5,
        mode: 'Word',
        vowels: ['A', 'E'],
        consonants: ['B', 'C'],
        syllables: [1, 2],
        position: 'initial',
        rangeVal: 3
      },
      {
        id: 'step-2',
        type: 'intermission',
        duration: 2,
        repetitions: 1,
        mode: 'Intermission',
        vowels: [],
        consonants: [],
        syllables: [],
        position: 'initial',
        isIntermission: true,
        intermissionText: 'Take a break',
        rangeVal: 2
      },
      {
        id: 'step-3',
        type: 'sentence',
        duration: 4,
        repetitions: 3,
        mode: 'Sentence',
        vowels: ['I', 'O'],
        consonants: ['D', 'F'],
        syllables: [2, 3],
        position: 'medial',
        rangeVal: 4
      }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useRoutineExecution());

    expect(result.current.state.currentRoutine).toBeNull();
    expect(result.current.state.exerciseStack).toEqual([]);
    expect(result.current.state.currentExerciseIndex).toBe(-1);
    expect(result.current.state.currentExercise).toBeNull();
    expect(result.current.state.isExecuting).toBe(false);
    expect(result.current.state.completed).toBe(0);
    expect(result.current.state.total).toBe(0);
    expect(result.current.state.routineProgress).toBe(0);
  });

  it('should load routine correctly', () => {
    const { result } = renderHook(() => useRoutineExecution());

    act(() => {
      result.current.controls.loadRoutine(mockRoutine);
    });

    expect(result.current.state.currentRoutine).toBe(mockRoutine);
    expect(result.current.state.exerciseStack).toHaveLength(3);
    expect(result.current.state.total).toBe(2); // Only non-intermission exercises
    expect(result.current.state.exerciseStack[0].age).toBe('5');
  });

  it('should handle empty routine', () => {
    const { result } = renderHook(() => useRoutineExecution());

    const emptyRoutine: Routine = {
      id: 'empty',
      name: 'Empty',
      description: 'Empty routine',
      age: '0',
      subroutine: []
    };

    act(() => {
      result.current.controls.loadRoutine(emptyRoutine);
    });

    expect(result.current.state.currentRoutine).toBe(emptyRoutine);
    expect(result.current.state.exerciseStack).toEqual([]);
    expect(result.current.state.total).toBe(0);
  });

  it('should start execution correctly', () => {
    const onExerciseChange = jest.fn();
    const { result } = renderHook(() => useRoutineExecution({ onExerciseChange }));

    act(() => {
      result.current.controls.loadRoutine(mockRoutine);
    });

    act(() => {
      result.current.controls.startExecution();
    });

    expect(result.current.state.isExecuting).toBe(true);
    expect(result.current.state.currentExerciseIndex).toBe(0);
    expect(result.current.state.currentExercise).toBe(mockRoutine.subroutine[0]);
    expect(result.current.state.routineProgress).toBeGreaterThan(0);
    expect(onExerciseChange).toHaveBeenCalledWith(mockRoutine.subroutine[0], 0);
  });

  it('should not start execution without loaded routine', () => {
    const { result } = renderHook(() => useRoutineExecution());

    act(() => {
      result.current.controls.startExecution();
    });

    expect(result.current.state.isExecuting).toBe(false);
    expect(result.current.state.currentExerciseIndex).toBe(-1);
  });

  it('should pause and resume execution', () => {
    const { result } = renderHook(() => useRoutineExecution());

    act(() => {
      result.current.controls.loadRoutine(mockRoutine);
    });

    act(() => {
      result.current.controls.startExecution();
    });

    expect(result.current.state.isExecuting).toBe(true);

    act(() => {
      result.current.controls.pauseExecution();
    });

    expect(result.current.state.isExecuting).toBe(false);

    act(() => {
      result.current.controls.resumeExecution();
    });

    expect(result.current.state.isExecuting).toBe(true);
  });

  it('should reset execution correctly', () => {
    const { result } = renderHook(() => useRoutineExecution());

    act(() => {
      result.current.controls.loadRoutine(mockRoutine);
    });

    act(() => {
      result.current.controls.startExecution();
    });

    act(() => {
      result.current.controls.resetExecution();
    });

    expect(result.current.state.currentExerciseIndex).toBe(-1);
    expect(result.current.state.currentExercise).toBeNull();
    expect(result.current.state.isExecuting).toBe(false);
    expect(result.current.state.completed).toBe(0);
    expect(result.current.state.routineProgress).toBe(0);
  });

  it('should stop execution correctly', () => {
    const { result } = renderHook(() => useRoutineExecution());

    act(() => {
      result.current.controls.loadRoutine(mockRoutine);
    });

    act(() => {
      result.current.controls.startExecution();
    });

    act(() => {
      result.current.controls.stopExecution();
    });

    expect(result.current.state.isExecuting).toBe(false);
  });

  it('should calculate total exercises correctly (excluding intermissions)', () => {
    const { result } = renderHook(() => useRoutineExecution());

    act(() => {
      result.current.controls.loadRoutine(mockRoutine);
    });

    // Should count only word and sentence exercises, not intermission
    expect(result.current.state.total).toBe(2);
  });

  it('should handle routine with only intermissions', () => {
    const intermissionOnlyRoutine: Routine = {
      id: 'intermission-only',
      name: 'Intermission Only',
      description: 'Only intermissions',
      age: '0',
      subroutine: [
        {
          id: 'intermission-1',
          type: 'intermission',
          duration: 2,
          repetitions: 1,
          mode: 'Intermission',
          vowels: [],
          consonants: [],
          syllables: [],
          position: 'initial',
          isIntermission: true,
          intermissionText: 'Break 1',
          rangeVal: 2
        }
      ]
    };

    const { result } = renderHook(() => useRoutineExecution());

    act(() => {
      result.current.controls.loadRoutine(intermissionOnlyRoutine);
    });

    expect(result.current.state.total).toBe(0);
  });

  it('should call callbacks correctly', () => {
    const onExerciseChange = jest.fn();
    const onRoutineComplete = jest.fn();
    const onExerciseComplete = jest.fn();

    const { result } = renderHook(() => useRoutineExecution({
      onExerciseChange,
      onRoutineComplete,
      onExerciseComplete
    }));

    act(() => {
      result.current.controls.loadRoutine(mockRoutine);
    });

    act(() => {
      result.current.controls.startExecution();
    });

    expect(onExerciseChange).toHaveBeenCalledWith(mockRoutine.subroutine[0], 0);
  });

  it('should handle routine progress calculation', () => {
    const { result } = renderHook(() => useRoutineExecution());

    act(() => {
      result.current.controls.loadRoutine(mockRoutine);
    });

    act(() => {
      result.current.controls.startExecution();
    });

    // Progress should be calculated based on current exercise index
    const expectedProgress = (1 / mockRoutine.subroutine.length) * 100;
    expect(result.current.state.routineProgress).toBeCloseTo(expectedProgress, 1);
  });

  it('should preserve exercise properties when loading routine', () => {
    const { result } = renderHook(() => useRoutineExecution());

    act(() => {
      result.current.controls.loadRoutine(mockRoutine);
    });

    const firstExercise = result.current.state.exerciseStack[0];
    expect(firstExercise.age).toBe(mockRoutine.age);
    expect(firstExercise.vowels).toEqual(mockRoutine.subroutine[0].vowels);
    expect(firstExercise.consonants).toEqual(mockRoutine.subroutine[0].consonants);
    expect(firstExercise.position).toBe(mockRoutine.subroutine[0].position);
  });
});