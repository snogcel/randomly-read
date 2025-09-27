// TypeScript interfaces for exercise flow components

import { Routine, Word, ExerciseSession } from './types';

export interface ExerciseEngineProps {
  routine: Routine | null;
  userId: string;
  onExerciseComplete?: (summary: ExerciseSession) => void;
  onExerciseError?: (error: ExerciseError) => void;
  onWordChange?: (word: Word | null) => void;
  onProgressUpdate?: (progress: ProgressUpdate) => void;
  autoStart?: boolean;
  className?: string;
}

export interface RoutineSelectorProps {
  routines: Routine[];
  selectedRoutine: Routine | null;
  onRoutineSelect: (routine: Routine) => void;
  onRoutinePreview?: (routine: Routine) => void;
  loading?: boolean;
  error?: string | null;
  showPreview?: boolean;
  filterByDifficulty?: string;
  filterByType?: string;
  className?: string;
}

export interface ExerciseIntermissionProps {
  duration: number;
  message?: string;
  onComplete: () => void;
  onSkip?: () => void;
  showProgress?: boolean;
  allowSkip?: boolean;
  className?: string;
}

export interface ExerciseErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ExerciseErrorFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export interface ExerciseErrorFallbackProps {
  error: Error;
  resetError: () => void;
  retry?: () => void;
}

// State and data types
export type ExerciseState = 
  | 'idle' 
  | 'starting' 
  | 'running' 
  | 'paused' 
  | 'completed' 
  | 'error';

export interface ExerciseError {
  type: 'EXERCISE_START_ERROR' | 'WORD_FETCH_ERROR' | 'TIMER_ERROR' | 'ROUTINE_ERROR';
  message: string;
  timestamp: Date;
  recoverable: boolean;
  details?: any;
}

export interface ProgressUpdate {
  timeRemaining?: number;
  currentStep?: number;
  progress?: RoutineProgress;
  wordsCompleted?: number;
  accuracy?: number;
  timeElapsed?: number;
}

export interface RoutineProgress {
  currentStepIndex: number;
  totalSteps: number;
  completedSteps: number;
  currentRepetition: number;
  totalRepetitions: number;
}

// Routine types (extending base types)
export interface Routine {
  id: string;
  name: string;
  description?: string;
  age?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  estimatedDuration?: number;
  subroutine: SubroutineStep[];
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: string[];
}

export interface SubroutineStep {
  id: string;
  type: 'word' | 'sentence' | 'intermission';
  duration: number;
  repetitions: number;
  phoneticConfig?: PhoneticConfiguration;
  intermissionText?: string;
  difficulty?: number;
}

export interface PhoneticConfiguration {
  vowels: string[];
  consonants: string[];
  position: 'initial' | 'medial' | 'final';
  syllables: number[];
  gradeLevel: string;
}

// Routine preview types
export interface RoutinePreview {
  routine: Routine;
  estimatedDuration: number;
  stepBreakdown: StepBreakdown[];
  difficultyAnalysis: DifficultyAnalysis;
}

export interface StepBreakdown {
  stepIndex: number;
  type: 'word' | 'sentence' | 'intermission';
  duration: number;
  repetitions: number;
  estimatedWords?: number;
  phoneticFocus?: string[];
}

export interface DifficultyAnalysis {
  overall: 'easy' | 'medium' | 'hard';
  phoneticComplexity: number;
  vocabularyLevel: string;
  recommendedAge: string;
}

// Filter and search types
export interface RoutineFilters {
  difficulty?: string[];
  category?: string[];
  duration?: {
    min?: number;
    max?: number;
  };
  ageGroup?: string[];
  tags?: string[];
  searchTerm?: string;
}

export interface RoutineSortOptions {
  field: 'name' | 'difficulty' | 'duration' | 'createdAt' | 'popularity';
  direction: 'asc' | 'desc';
}

// Intermission types
export interface IntermissionConfig {
  duration: number;
  message?: string;
  type: 'rest' | 'instruction' | 'encouragement';
  allowSkip: boolean;
  showCountdown: boolean;
}

// Error boundary types
export interface ExerciseErrorInfo {
  componentStack: string;
  errorBoundary?: string;
  eventType?: string;
}

export interface ErrorRecoveryAction {
  label: string;
  action: () => void;
  primary?: boolean;
}

// Exercise session management
export interface ExerciseSessionConfig {
  sessionId: string;
  userId: string;
  routineId: string;
  startTime: Date;
  settings: ExerciseSettings;
}

export interface ExerciseSettings {
  fontSize: 'small' | 'medium' | 'large';
  showPhonetics: boolean;
  autoAdvance: boolean;
  soundEnabled: boolean;
  highlightTarget: boolean;
  pauseBetweenWords: boolean;
}

// Performance monitoring
export interface ExerciseMetrics {
  sessionId: string;
  startTime: Date;
  endTime?: Date;
  totalWords: number;
  completedWords: number;
  averageAccuracy: number;
  averageResponseTime: number;
  difficultWords: string[];
  skippedWords: number;
  pauseCount: number;
  totalPauseTime: number;
}

// Component state management
export interface ExerciseFlowState {
  currentRoutine: Routine | null;
  exerciseState: ExerciseState;
  currentStep: number;
  currentWord: Word | null;
  sessionConfig: ExerciseSessionConfig | null;
  metrics: ExerciseMetrics | null;
  error: ExerciseError | null;
}

// Action types for state management
export type ExerciseFlowAction =
  | { type: 'SET_ROUTINE'; payload: Routine }
  | { type: 'START_EXERCISE'; payload: ExerciseSessionConfig }
  | { type: 'PAUSE_EXERCISE' }
  | { type: 'RESUME_EXERCISE' }
  | { type: 'COMPLETE_EXERCISE'; payload: ExerciseMetrics }
  | { type: 'SET_ERROR'; payload: ExerciseError }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_PROGRESS'; payload: ProgressUpdate }
  | { type: 'SET_CURRENT_WORD'; payload: Word | null }
  | { type: 'RESET_EXERCISE' };