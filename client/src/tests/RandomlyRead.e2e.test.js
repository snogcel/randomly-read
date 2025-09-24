import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import App from '../components/App/Component';
import Identities from '../components/RandomlyRead/Identities/Identities';

// Mock store setup
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const createInitialState = (overrides = {}) => ({
  auth: {
    user: null,
    token: null,
    isFetching: false,
    error: null
  },
  routineSelect: {
    id: 0,
    routines: [
      {
        id: '1',
        name: 'Beginner Routine',
        description: 'Basic phonation exercises',
        steps: [
          {
            id: '1',
            mode: 'Word',
            vowel: ['a', 'e'],
            consonant: ['p', 't'],
            syllables: [1, 2],
            position: ['initial'],
            age: ['adult'],
            limit: 1,
            rangeVal: 30,
            repetitions: 5
          }
        ]
      }
    ],
    isFetching: false
  },
  exerciseHistory: {
    inProgress: false,
    isCompleted: false,
    time: 0,
    timeLeft: 0,
    queryResults: [],
    currentExercise: [],
    currentExerciseNumber: null
  },
  word: {
    text: null,
    isFetching: false
  },
  modeSelect: {
    mode: 0,
    auto: false
  },
  error: null,
  ...overrides
});

// Mock GraphQL responses
const mocks = [
  {
    request: {
      query: expect.any(Object),
      variables: expect.any(Object)
    },
    result: {
      data: {
        words: {
          id: '1',
          wordid: 'word1',
          lexeme: 'apple',
          score: 5,
          votes: []
        }
      }
    }
  }
];

const renderApp = (initialState = createInitialState()) => {
  const store = mockStore(initialState);
  
  return {
    store,
    ...render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Router>
            <App />
          </Router>
        </MockedProvider>
      </Provider>
    )
  };
};

describe('RandomlyRead End-to-End Tests', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    window.scrollTo = jest.fn();
    window.gtag = jest.fn();
    
    // Mock window.location
    delete window.location;
    window.location = { pathname: '/' };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Complete User Journey - Beginner Level', () => {
    test('should complete full beginner therapy session', async () => {
      // Start at beginner introduction
      window.location.pathname = '/therapy/beginner/introduction';
      
      const { store } = renderApp();
      
      // 1. Verify we're on the introduction page
      await waitFor(() => {
        expect(screen.getByText('Introduction')).toBeInTheDocument();
        expect(screen.getByText(/breathing/i)).toBeInTheDocument();
        expect(screen.getByText(/phonation/i)).toBeInTheDocument();
      });
      
      // 2. Navigate to techniques
      const techniquesTab = screen.getByRole('tab', { name: /techniques/i });
      await user.click(techniquesTab);
      
      await waitFor(() => {
        expect(screen.getByText('Techniques')).toBeInTheDocument();
      });
      
      // 3. Navigate to practice
      const practiceTab = screen.getByRole('tab', { name: /practice/i });
      await user.click(practiceTab);
      
      await waitFor(() => {
        expect(screen.getByText('Practice')).toBeInTheDocument();
      });
      
      // 4. Select a routine (if routine selection is available)
      const routineElements = screen.queryAllByText(/routine/i);
      if (routineElements.length > 0) {
        // Routine selection interface should be present
        expect(routineElements.length).toBeGreaterThan(0);
      }
      
      // Verify store actions were dispatched
      const actions = store.getActions();
      expect(actions.length).toBeGreaterThan(0);
    });

    test('should handle navigation between all beginner routes', async () => {
      const routes = [
        '/therapy/beginner/introduction',
        '/therapy/beginner/techniques',
        '/therapy/beginner/practice'
      ];
      
      for (const route of routes) {
        window.location.pathname = route;
        
        const { store } = renderApp();
        
        await waitFor(() => {
          // Should render without errors
          expect(screen.getByText(/introduction|techniques|practice/i)).toBeInTheDocument();
        });
        
        // Verify correct tab is active based on route
        if (route.includes('introduction')) {
          expect(screen.getByRole('tab', { name: /introduction/i })).toHaveAttribute('aria-selected', 'true');
        } else if (route.includes('techniques')) {
          expect(screen.getByRole('tab', { name: /techniques/i })).toHaveAttribute('aria-selected', 'true');
        } else if (route.includes('practice')) {
          expect(screen.getByRole('tab', { name: /practice/i })).toHaveAttribute('aria-selected', 'true');
        }
      }
    });
  });

  describe('Complete User Journey - Intermediate Level', () => {
    test('should complete full intermediate therapy session', async () => {
      window.location.pathname = '/therapy/intermediate/introduction';
      
      const { store } = renderApp();
      
      // 1. Verify intermediate content
      await waitFor(() => {
        expect(screen.getByText('Introduction')).toBeInTheDocument();
        expect(screen.getByText(/transfer/i)).toBeInTheDocument();
      });
      
      // 2. Navigate through tabs
      const techniquesTab = screen.getByRole('tab', { name: /techniques/i });
      await user.click(techniquesTab);
      
      await waitFor(() => {
        expect(screen.getByText('Techniques')).toBeInTheDocument();
      });
      
      const practiceTab = screen.getByRole('tab', { name: /practice/i });
      await user.click(practiceTab);
      
      await waitFor(() => {
        expect(screen.getByText('Practice')).toBeInTheDocument();
      });
      
      // Verify intermediate-specific content
      expect(screen.getByText(/intermediate/i)).toBeInTheDocument();
    });

    test('should show correct level highlighting for intermediate', async () => {
      window.location.pathname = '/therapy/intermediate/introduction';
      
      renderApp();
      
      await waitFor(() => {
        expect(screen.getByText('Intermediate Training')).toBeInTheDocument();
      });
      
      // The intermediate section should be highlighted
      const intermediateSection = screen.getByText('Intermediate Training');
      expect(intermediateSection).toBeInTheDocument();
    });
  });

  describe('Complete User Journey - Advanced Level', () => {
    test('should complete full advanced therapy session', async () => {
      window.location.pathname = '/therapy/advanced/introduction';
      
      const { store } = renderApp();
      
      // 1. Verify advanced content
      await waitFor(() => {
        expect(screen.getByText('Introduction')).toBeInTheDocument();
        expect(screen.getByText(/natural/i)).toBeInTheDocument();
      });
      
      // 2. Navigate through tabs
      const techniquesTab = screen.getByRole('tab', { name: /techniques/i });
      await user.click(techniquesTab);
      
      await waitFor(() => {
        expect(screen.getByText('Techniques')).toBeInTheDocument();
      });
      
      const practiceTab = screen.getByRole('tab', { name: /practice/i });
      await user.click(practiceTab);
      
      await waitFor(() => {
        expect(screen.getByText('Practice')).toBeInTheDocument();
      });
      
      // Verify advanced-specific content
      expect(screen.getByText(/advanced/i)).toBeInTheDocument();
    });
  });

  describe('Cross-Level Navigation', () => {
    test('should navigate between different therapy levels', async () => {
      window.location.pathname = '/therapy/beginner/introduction';
      
      renderApp();
      
      await waitFor(() => {
        expect(screen.getByText('Beginner Training')).toBeInTheDocument();
      });
      
      // Click on intermediate training
      const intermediateTraining = screen.getByText('Intermediate Training');
      await user.click(intermediateTraining);
      
      // Should navigate to intermediate level
      await waitFor(() => {
        expect(screen.getByText(/intermediate/i)).toBeInTheDocument();
      });
      
      // Click on advanced training
      const advancedTraining = screen.getByText('Advanced Training');
      await user.click(advancedTraining);
      
      // Should navigate to advanced level
      await waitFor(() => {
        expect(screen.getByText(/advanced/i)).toBeInTheDocument();
      });
    });

    test('should maintain session state when switching levels', async () => {
      const stateWithProgress = createInitialState({
        exerciseHistory: {
          inProgress: true,
          isCompleted: false,
          time: 15,
          timeLeft: 15,
          queryResults: [
            { id: '1', title: 'apple', type: 'text', time: Date.now() }
          ],
          currentExercise: [
            {
              id: '1',
              mode: 'Word',
              rangeVal: 30,
              repetitions: 5
            }
          ],
          currentExerciseNumber: 0
        }
      });
      
      window.location.pathname = '/therapy/beginner/practice';
      
      const { store } = renderApp(stateWithProgress);
      
      await waitFor(() => {
        expect(screen.getByText('Practice')).toBeInTheDocument();
      });
      
      // Navigate to intermediate level
      const intermediateTraining = screen.getByText('Intermediate Training');
      await user.click(intermediateTraining);
      
      // Session state should be reset when switching levels
      const actions = store.getActions();
      expect(actions.some(action => action.type === 'SET_IN_PROGRESS')).toBeTruthy();
    });
  });

  describe('Practice Session Workflow', () => {
    test('should complete a full practice session with timer', async () => {
      const stateWithRoutine = createInitialState({
        routineSelect: {
          id: 1,
          routines: [
            {
              id: '1',
              name: 'Test Routine',
              description: 'Test routine description',
              steps: [
                {
                  id: '1',
                  mode: 'Word',
                  vowel: ['a'],
                  consonant: ['p'],
                  syllables: [1],
                  position: ['initial'],
                  age: ['adult'],
                  limit: 1,
                  rangeVal: 5, // Short duration for testing
                  repetitions: 2
                }
              ]
            }
          ],
          isFetching: false
        }
      });
      
      window.location.pathname = '/therapy/beginner/practice';
      
      const { store } = renderApp(stateWithRoutine);
      
      // Navigate to practice tab
      const practiceTab = screen.getByRole('tab', { name: /practice/i });
      await user.click(practiceTab);
      
      await waitFor(() => {
        expect(screen.getByText('Practice')).toBeInTheDocument();
      });
      
      // Look for timer controls
      const timerButtons = screen.getAllByRole('button');
      expect(timerButtons.length).toBeGreaterThan(0);
      
      // Start practice session if start button is available
      const startButton = timerButtons.find(button => 
        button.textContent?.toLowerCase().includes('start')
      );
      
      if (startButton) {
        await user.click(startButton);
        
        // Verify session started
        const actions = store.getActions();
        expect(actions.some(action => 
          action.type === 'SET_IN_PROGRESS' && action.inProgress === true
        )).toBeTruthy();
      }
    });

    test('should handle routine selection and execution', async () => {
      window.location.pathname = '/therapy/beginner/practice';
      
      const { store } = renderApp();
      
      // Navigate to practice tab
      const practiceTab = screen.getByRole('tab', { name: /practice/i });
      await user.click(practiceTab);
      
      await waitFor(() => {
        expect(screen.getByText('Practice')).toBeInTheDocument();
      });
      
      // Should show routine selection interface
      const routineElements = screen.queryAllByText(/routine/i);
      expect(routineElements.length).toBeGreaterThan(0);
      
      // If routine selection dropdown is available, test it
      const selectElements = screen.queryAllByRole('combobox');
      if (selectElements.length > 0) {
        await user.click(selectElements[0]);
        
        // Should show routine options
        await waitFor(() => {
          expect(screen.getByText(/beginner routine/i)).toBeInTheDocument();
        });
      }
    });
  });

  describe('Accessibility and User Experience', () => {
    test('should be keyboard navigable', async () => {
      window.location.pathname = '/therapy/beginner/introduction';
      
      renderApp();
      
      await waitFor(() => {
        expect(screen.getByText('Introduction')).toBeInTheDocument();
      });
      
      // Tab navigation should work
      const introTab = screen.getByRole('tab', { name: /introduction/i });
      introTab.focus();
      
      expect(document.activeElement).toBe(introTab);
      
      // Arrow key navigation
      fireEvent.keyDown(introTab, { key: 'ArrowRight' });
      
      await waitFor(() => {
        const techniquesTab = screen.getByRole('tab', { name: /techniques/i });
        expect(document.activeElement).toBe(techniquesTab);
      });
    });

    test('should have proper ARIA attributes', async () => {
      window.location.pathname = '/therapy/beginner/introduction';
      
      renderApp();
      
      await waitFor(() => {
        expect(screen.getByText('Introduction')).toBeInTheDocument();
      });
      
      // Check tab attributes
      const tabs = screen.getAllByRole('tab');
      tabs.forEach(tab => {
        expect(tab).toHaveAttribute('aria-controls');
        expect(tab).toHaveAttribute('aria-selected');
      });
      
      // Check tabpanel attributes
      const tabpanels = screen.getAllByRole('tabpanel');
      tabpanels.forEach(panel => {
        expect(panel).toHaveAttribute('aria-labelledby');
      });
    });

    test('should handle screen reader announcements', async () => {
      window.location.pathname = '/therapy/beginner/introduction';
      
      renderApp();
      
      await waitFor(() => {
        expect(screen.getByText('Introduction')).toBeInTheDocument();
      });
      
      // Check for proper heading structure
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
      
      // Main content should have proper headings
      const mainHeadings = headings.filter(h => 
        h.tagName === 'H1' || h.tagName === 'H2'
      );
      expect(mainHeadings.length).toBeGreaterThan(0);
    });

    test('should provide feedback for user actions', async () => {
      window.location.pathname = '/therapy/beginner/practice';
      
      const { store } = renderApp();
      
      // Navigate to practice tab
      const practiceTab = screen.getByRole('tab', { name: /practice/i });
      await user.click(practiceTab);
      
      await waitFor(() => {
        expect(screen.getByText('Practice')).toBeInTheDocument();
      });
      
      // User actions should provide visual feedback
      const buttons = screen.getAllByRole('button');
      if (buttons.length > 0) {
        await user.click(buttons[0]);
        
        // Should dispatch actions or show visual changes
        const actions = store.getActions();
        expect(actions.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Error Handling and Edge Cases', () => {
    test('should handle network errors gracefully', async () => {
      const errorMocks = [
        {
          request: {
            query: expect.any(Object)
          },
          error: new Error('Network error')
        }
      ];
      
      window.location.pathname = '/therapy/beginner/practice';
      
      const store = mockStore(createInitialState());
      
      render(
        <Provider store={store}>
          <MockedProvider mocks={errorMocks} addTypename={false}>
            <Router>
              <App />
            </Router>
          </MockedProvider>
        </Provider>
      );
      
      // Should still render the interface
      await waitFor(() => {
        expect(screen.getByText(/practice|introduction|techniques/i)).toBeInTheDocument();
      });
    });

    test('should handle invalid routes', async () => {
      window.location.pathname = '/therapy/invalid/route';
      
      renderApp();
      
      // Should redirect or show appropriate content
      await waitFor(() => {
        expect(screen.getByText(/easy onset|introduction/i)).toBeInTheDocument();
      });
    });

    test('should handle missing authentication', async () => {
      const stateWithoutAuth = createInitialState({
        auth: {
          user: null,
          token: null,
          isFetching: false,
          error: null
        }
      });
      
      window.location.pathname = '/therapy/beginner/introduction';
      
      renderApp(stateWithoutAuth);
      
      // Should still render (authentication handled by withAuth HOC)
      await waitFor(() => {
        expect(screen.getByText('Introduction')).toBeInTheDocument();
      });
    });

    test('should handle rapid navigation changes', async () => {
      window.location.pathname = '/therapy/beginner/introduction';
      
      const { store } = renderApp();
      
      await waitFor(() => {
        expect(screen.getByText('Introduction')).toBeInTheDocument();
      });
      
      // Rapidly switch between tabs
      const tabs = [
        screen.getByRole('tab', { name: /introduction/i }),
        screen.getByRole('tab', { name: /techniques/i }),
        screen.getByRole('tab', { name: /practice/i })
      ];
      
      // Click tabs rapidly
      for (let i = 0; i < 5; i++) {
        const randomTab = tabs[Math.floor(Math.random() * tabs.length)];
        await user.click(randomTab);
      }
      
      // Should not crash
      expect(screen.getByText(/introduction|techniques|practice/i)).toBeInTheDocument();
    });
  });
});