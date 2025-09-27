// Export all exercise components for easy importing
export { default as WordDisplay } from './WordDisplay';
export { default as ProgressIndicator } from './ProgressIndicator';
export { default as ExerciseHistory } from './ExerciseHistory';
export { default as ExerciseEngine } from './ExerciseEngine';
export { default as RoutineSelector } from './RoutineSelector';
export { default as ExerciseIntermission } from './ExerciseIntermission';
export { default as ExerciseErrorBoundary, DefaultErrorFallback } from './ExerciseErrorBoundary';
export { default as FluencyReport } from './FluencyReport';
export { default as WordHistory } from './WordHistory';
export { default as SessionSummary } from './SessionSummary';

// Export types from base types
export type {
  WordDisplayProps,
  ProgressIndicatorProps,
  ExerciseHistoryProps,
  WordInteraction,
  ExerciseSession,
  WordAttempt,
  Word,
  Definition,
  Vote,
} from './types';

// Export types from flow types
export type {
  ExerciseEngineProps,
  RoutineSelectorProps,
  ExerciseIntermissionProps,
  ExerciseErrorBoundaryProps,
  ExerciseErrorFallbackProps,
  ExerciseState,
  ExerciseError,
  ProgressUpdate,
  RoutineProgress,
  Routine,
  SubroutineStep,
  PhoneticConfiguration,
} from './flowTypes';

// Export types from progress types
export type {
  FluencyReportProps,
  WordHistoryProps,
  SessionSummaryProps,
  FluencyData,
  WordHistoryEntry,
  ExerciseSessionSummary,
  Achievement,
  Recommendation,
  ProgressTrend,
  DateRange,
} from './progressTypes';

// Export constants
export { FONT_SIZE_MAP, EXERCISE_COLORS } from './types';