import React, { useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  CheckCircle,
  Cancel,
  AccessTime,
  TrendingUp,
  TrendingDown,
  Remove,
  Visibility
} from '@mui/icons-material';
import { ExerciseHistoryProps, WordAttempt } from './types';

const HistoryCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(2),
  maxHeight: '400px',
  overflow: 'hidden',
}));

const ScrollableList = styled(List)(({ theme }) => ({
  maxHeight: '320px',
  overflowY: 'auto',
  padding: 0,
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.grey[100],
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.grey[400],
    borderRadius: '3px',
  },
}));

const WordListItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const AccuracyAvatar = styled(Avatar)<{ accuracy: number }>(({ theme, accuracy }) => ({
  backgroundColor: 
    accuracy >= 0.9 ? theme.palette.success.main :
    accuracy >= 0.7 ? theme.palette.warning.main :
    theme.palette.error.main,
  color: theme.palette.common.white,
  width: 32,
  height: 32,
  fontSize: '0.875rem',
  fontWeight: 600,
}));

const TimeChip = styled(Chip)(({ theme }) => ({
  fontSize: '0.75rem',
  height: '24px',
}));

const ExerciseHistory: React.FC<ExerciseHistoryProps> = ({
  sessionData,
  maxItems = 10,
  showTimestamps = true,
  showAccuracy = true,
  onWordClick,
  className,
}) => {
  const theme = useTheme();

  const sortedAttempts = useMemo(() => {
    return [...sessionData.wordsAttempted]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, maxItems);
  }, [sessionData.wordsAttempted, maxItems]);

  const sessionStats = useMemo(() => {
    const totalAttempts = sessionData.wordsAttempted.length;
    const averageAccuracy = totalAttempts > 0 
      ? sessionData.wordsAttempted.reduce((sum, attempt) => sum + attempt.accuracy, 0) / totalAttempts
      : 0;
    const averageTime = totalAttempts > 0
      ? sessionData.wordsAttempted.reduce((sum, attempt) => sum + attempt.timeSpent, 0) / totalAttempts
      : 0;

    return {
      totalAttempts,
      averageAccuracy,
      averageTime,
    };
  }, [sessionData.wordsAttempted]);

  const formatTime = useCallback((seconds: number) => {
    if (seconds < 60) {
      return `${seconds.toFixed(1)}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toFixed(0).padStart(2, '0')}`;
  }, []);

  const formatTimestamp = useCallback((timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    return new Date(timestamp).toLocaleDateString();
  }, []);

  const getAccuracyIcon = useCallback((accuracy: number) => {
    if (accuracy >= 0.9) return <CheckCircle color="success" />;
    if (accuracy >= 0.7) return <TrendingUp color="warning" />;
    if (accuracy >= 0.5) return <Remove color="action" />;
    return <TrendingDown color="error" />;
  }, []);

  const handleWordClick = useCallback((attempt: WordAttempt) => {
    if (onWordClick) {
      onWordClick(attempt.word);
    }
  }, [onWordClick]);

  if (sortedAttempts.length === 0) {
    return (
      <HistoryCard className={className}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Exercise History
          </Typography>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body2" color="textSecondary">
              No words attempted yet
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Start practicing to see your progress here
            </Typography>
          </Box>
        </CardContent>
      </HistoryCard>
    );
  }

  return (
    <HistoryCard className={className}>
      <CardContent sx={{ pb: 0 }}>
        <Typography variant="h6" gutterBottom>
          Exercise History
        </Typography>
        
        {/* Session Summary */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip
            label={`${sessionStats.totalAttempts} words`}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`${Math.round(sessionStats.averageAccuracy * 100)}% avg`}
            size="small"
            color={sessionStats.averageAccuracy >= 0.8 ? 'success' : 'warning'}
            variant="outlined"
          />
          <Chip
            label={`${formatTime(sessionStats.averageTime)} avg`}
            size="small"
            color="info"
            variant="outlined"
          />
        </Box>
      </CardContent>

      <ScrollableList>
        {sortedAttempts.map((attempt, index) => (
          <WordListItem
            key={`${attempt.wordId}-${attempt.timestamp}`}
            onClick={() => handleWordClick(attempt)}
          >
            <ListItemIcon>
              {showAccuracy ? (
                <AccuracyAvatar accuracy={attempt.accuracy}>
                  {Math.round(attempt.accuracy * 100)}
                </AccuracyAvatar>
              ) : (
                getAccuracyIcon(attempt.accuracy)
              )}
            </ListItemIcon>
            
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body1" fontWeight={500}>
                    {attempt.word.lexeme}
                  </Typography>
                  {attempt.difficulty > 0.8 && (
                    <Chip
                      label="Hard"
                      size="small"
                      color="error"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem', height: '20px' }}
                    />
                  )}
                </Box>
              }
              secondary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <TimeChip
                    icon={<AccessTime />}
                    label={formatTime(attempt.timeSpent)}
                    size="small"
                    variant="outlined"
                  />
                  {showTimestamps && (
                    <Typography variant="caption" color="textSecondary">
                      {formatTimestamp(attempt.timestamp)}
                    </Typography>
                  )}
                </Box>
              }
            />
            
            {onWordClick && (
              <Tooltip title="View word details">
                <IconButton size="small" edge="end">
                  <Visibility fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </WordListItem>
        ))}
      </ScrollableList>

      {sessionData.wordsAttempted.length > maxItems && (
        <Box sx={{ p: 2, textAlign: 'center', borderTop: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="caption" color="textSecondary">
            Showing {maxItems} of {sessionData.wordsAttempted.length} attempts
          </Typography>
        </Box>
      )}
    </HistoryCard>
  );
};

export default ExerciseHistory;