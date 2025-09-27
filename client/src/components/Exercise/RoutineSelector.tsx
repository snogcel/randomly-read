import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  PlayArrow,
  Visibility,
  AccessTime,
  School,
  TrendingUp,
  Search,
  FilterList,
  Clear,
} from '@mui/icons-material';
import { RoutineSelectorProps, Routine, RoutineFilters, RoutineSortOptions } from './flowTypes';

const SelectorContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

const FilterBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  flexWrap: 'wrap',
  alignItems: 'center',
}));

const RoutineCard = styled(Card)<{ selected?: boolean }>(({ theme, selected }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  border: selected 
    ? `2px solid ${theme.palette.primary.main}` 
    : `1px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.light,
  },
}));

const RoutineHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(1),
}));

const DifficultyChip = styled(Chip)<{ difficulty: string }>(({ theme, difficulty }) => ({
  backgroundColor: 
    difficulty === 'beginner' ? theme.palette.success.light :
    difficulty === 'intermediate' ? theme.palette.warning.light :
    theme.palette.error.light,
  color: 
    difficulty === 'beginner' ? theme.palette.success.contrastText :
    difficulty === 'intermediate' ? theme.palette.warning.contrastText :
    theme.palette.error.contrastText,
}));

const StatsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const PreviewDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    maxWidth: '600px',
    width: '100%',
  },
}));

const RoutineSelector: React.FC<RoutineSelectorProps> = ({
  routines,
  selectedRoutine,
  onRoutineSelect,
  onRoutinePreview,
  loading = false,
  error = null,
  showPreview = true,
  filterByDifficulty,
  filterByType,
  className,
}) => {
  const [filters, setFilters] = useState<RoutineFilters>({
    difficulty: filterByDifficulty ? [filterByDifficulty] : [],
    category: filterByType ? [filterByType] : [],
    searchTerm: '',
  });
  const [sortOptions, setSortOptions] = useState<RoutineSortOptions>({
    field: 'name',
    direction: 'asc',
  });
  const [previewRoutine, setPreviewRoutine] = useState<Routine | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort routines
  const filteredAndSortedRoutines = useMemo(() => {
    let filtered = [...routines];

    // Apply filters
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(routine =>
        routine.name.toLowerCase().includes(searchLower) ||
        routine.description?.toLowerCase().includes(searchLower) ||
        routine.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    if (filters.difficulty && filters.difficulty.length > 0) {
      filtered = filtered.filter(routine =>
        filters.difficulty!.includes(routine.difficulty || 'beginner')
      );
    }

    if (filters.category && filters.category.length > 0) {
      filtered = filtered.filter(routine =>
        filters.category!.includes(routine.category || 'general')
      );
    }

    if (filters.duration) {
      filtered = filtered.filter(routine => {
        const duration = routine.estimatedDuration || 0;
        return (!filters.duration!.min || duration >= filters.duration!.min) &&
               (!filters.duration!.max || duration <= filters.duration!.max);
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortOptions.field) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'difficulty':
          const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
          aValue = difficultyOrder[a.difficulty || 'beginner'];
          bValue = difficultyOrder[b.difficulty || 'beginner'];
          break;
        case 'duration':
          aValue = a.estimatedDuration || 0;
          bValue = b.estimatedDuration || 0;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt || 0).getTime();
          bValue = new Date(b.createdAt || 0).getTime();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOptions.direction === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [routines, filters, sortOptions]);

  // Event handlers
  const handleRoutineClick = useCallback((routine: Routine) => {
    onRoutineSelect(routine);
  }, [onRoutineSelect]);

  const handlePreviewClick = useCallback((routine: Routine, event: React.MouseEvent) => {
    event.stopPropagation();
    if (onRoutinePreview) {
      onRoutinePreview(routine);
    }
    setPreviewRoutine(routine);
  }, [onRoutinePreview]);

  const handleFilterChange = useCallback((newFilters: Partial<RoutineFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const handleSortChange = useCallback((newSort: Partial<RoutineSortOptions>) => {
    setSortOptions(prev => ({ ...prev, ...newSort }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      difficulty: [],
      category: [],
      searchTerm: '',
    });
  }, []);

  const formatDuration = useCallback((minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }, []);

  const getUniqueValues = useCallback((field: keyof Routine) => {
    return Array.from(new Set(routines.map(r => r[field]).filter(Boolean)));
  }, [routines]);

  // Render preview dialog
  const renderPreviewDialog = () => (
    <PreviewDialog
      open={!!previewRoutine}
      onClose={() => setPreviewRoutine(null)}
      maxWidth="md"
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{previewRoutine?.name}</Typography>
          <DifficultyChip
            label={previewRoutine?.difficulty || 'beginner'}
            difficulty={previewRoutine?.difficulty || 'beginner'}
            size="small"
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" paragraph>
          {previewRoutine?.description}
        </Typography>
        
        <Box mb={2}>
          <Typography variant="h6" gutterBottom>Exercise Steps</Typography>
          {previewRoutine?.subroutine.map((step, index) => (
            <Box key={step.id} mb={1} p={2} bgcolor="grey.50" borderRadius={1}>
              <Typography variant="subtitle2">
                Step {index + 1}: {step.type.charAt(0).toUpperCase() + step.type.slice(1)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Duration: {step.duration}s, Repetitions: {step.repetitions}
              </Typography>
              {step.intermissionText && (
                <Typography variant="body2" style={{ fontStyle: 'italic' }}>
                  "{step.intermissionText}"
                </Typography>
              )}
            </Box>
          ))}
        </Box>

        <Box display="flex" gap={2} flexWrap="wrap">
          <StatsBox>
            <AccessTime fontSize="small" />
            <Typography variant="body2">
              {formatDuration(previewRoutine?.estimatedDuration || 0)}
            </Typography>
          </StatsBox>
          <StatsBox>
            <School fontSize="small" />
            <Typography variant="body2">
              {previewRoutine?.age || 'All ages'}
            </Typography>
          </StatsBox>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setPreviewRoutine(null)}>
          Close
        </Button>
        <Button
          variant="contained"
          startIcon={<PlayArrow />}
          onClick={() => {
            if (previewRoutine) {
              handleRoutineClick(previewRoutine);
              setPreviewRoutine(null);
            }
          }}
        >
          Start Exercise
        </Button>
      </DialogActions>
    </PreviewDialog>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
        <Typography variant="body1" ml={2}>Loading routines...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <SelectorContainer className={className}>
      {/* Filter Bar */}
      <FilterBar>
        <TextField
          size="small"
          placeholder="Search routines..."
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
            {getUniqueValues('difficulty').map((difficulty) => (
              <MenuItem key={difficulty} value={difficulty}>
                {difficulty}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortOptions.field}
            onChange={(e) => handleSortChange({ field: e.target.value as any })}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="difficulty">Difficulty</MenuItem>
            <MenuItem value="duration">Duration</MenuItem>
            <MenuItem value="createdAt">Date Created</MenuItem>
          </Select>
        </FormControl>

        <Button
          size="small"
          startIcon={<Clear />}
          onClick={clearFilters}
          disabled={!filters.searchTerm && (!filters.difficulty?.length) && (!filters.category?.length)}
        >
          Clear
        </Button>

        <Typography variant="body2" color="textSecondary" ml="auto">
          {filteredAndSortedRoutines.length} of {routines.length} routines
        </Typography>
      </FilterBar>

      {/* Routines Grid */}
      <Grid container spacing={3}>
        {filteredAndSortedRoutines.map((routine) => (
          <Grid item xs={12} sm={6} md={4} key={routine.id}>
            <RoutineCard
              selected={selectedRoutine?.id === routine.id}
              onClick={() => handleRoutineClick(routine)}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <RoutineHeader>
                  <Typography variant="h6" component="h3" noWrap>
                    {routine.name}
                  </Typography>
                  <DifficultyChip
                    label={routine.difficulty || 'beginner'}
                    difficulty={routine.difficulty || 'beginner'}
                    size="small"
                  />
                </RoutineHeader>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    mb: 2,
                    minHeight: '3.6em',
                  }}
                >
                  {routine.description || 'No description available'}
                </Typography>

                <Box display="flex" gap={2} mb={2}>
                  <StatsBox>
                    <AccessTime fontSize="small" />
                    <Typography variant="caption">
                      {formatDuration(routine.estimatedDuration || 0)}
                    </Typography>
                  </StatsBox>
                  <StatsBox>
                    <School fontSize="small" />
                    <Typography variant="caption">
                      {routine.age || 'All ages'}
                    </Typography>
                  </StatsBox>
                </Box>

                {routine.tags && routine.tags.length > 0 && (
                  <Box display="flex" gap={0.5} flexWrap="wrap">
                    {routine.tags.slice(0, 3).map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem', height: '20px' }}
                      />
                    ))}
                    {routine.tags.length > 3 && (
                      <Chip
                        label={`+${routine.tags.length - 3}`}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem', height: '20px' }}
                      />
                    )}
                  </Box>
                )}
              </CardContent>

              <CardActions sx={{ justifyContent: 'space-between', pt: 0 }}>
                <Button
                  size="small"
                  startIcon={<PlayArrow />}
                  variant={selectedRoutine?.id === routine.id ? 'contained' : 'outlined'}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRoutineClick(routine);
                  }}
                >
                  {selectedRoutine?.id === routine.id ? 'Selected' : 'Select'}
                </Button>

                {showPreview && (
                  <Tooltip title="Preview routine">
                    <IconButton
                      size="small"
                      onClick={(e) => handlePreviewClick(routine, e)}
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                )}
              </CardActions>
            </RoutineCard>
          </Grid>
        ))}
      </Grid>

      {filteredAndSortedRoutines.length === 0 && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No routines found
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Try adjusting your search criteria or filters
          </Typography>
        </Box>
      )}

      {/* Preview Dialog */}
      {renderPreviewDialog()}
    </SelectorContainer>
  );
};

export default RoutineSelector;