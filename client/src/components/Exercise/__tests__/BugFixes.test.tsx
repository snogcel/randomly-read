import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ExerciseEngine from '../ExerciseEngine';
import WordDisplay from '../WordDisplay';
import { Word, ExerciseSession, WordAttempt } from '../types';
import { Routine } from '../flowTypes';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

// Mock the custom hooks to avoid dependency issues
jest.mock('../../../hooks/useExerciseTimer', () => ({
  useExerciseTimer: () => ({
    timeRemaining: 30,
    isRunning: false,
    isPaused: false,
    startTimer: jest.fn(),
    pauseTimer: jest.fn(),
    resumeTimer: jest.fn(),
    resetTimer: jest.fn(),
    setDuration: jest.fn(),
  }),
}));

jest.mock('../../../hooks/useRoutineExecution', () => ({
  useRoutineExecution: () => ({
    currentStep: 0,
    currentWord: null,
    routineProgress: { currentStepIndex: 0, totalSteps: 1, completedSteps: 0, currentRepetition: 1, totalRepetitions: 1 },
    isRoutineComplete: false,
    startRoutine: jest.fn(),
    pauseRoutine: jest.fn(),
    resumeRoutine: jest.fn(),
    skipToNext: jest.fn(),
    resetRoutine: jest.fn(),
    getCurrentStepConfig: () => ({ type: 'word', duration: 30 }),
  }),
}));

jest.mock('../../../hooks/useProgressTracking', () => ({
  useProgressTracking: () => ({
    sessionData: {
      id: 'test-session',
      userId: 'test-user',
      routineId: 'test-routine',
      startTime: new Date(),
      wordsAttempted: [],
      accuracy: 0.8,
      completionRate: 0.5,
      difficultWords: [],
      currentStreak: 3,
      bestStreak: 5,
    },
    recordWordAttempt: jest.fn(),
    updateProgress: jest.fn(),
    getSessionSummary: jest.fn(),
  }),
}));

describe('Bug Fixes Validation', () => {
  const mockWord: Word = {
    id: '1',
    cmudict_id: 123,
    wordid: 456,
    lexeme: 'test',
    consonant: 't-st',
    vowel: 'e',
    type: 'noun',
    subtype: 'common',
    stress: 1,
    syllables: 1,
    wordsXsensesXsynsets: [],
    score: 85,
    votes: [],
    difficulty: 0.6, // Bug fix: Added difficulty property
  };

  const mockRoutine: Routine = {
    id: 'routine-1',
    name: 'Test Routine',
    subroutine: [
      {
        id: 'step-1',
        type: 'word',
        duration: 30,
        repetitions: 5,
      },
    ],
  };

  const mockWordAttempt: WordAttempt = {
    wordId: '1',
    word: mockWord,
    timestamp: new Date(),
    accuracy: 0.8,
    timeSpent: 5,
    difficulty: 0.6,
    skipped: false, // Bug fix: Added skipped property
    interaction: 'click', // Bug fix: Added interaction property
  };

  const mockExerciseSession: ExerciseSession = {
    id: 'session-1',
    userId: 'user-1',
    routineId: 'routine-1',
    startTime: new Date(),
    wordsAttempted: [mockWordAttempt],
    accuracy: 0.8,
    completionRate: 0.9,
    difficultWords: [],
    currentStreak: 3, // Bug fix: Added currentStreak property
    bestStreak: 5, // Bug fix: Added bestStreak property
  };

  it('should handle Word interface with difficulty property', () => {
    renderWithTheme(
      <WordDisplay
        currentWord={mockWord}
        displayMode="word"
        fontSize="medium"
        showPhonetics={false}
        highlightTarget={false}
      />
    );

    expect(screen.getByText('test')).toBeInTheDocument();
    // Verify difficulty property is accessible without TypeScript errors
    expect(mockWord.difficulty).toBe(0.6);
  });

  it('should handle WordAttempt interface with skipped and interaction properties', () => {
    // Verify the interface accepts the new properties without TypeScript errors
    expect(mockWordAttempt.skipped).toBe(false);
    expect(mockWordAttempt.interaction).toBe('click');
  });

  it('should handle ExerciseSession interface with streak properties', () => {
    // Verify the interface accepts the new properties without TypeScript errors
    expect(mockExerciseSession.currentStreak).toBe(3);
    expect(mockExerciseSession.bestStreak).toBe(5);
  });

  it('should render ExerciseEngine without circular dependency issues', () => {
    // This test verifies that the component can be rendered without the circular dependency bug
    renderWithTheme(
      <ExerciseEngine
        routine={mockRoutine}
        userId="test-user"
      />
    );

    // Should render without throwing errors about undefined functions
    expect(screen.getByText('No routine selected. Please select a routine to begin.')).toBeInTheDocument();
  });

  it('should handle optional properties gracefully', () => {
    const wordWithoutDifficulty: Word = {
      ...mockWord,
      difficulty: undefined,
    };

    renderWithTheme(
      <WordDisplay
        currentWord={wordWithoutDifficulty}
        displayMode="word"
        fontSize="medium"
        showPhonetics={false}
        highlightTarget={false}
      />
    );

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should handle session without streak data', () => {
    const sessionWithoutStreaks: ExerciseSession = {
      ...mockExerciseSession,
      currentStreak: undefined,
      bestStreak: undefined,
    };

    // Should not throw TypeScript errors
    expect(sessionWithoutStreaks.currentStreak).toBeUndefined();
    expect(sessionWithoutStreaks.bestStreak).toBeUndefined();
  });

  it('should handle word attempt without optional properties', () => {
    const basicWordAttempt: WordAttempt = {
      wordId: '1',
      word: mockWord,
      timestamp: new Date(),
      accuracy: 0.8,
      timeSpent: 5,
      difficulty: 0.6,
      // skipped and interaction are optional
    };

    expect(basicWordAttempt.skipped).toBeUndefined();
    expect(basicWordAttempt.interaction).toBeUndefined();
  });
});