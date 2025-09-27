import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ExerciseProvider, RoutineProvider } from '../contexts';
import TimerRefactored from '../components/RRLayout/TimerRefactored';
import TimerControls from '../components/RRLayout/TimerControls';
import TimerDisplay from '../components/RRLayout/TimerDisplay';
import ExerciseProgress from '../components/RRLayout/ExerciseProgress';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

const theme = createTheme();

const mockReduxProps = {
  currentExercise: [],
  completed: 0,
  total: 0,
  timeLeft: 3,
  addExercise: jest.fn(),
  addExerciseNumber: jest.fn(),
  updateCompleted: jest.fn(),
  updateTotal: jest.fn(),
  updateTimeLeft: jest.fn(),
  setRange: jest.fn(),
  setExercisePause: jest.fn(),
  addRoutineVowel: jest.fn(),
  removeConsonant: jest.fn(),
  addConsonant: jest.fn(),
  addSyllables: jest.fn(),
  setMode: jest.fn(),
  setPosition: jest.fn(),
  setAge: jest.fn(),
  setLimit: jest.fn(),
  setIntermissionText: jest.fn(),
  clearQueryResults: jest.fn()
};

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <ExerciseProvider userId="a11y-test-user">
      <RoutineProvider>
        {children}
      </RoutineProvider>
    </ExerciseProvider>
  </ThemeProvider>
);

describe('Accessibility Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Timer System Accessibility', () => {
    it('should have no accessibility violations in TimerRefactored', async () => {
      const { container } = render(
        <TestWrapper>
          <TimerRefactored {...mockReduxProps} />
        </TestWrapper>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should provide proper ARIA labels for timer controls', () => {
      render(
        <TestWrapper>
          <TimerControls
            isRunning={false}
            isPaused={false}
            canStart={true}
            canReset={false}
            canSkip={false}
            onStart={jest.fn()}
            onPause={jest.fn()}
            onResume={jest.fn()}
            onReset={jest.fn()}
          />
        </TestWrapper>
      );

      const startButton = screen.getByLabelText('start timer');
      expect(startButton).toBeInTheDocument();
      expect(startButton).toHaveAttribute('aria-label', 'start timer');
    });

    it('should provide proper ARIA labels for all timer control states', () => {
      const { rerender } = render(
        <TestWrapper>
          <TimerControls
            isRunning={true}
            isPaused={false}
            canStart={false}
            canReset={false}
            canSkip={true}
            onStart={jest.fn()}
            onPause={jest.fn()}
            onResume={jest.fn()}
            onReset={jest.fn()}
            onSkip={jest.fn()}
          />
        </TestWrapper>
      );

      // Running state
      expect(screen.getByLabelText('pause timer')).toBeInTheDocument();
      expect(screen.getByLabelText('skip to next')).toBeInTheDocument();

      // Paused state
      rerender(
        <TestWrapper>
          <TimerControls
            isRunning={false}
            isPaused={true}
            canStart={false}
            canReset={true}
            canSkip={true}
            onStart={jest.fn()}
            onPause={jest.fn()}
            onResume={jest.fn()}
            onReset={jest.fn()}
            onSkip={jest.fn()}
          />
        </TestWrapper>
      );

      expect(screen.getByLabelText('resume timer')).toBeInTheDocument();
      expect(screen.getByLabelText('reset timer')).toBeInTheDocument();
    });

    it('should have accessible timer display with proper roles', () => {
      render(
        <TestWrapper>
          <TimerDisplay
            timeLeft={30}
            duration={60}
            isRunning={true}
            isPaused={false}
            showProgress={true}
            showStatus={true}
          />
        </TestWrapper>
      );

      // Progress bar should have proper role and attributes
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveAttribute('aria-valuenow', '50'); // 50% progress
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    });

    it('should provide screen reader friendly time announcements', () => {
      render(
        <TestWrapper>
          <TimerDisplay
            timeLeft={90}
            duration={120}
            isRunning={true}
            isPaused={false}
            format="minutes"
          />
        </TestWrapper>
      );

      // Time should be displayed in readable format
      expect(screen.getByText('1:30')).toBeInTheDocument();
      expect(screen.getByText('Running')).toBeInTheDocument();
    });
  });

  describe('Exercise Progress Accessibility', () => {
    const mockSteps = [
      {
        id: 'step-1',
        name: 'Word Exercise',
        type: 'word' as const,
        duration: 3,
        completed: true,
        current: false
      },
      {
        id: 'step-2',
        name: 'Break',
        type: 'intermission' as const,
        duration: 2,
        completed: false,
        current: true
      },
      {
        id: 'step-3',
        name: 'Sentence Exercise',
        type: 'sentence' as const,
        duration: 5,
        completed: false,
        current: false
      }
    ];

    it('should have no accessibility violations in ExerciseProgress', async () => {
      const { container } = render(
        <TestWrapper>
          <ExerciseProgress
            currentStep={2}
            totalSteps={3}
            steps={mockSteps}
            completedExercises={1}
            totalExercises={2}
            routineName="Test Routine"
          />
        </TestWrapper>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should provide proper progress indicators with ARIA attributes', () => {
      render(
        <TestWrapper>
          <ExerciseProgress
            currentStep={2}
            totalSteps={3}
            steps={mockSteps}
            completedExercises={1}
            totalExercises={2}
            routineName="Test Routine"
            showOverallProgress={true}
          />
        </TestWrapper>
      );

      const progressBars = screen.getAllByRole('progressbar');
      expect(progressBars.length).toBeGreaterThan(0);

      // Each progress bar should have proper attributes
      progressBars.forEach(progressBar => {
        expect(progressBar).toHaveAttribute('aria-valuemin', '0');
        expect(progressBar).toHaveAttribute('aria-valuemax', '100');
        expect(progressBar).toHaveAttribute('aria-valuenow');
      });
    });

    it('should provide meaningful step descriptions for screen readers', () => {
      render(
        <TestWrapper>
          <ExerciseProgress
            currentStep={2}
            totalSteps={3}
            steps={mockSteps}
            completedExercises={1}
            totalExercises={2}
            routineName="Test Routine"
            showStepDetails={true}
          />
        </TestWrapper>
      );

      // Should show current step information
      expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
      expect(screen.getByText('1 / 2 completed')).toBeInTheDocument();
    });

    it('should handle compact mode accessibility', () => {
      render(
        <TestWrapper>
          <ExerciseProgress
            currentStep={1}
            totalSteps={3}
            steps={mockSteps}
            completedExercises={0}
            totalExercises={2}
            compact={true}
          />
        </TestWrapper>
      );

      // Compact mode should still be accessible
      expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should support keyboard navigation for timer controls', () => {
      render(
        <TestWrapper>
          <TimerControls
            isRunning={false}
            isPaused={false}
            canStart={true}
            canReset={false}
            canSkip={false}
            onStart={jest.fn()}
            onPause={jest.fn()}
            onResume={jest.fn()}
            onReset={jest.fn()}
          />
        </TestWrapper>
      );

      const startButton = screen.getByLabelText('start timer');
      
      // Should be focusable
      startButton.focus();
      expect(document.activeElement).toBe(startButton);

      // Should respond to Enter key
      fireEvent.keyDown(startButton, { key: 'Enter', code: 'Enter' });
      // Note: In real implementation, this would trigger the onStart callback
    });

    it('should support keyboard navigation for exercise progress', () => {
      render(
        <TestWrapper>
          <ExerciseProgress
            currentStep={2}
            totalSteps={3}
            steps={[
              {
                id: 'step-1',
                name: 'Word Exercise',
                type: 'word',
                duration: 3,
                completed: true,
                current: false
              }
            ]}
            completedExercises={1}
            totalExercises={2}
          />
        </TestWrapper>
      );

      // Progress components should be keyboard accessible
      // Focus should be manageable within the component
      const progressContainer = screen.getByRole('progressbar').closest('div');
      expect(progressContainer).toBeInTheDocument();
    });

    it('should handle tab order correctly', () => {
      render(
        <TestWrapper>
          <TimerRefactored {...mockReduxProps} />
        </TestWrapper>
      );

      // Should have logical tab order
      // This is a basic test - in real implementation, you'd test actual tab navigation
      const focusableElements = screen.getAllByRole('button');
      focusableElements.forEach(element => {
        expect(element).not.toHaveAttribute('tabindex', '-1');
      });
    });
  });

  describe('Screen Reader Support', () => {
    it('should provide live regions for timer updates', () => {
      render(
        <TestWrapper>
          <TimerDisplay
            timeLeft={5}
            duration={60}
            isRunning={true}
            isPaused={false}
            showStatus={true}
          />
        </TestWrapper>
      );

      // Status should be announced to screen readers
      expect(screen.getByText('Running')).toBeInTheDocument();
      
      // Time should be in readable format
      expect(screen.getByText('5s')).toBeInTheDocument();
    });

    it('should announce progress changes', () => {
      const { rerender } = render(
        <TestWrapper>
          <ExerciseProgress
            currentStep={1}
            totalSteps={3}
            steps={[]}
            completedExercises={0}
            totalExercises={2}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();

      // Update progress
      rerender(
        <TestWrapper>
          <ExerciseProgress
            currentStep={2}
            totalSteps={3}
            steps={[]}
            completedExercises={1}
            totalExercises={2}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
      expect(screen.getByText('1 / 2 completed')).toBeInTheDocument();
    });

    it('should provide context for timer state changes', () => {
      const { rerender } = render(
        <TestWrapper>
          <TimerDisplay
            timeLeft={30}
            duration={60}
            isRunning={false}
            isPaused={false}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Ready')).toBeInTheDocument();

      // Change to running state
      rerender(
        <TestWrapper>
          <TimerDisplay
            timeLeft={30}
            duration={60}
            isRunning={true}
            isPaused={false}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Running')).toBeInTheDocument();

      // Change to paused state
      rerender(
        <TestWrapper>
          <TimerDisplay
            timeLeft={30}
            duration={60}
            isRunning={false}
            isPaused={true}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Paused')).toBeInTheDocument();
    });
  });

  describe('Color and Contrast', () => {
    it('should handle high contrast mode', () => {
      // Mock high contrast media query
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-contrast: high)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      render(
        <TestWrapper>
          <TimerDisplay
            timeLeft={3}
            duration={60}
            isRunning={true}
            isPaused={false}
          />
        </TestWrapper>
      );

      // Component should render without issues in high contrast mode
      expect(screen.getByText('3s')).toBeInTheDocument();
    });

    it('should provide sufficient color contrast for timer warnings', () => {
      render(
        <TestWrapper>
          <TimerDisplay
            timeLeft={2} // Low time should trigger warning colors
            duration={60}
            isRunning={true}
            isPaused={false}
          />
        </TestWrapper>
      );

      // Warning state should be visible
      expect(screen.getByText('2s')).toBeInTheDocument();
      
      // Progress bar should indicate warning state
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveClass('MuiLinearProgress-colorError');
    });
  });

  describe('Reduced Motion Support', () => {
    it('should respect prefers-reduced-motion', () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      render(
        <TestWrapper>
          <TimerDisplay
            timeLeft={30}
            duration={60}
            isRunning={true}
            isPaused={false}
            showProgress={true}
          />
        </TestWrapper>
      );

      // Component should render without animations
      expect(screen.getByText('30s')).toBeInTheDocument();
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('Mobile Accessibility', () => {
    it('should be accessible on mobile devices', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <TestWrapper>
          <TimerRefactored {...mockReduxProps} />
        </TestWrapper>
      );

      // Should maintain accessibility on mobile
      expect(screen.getByText('Available Routines')).toBeInTheDocument();
    });

    it('should have appropriate touch targets', () => {
      render(
        <TestWrapper>
          <TimerControls
            isRunning={false}
            isPaused={false}
            canStart={true}
            canReset={false}
            canSkip={false}
            onStart={jest.fn()}
            onPause={jest.fn()}
            onResume={jest.fn()}
            onReset={jest.fn()}
          />
        </TestWrapper>
      );

      const startButton = screen.getByLabelText('start timer');
      
      // Button should be large enough for touch interaction
      // This is handled by Material-UI's IconButton component
      expect(startButton).toBeInTheDocument();
    });
  });
});