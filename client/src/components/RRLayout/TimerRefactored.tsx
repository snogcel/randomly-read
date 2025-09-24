import React, { useEffect, useCallback, useMemo } from 'react';
import { Grid, Typography, Card, CardContent, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Import custom hooks
import { useExerciseTimer, useRoutineExecution, useProgressTracking } from '../../hooks';

// Import new components
import TimerControls from './TimerControls';
import TimerDisplay from './TimerDisplay';
import ExerciseProgress from './ExerciseProgress';
import RoutineSelectContainer from './RoutineSelectContainer';

// Import types
import type { Routine, ExerciseStep } from '../../hooks/useRoutineExecution';

const TimerCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2)
}));

const ControlsGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2)
}));

const MobileContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1)
}));

export interface TimerRefactoredProps {
  // Redux props (to maintain compatibility with existing code)
  currentExercise: ExerciseStep[];
  completed: number;
  total: number;
  timeLeft: number;
  
  // Action props
  addExercise: (exercises: ExerciseStep[]) => void;
  addExerciseNumber: (index: number | null) => void;
  updateCompleted: (count: number) => void;
  updateTotal: (count: number) => void;
  updateTimeLeft: (time: number | null) => void;
  setRange: (range: number) => void;
  setExercisePause: (paused: boolean) => void;
  addRoutineVowel: (vowels: string[]) => void;
  removeConsonant: () => void;
  addConsonant: (consonants: string[]) => void;
  addSyllables: (syllables: number[]) => void;
  setMode: (mode: string) => void;
  setPosition: (position: string) => void;
  setAge: (age: string) => void;
  setLimit: (limit: number) => void;
  setIntermissionText: (text: string) => void;
  clearQueryResults: () => void;
  
  // Optional props
  userId?: string;
  className?: string;
}

/**
 * Refactored Timer component using modern React patterns and custom hooks
 */
export const TimerRefactored: React.FC<TimerRefactoredProps> = ({
  currentExercise,
  completed,
  total,
  timeLeft,
  addExercise,
  addExerciseNumber,
  updateCompleted,
  updateTotal,
  updateTimeLeft,
  setRange,
  setExercisePause,
  addRoutineVowel,
  removeConsonant,
  addConsonant,
  addSyllables,
  setMode,
  setPosition,
  setAge,
  setLimit,
  setIntermissionText,
  clearQueryResults,
  userId = 'default-user',
  className
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Initialize progress tracking
  const progressTracking = useProgressTracking({
    userId,
    onProgressUpdate: (progress) => {
      // Could sync with Redux or external state here
      console.log('Progress updated:', progress);
    },
    onSessionComplete: (progress) => {
      console.log('Session completed:', progress);
    }
  });

  // Initialize routine execution
  const routineExecution = useRoutineExecution({
    onExerciseChange: (exercise, index) => {
      // Update Redux state to maintain compatibility
      addExerciseNumber(index);
      setRange(exercise.rangeVal);
      addRoutineVowel(exercise.vowels);
      addConsonant(exercise.consonants);
      addSyllables(exercise.syllables);
      setMode(exercise.mode);
      setPosition(exercise.position);
      setAge(exercise.age || '0');
      setIntermissionText(exercise.intermissionText || '');
      
      // Update timer duration
      timerControls.setDuration(exercise.rangeVal);
    },
    onRoutineComplete: (results) => {
      progressTracking.endSession();
      setExercisePause(true);
      updateTimeLeft(null);
    },
    onExerciseComplete: (exercise, index) => {
      // Record word attempt for progress tracking
      if (exercise.type !== 'intermission') {
        progressTracking.recordWordAttempt({
          wordId: `exercise-${exercise.id}`,
          lexeme: `${exercise.type}-exercise`,
          timeSpent: exercise.duration * 1000,
          difficulty: 3,
          exerciseType: exercise.type,
          position: exercise.position,
          phonetics: {
            vowels: exercise.vowels,
            consonants: exercise.consonants,
            syllables: exercise.syllables.length
          }
        });
      }
    }
  });

  // Initialize exercise timer
  const { timerState, controls: timerControls } = useExerciseTimer({
    initialDuration: 3,
    onTick: (timeLeft) => {
      updateTimeLeft(timeLeft);
    },
    onComplete: () => {
      routineExecution.controls.skipToNext();
    }
  });

  // Handle routine selection
  const handleRoutineSelect = useCallback((routine: Routine) => {
    if (!routine || !routine.subroutine || routine.subroutine.length === 0) {
      // Clear routine
      routineExecution.controls.loadRoutine({
        id: '',
        name: '',
        description: '',
        age: '0',
        subroutine: []
      });
      addExercise([]);
      addExerciseNumber(null);
      clearQueryResults();
      return;
    }

    // Load routine
    routineExecution.controls.loadRoutine(routine);
    addExercise(routine.subroutine);
    updateTotal(routine.subroutine.filter(ex => ex.type !== 'intermission').length);
    
    // Reset progress
    updateCompleted(0);
    timerControls.reset();
    setExercisePause(true);
  }, [routineExecution.controls, addExercise, addExerciseNumber, updateTotal, updateCompleted, timerControls, clearQueryResults, setExercisePause]);

  // Timer control handlers
  const handleStart = useCallback(() => {
    if (routineExecution.state.exerciseStack.length === 0) return;
    
    // Start progress tracking session
    if (routineExecution.state.currentRoutine) {
      progressTracking.startSession(
        routineExecution.state.currentRoutine.id,
        routineExecution.state.currentRoutine.name
      );
    }
    
    routineExecution.controls.startExecution();
    setExercisePause(false);
  }, [routineExecution.controls, routineExecution.state, progressTracking, setExercisePause]);

  const handlePause = useCallback(() => {
    routineExecution.controls.pauseExecution();
    setExercisePause(true);
  }, [routineExecution.controls, setExercisePause]);

  const handleResume = useCallback(() => {
    routineExecution.controls.resumeExecution();
    setExercisePause(false);
  }, [routineExecution.controls, setExercisePause]);

  const handleReset = useCallback(() => {
    routineExecution.controls.resetExecution();
    progressTracking.endSession();
    setExercisePause(true);
    updateCompleted(0);
    updateTimeLeft(null);
    clearQueryResults();
  }, [routineExecution.controls, progressTracking, setExercisePause, updateCompleted, updateTimeLeft, clearQueryResults]);

  const handleSkip = useCallback(() => {
    routineExecution.controls.skipToNext();
  }, [routineExecution.controls]);

  // Sync with Redux state
  useEffect(() => {
    updateCompleted(routineExecution.state.completed);
  }, [routineExecution.state.completed, updateCompleted]);

  useEffect(() => {
    updateTotal(routineExecution.state.total);
  }, [routineExecution.state.total, updateTotal]);

  // Convert routine execution state to exercise progress format
  const exerciseSteps = useMemo(() => {
    return routineExecution.state.exerciseStack.map((step, index) => ({
      id: step.id,
      name: `${step.type} - ${step.duration}s`,
      type: step.type,
      duration: step.duration,
      completed: index < routineExecution.state.currentExerciseIndex,
      current: index === routineExecution.state.currentExerciseIndex
    }));
  }, [routineExecution.state.exerciseStack, routineExecution.state.currentExerciseIndex]);

  // Determine control states
  const canStart = routineExecution.state.exerciseStack.length > 0 && !routineExecution.state.isExecuting && !timerState.isPaused;
  const canReset = !routineExecution.state.isExecuting && (routineExecution.state.currentExerciseIndex >= 0 || timerState.time > 0);
  const canSkip = routineExecution.state.isExecuting && routineExecution.state.currentExerciseIndex < routineExecution.state.exerciseStack.length - 1;

  // Render timer controls section
  const renderTimerSection = () => (
    <ControlsGrid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item>
        <RoutineSelectContainer action={handleRoutineSelect} />
      </Grid>
      
      {routineExecution.state.exerciseStack.length > 0 && (
        <>
          <Grid item>
            <TimerDisplay
              timeLeft={timerState.timeLeft}
              duration={timerState.duration}
              isRunning={timerState.isRunning}
              isPaused={timerState.isPaused}
              size={isMobile ? 'small' : 'medium'}
            />
          </Grid>
          
          <Grid item>
            <TimerControls
              isRunning={timerState.isRunning}
              isPaused={timerState.isPaused}
              canStart={canStart}
              canReset={canReset}
              canSkip={canSkip}
              onStart={handleStart}
              onPause={handlePause}
              onResume={handleResume}
              onReset={handleReset}
              onSkip={handleSkip}
            />
          </Grid>
        </>
      )}
    </ControlsGrid>
  );

  // Desktop layout
  if (!isMobile) {
    return (
      <div className={className}>
        <TimerCard>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Available Routines
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Use the dropdown menu to select a practice routine or to focus on a specific word.
            </Typography>
            <Box sx={{ mt: 2 }}>
              {renderTimerSection()}
            </Box>
          </CardContent>
        </TimerCard>

        {routineExecution.state.exerciseStack.length > 0 && (
          <ExerciseProgress
            currentStep={routineExecution.state.currentExerciseIndex + 1}
            totalSteps={routineExecution.state.exerciseStack.length}
            steps={exerciseSteps}
            completedExercises={routineExecution.state.completed}
            totalExercises={routineExecution.state.total}
            routineName={routineExecution.state.currentRoutine?.name}
            showStepDetails={!isMobile}
            showOverallProgress={true}
          />
        )}
      </div>
    );
  }

  // Mobile layout
  return (
    <MobileContainer className={className}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" align="center">
            Available Routines
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" align="center">
            Use the menu to select a practice routine.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          {renderTimerSection()}
        </Grid>

        {routineExecution.state.exerciseStack.length > 0 && (
          <Grid item xs={12}>
            <ExerciseProgress
              currentStep={routineExecution.state.currentExerciseIndex + 1}
              totalSteps={routineExecution.state.exerciseStack.length}
              steps={exerciseSteps}
              completedExercises={routineExecution.state.completed}
              totalExercises={routineExecution.state.total}
              routineName={routineExecution.state.currentRoutine?.name}
              compact={true}
              showStepDetails={false}
              showOverallProgress={true}
            />
          </Grid>
        )}
      </Grid>
    </MobileContainer>
  );
};

export default TimerRefactored;