import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Alert, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useExerciseTimer } from '../../hooks/useExerciseTimer';
import { useRoutineExecution } from '../../hooks/useRoutineExecution';
import { useProgressTracking } from '../../hooks/useProgressTracking';
import WordDisplay from './WordDisplay';
import ProgressIndicator from './ProgressIndicator';
import { ExerciseEngineProps, ExerciseState, ExerciseError } from './flowTypes';

const ExerciseContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(3),
  padding: theme.spacing(2),
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const ExerciseContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  width: '100%',
  maxWidth: '800px',
}));

const ExerciseEngine: React.FC<ExerciseEngineProps> = ({
  routine,
  userId,
  onExerciseComplete,
  onExerciseError,
  onWordChange,
  onProgressUpdate,
  autoStart = false,
  className,
}) => {
  const [exerciseState, setExerciseState] = useState<ExerciseState>('idle');
  const [currentError, setCurrentError] = useState<ExerciseError | null>(null);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const exerciseSessionRef = useRef<string | null>(null);

  // Custom hooks for exercise functionality - using refs to avoid circular dependencies
  const timerCallbacksRef = useRef<{
    onComplete?: () => void;
    onTick?: (remaining: number) => void;
  }>({});

  const routineCallbacksRef = useRef<{
    onStepChange?: (stepIndex: number, stepConfig: any) => void;
    onRoutineComplete?: () => void;
    onWordFetch?: (word: any) => Promise<void>;
  }>({});

  const {
    timeRemaining,
    isRunning,
    isPaused,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    setDuration,
  } = useExerciseTimer({
    onComplete: () => timerCallbacksRef.current.onComplete?.(),
    onTick: (remaining) => timerCallbacksRef.current.onTick?.(remaining),
  });

  const {
    currentStep,
    currentWord,
    routineProgress,
    isRoutineComplete,
    startRoutine,
    pauseRoutine,
    resumeRoutine,
    skipToNext,
    resetRoutine,
    getCurrentStepConfig,
  } = useRoutineExecution({
    routine,
    onStepChange: (stepIndex, stepConfig) => routineCallbacksRef.current.onStepChange?.(stepIndex, stepConfig),
    onRoutineComplete: () => routineCallbacksRef.current.onRoutineComplete?.(),
    onWordFetch: (word) => routineCallbacksRef.current.onWordFetch?.(word),
  });

  const {
    sessionData,
    recordWordAttempt,
    updateProgress,
    getSessionSummary,
  } = useProgressTracking({
    userId,
    routineId: routine?.id || '',
    onProgressUpdate,
  });

  // Timer event handlers
  const handleTimerComplete = useCallback(() => {
    if (exerciseState === 'running') {
      skipToNext();
    }
  }, [exerciseState, skipToNext]);

  const handleTimerTick = useCallback((remaining: number) => {
    // Update any UI that needs real-time timer updates
    if (onProgressUpdate) {
      onProgressUpdate({
        timeRemaining: remaining,
        currentStep,
        progress: routineProgress,
      });
    }
  }, [onProgressUpdate, currentStep, routineProgress]);

  // Routine event handlers
  const handleStepChange = useCallback((stepIndex: number, stepConfig: any) => {
    const duration = stepConfig?.duration || 30;
    setDuration(duration);
    
    if (exerciseState === 'running') {
      resetTimer();
      startTimer();
    }
  }, [exerciseState, setDuration, resetTimer, startTimer]);

  const handleRoutineComplete = useCallback(() => {
    setExerciseState('completed');
    pauseTimer();
    
    if (onExerciseComplete) {
      const summary = getSessionSummary();
      onExerciseComplete(summary);
    }
  }, [onExerciseComplete, pauseTimer, getSessionSummary]);

  const handleWordFetch = useCallback(async (word: any) => {
    if (onWordChange) {
      onWordChange(word);
    }
  }, [onWordChange]);

  // Update callback refs when handlers change
  useEffect(() => {
    timerCallbacksRef.current = {
      onComplete: handleTimerComplete,
      onTick: handleTimerTick,
    };
  }, [handleTimerComplete, handleTimerTick]);

  useEffect(() => {
    routineCallbacksRef.current = {
      onStepChange: handleStepChange,
      onRoutineComplete: handleRoutineComplete,
      onWordFetch: handleWordFetch,
    };
  }, [handleStepChange, handleRoutineComplete, handleWordFetch]);

  // Exercise control methods
  const startExercise = useCallback(async () => {
    try {
      if (!routine) {
        throw new Error('No routine provided');
      }

      setExerciseState('starting');
      setCurrentError(null);

      // Generate new session ID
      exerciseSessionRef.current = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Start the routine
      await startRoutine();
      
      // Start the timer for the first step
      const firstStepConfig = getCurrentStepConfig();
      if (firstStepConfig) {
        setDuration(firstStepConfig.duration || 30);
        startTimer();
      }

      setExerciseState('running');
    } catch (error) {
      const exerciseError: ExerciseError = {
        type: 'EXERCISE_START_ERROR',
        message: error instanceof Error ? error.message : 'Failed to start exercise',
        timestamp: new Date(),
        recoverable: true,
      };
      
      setCurrentError(exerciseError);
      setExerciseState('error');
      setShowErrorSnackbar(true);
      
      if (onExerciseError) {
        onExerciseError(exerciseError);
      }
    }
  }, [routine, startRoutine, getCurrentStepConfig, setDuration, startTimer, onExerciseError]);

  const pauseExercise = useCallback(() => {
    if (exerciseState === 'running') {
      setExerciseState('paused');
      pauseTimer();
      pauseRoutine();
    }
  }, [exerciseState, pauseTimer, pauseRoutine]);

  const resumeExercise = useCallback(() => {
    if (exerciseState === 'paused') {
      setExerciseState('running');
      resumeTimer();
      resumeRoutine();
    }
  }, [exerciseState, resumeTimer, resumeRoutine]);

  const skipWord = useCallback(() => {
    if (exerciseState === 'running') {
      // Record the skip as a word attempt with low accuracy
      if (currentWord) {
        recordWordAttempt({
          word: currentWord,
          accuracy: 0,
          timeSpent: timeRemaining,
          difficulty: 0.5,
          skipped: true,
        });
      }
      
      skipToNext();
    }
  }, [exerciseState, currentWord, recordWordAttempt, timeRemaining, skipToNext]);

  const resetExercise = useCallback(() => {
    setExerciseState('idle');
    setCurrentError(null);
    resetTimer();
    resetRoutine();
    exerciseSessionRef.current = null;
  }, [resetTimer, resetRoutine]);

  // Word interaction handler
  const handleWordInteraction = useCallback((interaction: any) => {
    if (exerciseState === 'running' && currentWord) {
      // Record word interaction as an attempt
      const accuracy = calculateAccuracy(interaction, currentWord);
      const timeSpent = (getCurrentStepConfig()?.duration || 30) - timeRemaining;
      
      recordWordAttempt({
        word: currentWord,
        accuracy,
        timeSpent,
        difficulty: currentWord.difficulty || 0.5,
        interaction: interaction.type,
      });

      updateProgress({
        wordsCompleted: sessionData.wordsAttempted.length + 1,
        accuracy: sessionData.accuracy,
        timeElapsed: Date.now() - sessionData.startTime.getTime(),
      });
    }
  }, [exerciseState, currentWord, timeRemaining, recordWordAttempt, updateProgress, sessionData, getCurrentStepConfig]);

  // Helper function to calculate accuracy based on interaction
  function calculateAccuracy(interaction: any, word: any): number {
    // Simple accuracy calculation - can be enhanced based on requirements
    switch (interaction.type) {
      case 'click':
        return 0.8; // Assume good accuracy for clicks
      case 'hover':
        return 0.6; // Lower accuracy for hovers
      default:
        return 0.5;
    }
  }

  // Auto-start effect
  useEffect(() => {
    if (autoStart && routine && exerciseState === 'idle') {
      startExercise();
    }
  }, [autoStart, routine, exerciseState, startExercise]);

  // Error recovery
  const handleErrorRecovery = useCallback(() => {
    if (currentError?.recoverable) {
      setCurrentError(null);
      setShowErrorSnackbar(false);
      
      if (exerciseState === 'error') {
        setExerciseState('idle');
      }
    }
  }, [currentError, exerciseState]);

  // Render different states
  const renderExerciseContent = () => {
    if (exerciseState === 'error' && currentError) {
      return (
        <Alert 
          severity="error" 
          action={
            currentError.recoverable ? (
              <button onClick={handleErrorRecovery}>
                Retry
              </button>
            ) : undefined
          }
        >
          {currentError.message}
        </Alert>
      );
    }

    if (exerciseState === 'completed') {
      return (
        <Alert severity="success">
          Exercise completed! Great job!
        </Alert>
      );
    }

    if (!routine) {
      return (
        <Alert severity="info">
          No routine selected. Please select a routine to begin.
        </Alert>
      );
    }

    return (
      <>
        <ProgressIndicator
          wordsCompleted={sessionData.wordsAttempted.length}
          totalWords={routine.subroutine.reduce((total, step) => 
            step.type === 'word' ? total + step.repetitions : total, 0
          )}
          accuracy={sessionData.accuracy}
          timeElapsed={Math.floor((Date.now() - sessionData.startTime.getTime()) / 1000)}
          currentStreak={sessionData.currentStreak || 0}
          bestStreak={sessionData.bestStreak || 0}
          variant="detailed"
        />

        <WordDisplay
          currentWord={currentWord}
          displayMode={getCurrentStepConfig()?.type || 'word'}
          fontSize="medium"
          showPhonetics={true}
          highlightTarget={exerciseState === 'running'}
          onWordInteraction={handleWordInteraction}
        />
      </>
    );
  };

  return (
    <ExerciseContainer className={className}>
      <ExerciseContent>
        {renderExerciseContent()}
      </ExerciseContent>

      {/* Error Snackbar */}
      <Snackbar
        open={showErrorSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowErrorSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowErrorSnackbar(false)} 
          severity="error"
          variant="filled"
        >
          {currentError?.message}
        </Alert>
      </Snackbar>
    </ExerciseContainer>
  );
};

export default ExerciseEngine;