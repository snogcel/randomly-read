import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RoutineSelector from '../RoutineSelector';
import { Routine } from '../flowTypes';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

const mockRoutines: Routine[] = [
  {
    id: '1',
    name: 'Beginner Vowels',
    description: 'Practice basic vowel sounds',
    difficulty: 'beginner',
    category: 'vowels',
    estimatedDuration: 15,
    subroutine: [
      {
        id: 'step1',
        type: 'word',
        duration: 30,
        repetitions: 5,
        phoneticConfig: {
          vowels: ['a', 'e'],
          consonants: ['b', 'c'],
          position: 'initial',
          syllables: [1],
          gradeLevel: 'K',
        },
      },
    ],
    tags: ['vowels', 'basic'],
  },
  {
    id: '2',
    name: 'Advanced Consonants',
    description: 'Complex consonant combinations',
    difficulty: 'advanced',
    category: 'consonants',
    estimatedDuration: 30,
    subroutine: [
      {
        id: 'step1',
        type: 'sentence',
        duration: 45,
        repetitions: 3,
        phoneticConfig: {
          vowels: ['i', 'o'],
          consonants: ['th', 'sh'],
          position: 'medial',
          syllables: [2, 3],
          gradeLevel: '3',
        },
      },
    ],
    tags: ['consonants', 'advanced'],
  },
];

describe('RoutineSelector Component', () => {
  const defaultProps = {
    routines: mockRoutines,
    selectedRoutine: null,
    onRoutineSelect: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders routine cards correctly', () => {
    renderWithTheme(<RoutineSelector {...defaultProps} />);

    expect(screen.getByText('Beginner Vowels')).toBeInTheDocument();
    expect(screen.getByText('Advanced Consonants')).toBeInTheDocument();
    expect(screen.getByText('Practice basic vowel sounds')).toBeInTheDocument();
    expect(screen.getByText('Complex consonant combinations')).toBeInTheDocument();
  });

  it('displays routine metadata correctly', () => {
    renderWithTheme(<RoutineSelector {...defaultProps} />);

    expect(screen.getByText('15m')).toBeInTheDocument();
    expect(screen.getByText('30m')).toBeInTheDocument();
    expect(screen.getAllByText('beginner')).toHaveLength(1);
    expect(screen.getAllByText('advanced')).toHaveLength(1);
  });

  it('calls onRoutineSelect when routine is clicked', () => {
    const mockOnSelect = jest.fn();
    renderWithTheme(
      <RoutineSelector {...defaultProps} onRoutineSelect={mockOnSelect} />
    );

    const selectButton = screen.getAllByText('Select')[0];
    fireEvent.click(selectButton);

    expect(mockOnSelect).toHaveBeenCalledWith(mockRoutines[0]);
  });

  it('shows selected routine with different styling', () => {
    renderWithTheme(
      <RoutineSelector
        {...defaultProps}
        selectedRoutine={mockRoutines[0]}
      />
    );

    expect(screen.getByText('Selected')).toBeInTheDocument();
    expect(screen.getAllByText('Select')).toHaveLength(1); // Only one "Select" button for unselected routine
  });

  it('filters routines by search term', async () => {
    renderWithTheme(<RoutineSelector {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText('Search routines...');
    fireEvent.change(searchInput, { target: { value: 'vowel' } });

    await waitFor(() => {
      expect(screen.getByText('Beginner Vowels')).toBeInTheDocument();
      expect(screen.queryByText('Advanced Consonants')).not.toBeInTheDocument();
    });
  });

  it('filters routines by difficulty', async () => {
    renderWithTheme(<RoutineSelector {...defaultProps} />);

    const difficultySelect = screen.getByLabelText('Difficulty');
    fireEvent.mouseDown(difficultySelect);
    
    const beginnerOption = screen.getByText('beginner');
    fireEvent.click(beginnerOption);

    await waitFor(() => {
      expect(screen.getByText('Beginner Vowels')).toBeInTheDocument();
      expect(screen.queryByText('Advanced Consonants')).not.toBeInTheDocument();
    });
  });

  it('shows routine count correctly', () => {
    renderWithTheme(<RoutineSelector {...defaultProps} />);

    expect(screen.getByText('2 of 2 routines')).toBeInTheDocument();
  });

  it('shows empty state when no routines match filters', async () => {
    renderWithTheme(<RoutineSelector {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText('Search routines...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    await waitFor(() => {
      expect(screen.getByText('No routines found')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your search criteria or filters')).toBeInTheDocument();
    });
  });

  it('clears filters when clear button is clicked', async () => {
    renderWithTheme(<RoutineSelector {...defaultProps} />);

    // Add a search filter
    const searchInput = screen.getByPlaceholderText('Search routines...');
    fireEvent.change(searchInput, { target: { value: 'vowel' } });

    await waitFor(() => {
      expect(screen.queryByText('Advanced Consonants')).not.toBeInTheDocument();
    });

    // Clear filters
    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(screen.getByText('Advanced Consonants')).toBeInTheDocument();
      expect(searchInput).toHaveValue('');
    });
  });

  it('shows loading state', () => {
    renderWithTheme(
      <RoutineSelector {...defaultProps} loading={true} />
    );

    expect(screen.getByText('Loading routines...')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows error state', () => {
    const errorMessage = 'Failed to load routines';
    renderWithTheme(
      <RoutineSelector {...defaultProps} error={errorMessage} />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('opens preview dialog when preview button is clicked', async () => {
    const mockOnPreview = jest.fn();
    renderWithTheme(
      <RoutineSelector
        {...defaultProps}
        onRoutinePreview={mockOnPreview}
        showPreview={true}
      />
    );

    const previewButtons = screen.getAllByLabelText('Preview routine');
    fireEvent.click(previewButtons[0]);

    expect(mockOnPreview).toHaveBeenCalledWith(mockRoutines[0]);

    await waitFor(() => {
      expect(screen.getByText('Beginner Vowels')).toBeInTheDocument(); // In dialog
      expect(screen.getByText('Exercise Steps')).toBeInTheDocument();
    });
  });

  it('sorts routines correctly', async () => {
    renderWithTheme(<RoutineSelector {...defaultProps} />);

    const sortSelect = screen.getByLabelText('Sort by');
    fireEvent.change(sortSelect, { target: { value: 'difficulty' } });

    await waitFor(() => {
      const routineCards = screen.getAllByText(/Vowels|Consonants/);
      expect(routineCards[0]).toHaveTextContent('Beginner Vowels'); // beginner comes first
      expect(routineCards[1]).toHaveTextContent('Advanced Consonants');
    });
  });

  it('displays routine tags correctly', () => {
    renderWithTheme(<RoutineSelector {...defaultProps} />);

    expect(screen.getByText('vowels')).toBeInTheDocument();
    expect(screen.getByText('basic')).toBeInTheDocument();
    expect(screen.getByText('consonants')).toBeInTheDocument();
    expect(screen.getByText('advanced')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderWithTheme(
      <RoutineSelector {...defaultProps} className="custom-class" />
    );

    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});