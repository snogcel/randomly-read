import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { useRoutineExecution } from '../hooks';
import type { Routine, ExerciseStep } from '../hooks/useRoutineExecution';

// Types
export interface RoutineTemplate {
  id: string;
  name: string;
  description: string;
  category: 'beginner' | 'intermediate' | 'advanced' | 'custom';
  gradeLevel: string;
  estimatedDuration: number;
  steps: Omit<ExerciseStep, 'id'>[];
  tags: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
}

export interface RoutineBuilderState {
  id?: string;
  name: string;
  description: string;
  gradeLevel: string;
  category: 'beginner' | 'intermediate' | 'advanced' | 'custom';
  steps: ExerciseStep[];
  currentStepIndex: number;
  isValid: boolean;
  isDirty: boolean;
  errors: Record<string, string>;
}

export interface RoutineState {
  // Current routine being executed
  activeRoutine: Routine | null;
  
  // Routine builder state
  builder: RoutineBuilderState;
  
  // Available routines
  availableRoutines: Routine[];
  templates: RoutineTemplate[];
  
  // Execution state
  isExecuting: boolean;
  executionProgress: number;
  currentStepIndex: number;
  
  // UI state
  isLoading: boolean;
  error: string | null;
  
  // Filters and search
  searchQuery: string;
  categoryFilter: string[];
  gradeLevelFilter: string[];
}

// Action types
export type RoutineAction =
  | { type: 'LOAD_ROUTINE'; payload: Routine }
  | { type: 'CLEAR_ROUTINE' }
  | { type: 'START_EXECUTION' }
  | { type: 'PAUSE_EXECUTION' }
  | { type: 'RESUME_EXECUTION' }
  | { type: 'STOP_EXECUTION' }
  | { type: 'UPDATE_EXECUTION_PROGRESS'; payload: { stepIndex: number; progress: number } }
  | { type: 'BUILDER_NEW_ROUTINE' }
  | { type: 'BUILDER_LOAD_ROUTINE'; payload: Routine }
  | { type: 'BUILDER_UPDATE_METADATA'; payload: Partial<Pick<RoutineBuilderState, 'name' | 'description' | 'gradeLevel' | 'category'>> }
  | { type: 'BUILDER_ADD_STEP'; payload: Omit<ExerciseStep, 'id'> }
  | { type: 'BUILDER_UPDATE_STEP'; payload: { index: number; step: Partial<ExerciseStep> } }
  | { type: 'BUILDER_REMOVE_STEP'; payload: number }
  | { type: 'BUILDER_REORDER_STEPS'; payload: { fromIndex: number; toIndex: number } }
  | { type: 'BUILDER_SET_CURRENT_STEP'; payload: number }
  | { type: 'BUILDER_VALIDATE' }
  | { type: 'BUILDER_SAVE_SUCCESS'; payload: Routine }
  | { type: 'BUILDER_RESET' }
  | { type: 'LOAD_AVAILABLE_ROUTINES'; payload: Routine[] }
  | { type: 'LOAD_TEMPLATES'; payload: RoutineTemplate[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_CATEGORY_FILTER'; payload: string[] }
  | { type: 'SET_GRADE_LEVEL_FILTER'; payload: string[] };

// Initial state
const initialBuilderState: RoutineBuilderState = {
  name: '',
  description: '',
  gradeLevel: '0',
  category: 'custom',
  steps: [],
  currentStepIndex: -1,
  isValid: false,
  isDirty: false,
  errors: {}
};

const initialState: RoutineState = {
  activeRoutine: null,
  builder: initialBuilderState,
  availableRoutines: [],
  templates: [],
  isExecuting: false,
  executionProgress: 0,
  currentStepIndex: -1,
  isLoading: false,
  error: null,
  searchQuery: '',
  categoryFilter: [],
  gradeLevelFilter: []
};

// Validation functions
const validateRoutineBuilder = (builder: RoutineBuilderState): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!builder.name.trim()) {
    errors.name = 'Routine name is required';
  }

  if (!builder.description.trim()) {
    errors.description = 'Routine description is required';
  }

  if (builder.steps.length === 0) {
    errors.steps = 'At least one exercise step is required';
  }

  // Validate individual steps
  builder.steps.forEach((step, index) => {
    if (step.duration <= 0) {
      errors[`step_${index}_duration`] = 'Step duration must be greater than 0';
    }

    if (step.repetitions <= 0) {
      errors[`step_${index}_repetitions`] = 'Step repetitions must be greater than 0';
    }

    if (step.type !== 'intermission') {
      if (step.vowels.length === 0 && step.consonants.length === 0) {
        errors[`step_${index}_phonetics`] = 'At least one vowel or consonant must be selected';
      }

      if (step.syllables.length === 0) {
        errors[`step_${index}_syllables`] = 'At least one syllable count must be selected';
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Reducer
const routineReducer = (state: RoutineState, action: RoutineAction): RoutineState => {
  switch (action.type) {
    case 'LOAD_ROUTINE': {
      return {
        ...state,
        activeRoutine: action.payload,
        error: null
      };
    }

    case 'CLEAR_ROUTINE': {
      return {
        ...state,
        activeRoutine: null,
        isExecuting: false,
        executionProgress: 0,
        currentStepIndex: -1
      };
    }

    case 'START_EXECUTION': {
      return {
        ...state,
        isExecuting: true,
        executionProgress: 0,
        currentStepIndex: 0
      };
    }

    case 'PAUSE_EXECUTION': {
      return {
        ...state,
        isExecuting: false
      };
    }

    case 'RESUME_EXECUTION': {
      return {
        ...state,
        isExecuting: true
      };
    }

    case 'STOP_EXECUTION': {
      return {
        ...state,
        isExecuting: false,
        executionProgress: 0,
        currentStepIndex: -1
      };
    }

    case 'UPDATE_EXECUTION_PROGRESS': {
      return {
        ...state,
        currentStepIndex: action.payload.stepIndex,
        executionProgress: action.payload.progress
      };
    }

    case 'BUILDER_NEW_ROUTINE': {
      return {
        ...state,
        builder: {
          ...initialBuilderState,
          isDirty: false
        }
      };
    }

    case 'BUILDER_LOAD_ROUTINE': {
      const routine = action.payload;
      return {
        ...state,
        builder: {
          id: routine.id,
          name: routine.name,
          description: routine.description,
          gradeLevel: routine.age,
          category: 'custom', // Default to custom when loading existing routine
          steps: routine.subroutine,
          currentStepIndex: -1,
          isValid: true,
          isDirty: false,
          errors: {}
        }
      };
    }

    case 'BUILDER_UPDATE_METADATA': {
      const updatedBuilder = {
        ...state.builder,
        ...action.payload,
        isDirty: true
      };

      const validation = validateRoutineBuilder(updatedBuilder);

      return {
        ...state,
        builder: {
          ...updatedBuilder,
          isValid: validation.isValid,
          errors: validation.errors
        }
      };
    }

    case 'BUILDER_ADD_STEP': {
      const newStep: ExerciseStep = {
        ...action.payload,
        id: `step_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };

      const updatedBuilder = {
        ...state.builder,
        steps: [...state.builder.steps, newStep],
        isDirty: true
      };

      const validation = validateRoutineBuilder(updatedBuilder);

      return {
        ...state,
        builder: {
          ...updatedBuilder,
          isValid: validation.isValid,
          errors: validation.errors
        }
      };
    }

    case 'BUILDER_UPDATE_STEP': {
      const { index, step } = action.payload;
      const updatedSteps = [...state.builder.steps];
      updatedSteps[index] = { ...updatedSteps[index], ...step };

      const updatedBuilder = {
        ...state.builder,
        steps: updatedSteps,
        isDirty: true
      };

      const validation = validateRoutineBuilder(updatedBuilder);

      return {
        ...state,
        builder: {
          ...updatedBuilder,
          isValid: validation.isValid,
          errors: validation.errors
        }
      };
    }

    case 'BUILDER_REMOVE_STEP': {
      const updatedSteps = state.builder.steps.filter((_, index) => index !== action.payload);
      
      const updatedBuilder = {
        ...state.builder,
        steps: updatedSteps,
        currentStepIndex: state.builder.currentStepIndex >= action.payload 
          ? Math.max(-1, state.builder.currentStepIndex - 1)
          : state.builder.currentStepIndex,
        isDirty: true
      };

      const validation = validateRoutineBuilder(updatedBuilder);

      return {
        ...state,
        builder: {
          ...updatedBuilder,
          isValid: validation.isValid,
          errors: validation.errors
        }
      };
    }

    case 'BUILDER_REORDER_STEPS': {
      const { fromIndex, toIndex } = action.payload;
      const updatedSteps = [...state.builder.steps];
      const [movedStep] = updatedSteps.splice(fromIndex, 1);
      updatedSteps.splice(toIndex, 0, movedStep);

      return {
        ...state,
        builder: {
          ...state.builder,
          steps: updatedSteps,
          isDirty: true
        }
      };
    }

    case 'BUILDER_SET_CURRENT_STEP': {
      return {
        ...state,
        builder: {
          ...state.builder,
          currentStepIndex: action.payload
        }
      };
    }

    case 'BUILDER_VALIDATE': {
      const validation = validateRoutineBuilder(state.builder);

      return {
        ...state,
        builder: {
          ...state.builder,
          isValid: validation.isValid,
          errors: validation.errors
        }
      };
    }

    case 'BUILDER_SAVE_SUCCESS': {
      return {
        ...state,
        builder: {
          ...state.builder,
          id: action.payload.id,
          isDirty: false
        },
        availableRoutines: state.availableRoutines.some(r => r.id === action.payload.id)
          ? state.availableRoutines.map(r => r.id === action.payload.id ? action.payload : r)
          : [...state.availableRoutines, action.payload]
      };
    }

    case 'BUILDER_RESET': {
      return {
        ...state,
        builder: {
          ...initialBuilderState,
          isDirty: false
        }
      };
    }

    case 'LOAD_AVAILABLE_ROUTINES': {
      return {
        ...state,
        availableRoutines: action.payload
      };
    }

    case 'LOAD_TEMPLATES': {
      return {
        ...state,
        templates: action.payload
      };
    }

    case 'SET_LOADING': {
      return {
        ...state,
        isLoading: action.payload
      };
    }

    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    }

    case 'CLEAR_ERROR': {
      return {
        ...state,
        error: null
      };
    }

    case 'SET_SEARCH_QUERY': {
      return {
        ...state,
        searchQuery: action.payload
      };
    }

    case 'SET_CATEGORY_FILTER': {
      return {
        ...state,
        categoryFilter: action.payload
      };
    }

    case 'SET_GRADE_LEVEL_FILTER': {
      return {
        ...state,
        gradeLevelFilter: action.payload
      };
    }

    default:
      return state;
  }
};

// Context
export interface RoutineContextValue {
  state: RoutineState;
  actions: {
    // Routine management
    loadRoutine: (routine: Routine) => void;
    clearRoutine: () => void;
    
    // Execution control
    startExecution: () => void;
    pauseExecution: () => void;
    resumeExecution: () => void;
    stopExecution: () => void;
    
    // Builder actions
    newRoutine: () => void;
    loadRoutineForEditing: (routine: Routine) => void;
    updateMetadata: (metadata: Partial<Pick<RoutineBuilderState, 'name' | 'description' | 'gradeLevel' | 'category'>>) => void;
    addStep: (step: Omit<ExerciseStep, 'id'>) => void;
    updateStep: (index: number, step: Partial<ExerciseStep>) => void;
    removeStep: (index: number) => void;
    reorderSteps: (fromIndex: number, toIndex: number) => void;
    setCurrentStep: (index: number) => void;
    validateBuilder: () => void;
    saveRoutine: () => Promise<Routine>;
    resetBuilder: () => void;
    
    // Data loading
    loadAvailableRoutines: (routines: Routine[]) => void;
    loadTemplates: (templates: RoutineTemplate[]) => void;
    
    // UI actions
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearError: () => void;
    setSearchQuery: (query: string) => void;
    setCategoryFilter: (categories: string[]) => void;
    setGradeLevelFilter: (gradeLevels: string[]) => void;
  };
  
  // Routine execution integration
  routineExecution: ReturnType<typeof useRoutineExecution>;
  
  // Computed values
  filteredRoutines: Routine[];
  canSaveBuilder: boolean;
  estimatedDuration: number;
}

const RoutineContext = createContext<RoutineContextValue | null>(null);

// Provider component
export interface RoutineProviderProps {
  children: React.ReactNode;
  onSaveRoutine?: (routine: RoutineBuilderState) => Promise<Routine>;
  onLoadRoutines?: () => Promise<Routine[]>;
  onLoadTemplates?: () => Promise<RoutineTemplate[]>;
}

export const RoutineProvider: React.FC<RoutineProviderProps> = ({
  children,
  onSaveRoutine,
  onLoadRoutines,
  onLoadTemplates
}) => {
  const [state, dispatch] = useReducer(routineReducer, initialState);

  // Initialize routine execution
  const routineExecution = useRoutineExecution({
    onExerciseChange: (exercise, index) => {
      dispatch({ 
        type: 'UPDATE_EXECUTION_PROGRESS', 
        payload: { 
          stepIndex: index, 
          progress: ((index + 1) / (state.activeRoutine?.subroutine.length || 1)) * 100 
        } 
      });
    },
    onRoutineComplete: () => {
      dispatch({ type: 'STOP_EXECUTION' });
    }
  });

  // Actions
  const actions = {
    loadRoutine: useCallback((routine: Routine) => {
      dispatch({ type: 'LOAD_ROUTINE', payload: routine });
      routineExecution.controls.loadRoutine(routine);
    }, [routineExecution.controls]),

    clearRoutine: useCallback(() => {
      dispatch({ type: 'CLEAR_ROUTINE' });
      routineExecution.controls.loadRoutine({
        id: '',
        name: '',
        description: '',
        age: '0',
        subroutine: []
      });
    }, [routineExecution.controls]),

    startExecution: useCallback(() => {
      dispatch({ type: 'START_EXECUTION' });
      routineExecution.controls.startExecution();
    }, [routineExecution.controls]),

    pauseExecution: useCallback(() => {
      dispatch({ type: 'PAUSE_EXECUTION' });
      routineExecution.controls.pauseExecution();
    }, [routineExecution.controls]),

    resumeExecution: useCallback(() => {
      dispatch({ type: 'RESUME_EXECUTION' });
      routineExecution.controls.resumeExecution();
    }, [routineExecution.controls]),

    stopExecution: useCallback(() => {
      dispatch({ type: 'STOP_EXECUTION' });
      routineExecution.controls.stopExecution();
    }, [routineExecution.controls]),

    newRoutine: useCallback(() => {
      dispatch({ type: 'BUILDER_NEW_ROUTINE' });
    }, []),

    loadRoutineForEditing: useCallback((routine: Routine) => {
      dispatch({ type: 'BUILDER_LOAD_ROUTINE', payload: routine });
    }, []),

    updateMetadata: useCallback((metadata: Partial<Pick<RoutineBuilderState, 'name' | 'description' | 'gradeLevel' | 'category'>>) => {
      dispatch({ type: 'BUILDER_UPDATE_METADATA', payload: metadata });
    }, []),

    addStep: useCallback((step: Omit<ExerciseStep, 'id'>) => {
      dispatch({ type: 'BUILDER_ADD_STEP', payload: step });
    }, []),

    updateStep: useCallback((index: number, step: Partial<ExerciseStep>) => {
      dispatch({ type: 'BUILDER_UPDATE_STEP', payload: { index, step } });
    }, []),

    removeStep: useCallback((index: number) => {
      dispatch({ type: 'BUILDER_REMOVE_STEP', payload: index });
    }, []),

    reorderSteps: useCallback((fromIndex: number, toIndex: number) => {
      dispatch({ type: 'BUILDER_REORDER_STEPS', payload: { fromIndex, toIndex } });
    }, []),

    setCurrentStep: useCallback((index: number) => {
      dispatch({ type: 'BUILDER_SET_CURRENT_STEP', payload: index });
    }, []),

    validateBuilder: useCallback(() => {
      dispatch({ type: 'BUILDER_VALIDATE' });
    }, []),

    saveRoutine: useCallback(async (): Promise<Routine> => {
      if (!onSaveRoutine) {
        throw new Error('Save routine handler not provided');
      }

      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        const savedRoutine = await onSaveRoutine(state.builder);
        dispatch({ type: 'BUILDER_SAVE_SUCCESS', payload: savedRoutine });
        return savedRoutine;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to save routine';
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
        throw error;
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }, [onSaveRoutine, state.builder]),

    resetBuilder: useCallback(() => {
      dispatch({ type: 'BUILDER_RESET' });
    }, []),

    loadAvailableRoutines: useCallback((routines: Routine[]) => {
      dispatch({ type: 'LOAD_AVAILABLE_ROUTINES', payload: routines });
    }, []),

    loadTemplates: useCallback((templates: RoutineTemplate[]) => {
      dispatch({ type: 'LOAD_TEMPLATES', payload: templates });
    }, []),

    setLoading: useCallback((loading: boolean) => {
      dispatch({ type: 'SET_LOADING', payload: loading });
    }, []),

    setError: useCallback((error: string | null) => {
      dispatch({ type: 'SET_ERROR', payload: error });
    }, []),

    clearError: useCallback(() => {
      dispatch({ type: 'CLEAR_ERROR' });
    }, []),

    setSearchQuery: useCallback((query: string) => {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    }, []),

    setCategoryFilter: useCallback((categories: string[]) => {
      dispatch({ type: 'SET_CATEGORY_FILTER', payload: categories });
    }, []),

    setGradeLevelFilter: useCallback((gradeLevels: string[]) => {
      dispatch({ type: 'SET_GRADE_LEVEL_FILTER', payload: gradeLevels });
    }, [])
  };

  // Computed values
  const filteredRoutines = state.availableRoutines.filter(routine => {
    // Search query filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      if (!routine.name.toLowerCase().includes(query) && 
          !routine.description.toLowerCase().includes(query)) {
        return false;
      }
    }

    // Grade level filter
    if (state.gradeLevelFilter.length > 0) {
      if (!state.gradeLevelFilter.includes(routine.age)) {
        return false;
      }
    }

    return true;
  });

  const canSaveBuilder = state.builder.isValid && state.builder.isDirty;

  const estimatedDuration = state.builder.steps.reduce((total, step) => {
    return total + (step.duration * step.repetitions);
  }, 0);

  // Load initial data
  useEffect(() => {
    if (onLoadRoutines) {
      onLoadRoutines().then(routines => {
        actions.loadAvailableRoutines(routines);
      }).catch(error => {
        actions.setError(`Failed to load routines: ${error.message}`);
      });
    }

    if (onLoadTemplates) {
      onLoadTemplates().then(templates => {
        actions.loadTemplates(templates);
      }).catch(error => {
        console.warn('Failed to load templates:', error);
      });
    }
  }, [onLoadRoutines, onLoadTemplates, actions]);

  const contextValue: RoutineContextValue = {
    state,
    actions,
    routineExecution,
    filteredRoutines,
    canSaveBuilder,
    estimatedDuration
  };

  return (
    <RoutineContext.Provider value={contextValue}>
      {children}
    </RoutineContext.Provider>
  );
};

// Hook to use the context
export const useRoutineContext = (): RoutineContextValue => {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error('useRoutineContext must be used within a RoutineProvider');
  }
  return context;
};