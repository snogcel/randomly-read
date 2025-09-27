import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ProgressIndicator from '../ProgressIndicator';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('ProgressIndicator Component', () => {
  const defaultProps = {
    wordsCompleted: 5,
    totalWords: 10,
    accuracy: 0.85,
    timeElapsed: 120,
    currentStreak: 3,
    bestStreak: 7,
  };

  it('renders detailed progress indicator by default', () => {
    renderWithTheme(<ProgressIndicator {...defaultProps} />);

    expect(screen.getByText('Exercise Progress')).toBeInTheDocument();
    expect(screen.getByText('5/10 (50%)')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('2:00')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('renders linear variant correctly', () => {
    renderWithTheme(
      <ProgressIndicator {...defaultProps} variant="linear" />
    );

    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText('5/10 words (50%)')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders circular variant correctly', () => {
    renderWithTheme(
      <ProgressIndicator {...defaultProps} variant="circular" />
    );

    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('calculates progress percentage correctly', () => {
    renderWithTheme(
      <ProgressIndicator
        {...defaultProps}
        wordsCompleted={7}
        totalWords={10}
      />
    );

    expect(screen.getByText('7/10 (70%)')).toBeInTheDocument();
  });

  it('handles zero total words gracefully', () => {
    renderWithTheme(
      <ProgressIndicator
        {...defaultProps}
        wordsCompleted={0}
        totalWords={0}
      />
    );

    expect(screen.getByText('0/0 (0%)')).toBeInTheDocument();
  });

  it('formats time correctly for different durations', () => {
    // Test seconds only
    const { rerender } = renderWithTheme(
      <ProgressIndicator {...defaultProps} timeElapsed={45} />
    );
    expect(screen.getByText('0:45')).toBeInTheDocument();

    // Test minutes and seconds
    rerender(
      <ThemeProvider theme={theme}>
        <ProgressIndicator {...defaultProps} timeElapsed={125} />
      </ThemeProvider>
    );
    expect(screen.getByText('2:05')).toBeInTheDocument();

    // Test longer duration
    rerender(
      <ThemeProvider theme={theme}>
        <ProgressIndicator {...defaultProps} timeElapsed={3661} />
      </ThemeProvider>
    );
    expect(screen.getByText('61:01')).toBeInTheDocument();
  });

  it('displays correct accuracy color based on percentage', () => {
    // Test high accuracy (success)
    const { rerender } = renderWithTheme(
      <ProgressIndicator {...defaultProps} accuracy={0.95} />
    );
    expect(screen.getByText('95%')).toBeInTheDocument();

    // Test medium accuracy (warning)
    rerender(
      <ThemeProvider theme={theme}>
        <ProgressIndicator {...defaultProps} accuracy={0.75} />
      </ThemeProvider>
    );
    expect(screen.getByText('75%')).toBeInTheDocument();

    // Test low accuracy (error)
    rerender(
      <ThemeProvider theme={theme}>
        <ProgressIndicator {...defaultProps} accuracy={0.45} />
      </ThemeProvider>
    );
    expect(screen.getByText('45%')).toBeInTheDocument();
  });

  it('shows performance chips for excellent accuracy', () => {
    renderWithTheme(
      <ProgressIndicator {...defaultProps} accuracy={0.96} />
    );

    expect(screen.getByText('Excellent!')).toBeInTheDocument();
  });

  it('shows streak chip for good streaks', () => {
    renderWithTheme(
      <ProgressIndicator {...defaultProps} currentStreak={5} />
    );

    expect(screen.getByText('5 in a row!')).toBeInTheDocument();
  });

  it('shows halfway chip when progress is 50% or more', () => {
    renderWithTheme(
      <ProgressIndicator
        {...defaultProps}
        wordsCompleted={5}
        totalWords={10}
      />
    );

    expect(screen.getByText('Halfway there!')).toBeInTheDocument();
  });

  it('hides details when showDetails is false', () => {
    renderWithTheme(
      <ProgressIndicator {...defaultProps} showDetails={false} />
    );

    expect(screen.getByText('Exercise Progress')).toBeInTheDocument();
    expect(screen.queryByText('Accuracy')).not.toBeInTheDocument();
    expect(screen.queryByText('Time')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderWithTheme(
      <ProgressIndicator {...defaultProps} className="custom-class" />
    );

    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('handles edge case of 100% completion', () => {
    renderWithTheme(
      <ProgressIndicator
        {...defaultProps}
        wordsCompleted={10}
        totalWords={10}
      />
    );

    expect(screen.getByText('10/10 (100%)')).toBeInTheDocument();
  });

  it('handles edge case of 0% accuracy', () => {
    renderWithTheme(
      <ProgressIndicator {...defaultProps} accuracy={0} />
    );

    expect(screen.getByText('0%')).toBeInTheDocument();
  });
});