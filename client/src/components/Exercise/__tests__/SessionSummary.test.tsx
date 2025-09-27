import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SessionSummary from '../SessionSummary';
import { ExerciseSessionSummary } from '../progressTypes';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

const mockSession: ExerciseSessionSummary = {
  id: 'session-1',
  userId: 'user-1',
  routineId: 'routine-1',
  routineName: 'Beginner Vowels',
  startTime: new Date('2023-01-01T10:00:00Z'),
  endTime: new Date('2023-01-01T10:15:00Z'),
  duration: 900, // 15 minutes
  totalWords: 20,
  completedWords: 18,
  skippedWords: 2,
  accuracy: 0.85,
  wordsPerMinute: 12,
  difficultWords: [
    {
      word: 'elephant',
      attempts: 3,
      accuracy: 0.6,
      timeSpent: 15,
      difficulty: 'hard',
      reason: 'Complex syllable structure',
    },
  ],
  achievements: [
    {
      id: 'achievement-1',
      type: 'accuracy',
      title: 'Great Accuracy!',
      description: 'Achieved 85% accuracy',
      icon: 'star',
      earnedAt: new Date(),
      points: 100,
    },
  ],
  recommendations: [
    {
      id: 'rec-1',
      type: 'phoneme',
      title: 'Practice Long Vowels',
      description: 'Focus on long vowel sounds to improve accuracy',
      priority: 'medium',
      actionText: 'Start Practice',
    },
  ],
  nextRecommendedRoutine: 'Intermediate Vowels',
};

describe('SessionSummary Component', () => {
  const defaultProps = {
    session: mockSession,
  };

  it('renders session summary correctly', () => {
    renderWithTheme(<SessionSummary {...defaultProps} />);

    expect(screen.getByText('Session Complete!')).toBeInTheDocument();
    expect(screen.getByText('Beginner Vowels')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument(); // accuracy
    expect(screen.getByText('15m')).toBeInTheDocument(); // duration
    expect(screen.getByText('12')).toBeInTheDocument(); // words per minute
    expect(screen.getByText('90%')).toBeInTheDocument(); // completion rate (18/20)
  });

  it('displays correct accuracy grade', () => {
    renderWithTheme(<SessionSummary {...defaultProps} />);
    expect(screen.getByText('B+')).toBeInTheDocument(); // 85% accuracy = B+
  });

  it('shows performance level message', () => {
    renderWithTheme(<SessionSummary {...defaultProps} />);
    expect(screen.getByText(/Good performance!/)).toBeInTheDocument();
  });

  it('displays achievements when present', () => {
    renderWithTheme(<SessionSummary {...defaultProps} />);

    expect(screen.getByText('Achievements')).toBeInTheDocument();
    expect(screen.getByText('Great Accuracy!')).toBeInTheDocument();
  });

  it('shows difficult words section', () => {
    renderWithTheme(<SessionSummary {...defaultProps} />);

    expect(screen.getByText('Challenging Words (1)')).toBeInTheDocument();
    
    // Expand the accordion
    const accordionButton = screen.getByText('Challenging Words (1)');
    fireEvent.click(accordionButton);

    expect(screen.getByText('elephant')).toBeInTheDocument();
    expect(screen.getByText(/Complex syllable structure/)).toBeInTheDocument();
  });

  it('displays recommendations when showRecommendations is true', () => {
    renderWithTheme(<SessionSummary {...defaultProps} showRecommendations={true} />);

    expect(screen.getByText('Recommendations')).toBeInTheDocument();
    expect(screen.getByText('Practice Long Vowels')).toBeInTheDocument();
    expect(screen.getByText('Focus on long vowel sounds to improve accuracy')).toBeInTheDocument();
  });

  it('hides recommendations when showRecommendations is false', () => {
    renderWithTheme(<SessionSummary {...defaultProps} showRecommendations={false} />);

    expect(screen.queryByText('Recommendations')).not.toBeInTheDocument();
  });

  it('shows next recommended routine', () => {
    renderWithTheme(<SessionSummary {...defaultProps} />);

    expect(screen.getByText(/Next Recommended:/)).toBeInTheDocument();
    expect(screen.getByText('Intermediate Vowels')).toBeInTheDocument();
  });

  it('calls action handlers when buttons are clicked', () => {
    const mockRetry = jest.fn();
    const mockContinue = jest.fn();
    const mockViewDetails = jest.fn();

    renderWithTheme(
      <SessionSummary
        {...defaultProps}
        onRetrySession={mockRetry}
        onContinueToNext={mockContinue}
        onViewDetails={mockViewDetails}
        showActions={true}
      />
    );

    const retryButton = screen.getByText('Retry Session');
    const continueButton = screen.getByText('Continue to Next');
    const detailsButton = screen.getByText('View Details');

    fireEvent.click(retryButton);
    fireEvent.click(continueButton);
    fireEvent.click(detailsButton);

    expect(mockRetry).toHaveBeenCalled();
    expect(mockContinue).toHaveBeenCalled();
    expect(mockViewDetails).toHaveBeenCalled();
  });

  it('hides action buttons when showActions is false', () => {
    renderWithTheme(<SessionSummary {...defaultProps} showActions={false} />);

    expect(screen.queryByText('Retry Session')).not.toBeInTheDocument();
    expect(screen.queryByText('Continue to Next')).not.toBeInTheDocument();
    expect(screen.queryByText('View Details')).not.toBeInTheDocument();
  });

  it('displays correct performance color based on accuracy', () => {
    // Test excellent performance (>= 90%)
    const excellentSession = { ...mockSession, accuracy: 0.95 };
    const { rerender } = renderWithTheme(
      <SessionSummary session={excellentSession} />
    );
    expect(screen.getByText(/Outstanding work!/)).toBeInTheDocument();

    // Test good performance (80-89%)
    rerender(
      <ThemeProvider theme={theme}>
        <SessionSummary session={mockSession} />
      </ThemeProvider>
    );
    expect(screen.getByText(/Keep up the great work!/)).toBeInTheDocument();

    // Test needs improvement (<80%)
    const poorSession = { ...mockSession, accuracy: 0.65 };
    rerender(
      <ThemeProvider theme={theme}>
        <SessionSummary session={poorSession} />
      </ThemeProvider>
    );
    expect(screen.getByText(/Practice makes perfect/)).toBeInTheDocument();
  });

  it('formats time correctly', () => {
    renderWithTheme(<SessionSummary {...defaultProps} />);
    expect(screen.getByText('15:00')).toBeInTheDocument(); // 900 seconds = 15:00
  });

  it('calculates completion rate correctly', () => {
    renderWithTheme(<SessionSummary {...defaultProps} />);
    expect(screen.getByText('18/20 words')).toBeInTheDocument();
  });

  it('handles session with no achievements', () => {
    const sessionWithoutAchievements = {
      ...mockSession,
      achievements: [],
    };

    renderWithTheme(<SessionSummary session={sessionWithoutAchievements} />);
    expect(screen.queryByText('Achievements')).not.toBeInTheDocument();
  });

  it('handles session with no difficult words', () => {
    const sessionWithoutDifficultWords = {
      ...mockSession,
      difficultWords: [],
    };

    renderWithTheme(<SessionSummary session={sessionWithoutDifficultWords} />);
    expect(screen.queryByText('Challenging Words')).not.toBeInTheDocument();
  });

  it('handles session with no recommendations', () => {
    const sessionWithoutRecommendations = {
      ...mockSession,
      recommendations: [],
    };

    renderWithTheme(<SessionSummary session={sessionWithoutRecommendations} />);
    expect(screen.queryByText('Recommendations')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderWithTheme(
      <SessionSummary {...defaultProps} className="custom-class" />
    );

    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('displays correct accuracy grades for different scores', () => {
    const testCases = [
      { accuracy: 0.98, grade: 'A+' },
      { accuracy: 0.92, grade: 'A' },
      { accuracy: 0.87, grade: 'B+' },
      { accuracy: 0.82, grade: 'B' },
      { accuracy: 0.77, grade: 'C+' },
      { accuracy: 0.72, grade: 'C' },
      { accuracy: 0.65, grade: 'D' },
    ];

    testCases.forEach(({ accuracy, grade }) => {
      const testSession = { ...mockSession, accuracy };
      const { rerender } = renderWithTheme(<SessionSummary session={testSession} />);
      expect(screen.getByText(grade)).toBeInTheDocument();
      
      if (testCases.indexOf({ accuracy, grade }) < testCases.length - 1) {
        rerender(
          <ThemeProvider theme={theme}>
            <SessionSummary session={testSession} />
          </ThemeProvider>
        );
      }
    });
  });
});