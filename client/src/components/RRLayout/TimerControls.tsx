import React from 'react';
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import ReplayIcon from '@mui/icons-material/Replay';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { styled } from '@mui/material/styles';

const ControlsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1)
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.main + '20',
  },
  '&:disabled': {
    color: theme.palette.action.disabled,
  }
}));

export interface TimerControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  canStart: boolean;
  canReset: boolean;
  canSkip: boolean;
  autoAdvance?: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onSkip?: () => void;
  onAutoToggle?: (enabled: boolean) => void;
  disabled?: boolean;
}

/**
 * Timer control buttons component for play/pause/skip functionality
 */
export const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  isPaused,
  canStart,
  canReset,
  canSkip,
  onStart,
  onPause,
  onResume,
  onReset,
  onSkip,
  disabled = false
}) => {
  const handleStart = () => {
    if (!disabled && canStart) {
      onStart();
    }
  };

  const handlePause = () => {
    if (!disabled && isRunning) {
      onPause();
    }
  };

  const handleResume = () => {
    if (!disabled && isPaused) {
      onResume();
    }
  };

  const handleReset = () => {
    if (!disabled && canReset) {
      onReset();
    }
  };

  const handleSkip = () => {
    if (!disabled && canSkip && onSkip) {
      onSkip();
    }
  };

  return (
    <ControlsContainer>
      {/* Start Button - shown when timer is not started */}
      {canStart && !isRunning && !isPaused && (
        <StyledIconButton
          onClick={handleStart}
          aria-label="start timer"
          disabled={disabled}
          size="large"
        >
          <PlayCircleFilledIcon fontSize="large" />
        </StyledIconButton>
      )}

      {/* Pause Button - shown when timer is running */}
      {isRunning && !isPaused && (
        <StyledIconButton
          onClick={handlePause}
          aria-label="pause timer"
          disabled={disabled}
          size="large"
        >
          <PauseCircleFilledIcon fontSize="large" />
        </StyledIconButton>
      )}

      {/* Resume Button - shown when timer is paused */}
      {isPaused && (
        <StyledIconButton
          onClick={handleResume}
          aria-label="resume timer"
          disabled={disabled}
          size="large"
        >
          <PlayCircleFilledIcon fontSize="large" />
        </StyledIconButton>
      )}

      {/* Skip Button - shown when timer is running and skip is available */}
      {(isRunning || isPaused) && canSkip && onSkip && (
        <StyledIconButton
          onClick={handleSkip}
          aria-label="skip to next"
          disabled={disabled}
          size="medium"
        >
          <SkipNextIcon />
        </StyledIconButton>
      )}

      {/* Reset Button - shown when timer can be reset */}
      {canReset && !isRunning && (
        <StyledIconButton
          onClick={handleReset}
          aria-label="reset timer"
          disabled={disabled}
          size="medium"
          style={{ backgroundColor: 'transparent' }}
        >
          <ReplayIcon />
        </StyledIconButton>
      )}
    </ControlsContainer>
  );
};

export default TimerControls;