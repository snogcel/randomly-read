import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  Card,
  CardContent,
  Fade,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  PlayArrow,
  SkipNext,
  Pause,
  Coffee,
  SelfImprovement,
  EmojiEvents
} from '@mui/icons-material';
import { ExerciseIntermissionProps } from './flowTypes';

const IntermissionContainer = styled(Card)(({ theme }) => ({
  maxWidth: '600px',
  margin: '0 auto',
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  border: `2px solid ${theme.palette.primary.light}`,
  borderRadius: theme.spacing(3),
  overflow: 'visible',
}));

const CountdownDisplay = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '120px',
  height: '120px',
  margin: theme.spacing(3, 0),
}));

const CountdownText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  fontSize: '2.5rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

const CountdownCircle = styled(Box)<{ progress: number }>(({ theme, progress }) => ({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  background: `conic-gradient(${theme.palette.primary.main} ${progress * 3.6}deg, ${theme.palette.grey[200]} 0deg)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&::before': {
    content: '""',
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const MessageBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.spacing(2),
  margin: theme.spacing(2, 0),
  border: `1px solid ${theme.palette.divider}`,
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'center',
  marginTop: theme.spacing(3),
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  '& .MuiSvgIcon-root': {
    fontSize: '3rem',
    color: theme.palette.primary.main,
  },
}));

const ExerciseIntermission: React.FC<ExerciseIntermissionProps> = ({
  duration,
  message,
  onComplete,
  onSkip,
  showProgress = true,
  allowSkip = true,
  className,
}) => {
  const theme = useTheme();
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!isRunning || isPaused) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isPaused, onComplete]);

  // Reset timer when duration changes
  useEffect(() => {
    setTimeRemaining(duration);
    setIsRunning(true);
    setIsPaused(false);
  }, [duration]);

  const handlePause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleResume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const handleSkip = useCallback(() => {
    if (onSkip) {
      onSkip();
    } else {
      onComplete();
    }
  }, [onSkip, onComplete]);

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return remainingSeconds.toString();
  }, []);

  const getProgressPercentage = useCallback(() => {
    return ((duration - timeRemaining) / duration) * 100;
  }, [duration, timeRemaining]);

  const getIntermissionIcon = useCallback(() => {
    if (timeRemaining > duration * 0.8) {
      return <Coffee />;
    } else if (timeRemaining > duration * 0.4) {
      return <SelfImprovement />;
    } else {
      return <EmojiEvents />;
    }
  }, [timeRemaining, duration]);

  const getEncouragementMessage = useCallback(() => {
    const progress = getProgressPercentage();
    
    if (progress < 25) {
      return "Take a moment to relax and breathe deeply.";
    } else if (progress < 50) {
      return "You're doing great! Keep up the excellent work.";
    } else if (progress < 75) {
      return "Almost ready to continue. Stay focused!";
    } else {
      return "Get ready to continue your practice session!";
    }
  }, [getProgressPercentage]);

  const defaultMessage = message || getEncouragementMessage();

  return (
    <Fade in timeout={500}>
      <IntermissionContainer className={className}>
        <CardContent sx={{ p: 4 }}>
          {/* Icon */}
          <IconContainer>
            {getIntermissionIcon()}
          </IconContainer>

          {/* Title */}
          <Typography variant="h4" gutterBottom color="primary">
            Take a Break
          </Typography>

          {/* Countdown Display */}
          {showProgress && (
            <CountdownDisplay>
              <CountdownCircle progress={getProgressPercentage()}>
                <CountdownText>
                  {formatTime(timeRemaining)}
                </CountdownText>
              </CountdownCircle>
            </CountdownDisplay>
          )}

          {/* Message */}
          <MessageBox>
            <Typography variant="body1" color="textSecondary">
              {defaultMessage}
            </Typography>
          </MessageBox>

          {/* Progress Bar */}
          {showProgress && (
            <Box sx={{ mt: 2, mb: 3 }}>
              <LinearProgress
                variant="determinate"
                value={getProgressPercentage()}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: theme.palette.grey[200],
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption" color="textSecondary">
                  Break started
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Ready to continue
                </Typography>
              </Box>
            </Box>
          )}

          {/* Action Buttons */}
          <ActionButtons>
            {isPaused ? (
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                onClick={handleResume}
                size="large"
              >
                Resume Break
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<Pause />}
                onClick={handlePause}
                size="large"
              >
                Pause Break
              </Button>
            )}

            {allowSkip && (
              <Button
                variant="contained"
                startIcon={<SkipNext />}
                onClick={handleSkip}
                size="large"
                color="secondary"
              >
                Continue Now
              </Button>
            )}
          </ActionButtons>

          {/* Status Text */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="textSecondary">
              {isPaused ? (
                "Break paused - Click resume when you're ready"
              ) : timeRemaining <= 5 ? (
                "Get ready to continue..."
              ) : (
                `Break will end in ${formatTime(timeRemaining)}`
              )}
            </Typography>
          </Box>
        </CardContent>
      </IntermissionContainer>
    </Fade>
  );
};

export default ExerciseIntermission;