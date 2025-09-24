import React from 'react';
import { Typography, Box, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const DisplayContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  minWidth: 200
}));

const TimeText = styled(Typography)(({ theme }) => ({
  fontFamily: 'monospace',
  fontSize: '2rem',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  textAlign: 'center',
  minWidth: '4ch'
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1)
}));

const StatusText = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  textAlign: 'center'
}));

export interface TimerDisplayProps {
  timeLeft: number;
  duration: number;
  isRunning: boolean;
  isPaused: boolean;
  showProgress?: boolean;
  showStatus?: boolean;
  format?: 'seconds' | 'minutes' | 'auto';
  size?: 'small' | 'medium' | 'large';
}

/**
 * Timer display component for time visualization and progress indication
 */
export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timeLeft,
  duration,
  isRunning,
  isPaused,
  showProgress = true,
  showStatus = true,
  format = 'auto',
  size = 'medium'
}) => {
  // Format time display
  const formatTime = (seconds: number): string => {
    if (seconds < 0) return '0';
    
    switch (format) {
      case 'seconds':
        return `${seconds}s`;
      case 'minutes':
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
      case 'auto':
      default:
        if (seconds >= 60) {
          const mins = Math.floor(seconds / 60);
          const remainingSecs = seconds % 60;
          return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
        }
        return `${seconds}s`;
    }
  };

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? ((duration - timeLeft) / duration) * 100 : 0;

  // Get status text
  const getStatusText = (): string => {
    if (isPaused) return 'Paused';
    if (isRunning) return 'Running';
    if (timeLeft === 0) return 'Complete';
    return 'Ready';
  };

  // Get status color
  const getStatusColor = (): 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' => {
    if (isPaused) return 'warning';
    if (isRunning) return 'primary';
    if (timeLeft === 0) return 'success';
    return 'secondary';
  };

  // Adjust sizes based on size prop
  const getTimeTextSize = () => {
    switch (size) {
      case 'small': return '1.5rem';
      case 'large': return '3rem';
      case 'medium':
      default: return '2rem';
    }
  };

  return (
    <DisplayContainer>
      <TimeText 
        style={{ fontSize: getTimeTextSize() }}
        color={timeLeft <= 3 && isRunning ? 'error' : 'primary'}
      >
        {formatTime(timeLeft)}
      </TimeText>

      {showProgress && duration > 0 && (
        <ProgressContainer>
          <LinearProgress
            variant="determinate"
            value={Math.min(progressPercentage, 100)}
            color={timeLeft <= 3 && isRunning ? 'error' : 'primary'}
            sx={{
              height: size === 'large' ? 8 : size === 'small' ? 4 : 6,
              borderRadius: 3
            }}
          />
        </ProgressContainer>
      )}

      {showStatus && (
        <StatusText color={getStatusColor()}>
          {getStatusText()}
        </StatusText>
      )}

      {duration > 0 && showProgress && (
        <StatusText variant="caption">
          {formatTime(duration - timeLeft)} / {formatTime(duration)}
        </StatusText>
      )}
    </DisplayContainer>
  );
};

export default TimerDisplay;