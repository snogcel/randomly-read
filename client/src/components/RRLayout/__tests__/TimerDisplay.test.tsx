import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TimerDisplay from '../TimerDisplay';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('TimerDisplay', () => {
  const defaultProps = {
    timeLeft: 30,
    duration: 60,
    isRunning: false,
    isPaused: false
  };

  it('should display time in seconds format', () => {
    renderWithTheme(<TimerDisplay {...defaultProps} timeLeft={30} />);
    
    expect(screen.getByText('30s')).toBeInTheDocument();
  });

  it('should display time in minutes format for longer durations', () => {
    renderWithTheme(
      <TimerDisplay 
        {...defaultProps} 
        timeLeft={90} 
        duration={120}
      />
    );
    
    expect(screen.getByText('1:30')).toBeInTheDocument();
  });

  it('should display time in forced seconds format', () => {
    renderWithTheme(
      <TimerDisplay 
        {...defaultProps} 
        timeLeft={90} 
        format="seconds"
      />
    );
    
    expect(screen.getByText('90s')).toBeInTheDocument();
  });

  it('should display time in forced minutes format', () => {
    renderWithTheme(
      <TimerDisplay 
        {...defaultProps} 
        timeLeft={30} 
        format="minutes"
      />
    );
    
    expect(screen.getByText('0:30')).toBeInTheDocument();
  });

  it('should show progress bar when enabled', () => {
    renderWithTheme(
      <TimerDisplay 
        {...defaultProps} 
        timeLeft={30} 
        duration={60}
        showProgress={true}
      />
    );
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '50'); // 50% progress
  });

  it('should not show progress bar when disabled', () => {
    renderWithTheme(
      <TimerDisplay 
        {...defaultProps} 
        showProgress={false}
      />
    );
    
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('should show correct status text', () => {
    // Ready state
    renderWithTheme(<TimerDisplay {...defaultProps} />);
    expect(screen.getByText('Ready')).toBeInTheDocument();
  });

  it('should show running status', () => {
    renderWithTheme(
      <TimerDisplay 
        {...defaultProps} 
        isRunning={true}
      />
    );
    
    expect(screen.getByText('Running')).toBeInTheDocument();
  });

  it('should show paused status', () => {
    renderWithTheme(
      <TimerDisplay 
        {...defaultProps} 
        isPaused={true}
      />
    );
    
    expect(screen.getByText('Paused')).toBeInTheDocument();
  });

  it('should show complete status when time is zero', () => {
    renderWithTheme(
      <TimerDisplay 
        {...defaultProps} 
        timeLeft={0}
      />
    );
    
    expect(screen.getByText('Complete')).toBeInTheDocument();
  });

  it('should not show status when disabled', () => {
    renderWithTheme(
      <TimerDisplay 
        {...defaultProps} 
        showStatus={false}
      />
    );
    
    expect(screen.queryByText('Ready')).not.toBeInTheDocument();
  });

  it('should show elapsed/total time', () => {
    renderWithTheme(
      <TimerDisplay 
        {...defaultProps} 
        timeLeft={30} 
        duration={60}
        showProgress={true}
      />
    );
    
    expect(screen.getByText('30s / 60s')).toBeInTheDocument();
  });

  it('should handle zero time left', () => {
    renderWithTheme(
      <TimerDisplay 
        {...defaultProps} 
        timeLeft={0}
      />
    );
    
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should handle negative time left', () => {
    renderWithTheme(
      <TimerDisplay 
        {...defaultProps} 
        timeLeft={-5}
      />
    );
    
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should apply different sizes correctly', () => {
    const { rerender } = renderWithTheme(
      <TimerDisplay 
        {...defaultProps} 
        size="small"
      />
    );
    
    let timeText = screen.getByText('30s');
    expect(timeText).toHaveStyle({ fontSize: '1.5rem' });

    rerender(
      <ThemeProvider theme={theme}>
        <TimerDisplay 
          {...defaultProps} 
          size="large"
        />
      </ThemeProvider>
    );
    
    timeText = screen.getByText('30s');
    expect(timeText).toHaveStyle({ fontSize: '3rem' });
  });

  it('should show error color when time is low and running', () => {
    renderWithTheme(
      <TimerDisplay 
        {...defaultProps} 
        timeLeft={2}
        isRunning={true}
      />
    );
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('MuiLinearProgress-colorError');
  });
});