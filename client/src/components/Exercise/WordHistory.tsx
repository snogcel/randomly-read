import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Tooltip,
  Collapse,
  Button,
  Grid,
  LinearProgress,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Search,
  FilterList,
  ExpandMore,
  ExpandLess,
  TrendingUp,
  TrendingDown,
  Remove,
  AccessTime,
  CheckCircle,
  Cancel,
  Visibility,
  School,
  Psychology
} from '@mui/icons-material';
import { WordHistoryProps, WordHistoryEntry, WordHistoryFilters } from './progressTypes';

const HistoryContainer = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(2),
}));

const FilterBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.spacing(1),
  flexWrap: 'wrap',
  alignItems: 'center',
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
  width: 40,
  height: 40,
  fontSize: '0.875rem',
  fontWeight: 600,
}));

const StatsGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.spacing(1),
}));

const StatBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(1),
}));

const WordHistory: React.FC<WordHistoryProps> = ({
  userId,
  words,
  onWordClick,
  onFilterChange,
  maxItems = 50,
  showFilters = true,
  showStats = true,
  className,
}) => {
  const theme = useTheme();
  const [filters, setFilters] = useState<WordHistoryFilters>({
    searchTerm: '',
    difficulty: [],
    category: [],
  });
  const [expandedWord, setExpandedWord] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'accuracy' | 'attempts' | 'difficulty'>('recent');

  // Filter and sort words
  const filteredAndSortedWords = useMemo(() => {
    let filtered = [...words];

    // Apply filters
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(word =>
        word.word.toLowerCase().includes(searchLower) ||
        word.phonetic.toLowerCase().includes(searchLower) ||
        word.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    if (filters.difficulty && filters.difficulty.length > 0) {
      filtered = filtered.filter(word => {
        const difficulty = word.difficulty > 0.7 ? 'hard' : word.difficulty > 0.4 ? 'medium' : 'easy';
        return filters.difficulty!.includes(difficulty);
      });
    }

    if (filters.category && filters.category.length > 0) {
      filtered = filtered.filter(word =>
        filters.category!.includes(word.category)
      );
    }

    if (filters.minAttempts) {
      filtered = filtered.filter(word => word.totalAttempts >= filters.minAttempts!);
    }

    if (filters.accuracyRange) {
      filtered = filtered.filter(word =>
        word.averageAccuracy >= filters.accuracyRange!.min &&
        word.averageAccuracy <= filters.accuracyRange!.max
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.lastAttempt).getTime() - new Date(a.lastAttempt).getTime();
        case 'accuracy':
          return b.averageAccuracy - a.averageAccuracy;
        case 'attempts':
          return b.totalAttempts - a.totalAttempts;
        case 'difficulty':
          return b.difficulty - a.difficulty;
        default:
          return 0;
      }
    });

    return filtered.slice(0, maxItems);
  }, [words, filters, sortBy, maxItems]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    if (filteredAndSortedWords.length === 0) {
      return {
        totalWords: 0,
        averageAccuracy: 0,
        totalAttempts: 0,
        averageTime: 0,
        difficultWords: 0,
        masteredWords: 0,
      };
    }

    const totalWords = filteredAndSortedWords.length;
    const totalAttempts = filteredAndSortedWords.reduce((sum, word) => sum + word.totalAttempts, 0);
    const averageAccuracy = filteredAndSortedWords.reduce((sum, word) => sum + word.averageAccuracy, 0) / totalWords;
    const averageTime = filteredAndSortedWords.reduce((sum, word) => sum + word.averageTime, 0) / totalWords;
    const difficultWords = filteredAndSortedWords.filter(word => word.averageAccuracy < 0.7).length;
    const masteredWords = filteredAndSortedWords.filter(word => word.averageAccuracy >= 0.9 && word.totalAttempts >= 3).length;

    return {
      totalWords,
      averageAccuracy: Math.round(averageAccuracy * 100),
      totalAttempts,
      averageTime: Math.round(averageTime * 10) / 10,
      difficultWords,
      masteredWords,
    };
  }, [filteredAndSortedWords]);

  const handleFilterChange = useCallback((newFilters: Partial<WordHistoryFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  }, [filters, onFilterChange]);

  const handleWordClick = useCallback((word: WordHistoryEntry) => {
    if (onWordClick) {
      onWordClick(word);
    }
  }, [onWordClick]);

  const toggleWordExpansion = useCallback((wordId: string) => {
    setExpandedWord(expandedWord === wordId ? null : wordId);
  }, [expandedWord]);

  const getDifficultyLabel = useCallback((difficulty: number) => {
    if (difficulty > 0.7) return 'Hard';
    if (difficulty > 0.4) return 'Medium';
    return 'Easy';
  }, []);

  const getDifficultyColor = useCallback((difficulty: number): 'error' | 'warning' | 'success' => {
    if (difficulty > 0.7) return 'error';
    if (difficulty > 0.4) return 'warning';
    return 'success';
  }, []);

  const getTrendIcon = useCallback((word: WordHistoryEntry) => {
    if (word.attempts.length < 2) return <Remove color="action" />;
    
    const recent = word.attempts.slice(-3);
    const previous = word.attempts.slice(-6, -3);
    
    if (recent.length === 0 || previous.length === 0) return <Remove color="action" />;
    
    const recentAvg = recent.reduce((sum, a) => sum + a.accuracy, 0) / recent.length;
    const previousAvg = previous.reduce((sum, a) => sum + a.accuracy, 0) / previous.length;
    
    if (recentAvg > previousAvg + 0.1) return <TrendingUp color="success" />;
    if (recentAvg < previousAvg - 0.1) return <TrendingDown color="error" />;
    return <Remove color="action" />;
  }, []);

  const formatTime = useCallback((seconds: number) => {
    if (seconds < 60) return `${seconds.toFixed(1)}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toFixed(0).padStart(2, '0')}`;
  }, []);

  const getUniqueCategories = useCallback(() => {
    return Array.from(new Set(words.map(word => word.category))).filter(Boolean);
  }, [words]);

  const renderWordDetails = (word: WordHistoryEntry) => (
    <Collapse in={expandedWord === word.id} timeout="auto" unmountOnExit>
      <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1, m: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom>
              Recent Attempts
            </Typography>
            <List dense>
              {word.attempts.slice(-5).reverse().map((attempt, index) => (
                <ListItem key={attempt.id} sx={{ py: 0.5 }}>
                  <ListItemIcon>
                    <Avatar
                      sx={{
                        width: 24,
                        height: 24,
                        fontSize: '0.7rem',
                        bgcolor: attempt.accuracy >= 0.8 ? 'success.main' : 'warning.main'
                      }}
                    >
                      {Math.round(attempt.accuracy * 100)}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={`${Math.round(attempt.accuracy * 100)}% - ${formatTime(attempt.timeSpent)}`}
                    secondary={new Date(attempt.timestamp).toLocaleDateString()}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom>
              Progress Chart
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" color="textSecondary">
                Success Rate: {Math.round((word.successfulAttempts / word.totalAttempts) * 100)}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(word.successfulAttempts / word.totalAttempts) * 100}
                sx={{ mt: 1, height: 8, borderRadius: 4 }}
              />
            </Box>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="textSecondary">
                Phonetic: {word.phonetic}
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {word.tags.map(tag => (
                  <Chip key={tag} label={tag} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Collapse>
  );

  if (words.length === 0) {
    return (
      <HistoryContainer className={className}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Word History
          </Typography>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <School sx={{ fontSize: '4rem', color: 'text.secondary', mb: 2 }} />
            <Typography variant="body1" color="textSecondary" gutterBottom>
              No words practiced yet
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Start practicing to build your word history
            </Typography>
          </Box>
        </CardContent>
      </HistoryContainer>
    );
  }

  return (
    <HistoryContainer className={className}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Word History
        </Typography>

        {/* Summary Statistics */}
        {showStats && (
          <StatsGrid container spacing={2}>
            <Grid item xs={6} sm={2}>
              <StatBox>
                <Typography variant="h6" color="primary">
                  {summaryStats.totalWords}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Words
                </Typography>
              </StatBox>
            </Grid>
            <Grid item xs={6} sm={2}>
              <StatBox>
                <Typography variant="h6" color="success.main">
                  {summaryStats.averageAccuracy}%
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Avg Accuracy
                </Typography>
              </StatBox>
            </Grid>
            <Grid item xs={6} sm={2}>
              <StatBox>
                <Typography variant="h6" color="info.main">
                  {summaryStats.totalAttempts}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Attempts
                </Typography>
              </StatBox>
            </Grid>
            <Grid item xs={6} sm={2}>
              <StatBox>
                <Typography variant="h6" color="warning.main">
                  {summaryStats.averageTime}s
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Avg Time
                </Typography>
              </StatBox>
            </Grid>
            <Grid item xs={6} sm={2}>
              <StatBox>
                <Typography variant="h6" color="error.main">
                  {summaryStats.difficultWords}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Difficult
                </Typography>
              </StatBox>
            </Grid>
            <Grid item xs={6} sm={2}>
              <StatBox>
                <Typography variant="h6" color="success.main">
                  {summaryStats.masteredWords}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Mastered
                </Typography>
              </StatBox>
            </Grid>
          </StatsGrid>
        )}

        {/* Filters */}
        {showFilters && (
          <FilterBar>
            <TextField
              size="small"
              placeholder="Search words..."
              value={filters.searchTerm || ''}
              onChange={(e) => handleFilterChange({ searchTerm: e.target.value })}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{ minWidth: 200 }}
            />

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Difficulty</InputLabel>
              <Select
                multiple
                value={filters.difficulty || []}
                onChange={(e) => handleFilterChange({ 
                  difficulty: typeof e.target.value === 'string' 
                    ? e.target.value.split(',') as any
                    : e.target.value 
                })}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Category</InputLabel>
              <Select
                multiple
                value={filters.category || []}
                onChange={(e) => handleFilterChange({ 
                  category: typeof e.target.value === 'string' 
                    ? e.target.value.split(',') 
                    : e.target.value 
                })}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {getUniqueCategories().map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <MenuItem value="recent">Recent</MenuItem>
                <MenuItem value="accuracy">Accuracy</MenuItem>
                <MenuItem value="attempts">Attempts</MenuItem>
                <MenuItem value="difficulty">Difficulty</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="body2" color="textSecondary" ml="auto">
              {filteredAndSortedWords.length} of {words.length} words
            </Typography>
          </FilterBar>
        )}

        {/* Word List */}
        <List>
          {filteredAndSortedWords.map((word) => (
            <React.Fragment key={word.id}>
              <WordListItem onClick={() => handleWordClick(word)}>
                <ListItemIcon>
                  <AccuracyAvatar accuracy={word.averageAccuracy}>
                    {Math.round(word.averageAccuracy * 100)}
                  </AccuracyAvatar>
                </ListItemIcon>

                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6" component="span">
                        {word.word}
                      </Typography>
                      <Chip
                        label={getDifficultyLabel(word.difficulty)}
                        size="small"
                        color={getDifficultyColor(word.difficulty)}
                        variant="outlined"
                      />
                      {getTrendIcon(word)}
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 0.5 }}>
                      <Typography variant="body2" color="textSecondary">
                        {word.totalAttempts} attempts • {formatTime(word.averageTime)} avg • 
                        Last: {new Date(word.lastAttempt).toLocaleDateString()}
                      </Typography>
                      <Box sx={{ mt: 0.5, display: 'flex', gap: 0.5 }}>
                        <Chip label={word.category} size="small" variant="outlined" />
                        {word.tags.slice(0, 2).map(tag => (
                          <Chip key={tag} label={tag} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </Box>
                  }
                />

                <ListItemSecondaryAction>
                  <Tooltip title="View details">
                    <IconButton
                      edge="end"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWordExpansion(word.id);
                      }}
                    >
                      {expandedWord === word.id ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </WordListItem>

              {renderWordDetails(word)}
            </React.Fragment>
          ))}
        </List>

        {filteredAndSortedWords.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              No words match your filters
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Try adjusting your search criteria
            </Typography>
          </Box>
        )}

        {words.length > maxItems && (
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="caption" color="textSecondary">
              Showing {Math.min(filteredAndSortedWords.length, maxItems)} of {words.length} words
            </Typography>
          </Box>
        )}
      </CardContent>
    </HistoryContainer>
  );
};

export default WordHistory;