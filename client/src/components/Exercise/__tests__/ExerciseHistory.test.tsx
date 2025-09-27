import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ExerciseHistory from '../ExerciseHistory';
import { ExerciseSession, WordAttempt, Word } from '../types';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

const mockWord: Word = {
  id: '1',
  cmudict_id: 123,
  wordid: 456,
  lexeme: 'hello',
  consonant: 'h-l',
  vowel: 'e-o',
  type: 'noun',
  subtype: 'common',
  stress: 1,
  syllables: 2,
  wordsXsensesXsynsets: [],
  score: 85,
  votes: [],
};

const mockWordAttempt: WordAttempt = {
  wordId: '1',
  word: mockWord,
  timestamp: new Date('2023-01-01T10:00:00Z'),
  accuracy: 0.85,
  timeSpent: 3.5,
  difficulty: 0.6,
};

const mockSessionData: ExerciseSession = {
  id: 'session-1',
  userId: 'user-1',
  routineId: 'routine-1',
  startTime: new Date('2023-01-01T09:00:00Z'),
  endTime: new Date('2023-01-01T10:00:00Z'),
  wordsAttempted: [mockWordAttempt],
  accuracy: 0.85,
  completionRate: 0.5,
  difficultWords: [],
};

describe('ExerciseHistory Component', () => {
  it('renders exercise history with word attempts', () => {
    renderWithTheme(
      <ExerciseHistory sessionData={mockSessionData} />
    );

    expect(screen.getByText('Exercise History')).toBeInTheDocument();
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('85')).toBeInTheDocument(); // accuracy percentage
    expect(screen.getByText('3.5s')).toBeInTheDocument(); // time spent
  });

  it('shows empty state when no words attempted', () => {
    const emptySession: ExerciseSession = {
      ...mockSessionData,
      wordsAttempted: [],
    };

    renderWithTheme(
      <ExerciseHistory sessionData={emptySession} />
    );

    expect(screen.getByText('No words attempted yet')).toBeInTheDocument();
    expect(screen.getByText('Start practicing to see your progress here')).toBeInTheDocument();
  });

  it('displays session summary statistics', () => {
    const multipleAttemptsSession: ExerciseSession = {
      ...mockSessionData,
      wordsAttempted: [
        mockWordAttempt,
        {
          ...mockWordAttempt,
          wordId: '2',
          word: { ...mockWord, id: '2', lexeme: 'world' },
          accuracy: 0.95,
          timeSpent: 2.0,
        },
      ],
    };

    renderWithTheme(
      <ExerciseHistory sessionData={multipleAttemptsSession} />
    );

    expect(screen.getByText('2 words')).toBeInTheDocument();
    expect(screen.getByText('90% avg')).toBeInTheDocument(); // (85 + 95) / 2 = 90
    expect(screen.getByText('2.8s avg')).toBeInTheDocument(); // (3.5 + 2.0) / 2 = 2.75 ≈ 2.8
  });

  it('limits displayed items based on maxItems prop', () => {
    const manyAttemptsSession: ExerciseSession = {
      ...mockSessionData,
      wordsAttempted: Array.from({ length: 15 }, (_, i) => ({
        ...mockWordAttempt,
        wordId: `word-${i}`,
        word: { ...mockWord, id: `word-${i}`, lexeme: `word${i}` },
      })),
    };

    renderWithTheme(
      <ExerciseHistory sessionData={manyAttemptsSession} maxItems={5} />
    );

    // Should show only 5 items
    expect(screen.getAllByText(/word\d+/)).toHaveLength(5);
    expect(screen.getByText('Showing 5 of 15 attempts')).toBeInTheDocument();
  });

  it('calls onWordClick when word is clicked', () => {
    const mockOnWordClick = jest.fn();

    renderWithTheme(
      <ExerciseHistory
        sessionData={mockSessionData}
        onWordClick={mockOnWordClick}
      />
    );

    const wordItem = screen.getByText('hello');
    fireEvent.click(wordItem);

    expect(mockOnWordClick).toHaveBeenCalledWith(mockWord);
  });

  it('formats time correctly for different durations', () => {
    const sessionWithVariousTimes: ExerciseSession = {
      ...mockSessionData,
      wordsAttempted: [
        { ...mockWordAttempt, timeSpent: 0.5 }, // Less than 1 second
        { ...mockWordAttempt, wordId: '2', timeSpent: 45 }, // Seconds only
        { ...mockWordAttempt, wordId: '3', timeSpent: 125 }, // Minutes and seconds
      ],
    };

    renderWithTheme(
      <ExerciseHistory sessionData={sessionWithVariousTimes} />
    );

    expect(screen.getByText('0.5s')).toBeInTheDocument();
    expect(screen.getByText('45.0s')).toBeInTheDocument();
    expect(screen.getByText('2:05')).toBeInTheDocument();
  });

  it('shows difficulty chip for hard words', () => {
    const hardWordSession: ExerciseSession = {
      ...mockSessionData,
      wordsAttempted: [
        {
          ...mockWordAttempt,
          difficulty: 0.9, // High difficulty
        },
      ],
    };

    renderWithTheme(
      <ExerciseHistory sessionData={hardWordSession} />
    );

    expect(screen.getByText('Hard')).toBeInTheDocument();
  });

  it('hides timestamps when showTimestamps is false', () => {
    renderWithTheme(
      <ExerciseHistory
        sessionData={mockSessionData}
        showTimestamps={false}
      />
    );

    // Should not show timestamp text
    expect(screen.queryByText(/ago/)).not.toBeInTheDocument();
  });

  it('hides accuracy when showAccuracy is false', () => {
    renderWithTheme(
      <ExerciseHistory
        sessionData={mockSessionData}
        showAccuracy={false}
      />
    );

    // Should not show accuracy avatar with percentage
    expect(screen.queryByText('85')).not.toBeInTheDocument();
  });

  it('sorts attempts by timestamp in descending order', () => {
    const sessionWithMultipleAttempts: ExerciseSession = {
      ...mockSessionData,
      wordsAttempted: [
        {
          ...mockWordAttempt,
          wordId: '1',
          word: { ...mockWord, lexeme: 'first' },
          timestamp: new Date('2023-01-01T10:00:00Z'),
        },
        {
          ...mockWordAttempt,
          wordId: '2',
          word: { ...mockWord, lexeme: 'second' },
          timestamp: new Date('2023-01-01T10:05:00Z'),
        },
        {
          ...mockWordAttempt,
          wordId: '3',
          word: { ...mockWord, lexeme: 'third' },
          timestamp: new Date('2023-01-01T10:02:00Z'),
        },
      ],
    };

    renderWithTheme(
      <ExerciseHistory sessionData={sessionWithMultipleAttempts} />
    );

    const wordElements = screen.getAllByText(/first|second|third/);
    expect(wordElements[0]).toHaveTextContent('second'); // Most recent
    expect(wordElements[1]).toHaveTextContent('third');  // Middle
    expect(wordElements[2]).toHaveTextContent('first');  // Oldest
  });

  it('applies custom className', () => {
    const { container } = renderWithTheme(
      <ExerciseHistory
        sessionData={mockSessionData}
        className="custom-class"
      />
    );

    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});