import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { gql } from '@apollo/client';

// Import components
import Home from '../components/RandomlyRead/Home';
import WordCard from '../components/RRLayout/WordCard';
import Timer from '../components/RRLayout/Timer';
import RoutineSelect from '../components/RRLayout/RoutineSelect';

// Mock store setup
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Mock GraphQL queries
const WORDS_QUERY = gql`
  query GetWords($vowel: [String], $consonant: [String], $syllables: [Int], $limit: Int, $position: [String], $age: [String]) {
    words(vowel: $vowel, consonant: $consonant, syllables: $syllables, limit: $limit, position: $position, age: $age) {
      id
      wordid
      lexeme
      score
      votes {
        user
        vote
      }
    }
  }
`;

const SENTENCES_QUERY = gql`
  query GetSentences($vowel: [String], $consonant: [String], $syllables: [Int], $limit: Int, $position: [String], $age: [String]) {
    sentences(vowel: $vowel, consonant: $consonant, syllables: $syllables, limit: $limit, position: $position, age: $age) {
      words {
        id
        wordid
        lexeme
        score
        votes {
          user
          vote
        }
      }
    }
  }
`;

const mockWordData = {
  words: {
    id: '1',
    wordid: 'word1',
    lexeme: 'apple',
    score: 5,
    votes: []
  }
};

const mockSentenceData = {
  sentences: {
    words: [
      {
        id: '1',
        wordid: 'word1',
        lexeme: 'The',
        score: 5,
        votes: []
      },
      {
        id: '2',
        wordid: 'word2',
        lexeme: 'apple',
        score: 4,
        votes: []
      },
      {
        id: '3',
        wordid: 'word3',
        lexeme: 'is',
        score: 3,
        votes: []
      },
      {
        id: '4',
        wordid: 'word4',
        lexeme: 'red',
        score: 2,
        votes: []
      }
    ]
  }
};

const mocks = [
  {
    request: {
      query: WORDS_QUERY,
      variables: {
        vowel: ['a'],
        consonant: ['p'],
        syllables: [2],
        limit: 1,
        position: ['initial'],
        age: ['adult']
      }
    },
    result: {
      data: mockWordData
    }
  },
  {
    request: {
      query: SENTENCES_QUERY,
      variables: {
        vowel: ['a'],
        consonant: ['p'],
        syllables: [2],
        limit: 1,
        position: ['initial'],
        age: ['adult']
      }
    },
    result: {
      data: mockSentenceData
    }
  }
];

const initialState = {
  auth: {
    user: {
      id: 'test-user',
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User'
    },
    token: 'test-token'
  },
  routineSelect: {
    id: 1,
    routines: [
      {
        id: '1',
        name: 'Test Routine',
        description: 'A test routine',
        steps: [
          {
            id: '1',
            mode: 'Word',
            vowel: ['a'],
            consonant: ['p'],
            syllables: [2],
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
    timeLeft: 30,
    queryResults: [],
    currentExercise: [
      {
        id: '1',
        mode: 'Word',
        vowel: ['a'],
        consonant: ['p'],
        syllables: [2],
        position: ['initial'],
        age: ['adult'],
        limit: 1,
        rangeVal: 30,
        repetitions: 5
      }
    ],
    currentExerciseNumber: 0
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
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router>
          {component}
        </Router>
      </MockedProvider>
    </Provider>
  );
};

describe('RandomlyRead Practice Functionality', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    window.scrollTo = jest.fn();
    // Mock timers
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  describe('Practice Tab Functionality', () => {
    const mockProps = {
      pageContext: 'beginner',
      routineSelectId: 1,
      inProgress: false,
      isCompleted: false,
      currentExercise: initialState.exerciseHistory.currentExercise,
      currentExerciseNumber: 0,
      TimerContainer: Timer,
      RoutineSelectContainer: RoutineSelect,
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
      updateId: jest.fn(),
      addQueryResult: jest.fn()
    };

    test('should show practice interface when practice tab is selected', async () => {
      renderWithProviders(<Home {...mockProps} />);
      
      // Click on Practice tab
      const practiceTab = screen.getByRole('tab', { name: /practice/i });
      fireEvent.click(practiceTab);
      
      await waitFor(() => {
        expect(screen.getByText(/routine/i)).toBeInTheDocument();
      });
    });

    test('should display routine selection when no routine is selected', async () => {
      const propsWithoutRoutine = {
        ...mockProps,
        routineSelectId: 0
      };
      
      renderWithProviders(<Home {...propsWithoutRoutine} />);
      
      // Click on Practice tab
      const practiceTab = screen.getByRole('tab', { name: /practice/i });
      fireEvent.click(practiceTab);
      
      await waitFor(() => {
        // Should show routine selection interface
        expect(screen.getByText(/select/i)).toBeInTheDocument();
      });
    });

    test('should show practice content when routine is selected', async () => {
      const storeWithRoutine = mockStore({
        ...initialState,
        routineSelect: {
          ...initialState.routineSelect,
          id: 1
        }
      });
      
      renderWithProviders(<Home {...mockProps} />, storeWithRoutine);
      
      // Click on Practice tab
      const practiceTab = screen.getByRole('tab', { name: /practice/i });
      fireEvent.click(practiceTab);
      
      await waitFor(() => {
        // Should show practice interface elements
        expect(screen.getByText(/routine/i)).toBeInTheDocument();
      });
    });
  });

  describe('WordCard Component', () => {
    const wordCardProps = {
      mode: 'Word',
      vowel: ['a'],
      consonant: ['p'],
      syllables: [2],
      position: ['initial'],
      age: ['adult'],
      limit: 1,
      addQueryResult: jest.fn(),
      setModalOpen: jest.fn()
    };

    test('should render WordCard component', () => {
      renderWithProviders(<WordCard {...wordCardProps} />);
      
      // Should render without crashing
      expect(screen.getByTestId('word-card')).toBeInTheDocument();
    });

    test('should fetch and display words', async () => {
      renderWithProviders(<WordCard {...wordCardProps} />);
      
      await waitFor(() => {
        expect(screen.getByText('apple')).toBeInTheDocument();
      });
    });

    test('should handle sentence mode', async () => {
      const sentenceProps = {
        ...wordCardProps,
        mode: 'Sentence'
      };
      
      renderWithProviders(<WordCard {...sentenceProps} />);
      
      await waitFor(() => {
        expect(screen.getByText(/the apple is red/i)).toBeInTheDocument();
      });
    });

    test('should handle intermission mode', () => {
      const intermissionProps = {
        ...wordCardProps,
        mode: 'Intermission'
      };
      
      renderWithProviders(<WordCard {...intermissionProps} />);
      
      expect(screen.getByText(/intermission/i)).toBeInTheDocument();
    });

    test('should handle loading state', () => {
      const loadingProps = {
        ...wordCardProps,
        vowel: null,
        consonant: null
      };
      
      const { container } = renderWithProviders(<WordCard {...loadingProps} />);
      
      // Should return null or loading state
      expect(container.firstChild).toBeNull();
    });

    test('should handle error state', async () => {
      const errorMocks = [
        {
          request: {
            query: WORDS_QUERY,
            variables: {
              vowel: ['a'],
              consonant: ['p'],
              syllables: [2],
              limit: 1,
              position: ['initial'],
              age: ['adult']
            }
          },
          error: new Error('Network error')
        }
      ];
      
      const { rerender } = render(
        <Provider store={store}>
          <MockedProvider mocks={errorMocks} addTypename={false}>
            <Router>
              <WordCard {...wordCardProps} />
            </Router>
          </MockedProvider>
        </Provider>
      );
      
      await waitFor(() => {
        expect(screen.getByText(/no result found/i)).toBeInTheDocument();
      });
    });
  });

  describe('Timer Component', () => {
    const timerProps = {
      inProgress: false,
      isCompleted: false,
      time: 0,
      timeLeft: 30,
      currentExercise: initialState.exerciseHistory.currentExercise,
      currentExerciseNumber: 0,
      startTimer: jest.fn(),
      stopTimer: jest.fn(),
      resetTimer: jest.fn(),
      updateTime: jest.fn(),
      updateTimeLeft: jest.fn(),
      setInProgress: jest.fn(),
      RoutineSelectContainer: () => <div>Routine Select</div>
    };

    test('should render Timer component', () => {
      renderWithProviders(<Timer {...timerProps} />);
      
      expect(screen.getByText(/30/)).toBeInTheDocument();
    });

    test('should start timer when start button is clicked', async () => {
      const mockStartTimer = jest.fn();
      const propsWithMock = {
        ...timerProps,
        startTimer: mockStartTimer
      };
      
      renderWithProviders(<Timer {...propsWithMock} />);
      
      const startButton = screen.getByRole('button', { name: /start/i });
      fireEvent.click(startButton);
      
      expect(mockStartTimer).toHaveBeenCalled();
    });

    test('should stop timer when stop button is clicked', async () => {
      const mockStopTimer = jest.fn();
      const propsWithMock = {
        ...timerProps,
        inProgress: true,
        stopTimer: mockStopTimer
      };
      
      renderWithProviders(<Timer {...propsWithMock} />);
      
      const stopButton = screen.getByRole('button', { name: /stop/i });
      fireEvent.click(stopButton);
      
      expect(mockStopTimer).toHaveBeenCalled();
    });

    test('should reset timer when reset button is clicked', async () => {
      const mockResetTimer = jest.fn();
      const propsWithMock = {
        ...timerProps,
        resetTimer: mockResetTimer
      };
      
      renderWithProviders(<Timer {...propsWithMock} />);
      
      const resetButton = screen.getByRole('button', { name: /reset/i });
      fireEvent.click(resetButton);
      
      expect(mockResetTimer).toHaveBeenCalled();
    });

    test('should update time display during countdown', async () => {
      const propsWithProgress = {
        ...timerProps,
        inProgress: true,
        timeLeft: 25
      };
      
      renderWithProviders(<Timer {...propsWithProgress} />);
      
      expect(screen.getByText(/25/)).toBeInTheDocument();
    });

    test('should handle timer completion', async () => {
      const mockSetInProgress = jest.fn();
      const propsWithCompletion = {
        ...timerProps,
        isCompleted: true,
        timeLeft: 0,
        setInProgress: mockSetInProgress
      };
      
      renderWithProviders(<Timer {...propsWithCompletion} />);
      
      expect(screen.getByText(/0/)).toBeInTheDocument();
    });
  });

  describe('Routine Selection', () => {
    const routineSelectProps = {
      routines: initialState.routineSelect.routines,
      selectedRoutineId: 0,
      updateId: jest.fn(),
      fetchAssignedRoutines: jest.fn()
    };

    test('should render RoutineSelect component', () => {
      renderWithProviders(<RoutineSelect {...routineSelectProps} />);
      
      expect(screen.getByText(/routine/i)).toBeInTheDocument();
    });

    test('should display available routines', () => {
      renderWithProviders(<RoutineSelect {...routineSelectProps} />);
      
      expect(screen.getByText('Test Routine')).toBeInTheDocument();
    });

    test('should handle routine selection', async () => {
      const mockUpdateId = jest.fn();
      const propsWithMock = {
        ...routineSelectProps,
        updateId: mockUpdateId
      };
      
      renderWithProviders(<RoutineSelect {...propsWithMock} />);
      
      const routineOption = screen.getByText('Test Routine');
      fireEvent.click(routineOption);
      
      expect(mockUpdateId).toHaveBeenCalled();
    });

    test('should show routine description', () => {
      renderWithProviders(<RoutineSelect {...routineSelectProps} />);
      
      expect(screen.getByText('A test routine')).toBeInTheDocument();
    });
  });

  describe('Practice Session Flow', () => {
    test('should complete full practice session flow', async () => {
      const mockProps = {
        pageContext: 'beginner',
        routineSelectId: 1,
        inProgress: false,
        isCompleted: false,
        currentExercise: initialState.exerciseHistory.currentExercise,
        currentExerciseNumber: 0,
        TimerContainer: Timer,
        RoutineSelectContainer: RoutineSelect,
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
        updateId: jest.fn(),
        addQueryResult: jest.fn()
      };
      
      renderWithProviders(<Home {...mockProps} />);
      
      // 1. Navigate to Practice tab
      const practiceTab = screen.getByRole('tab', { name: /practice/i });
      fireEvent.click(practiceTab);
      
      await waitFor(() => {
        expect(screen.getByText(/routine/i)).toBeInTheDocument();
      });
      
      // 2. Start practice session
      const startButton = screen.getByRole('button', { name: /start/i });
      fireEvent.click(startButton);
      
      expect(mockProps.setInProgress).toHaveBeenCalled();
      
      // 3. Verify word/sentence display
      await waitFor(() => {
        expect(screen.getByText('apple')).toBeInTheDocument();
      });
      
      // 4. Complete session
      const stopButton = screen.getByRole('button', { name: /stop/i });
      fireEvent.click(stopButton);
      
      expect(mockProps.setInProgress).toHaveBeenCalledWith(false);
    });

    test('should handle session interruption and resume', async () => {
      const mockProps = {
        pageContext: 'beginner',
        routineSelectId: 1,
        inProgress: true,
        isCompleted: false,
        currentExercise: initialState.exerciseHistory.currentExercise,
        TimerContainer: Timer,
        RoutineSelectContainer: RoutineSelect,
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
      
      renderWithProviders(<Home {...mockProps} />);
      
      // Navigate to Practice tab
      const practiceTab = screen.getByRole('tab', { name: /practice/i });
      fireEvent.click(practiceTab);
      
      // Should show pause/resume controls
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /pause|stop/i })).toBeInTheDocument();
      });
      
      // Pause session
      const pauseButton = screen.getByRole('button', { name: /pause|stop/i });
      fireEvent.click(pauseButton);
      
      expect(mockProps.setExercisePause).toHaveBeenCalled();
    });
  });

  describe('Progress Tracking', () => {
    test('should track and display session progress', async () => {
      const storeWithProgress = mockStore({
        ...initialState,
        exerciseHistory: {
          ...initialState.exerciseHistory,
          queryResults: [
            {
              id: '1',
              title: 'apple',
              type: 'text',
              time: Date.now()
            }
          ]
        }
      });
      
      const mockProps = {
        pageContext: 'beginner',
        routineSelectId: 1,
        TimerContainer: Timer,
        RoutineSelectContainer: RoutineSelect,
        ExerciseIntroduction: () => <div>Exercise Introduction</div>,
        ExerciseTechniques: () => <div>Exercise Techniques</div>,
        ApolloClient: {}
      };
      
      renderWithProviders(<Home {...mockProps} />, storeWithProgress);
      
      // Navigate to Practice tab
      const practiceTab = screen.getByRole('tab', { name: /practice/i });
      fireEvent.click(practiceTab);
      
      // Should show progress indicators
      await waitFor(() => {
        expect(screen.getByText(/progress/i)).toBeInTheDocument();
      });
    });

    test('should save practice results', async () => {
      const mockAddQueryResult = jest.fn();
      const wordCardProps = {
        mode: 'Word',
        vowel: ['a'],
        consonant: ['p'],
        syllables: [2],
        position: ['initial'],
        age: ['adult'],
        limit: 1,
        addQueryResult: mockAddQueryResult,
        setModalOpen: jest.fn()
      };
      
      renderWithProviders(<WordCard {...wordCardProps} />);
      
      await waitFor(() => {
        expect(mockAddQueryResult).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'apple',
            type: 'text'
          })
        );
      });
    });
  });
});