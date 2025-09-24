import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TimerControls from '../TimerControls';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('TimerControls', () => {
  const defaultProps = {
    isRunning: false,
    isPaused: false,
    canStart: true,
    canReset: false,
    canSkip: false,
    onStart: jest.fn(),
    onPause: jest.fn(),
    onResume: jest.fn(),
    onReset: jest.fn(),
    onSkip: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render start button when can start', () => {
    renderWithTheme(<TimerControls {...defaultProps} />);
    
    const startButton = screen.getByLabelText('start timer');
    expect(startButton).toBeInTheDocument();
  });

  it('should render pause button when running', () => {
    renderWithTheme(
      <TimerControls 
        {...defaultProps} 
        isRunning={true}
        canStart={false}
      />
    );
    
    const pauseButton = screen.getByLabelText('pause timer');
    expect(pauseButton).toBeInTheDocument();
  });

  it('should render resume button when paused', () => {
    renderWithTheme(
      <TimerControls 
        {...defaultProps} 
        isPaused={true}
        canStart={false}
      />
    );
    
    const resumeButton = screen.getByLabelText('resume timer');
    expect(resumeButton).toBeInTheDocument();
  });

  it('should render reset button when can reset', () => {
    renderWithTheme(
      <TimerControls 
        {...defaultProps} 
        canReset={true}
      />
    );
    
    const resetButton = screen.getByLabelText('reset timer');
    expect(resetButton).toBeInTheDocument();
  });

  it('should render skip button when can skip', () => {
    renderWithTheme(
      <TimerControls 
        {...defaultProps} 
        isRunning={true}
        canSkip={true}
      />
    );
    
    const skipButton = screen.getByLabelText('skip to next');
    expect(skipButton).toBeInTheDocument();
  });

  it('should call onStart when start button is clicked', () => {
    renderWithTheme(<TimerControls {...defaultProps} />);
    
    const startButton = screen.getByLabelText('start timer');
    fireEvent.click(startButton);
    
    expect(defaultProps.onStart).toHaveBeenCalledTimes(1);
  });

  it('should call onPause when pause button is clicked', () => {
    renderWithTheme(
      <TimerControls 
        {...defaultProps} 
        isRunning={true}
        canStart={false}
      />
    );
    
    const pauseButton = screen.getByLabelText('pause timer');
    fireEvent.click(pauseButton);
    
    expect(defaultProps.onPause).toHaveBeenCalledTimes(1);
  });

  it('should call onResume when resume button is clicked', () => {
    renderWithTheme(
      <TimerControls 
        {...defaultProps} 
        isPaused={true}
        canStart={false}
      />
    );
    
    const resumeButton = screen.getByLabelText('resume timer');
    fireEvent.click(resumeButton);
    
    expect(defaultProps.onResume).toHaveBeenCalledTimes(1);
  });

  it('should call onReset when reset button is clicked', () => {
    renderWithTheme(
      <TimerControls 
        {...defaultProps} 
        canReset={true}
      />
    );
    
    const resetButton = screen.getByLabelText('reset timer');
    fireEvent.click(resetButton);
    
    expect(defaultProps.onReset).toHaveBeenCalledTimes(1);
  });

  it('should call onSkip when skip button is clicked', () => {
    renderWithTheme(
      <TimerControls 
        {...defaultProps} 
        isRunning={true}
        canSkip={true}
      />
    );
    
    const skipButton = screen.getByLabelText('skip to next');
    fireEvent.click(skipButton);
    
    expect(defaultProps.onSkip).toHaveBeenCalledTimes(1);
  });

  it('should not call handlers when disabled', () => {
    renderWithTheme(
      <TimerControls 
        {...defaultProps} 
        disabled={true}
      />
    );
    
    const startButton = screen.getByLabelText('start timer');
    fireEvent.click(startButton);
    
    expect(defaultProps.onStart).not.toHaveBeenCalled();
  });

  it('should not render buttons when conditions are not met', () => {
    renderWithTheme(
      <TimerControls 
        {...defaultProps} 
        canStart={false}
        canReset={false}
        canSkip={false}
      />
    );
    
    expect(screen.queryByLabelText('start timer')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('reset timer')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('skip to next')).not.toBeInTheDocument();
  });
});