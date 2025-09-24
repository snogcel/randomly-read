import React from 'react';
import { 
  Box, 
  Typography, 
  LinearProgress, 
  Chip,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

const ProgressContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`
}));

const ProgressHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(1)
}));

const StepIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  fontSize: '0.875rem'
}));

export interface ExerciseStep {
  id: string;
  name: string;
  type: 'word' | 'sentence' | 'intermission';
  duration: number;
  completed: boolean;
  current: boolean;
}

export interface ExerciseProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: ExerciseStep[];
  completedExercises: number;
  totalExercises: number;
  routineName?: string;
  showStepDetails?: boolean;
  showOverallProgress?: boolean;
  compact?: boolean;
}

/**
 * Exercise progress component for showing routine and step progress
 */
export const ExerciseProgress: React.FC<ExerciseProgressProps> = ({
  currentStep,
  totalSteps,
  steps,
  completedExercises,
  totalExercises,
  routineName,
  showStepDetails = true,
  showOverallProgress = true,
  compact = false
}) => {
  // Calculate progress percentages
  const stepProgress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;
  const exerciseProgress = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;

  // Get current step info
  const currentStepInfo = steps.find(step => step.current) || steps[currentStep - 1];

  // Render step indicator
  const renderStepIndicator = (step: ExerciseStep, index: number) => {
    const isCurrent = step.current || index === currentStep - 1;
    const isCompleted = step.completed;
    
    let icon;
    let color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    
    if (isCompleted) {
      icon = <CheckCircleIcon fontSize="small" />;
      color = 'success';
    } else if (isCurrent) {
      icon = <PauseCircleIcon fontSize="small" />;
      color = 'primary';
    } else {
      icon = <RadioButtonUncheckedIcon fontSize="small" />;
      color = 'default';
    }

    return (
      <StepIndicator key={step.id}>
        {icon}
        <Typography variant="caption" color={color === 'default' ? 'textSecondary' : color}>
          {step.type === 'intermission' ? 'Break' : `${step.type} (${step.duration}s)`}
        </Typography>
      </StepIndicator>
    );
  };

  if (compact) {
    return (
      <Box sx={{ minWidth: 200 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="body2" color="textSecondary">
            Step {currentStep} of {totalSteps}
          </Typography>
          {currentStepInfo && (
            <Chip 
              label={currentStepInfo.type} 
              size="small" 
              color="primary" 
              variant="outlined"
            />
          )}
        </Stack>
        <LinearProgress 
          variant="determinate" 
          value={stepProgress} 
          sx={{ height: 6, borderRadius: 3 }}
        />
      </Box>
    );
  }

  return (
    <ProgressContainer>
      {routineName && (
        <Typography variant="h6" gutterBottom>
          {routineName}
        </Typography>
      )}

      {showOverallProgress && (
        <Box sx={{ mb: 2 }}>
          <ProgressHeader>
            <Typography variant="body2" color="textSecondary">
              Exercise Progress
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {completedExercises} / {totalExercises} completed
            </Typography>
          </ProgressHeader>
          <LinearProgress
            variant="determinate"
            value={exerciseProgress}
            color="success"
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
      )}

      <Box sx={{ mb: showStepDetails ? 2 : 0 }}>
        <ProgressHeader>
          <Typography variant="body2" color="textSecondary">
            Current Routine
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            Step {currentStep} of {totalSteps}
          </Typography>
        </ProgressHeader>
        <LinearProgress
          variant="determinate"
          value={stepProgress}
          sx={{ height: 6, borderRadius: 3 }}
        />
      </Box>

      {showStepDetails && currentStepInfo && (
        <Box>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Current Step
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip 
              label={currentStepInfo.type.charAt(0).toUpperCase() + currentStepInfo.type.slice(1)} 
              color="primary" 
              size="small"
            />
            <Typography variant="body2">
              {currentStepInfo.duration}s duration
            </Typography>
          </Stack>
        </Box>
      )}

      {showStepDetails && steps.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            All Steps
          </Typography>
          <Stack spacing={0.5}>
            {steps.slice(0, 5).map((step, index) => renderStepIndicator(step, index))}
            {steps.length > 5 && (
              <Typography variant="caption" color="textSecondary">
                ... and {steps.length - 5} more steps
              </Typography>
            )}
          </Stack>
        </Box>
      )}
    </ProgressContainer>
  );
};

export default ExerciseProgress;