import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ExerciseIntermission from '../ExerciseIntermission';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

// Mock timers
jest.useFakeTimers();

describe('ExerciseIntermission Component', () => {
  const defaultProps = {
    duration: 10,
    onComplete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
  });

  it('renders intermission correctly', () => {
    renderWithTheme(<ExerciseIntermission {...defaultProps} />);

    expect(screen.getByText('Take a Break')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument(); // countdown display
  });

  it('displays custom message when provided', () => {
    const customMessage = 'Custom break message';
    renderWithTheme(
      <ExerciseIntermission {...defaultProps} message={customMessage} />
    );

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('shows default encouragement message when no custom message', () => {
    renderWithTheme(<ExerciseIntermission {...defaultProps} />);

    expect(screen.getByText('Take a moment to relax and breathe deeply.')).toBeInTheDocument();
  });

  it('counts down correctly', async () => {
    renderWithTheme(<ExerciseIntermission {...defaultProps} duration={5} />);

    expect(screen.getByText('5')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByText('4')).toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  it('calls onComplete when countdown reaches zero', async () => {
    const mockOnComplete = jest.fn();
    renderWithTheme(
      <ExerciseIntermission {...defaultProps} duration={2} onComplete={mockOnComplete} />
    );

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalled();
    });
  });

  it('pauses and resumes countdown', async () => {
    renderWithTheme(<ExerciseIntermission {...defaultProps} duration={5} />);

    expect(screen.getByText('5')).toBeInTheDocument();

    // Pause the countdown
    const pauseButton = screen.getByText('Pause Break');
    fireEvent.click(pauseButton);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Should still show 5 because it's paused
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Resume Break')).toBeInTheDocument();

    // Resume the countdown
    const resumeButton = screen.getByText('Resume Break');
    fireEvent.click(resumeButton);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByText('4')).toBeInTheDocument();
    });
  });

  it('calls onSkip when skip button is clicked', () => {
    const mockOnSkip = jest.fn();
    renderWithTheme(
      <ExerciseIntermission
        {...defaultProps}
        onSkip={mockOnSkip}
        allowSkip={true}
      />
    );

    const skipButton = screen.getByText('Continue Now');
    fireEvent.click(skipButton);

    expect(mockOnSkip).toHaveBeenCalled();
  });

  it('calls onComplete when skip button is clicked and no onSkip provided', () => {
    const mockOnComplete = jest.fn();
    renderWithTheme(
      <ExerciseIntermission
        {...defaultProps}
        onComplete={mockOnComplete}
        allowSkip={true}
      />
    );

    const skipButton = screen.getByText('Continue Now');
    fireEvent.click(skipButton);

    expect(mockOnComplete).toHaveBeenCalled();
  });

  it('hides skip button when allowSkip is false', () => {
    renderWithTheme(
      <ExerciseIntermission {...defaultProps} allowSkip={false} />
    );

    expect(screen.queryByText('Continue Now')).not.toBeInTheDocument();
  });

  it('hides progress elements when showProgress is false', () => {
    renderWithTheme(
      <ExerciseIntermission {...defaultProps} showProgress={false} />
    );

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(screen.queryByText('10')).not.toBeInTheDocument(); // countdown number
  });

  it('formats time correctly for different durations', () => {
    // Test seconds only
    const { rerender } = renderWithTheme(
      <ExerciseIntermission {...defaultProps} duration={45} />
    );
    expect(screen.getByText('45')).toBeInTheDocument();

    // Test minutes and seconds
    rerender(
      <ThemeProvider theme={theme}>
        <ExerciseIntermission {...defaultProps} duration={125} />
      </ThemeProvider>
    );
    expect(screen.getByText('2:05')).toBeInTheDocument();
  });

  it('updates encouragement message based on progress', async () => {
    renderWithTheme(<ExerciseIntermission {...defaultProps} duration={10} />);

    // Initial message (< 25% progress)
    expect(screen.getByText('Take a moment to relax and breathe deeply.')).toBeInTheDocument();

    // Advance to 30% progress
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(screen.getByText("You're doing great! Keep up the excellent work.")).toBeInTheDocument();
    });

    // Advance to 60% progress
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(screen.getByText('Almost ready to continue. Stay focused!')).toBeInTheDocument();
    });

    // Advance to 80% progress
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(screen.getByText('Get ready to continue your practice session!')).toBeInTheDocument();
    });
  });

  it('shows correct status text based on state', async () => {
    renderWithTheme(<ExerciseIntermission {...defaultProps} duration={10} />);

    // Initial status
    expect(screen.getByText('Break will end in 10')).toBeInTheDocument();

    // Pause and check status
    const pauseButton = screen.getByText('Pause Break');
    fireEvent.click(pauseButton);

    expect(screen.getByText("Break paused - Click resume when you're ready")).toBeInTheDocument();

    // Resume and advance to near end
    const resumeButton = screen.getByText('Resume Break');
    fireEvent.click(resumeButton);

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    await waitFor(() => {
      expect(screen.getByText('Break will end in 4')).toBeInTheDocument();
    });

    // Advance to final seconds
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByText('Get ready to continue...')).toBeInTheDocument();
    });
  });

  it('resets timer when duration prop changes', async () => {
    const { rerender } = renderWithTheme(
      <ExerciseIntermission {...defaultProps} duration={5} />
    );

    expect(screen.getByText('5')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    // Change duration
    rerender(
      <ThemeProvider theme={theme}>
        <ExerciseIntermission {...defaultProps} duration={8} />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('8')).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    const { container } = renderWithTheme(
      <ExerciseIntermission {...defaultProps} className="custom-class" />
    );

    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});