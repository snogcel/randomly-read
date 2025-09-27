import React, { useMemo } from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Chip,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  TrendingUp,
  Timer,
  CheckCircle,
  Star
} from '@mui/icons-material';
import { ProgressIndicatorProps, EXERCISE_COLORS } from './types';

const ProgressCard = styled(Card)(({ theme }) => ({
  backgroundColor: EXERCISE_COLORS.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease-in-out',
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const CircularProgressContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const CircularProgressText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  fontWeight: 600,
  color: theme.palette.primary.main,
}));

const StatBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.grey[50],
}));

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  wordsCompleted,
  totalWords,
  accuracy,
  timeElapsed,
  currentStreak,
  bestStreak,
  showDetails = true,
  variant = 'detailed',
  className,
}) => {
  const theme = useTheme();

  const progressPercentage = useMemo(() => {
    return totalWords > 0 ? Math.round((wordsCompleted / totalWords) * 100) : 0;
  }, [wordsCompleted, totalWords]);

  const accuracyPercentage = useMemo(() => {
    return Math.round(accuracy * 100);
  }, [accuracy]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [timeElapsed]);

  const accuracyColor = useMemo(() => {
    if (accuracyPercentage >= 90) return 'success';
    if (accuracyPercentage >= 70) return 'warning';
    return 'error';
  }, [accuracyPercentage]);

  if (variant === 'linear') {
    return (
      <Box className={className} sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="textSecondary">
            Progress
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {wordsCompleted}/{totalWords} words ({progressPercentage}%)
          </Typography>
        </Box>
        <StyledLinearProgress variant="determinate" value={progressPercentage} />
      </Box>
    );
  }

  if (variant === 'circular') {
    return (
      <CircularProgressContainer className={className}>
        <CircularProgress
          variant="determinate"
          value={progressPercentage}
          size={80}
          thickness={4}
          sx={{ color: theme.palette.primary.main }}
        />
        <CircularProgressText variant="h6">
          {progressPercentage}%
        </CircularProgressText>
      </CircularProgressContainer>
    );
  }

  // Detailed variant
  return (
    <ProgressCard className={className}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUp color="primary" />
          Exercise Progress
        </Typography>

        {/* Main Progress Bar */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="textSecondary">
              Words Completed
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {wordsCompleted}/{totalWords} ({progressPercentage}%)
            </Typography>
          </Box>
          <StyledLinearProgress variant="determinate" value={progressPercentage} />
        </Box>

        {showDetails && (
          <Grid container spacing={2}>
            {/* Accuracy */}
            <Grid item xs={6}>
              <StatBox>
                <CheckCircle sx={{ color: theme.palette[accuracyColor].main }} />
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Accuracy
                  </Typography>
                  <Typography variant="h6" color={`${accuracyColor}.main`}>
                    {accuracyPercentage}%
                  </Typography>
                </Box>
              </StatBox>
            </Grid>

            {/* Time Elapsed */}
            <Grid item xs={6}>
              <StatBox>
                <Timer color="primary" />
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Time
                  </Typography>
                  <Typography variant="h6">
                    {formattedTime}
                  </Typography>
                </Box>
              </StatBox>
            </Grid>

            {/* Current Streak */}
            <Grid item xs={6}>
              <StatBox>
                <Star sx={{ color: theme.palette.warning.main }} />
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Current Streak
                  </Typography>
                  <Typography variant="h6" color="warning.main">
                    {currentStreak}
                  </Typography>
                </Box>
              </StatBox>
            </Grid>

            {/* Best Streak */}
            <Grid item xs={6}>
              <StatBox>
                <Star sx={{ color: theme.palette.success.main }} />
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Best Streak
                  </Typography>
                  <Typography variant="h6" color="success.main">
                    {bestStreak}
                  </Typography>
                </Box>
              </StatBox>
            </Grid>
          </Grid>
        )}

        {/* Performance Indicators */}
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {accuracyPercentage >= 95 && (
            <Chip
              label="Excellent!"
              color="success"
              size="small"
              icon={<Star />}
            />
          )}
          {currentStreak >= 5 && (
            <Chip
              label={`${currentStreak} in a row!`}
              color="warning"
              size="small"
              variant="outlined"
            />
          )}
          {progressPercentage >= 50 && (
            <Chip
              label="Halfway there!"
              color="primary"
              size="small"
              variant="outlined"
            />
          )}
        </Box>
      </CardContent>
    </ProgressCard>
  );
};

export default ProgressIndicator;