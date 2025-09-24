import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { useExerciseTimer, useProgressTracking } from '../hooks';
import type { WordAttempt } from '../hooks/useProgressTracking';

// Types
export interface ExerciseWord {
  id: string;
  lexeme: string;
  phonetic: string;
  consonants: string[];
  vowels: string[];
  syllables: number;
  gradeLevel: string;
  difficulty: number;
}

export interface ExerciseSession {
  id: string;
  userId: string;
  routineId: string;
  startTime: Date;
  endTime?: Date;
  currentWordIndex: number;
  words: ExerciseWord[];
  attempts: WordAttempt[];
  isActive: boolean;
  isPaused: boolean;
  settings: ExerciseSettings;
}

export interface ExerciseSettings {
  duration: number;
  autoAdvance: boolean;
  showPhonetics: boolean;
  fontSize: 'small' | 'medium' | 'large';
  mode: 'word' | 'sentence' | 'intermission';
  vowels: string[];
  consonants: string[];
  syllables: number[];
  position: 'initial' | 'medial' | 'final';
  gradeLevel: string;
}

export interface ExerciseState {
  currentSession: ExerciseSession | null;
  currentWord: ExerciseWord | null;
  sessionHistory: ExerciseSession[];
  isLoading: boolean;
  error: string | null;
  settings: ExerciseSettings;
}

// Action types
export type ExerciseAction =
  | { type: 'START_SESSION'; payload: { userId: string; routineId: string; words: ExerciseWord[]; settings: ExerciseSettings } }
  | { type: 'END_SESSION' }
  | { type: 'PAUSE_SESSION' }
  | { type: 'RESUME_SESSION' }
  | { type: 'NEXT_WORD' }
  | { type: 'PREVIOUS_WORD' }
  | { type: 'SET_CURRENT_WORD'; payload: ExerciseWord }
  | { type: 'RECORD_ATTEMPT'; payload: WordAttempt }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<ExerciseSettings> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' }
  | { type: 'LOAD_SESSION_HISTORY'; payload: ExerciseSession[] }
  | { type: 'PERSIST_SESSION' };

// Initial state
const initialSettings: ExerciseSettings = {
  duration: 3,
  autoAdvance: true,
  showPhonetics: false,
  fontSize: 'medium',
  mode: 'word',
  vowels: [],
  consonants: [],
  syllables: [1],
  position: 'initial',
  gradeLevel: '0'
};

const initialState: ExerciseState = {
  currentSession: null,
  currentWord: null,
  sessionHistory: [],
  isLoading: false,
  error: null,
  settings: initialSettings
};

// Reducer
const exerciseReducer = (state: ExerciseState, action: ExerciseAction): ExerciseState => {
  switch (action.type) {
    case 'START_SESSION': {
      const { userId, routineId, words, settings } = action.payload;
      const newSession: ExerciseSession = {
        id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        routineId,
        startTime: new Date(),
        currentWordIndex: 0,
        words,
        attempts: [],
        isActive: true,
        isPaused: false,
        settings
      };

      return {
        ...state,
        currentSession: newSession,
        currentWord: words[0] || null,
        settings,
        error: null
      };
    }

    case 'END_SESSION': {
      if (!state.currentSession) return state;

      const endedSession: ExerciseSession = {
        ...state.currentSession,
        endTime: new Date(),
        isActive: false,
        isPaused: false
      };

      return {
        ...state,
        currentSession: null,
        currentWord: null,
        sessionHistory: [...state.sessionHistory, endedSession]
      };
    }

    case 'PAUSE_SESSION': {
      if (!state.currentSession) return state;

      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          isPaused: true
        }
      };
    }

    case 'RESUME_SESSION': {
      if (!state.currentSession) return state;

      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          isPaused: false
        }
      };
    }

    case 'NEXT_WORD': {
      if (!state.currentSession) return state;

      const nextIndex = state.currentSession.currentWordIndex + 1;
      const nextWord = state.currentSession.words[nextIndex] || null;

      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          currentWordIndex: nextIndex
        },
        currentWord: nextWord
      };
    }

    case 'PREVIOUS_WORD': {
      if (!state.currentSession) return state;

      const prevIndex = Math.max(0, state.currentSession.currentWordIndex - 1);
      const prevWord = state.currentSession.words[prevIndex] || null;

      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          currentWordIndex: prevIndex
        },
        currentWord: prevWord
      };
    }

    case 'SET_CURRENT_WORD': {
      return {
        ...state,
        currentWord: action.payload
      };
    }

    case 'RECORD_ATTEMPT': {
      if (!state.currentSession) return state;

      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          attempts: [...state.currentSession.attempts, action.payload]
        }
      };
    }

    case 'UPDATE_SETTINGS': {
      const newSettings = { ...state.settings, ...action.payload };
      
      return {
        ...state,
        settings: newSettings,
        currentSession: state.currentSession ? {
          ...state.currentSession,
          settings: newSettings
        } : null
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

    case 'LOAD_SESSION_HISTORY': {
      return {
        ...state,
        sessionHistory: action.payload
      };
    }

    case 'PERSIST_SESSION': {
      // This would typically save to localStorage or send to server
      if (state.currentSession) {
        try {
          localStorage.setItem('currentExerciseSession', JSON.stringify(state.currentSession));
        } catch (error) {
          console.warn('Failed to persist exercise session:', error);
        }
      }
      return state;
    }

    default:
      return state;
  }
};

// Context
export interface ExerciseContextValue {
  state: ExerciseState;
  actions: {
    startSession: (userId: string, routineId: string, words: ExerciseWord[], settings?: Partial<ExerciseSettings>) => void;
    endSession: () => void;
    pauseSession: () => void;
    resumeSession: () => void;
    nextWord: () => void;
    previousWord: () => void;
    setCurrentWord: (word: ExerciseWord) => void;
    recordAttempt: (attempt: Omit<WordAttempt, 'timestamp'>) => void;
    updateSettings: (settings: Partial<ExerciseSettings>) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearError: () => void;
    loadSessionHistory: (sessions: ExerciseSession[]) => void;
    persistSession: () => void;
  };
  // Timer integration
  timerState: ReturnType<typeof useExerciseTimer>['timerState'];
  timerControls: ReturnType<typeof useExerciseTimer>['controls'];
  // Progress tracking integration
  progressTracking: ReturnType<typeof useProgressTracking>;
}

const ExerciseContext = createContext<ExerciseContextValue | null>(null);

// Provider component
export interface ExerciseProviderProps {
  children: React.ReactNode;
  userId: string;
  persistToStorage?: boolean;
  autoSave?: boolean;
  saveInterval?: number;
}

export const ExerciseProvider: React.FC<ExerciseProviderProps> = ({
  children,
  userId,
  persistToStorage = true,
  autoSave = true,
  saveInterval = 5000
}) => {
  const [state, dispatch] = useReducer(exerciseReducer, initialState);

  // Initialize progress tracking
  const progressTracking = useProgressTracking({
    userId,
    autoSave,
    saveInterval,
    onProgressUpdate: (progress) => {
      // Could dispatch action to update state if needed
    },
    onSessionComplete: (progress) => {
      // Handle session completion
      dispatch({ type: 'END_SESSION' });
    }
  });

  // Initialize timer
  const { timerState, controls: timerControls } = useExerciseTimer({
    initialDuration: state.settings.duration,
    onTick: (timeLeft) => {
      // Could dispatch action to update UI if needed
    },
    onComplete: () => {
      if (state.settings.autoAdvance) {
        actions.nextWord();
      }
    }
  });

  // Actions
  const actions = {
    startSession: useCallback((userId: string, routineId: string, words: ExerciseWord[], settings: Partial<ExerciseSettings> = {}) => {
      const mergedSettings = { ...state.settings, ...settings };
      dispatch({ 
        type: 'START_SESSION', 
        payload: { userId, routineId, words, settings: mergedSettings } 
      });
      
      // Start progress tracking
      progressTracking.startSession(routineId, `Exercise Session`);
      
      // Set timer duration
      timerControls.setDuration(mergedSettings.duration);
    }, [state.settings, progressTracking, timerControls]),

    endSession: useCallback(() => {
      dispatch({ type: 'END_SESSION' });
      progressTracking.endSession();
      timerControls.reset();
    }, [progressTracking, timerControls]),

    pauseSession: useCallback(() => {
      dispatch({ type: 'PAUSE_SESSION' });
      timerControls.pause();
    }, [timerControls]),

    resumeSession: useCallback(() => {
      dispatch({ type: 'RESUME_SESSION' });
      timerControls.resume();
    }, [timerControls]),

    nextWord: useCallback(() => {
      // Record attempt for current word if session is active
      if (state.currentSession && state.currentWord) {
        const attempt: Omit<WordAttempt, 'timestamp'> = {
          wordId: state.currentWord.id,
          lexeme: state.currentWord.lexeme,
          timeSpent: state.settings.duration * 1000,
          difficulty: state.currentWord.difficulty,
          exerciseType: state.settings.mode as 'word' | 'sentence',
          position: state.settings.position,
          phonetics: {
            vowels: state.currentWord.vowels,
            consonants: state.currentWord.consonants,
            syllables: state.currentWord.syllables
          }
        };
        
        progressTracking.recordWordAttempt(attempt);
        dispatch({ type: 'RECORD_ATTEMPT', payload: { ...attempt, timestamp: new Date() } });
      }

      dispatch({ type: 'NEXT_WORD' });
      timerControls.reset();
      
      if (state.currentSession?.isActive && !state.currentSession.isPaused) {
        timerControls.start();
      }
    }, [state.currentSession, state.currentWord, state.settings, progressTracking, timerControls]),

    previousWord: useCallback(() => {
      dispatch({ type: 'PREVIOUS_WORD' });
      timerControls.reset();
    }, [timerControls]),

    setCurrentWord: useCallback((word: ExerciseWord) => {
      dispatch({ type: 'SET_CURRENT_WORD', payload: word });
    }, []),

    recordAttempt: useCallback((attempt: Omit<WordAttempt, 'timestamp'>) => {
      const fullAttempt = { ...attempt, timestamp: new Date() };
      dispatch({ type: 'RECORD_ATTEMPT', payload: fullAttempt });
      progressTracking.recordWordAttempt(attempt);
    }, [progressTracking]),

    updateSettings: useCallback((settings: Partial<ExerciseSettings>) => {
      dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
      
      // Update timer duration if changed
      if (settings.duration !== undefined) {
        timerControls.setDuration(settings.duration);
      }
    }, [timerControls]),

    setLoading: useCallback((loading: boolean) => {
      dispatch({ type: 'SET_LOADING', payload: loading });
    }, []),

    setError: useCallback((error: string | null) => {
      dispatch({ type: 'SET_ERROR', payload: error });
    }, []),

    clearError: useCallback(() => {
      dispatch({ type: 'CLEAR_ERROR' });
    }, []),

    loadSessionHistory: useCallback((sessions: ExerciseSession[]) => {
      dispatch({ type: 'LOAD_SESSION_HISTORY', payload: sessions });
    }, []),

    persistSession: useCallback(() => {
      dispatch({ type: 'PERSIST_SESSION' });
    }, [])
  };

  // Auto-persist session when it changes
  useEffect(() => {
    if (persistToStorage && state.currentSession) {
      actions.persistSession();
    }
  }, [state.currentSession, persistToStorage, actions]);

  // Load persisted session on mount
  useEffect(() => {
    if (persistToStorage) {
      try {
        const persistedSession = localStorage.getItem('currentExerciseSession');
        if (persistedSession) {
          const session: ExerciseSession = JSON.parse(persistedSession);
          // Only restore if session is recent (within 24 hours)
          const sessionAge = Date.now() - new Date(session.startTime).getTime();
          if (sessionAge < 24 * 60 * 60 * 1000) {
            dispatch({ 
              type: 'START_SESSION', 
              payload: { 
                userId: session.userId, 
                routineId: session.routineId, 
                words: session.words, 
                settings: session.settings 
              } 
            });
          }
        }
      } catch (error) {
        console.warn('Failed to load persisted exercise session:', error);
      }
    }
  }, [persistToStorage]);

  const contextValue: ExerciseContextValue = {
    state,
    actions,
    timerState,
    timerControls,
    progressTracking
  };

  return (
    <ExerciseContext.Provider value={contextValue}>
      {children}
    </ExerciseContext.Provider>
  );
};

// Hook to use the context
export const useExerciseContext = (): ExerciseContextValue => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error('useExerciseContext must be used within an ExerciseProvider');
  }
  return context;
};