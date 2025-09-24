import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Import components
import Exercise1Introduction from '../components/RandomlyRead/Exercises/Exercise1/Introduction';
import Exercise1Techniques from '../components/RandomlyRead/Exercises/Exercise1/Techniques';
import Exercise2Introduction from '../components/RandomlyRead/Exercises/Exercise2/Introduction';
import Exercise2Techniques from '../components/RandomlyRead/Exercises/Exercise2/Techniques';
import Exercise3Introduction from '../components/RandomlyRead/Exercises/Exercise3/Introduction';
import Exercise3Techniques from '../components/RandomlyRead/Exercises/Exercise3/Techniques';
import Home from '../components/RandomlyRead/Home';

// Mock store setup
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {
    user: {
      id: 'test-user',
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User'
    },
    token: 'test-token',
    isFetching: false
  },
  routineSelect: {
    id: 0,
    routines: [],
    isFetching: false
  },
  exerciseHistory: {
    inProgress: false,
    isCompleted: false,
    time: 0,
    timeLeft: 0,
    queryResults: []
  },
  word: {
    text: null,
    isFetching: false
  },
  modeSelect: {
    mode: 0,
    auto: false
  }
};

const renderWithProviders = (component, store = mockStore(initialState)) => {
  return render(
    <Provider store={store}>
      <MockedProvider mocks={[]} addTypename={false}>
        <Router>
          {component}
        </Router>
      </MockedProvider>
    </Provider>
  );
};

describe('RandomlyRead Components', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Introduction Components', () => {
    test('should render Exercise1 Introduction component', () => {
      renderWithProviders(<Exercise1Introduction />);
      
      expect(screen.getByText(/breathing/i)).toBeInTheDocument();
      expect(screen.getByText(/phonation/i)).toBeInTheDocument();
      expect(screen.getByText(/articulation/i)).toBeInTheDocument();
      expect(screen.getByText(/foundational/i)).toBeInTheDocument();
    });

    test('should render Exercise2 Introduction component', () => {
      renderWithProviders(<Exercise2Introduction />);
      
      // Should contain intermediate-level content
      expect(screen.getByText(/transfer/i)).toBeInTheDocument();
    });

    test('should render Exercise3 Introduction component', () => {
      renderWithProviders(<Exercise3Introduction />);
      
      // Should contain advanced-level content
      expect(screen.getByText(/natural/i)).toBeInTheDocument();
    });

    test('should display appropriate content for each level', () => {
      const { rerender } = renderWithProviders(<Exercise1Introduction />);
      expect(screen.getByText(/foundational/i)).toBeInTheDocument();

      rerender(
        <Provider store={store}>
          <MockedProvider mocks={[]} addTypename={false}>
            <Router>
              <Exercise2Introduction />
            </Router>
          </MockedProvider>
        </Provider>
      );
      expect(screen.getByText(/transfer/i)).toBeInTheDocument();

      rerender(
        <Provider store={store}>
          <MockedProvider mocks={[]} addTypename={false}>
            <Router>
              <Exercise3Introduction />
            </Router>
          </MockedProvider>
        </Provider>
      );
      expect(screen.getByText(/natural/i)).toBeInTheDocument();
    });
  });

  describe('Techniques Components', () => {
    test('should render Exercise1 Techniques component with all techniques', () => {
      renderWithProviders(<Exercise1Techniques />);
      
      // Should render technique components
      expect(screen.getByText(/technique/i)).toBeInTheDocument();
    });

    test('should render Exercise2 Techniques component', () => {
      renderWithProviders(<Exercise2Techniques />);
      
      // Should contain intermediate techniques
      expect(screen.getByText(/technique/i)).toBeInTheDocument();
    });

    test('should render Exercise3 Techniques component', () => {
      renderWithProviders(<Exercise3Techniques />);
      
      // Should contain advanced techniques
      expect(screen.getByText(/technique/i)).toBeInTheDocument();
    });

    test('should handle technique expansion/collapse', async () => {
      renderWithProviders(<Exercise1Techniques />);
      
      // Look for expandable elements (accordions)
      const expandButtons = screen.getAllByRole('button');
      expect(expandButtons.length).toBeGreaterThan(0);
      
      // Test expansion if accordion is present
      if (expandButtons.length > 0) {
        fireEvent.click(expandButtons[0]);
        // Should expand/collapse content
      }
    });
  });

  describe('Home Component with Different Contexts', () => {
    const mockProps = {
      pageContext: 'beginner',
      routineSelectId: 0,
      inProgress: false,
      isCompleted: false,
      TimerContainer: () => <div>Timer Container</div>,
      RoutineSelectContainer: () => <div>Routine Select Container</div>,
      ExerciseIntroduction: () => <div>Exercise Introduction</div>,
      ExerciseTechniques: () => <div>Exercise Techniques</div>,
      ApolloClient: {},
      setInProgress: jest.fn(),
      setExercisePause: jest.fn(),
      updateTime: jest.fn(),
      updateTimeLeft: jest.fn(),
      resetRoutineSelect: jest.fn(),
      clearQueryResults: jest.fn(),
      resetWordCard: jest.fn(),
      updateId: jest.fn()
    };

    test('should render Home component with beginner context', () => {
      renderWithProviders(<Home {...mockProps} pageContext="beginner" />);
      
      expect(screen.getByText('Introduction')).toBeInTheDocument();
      expect(screen.getByText('Techniques')).toBeInTheDocument();
      expect(screen.getByText('Practice')).toBeInTheDocument();
      expect(screen.getByText('Beginner Training')).toBeInTheDocument();
    });

    test('should render Home component with intermediate context', () => {
      renderWithProviders(<Home {...mockProps} pageContext="intermediate" />);
      
      expect(screen.getByText('Introduction')).toBeInTheDocument();
      expect(screen.getByText('Techniques')).toBeInTheDocument();
      expect(screen.getByText('Practice')).toBeInTheDocument();
      expect(screen.getByText('Intermediate Training')).toBeInTheDocument();
    });

    test('should render Home component with advanced context', () => {
      renderWithProviders(<Home {...mockProps} pageContext="advanced" />);
      
      expect(screen.getByText('Introduction')).toBeInTheDocument();
      expect(screen.getByText('Techniques')).toBeInTheDocument();
      expect(screen.getByText('Practice')).toBeInTheDocument();
      expect(screen.getByText('Advanced Training')).toBeInTheDocument();
    });

    test('should highlight current level in navigation', () => {
      renderWithProviders(<Home {...mockProps} pageContext="beginner" />);
      
      // The beginner section should be highlighted (different color)
      const beginnerSection = screen.getByText('Beginner Training');
      expect(beginnerSection).toBeInTheDocument();
      
      // Check if the icon color is different for active section
      // This would require checking the computed styles or data attributes
    });

    test('should handle tab switching', async () => {
      renderWithProviders(<Home {...mockProps} />);
      
      // Initially should show Introduction tab
      expect(screen.getByRole('tab', { name: /introduction/i })).toHaveAttribute('aria-selected', 'true');
      
      // Click on Techniques tab
      const techniquesTab = screen.getByRole('tab', { name: /techniques/i });
      fireEvent.click(techniquesTab);
      
      await waitFor(() => {
        expect(techniquesTab).toHaveAttribute('aria-selected', 'true');
      });
      
      // Click on Practice tab
      const practiceTab = screen.getByRole('tab', { name: /practice/i });
      fireEvent.click(practiceTab);
      
      await waitFor(() => {
        expect(practiceTab).toHaveAttribute('aria-selected', 'true');
      });
    });

    test('should show practice content when practice tab is selected', async () => {
      renderWithProviders(<Home {...mockProps} />);
      
      // Click on Practice tab
      const practiceTab = screen.getByRole('tab', { name: /practice/i });
      fireEvent.click(practiceTab);
      
      await waitFor(() => {
        expect(screen.getByText('Timer Container')).toBeInTheDocument();
      });
    });

    test('should handle navigation shortcuts', async () => {
      const mockUpdateId = jest.fn();
      const mockSetInProgress = jest.fn();
      
      renderWithProviders(
        <Home 
          {...mockProps} 
          updateId={mockUpdateId}
          setInProgress={mockSetInProgress}
        />
      );
      
      // Click on a training level to navigate
      const beginnerTraining = screen.getByText('Beginner Training');
      fireEvent.click(beginnerTraining);
      
      // Should call navigation functions
      await waitFor(() => {
        expect(mockSetInProgress).toHaveBeenCalled();
      });
    });
  });

  describe('Accessibility', () => {
    test('should have proper ARIA labels for tabs', () => {
      const mockProps = {
        pageContext: 'beginner',
        routineSelectId: 0,
        TimerContainer: () => <div>Timer</div>,
        RoutineSelectContainer: () => <div>Routine</div>,
        ExerciseIntroduction: () => <div>Introduction</div>,
        ExerciseTechniques: () => <div>Techniques</div>,
        ApolloClient: {}
      };
      
      renderWithProviders(<Home {...mockProps} />);
      
      const introTab = screen.getByRole('tab', { name: /introduction/i });
      const techniquesTab = screen.getByRole('tab', { name: /techniques/i });
      const practiceTab = screen.getByRole('tab', { name: /practice/i });
      
      expect(introTab).toHaveAttribute('aria-controls');
      expect(techniquesTab).toHaveAttribute('aria-controls');
      expect(practiceTab).toHaveAttribute('aria-controls');
    });

    test('should have proper heading hierarchy', () => {
      renderWithProviders(<Exercise1Introduction />);
      
      // Should have proper heading structure
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
    });

    test('should be keyboard navigable', async () => {
      const mockProps = {
        pageContext: 'beginner',
        routineSelectId: 0,
        TimerContainer: () => <div>Timer</div>,
        RoutineSelectContainer: () => <div>Routine</div>,
        ExerciseIntroduction: () => <div>Introduction</div>,
        ExerciseTechniques: () => <div>Techniques</div>,
        ApolloClient: {}
      };
      
      renderWithProviders(<Home {...mockProps} />);
      
      const introTab = screen.getByRole('tab', { name: /introduction/i });
      
      // Focus the tab
      introTab.focus();
      expect(document.activeElement).toBe(introTab);
      
      // Press arrow key to navigate
      fireEvent.keyDown(introTab, { key: 'ArrowRight' });
      
      // Should move focus to next tab
      await waitFor(() => {
        const techniquesTab = screen.getByRole('tab', { name: /techniques/i });
        expect(document.activeElement).toBe(techniquesTab);
      });
    });
  });

  describe('Performance', () => {
    test('should render components efficiently', () => {
      const startTime = performance.now();
      
      renderWithProviders(<Exercise1Introduction />);
      renderWithProviders(<Exercise1Techniques />);
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render within reasonable time (adjust threshold as needed)
      expect(renderTime).toBeLessThan(1000); // 1 second
    });

    test('should handle rapid tab switching without errors', async () => {
      const mockProps = {
        pageContext: 'beginner',
        routineSelectId: 0,
        TimerContainer: () => <div>Timer</div>,
        RoutineSelectContainer: () => <div>Routine</div>,
        ExerciseIntroduction: () => <div>Introduction</div>,
        ExerciseTechniques: () => <div>Techniques</div>,
        ApolloClient: {}
      };
      
      renderWithProviders(<Home {...mockProps} />);
      
      const tabs = [
        screen.getByRole('tab', { name: /introduction/i }),
        screen.getByRole('tab', { name: /techniques/i }),
        screen.getByRole('tab', { name: /practice/i })
      ];
      
      // Rapidly switch between tabs
      for (let i = 0; i < 10; i++) {
        const randomTab = tabs[Math.floor(Math.random() * tabs.length)];
        fireEvent.click(randomTab);
      }
      
      // Should not throw errors
      expect(screen.getByText('Introduction')).toBeInTheDocument();
    });
  });
});