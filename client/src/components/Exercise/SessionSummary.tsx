import React, { useMemo, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  LinearProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  CheckCircle,
  Timer,
  TrendingUp,
  Star,
  EmojiEvents,
  Lightbulb,
  PlayArrow,
  Refresh,
  Visibility,
  ExpandMore,
  School,
  Psychology,
  Speed,
  Target
} from '@mui/icons-material';
import { SessionSummaryProps, Achievement, Recommendation, WordDifficulty } from './progressTypes';

const SummaryContainer = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `2px solid ${theme.palette.primary.light}`,
  borderRadius: theme.spacing(3),
  overflow: 'visible',
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  borderRadius: `${theme.spacing(3)} ${theme.spacing(3)} 0 0`,
  position: 'relative',
}));

const MetricsGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const MetricCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(2),
  height: '100%',
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

const AchievementChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: theme.palette.warning.light,
  color: theme.palette.warning.contrastText,
  '& .MuiChip-icon': {
    color: theme.palette.warning.contrastText,
  },
}));

const RecommendationCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.info.light,
  border: `1px solid ${theme.palette.info.main}`,
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'center',
  flexWrap: 'wrap',
  padding: theme.spacing(2),
}));

const SessionSummary: React.FC<SessionSummaryProps> = ({
  session,
  onRetrySession,
  onContinueToNext,
  onViewDetails,
  showActions = true,
  showRecommendations = true,
  className,
}) => {
  const theme = useTheme();

  // Calculate derived metrics
  const derivedMetrics = useMemo(() => {
    const completionRate = (session.completedWords / session.totalWords) * 100;
    const skipRate = (session.skippedWords / session.totalWords) * 100;
    const accuracyGrade = 
      session.accuracy >= 0.95 ? 'A+' :
      session.accuracy >= 0.9 ? 'A' :
      session.accuracy >= 0.85 ? 'B+' :
      session.accuracy >= 0.8 ? 'B' :
      session.accuracy >= 0.75 ? 'C+' :
      session.accuracy >= 0.7 ? 'C' : 'D';

    const performanceLevel = 
      session.accuracy >= 0.9 ? 'Excellent' :
      session.accuracy >= 0.8 ? 'Good' :
      session.accuracy >= 0.7 ? 'Fair' : 'Needs Improvement';

    return {
      completionRate,
      skipRate,
      accuracyGrade,
      performanceLevel,
      durationMinutes: Math.round(session.duration / 60),
    };
  }, [session]);

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const getPerformanceColor = useCallback((accuracy: number) => {
    if (accuracy >= 0.9) return 'success';
    if (accuracy >= 0.8) return 'info';
    if (accuracy >= 0.7) return 'warning';
    return 'error';
  }, []);

  const renderMetrics = () => (
    <MetricsGrid container spacing={3}>
      <Grid item xs={6} sm={3}>
        <MetricCard>
          <Avatar sx={{ bgcolor: 'success.main', mb: 1, mx: 'auto' }}>
            <CheckCircle />
          </Avatar>
          <MetricValue>{Math.round(session.accuracy * 100)}%</MetricValue>
          <Typography variant="body2" color="textSecondary">
            Accuracy
          </Typography>
          <Chip
            label={derivedMetrics.accuracyGrade}
            size="small"
            color={getPerformanceColor(session.accuracy)}
            sx={{ mt: 1 }}
          />
        </MetricCard>
      </Grid>

      <Grid item xs={6} sm={3}>
        <MetricCard>
          <Avatar sx={{ bgcolor: 'primary.main', mb: 1, mx: 'auto' }}>
            <Timer />
          </Avatar>
          <MetricValue>{derivedMetrics.durationMinutes}m</MetricValue>
          <Typography variant="body2" color="textSecondary">
            Duration
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {formatTime(session.duration)}
          </Typography>
        </MetricCard>
      </Grid>

      <Grid item xs={6} sm={3}>
        <MetricCard>
          <Avatar sx={{ bgcolor: 'info.main', mb: 1, mx: 'auto' }}>
            <Speed />
          </Avatar>
          <MetricValue>{session.wordsPerMinute}</MetricValue>
          <Typography variant="body2" color="textSecondary">
            Words/Min
          </Typography>
        </MetricCard>
      </Grid>

      <Grid item xs={6} sm={3}>
        <MetricCard>
          <Avatar sx={{ bgcolor: 'warning.main', mb: 1, mx: 'auto' }}>
            <Target />
          </Avatar>
          <MetricValue>{Math.round(derivedMetrics.completionRate)}%</MetricValue>
          <Typography variant="body2" color="textSecondary">
            Completed
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {session.completedWords}/{session.totalWords} words
          </Typography>
        </MetricCard>
      </Grid>
    </MetricsGrid>
  );

  const renderProgressBar = () => (
    <Box sx={{ px: 3, pb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" color="textSecondary">
          Session Progress
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {session.completedWords}/{session.totalWords} words
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={derivedMetrics.completionRate}
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
    </Box>
  );

  const renderAchievements = () => {
    if (session.achievements.length === 0) return null;

    return (
      <Box sx={{ px: 3, pb: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmojiEvents color="warning" />
          Achievements
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {session.achievements.map((achievement) => (
            <AchievementChip
              key={achievement.id}
              icon={<Star />}
              label={achievement.title}
              onClick={() => {
                // Could show achievement details
              }}
            />
          ))}
        </Box>
      </Box>
    );
  };

  const renderDifficultWords = () => {
    if (session.difficultWords.length === 0) return null;

    return (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Psychology color="error" />
            Challenging Words ({session.difficultWords.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense>
            {session.difficultWords.map((wordDiff, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      fontSize: '0.75rem',
                      bgcolor: wordDiff.difficulty === 'hard' ? 'error.main' : 'warning.main'
                    }}
                  >
                    {Math.round(wordDiff.accuracy * 100)}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={wordDiff.word}
                  secondary={
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        {wordDiff.attempts} attempts • {formatTime(wordDiff.timeSpent)} • {wordDiff.reason}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    );
  };

  const renderRecommendations = () => {
    if (!showRecommendations || session.recommendations.length === 0) return null;

    return (
      <Box sx={{ px: 3, pb: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Lightbulb color="info" />
          Recommendations
        </Typography>
        {session.recommendations.map((recommendation) => (
          <RecommendationCard key={recommendation.id} variant="outlined">
            <CardContent sx={{ py: 1.5 }}>
              <Typography variant="subtitle2" gutterBottom>
                {recommendation.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                {recommendation.description}
              </Typography>
              <Chip
                label={recommendation.priority}
                size="small"
                color={
                  recommendation.priority === 'high' ? 'error' :
                  recommendation.priority === 'medium' ? 'warning' : 'default'
                }
                variant="outlined"
              />
            </CardContent>
          </RecommendationCard>
        ))}
      </Box>
    );
  };

  const renderActions = () => {
    if (!showActions) return null;

    return (
      <CardActions>
        <ActionButtons>
          {onRetrySession && (
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={onRetrySession}
              size="large"
            >
              Retry Session
            </Button>
          )}

          {onContinueToNext && (
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              onClick={onContinueToNext}
              size="large"
            >
              Continue to Next
            </Button>
          )}

          {onViewDetails && (
            <Button
              variant="outlined"
              startIcon={<Visibility />}
              onClick={onViewDetails}
              size="large"
            >
              View Details
            </Button>
          )}
        </ActionButtons>
      </CardActions>
    );
  };

  return (
    <SummaryContainer className={className}>
      {/* Header */}
      <HeaderSection>
        <Typography variant="h4" gutterBottom>
          Session Complete!
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          {session.routineName}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
          {new Date(session.startTime).toLocaleDateString()} • {formatTime(session.duration)}
        </Typography>
      </HeaderSection>

      {/* Performance Alert */}
      <Box sx={{ p: 2 }}>
        <Alert
          severity={getPerformanceColor(session.accuracy)}
          icon={
            session.accuracy >= 0.9 ? <EmojiEvents /> :
            session.accuracy >= 0.8 ? <TrendingUp /> :
            <School />
          }
        >
          <Typography variant="body1">
            {derivedMetrics.performanceLevel} performance! 
            {session.accuracy >= 0.9 && " Outstanding work!"}
            {session.accuracy >= 0.8 && session.accuracy < 0.9 && " Keep up the great work!"}
            {session.accuracy < 0.8 && " Practice makes perfect - keep going!"}
          </Typography>
        </Alert>
      </Box>

      {/* Metrics */}
      {renderMetrics()}

      {/* Progress Bar */}
      {renderProgressBar()}

      <Divider />

      {/* Achievements */}
      {renderAchievements()}

      {/* Difficult Words */}
      <Box sx={{ px: 3, pb: 2 }}>
        {renderDifficultWords()}
      </Box>

      {/* Recommendations */}
      {renderRecommendations()}

      {/* Next Recommended Routine */}
      {session.nextRecommendedRoutine && (
        <Box sx={{ px: 3, pb: 2 }}>
          <Alert severity="info" icon={<Lightbulb />}>
            <Typography variant="body2">
              <strong>Next Recommended:</strong> {session.nextRecommendedRoutine}
            </Typography>
          </Alert>
        </Box>
      )}

      {/* Actions */}
      {renderActions()}
    </SummaryContainer>
  );
};

export default SessionSummary;