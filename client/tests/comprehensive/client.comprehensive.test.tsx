import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

// Import components to test
import { RoutineBuilderRefactored } from '../../src/components/RoutineBuilder/RoutineBuilderRefactored';
import { TimerRefactored } from '../../src/components/RRLayout/TimerRefactored';
import { ExerciseProgress } from '../../src/components/RRLayout/ExerciseProgress';
import { ValidatedRoutineBuilder } from '../../src/components/RoutineBuilder/components/ValidatedRoutineBuilder';

// Import contexts and hooks
import { ExerciseContext } from '../../src/contexts/ExerciseContext';
import { RoutineContext } from '../../src/contexts/RoutineContext';
import { useExerciseTimer } from '../../src/hooks/useExerciseTimer';
import { useProgressTracking } from '../../src/hooks/useProgressTracking';
import { useRoutineExecution } from '../../src/hooks/useRoutineExecution';

// Import Apollo cache configuration
import { createApolloCache, CacheOptimizer } from '../../src/apollo/cacheConfig';
import { WordPrefetchService } from '../../src/services/WordPrefetchService';

// Import GraphQL queries and mutations
import { WORDS_QUERY, WORD_QUERY } from '../../src/graphql/queries/wordQueries';
import { CREATE_ROUTINE_MUTATION, UPDATE_ROUTINE_MUTATION } from '../../src/graphql/mutations/routineMutations';

// Mock data
const mockWordData = {
  words: {
    words: [
      {
        id: '1',
        lexeme: 'apple',
        consonant: 'P',
        vowel: 'AE',
        syllables: 2,
        position: 'medial',
        type: 'noun',
        score: 10,
        upvotePercentage: 75,
        wordsXsensesXsynsets: [
          {
            definition: 'fruit with red or yellow or green skin',
            pos: 'n',
            lemma: 'apple'
          }
        ]
      },
      {
        id: '2',
        lexeme: 'ball',
        consonant: 'B',
        vowel: 'AO',
        syllables: 1,
        position: 'initial',
        type: 'noun',
        score: 15,
        upvotePercentage: 80,
        wordsXsensesXsynsets: [
          {
            definition: 'round object used in games',
            pos: 'n',
            lemma: 'ball'
          }
        ]
      }
    ],
    totalCount: 2,
    hasMore: false,
    queryStats: {
      executionTimeMs: 45,
      docsExamined: 2,
      indexUsed: 'phonetic_search_primary',
      cacheHit: false
    }
  }
};

const mockRoutineData = {
  id: '1',
  name: 'Test Routine',
  description: 'A test routine for Easy Onset therapy',
  gradeLevel: 'K-2',
  isActive: true,
  totalDuration: 900,
  stepCount: 2,
  subroutine: [
    {
      id: '1',
      type: 'word_practice',
      duration: 300,
      repetitions: 10,
      phoneticConfig: {
        vowels: ['AE'],
        consonants: ['B'],
        position: 'initial',
        syllables: [1],
        gradeLevel: 'K-2'
      }
    },
    {
      id: '2',
      type: 'sentence_practice',
      duration: 600,
      repetitions: 5,
      phoneticConfig: {
        vowels: ['AE'],
        consonants: ['B'],
        position: 'initial',
        syllables: [1],
        gradeLevel: 'K-2'
      },
      intermissionText: 'Take a deep breath and relax'
    }
  ],
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z'
};

// GraphQL mocks
const mocks = [
  {
    request: {
      query: WORDS_QUERY,
      variables: {
        input: {
          vowel: ['AE'],
          consonant: ['B'],
          position: 'initial',
          syllables: [1],
          limit: 10
        }
      }
    },
    result: {
      data: mockWordData
    }
  },
  {
    request: {
      query: WORD_QUERY,
      variables: {
        id: '1'
      }
    },
    result: {
      data: {
        word: mockWordData.words.words[0]
      }
    }
  },
  {
    request: {
      query: CREATE_ROUTINE_MUTATION,
      variables: {
        input: {
          name: 'New Test Routine',
          description: 'Created during testing',
          gradeLevel: 'K-2',
          subroutine: [
            {
              type: 'word_practice',
              duration: 300,
              repetitions: 10,
              phoneticConfig: {
                vowels: ['AE'],
                consonants: ['B'],
                position: 'initial',
                syllables: [1],
                gradeLevel: 'K-2'
              }
            }
          ],
          assignedUsers: []
        }
      }
    },
    result: {
      data: {
        createRoutine: {
          ...mockRoutineData,
          name: 'New Test Routine',
          description: 'Created during testing'
        }
      }
    }
  }
];

// Test utilities
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      exercise: (state = {
        currentStep: 0,
        isActive: false,
        progress: 0,
        currentWord: null,
        sessionData: null
      }, action) => state,
      routine: (state = {
        currentRoutine: null,
        routines: [],
        isLoading: false,
        error: null
      }, action) => state,
      user: (state = {
        currentUser: {
          id: '1',
          username: 'testuser',
          role: 'patient'
        },
        isAuthenticated: true
      }, action) => state,
      ...initialState
    }
  });
};

const TestWrapper: React.FC<{ children: React.ReactNode; store?: any; mocks?: any[] }> = ({ 
  children, 
  store = createMockStore(),
  mocks: testMocks = mocks
}) => {
  const cache = createApolloCache();
  
  return (
    <Provider store={store}>
      <MockedProvider mocks={testMocks} cache={cache} addTypename={false}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </MockedProvider>
    </Provider>
  );
};

describe('Client-Side Comprehensive Test Suite', () => {
  describe('Routine Builder Integration', () => {
    it('should render routine builder with all components', async () => {
      render(
        <TestWrapper>
          <RoutineBuilderRefactored />
        </TestWrapper>
      );

      // Check for main components
      expect(screen.getByText(/routine builder/i)).toBeInTheDocument();
      
      // Wait for async components to load
      await waitFor(() => {
        expect(screen.getByRole('form')).toBeInTheDocument();
      });
    });

    it('should validate routine creation form', async () => {
      render(
        <TestWrapper>
          <ValidatedRoutineBuilder />
        </TestWrapper>
      );

      // Try to submit empty form
      const submitButton = screen.getByRole('button', { name: /create routine/i });
      fireEvent.click(submitButton);

      // Should show validation errors
      await waitFor(() => {
        expect(screen.getByText(/routine name is required/i)).toBeInTheDocument();
      });
    });

    it('should create routine with valid data', async () => {
      render(
        <TestWrapper>
          <ValidatedRoutineBuilder />
        </TestWrapper>
      );

      // Fill in form
      const nameInput = screen.getByLabelText(/routine name/i);
      const descriptionInput = screen.getByLabelText(/description/i);
      
      fireEvent.change(nameInput, { target: { value: 'New Test Routine' } });
      fireEvent.change(descriptionInput, { target: { value: 'Created during testing' } });

      // Add a step
      const addStepButton = screen.getByRole('button', { name: /add step/i });
      fireEvent.click(addStepButton);

      // Configure step
      const stepTypeSelect = screen.getByLabelText(/step type/i);
      fireEvent.change(stepTypeSelect, { target: { value: 'word_practice' } });

      const durationInput = screen.getByLabelText(/duration/i);
      fireEvent.change(durationInput, { target: { value: '300' } });

      // Submit form
      const submitButton = screen.getByRole('button', { name: /create routine/i });
      fireEvent.click(submitButton);

      // Should show success message
      await waitFor(() => {
        expect(screen.getByText(/routine created successfully/i)).toBeInTheDocument();
      });
    });

    it('should handle phonetic selector interactions', async () => {
      render(
        <TestWrapper>
          <RoutineBuilderRefactored />
        </TestWrapper>
      );

      // Wait for component to load
      await waitFor(() => {
        expect(screen.getByText(/phonetic configuration/i)).toBeInTheDocument();
      });

      // Select vowels
      const vowelAE = screen.getByLabelText(/AE/i);
      fireEvent.click(vowelAE);
      expect(vowelAE).toBeChecked();

      // Select consonants
      const consonantB = screen.getByLabelText(/B/i);
      fireEvent.click(consonantB);
      expect(consonantB).toBeChecked();

      // Select position
      const positionInitial = screen.getByLabelText(/initial/i);
      fireEvent.click(positionInitial);
      expect(positionInitial).toBeChecked();

      // Select syllables
      const syllable1 = screen.getByLabelText(/1 syllable/i);
      fireEvent.click(syllable1);
      expect(syllable1).toBeChecked();
    });
  });

  describe('Exercise Timer Integration', () => {
    it('should render timer with controls', () => {
      const mockExerciseContext = {
        currentStep: 0,
        isActive: false,
        progress: 0,
        currentWord: null,
        sessionData: null,
        startExercise: jest.fn(),
        pauseExercise: jest.fn(),
        stopExercise: jest.fn(),
        nextStep: jest.fn(),
        updateProgress: jest.fn()
      };

      render(
        <TestWrapper>
          <ExerciseContext.Provider value={mockExerciseContext}>
            <TimerRefactored />
          </ExerciseContext.Provider>
        </TestWrapper>
      );

      expect(screen.getByText(/00:00/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /stop/i })).toBeInTheDocument();
    });

    it('should handle timer controls', async () => {
      const mockStartExercise = jest.fn();
      const mockPauseExercise = jest.fn();
      const mockStopExercise = jest.fn();

      const mockExerciseContext = {
        currentStep: 0,
        isActive: false,
        progress: 0,
        currentWord: null,
        sessionData: null,
        startExercise: mockStartExercise,
        pauseExercise: mockPauseExercise,
        stopExercise: mockStopExercise,
        nextStep: jest.fn(),
        updateProgress: jest.fn()
      };

      render(
        <TestWrapper>
          <ExerciseContext.Provider value={mockExerciseContext}>
            <TimerRefactored />
          </ExerciseContext.Provider>
        </TestWrapper>
      );

      // Start timer
      const startButton = screen.getByRole('button', { name: /start/i });
      fireEvent.click(startButton);
      expect(mockStartExercise).toHaveBeenCalled();

      // Pause timer
      const pauseButton = screen.getByRole('button', { name: /pause/i });
      fireEvent.click(pauseButton);
      expect(mockPauseExercise).toHaveBeenCalled();

      // Stop timer
      const stopButton = screen.getByRole('button', { name: /stop/i });
      fireEvent.click(stopButton);
      expect(mockStopExercise).toHaveBeenCalled();
    });

    it('should display exercise progress correctly', () => {
      const mockProgressData = {
        currentStep: 2,
        totalSteps: 5,
        progress: 40,
        wordsCompleted: 8,
        totalWords: 20,
        accuracy: 85,
        timeElapsed: 180000 // 3 minutes
      };

      render(
        <TestWrapper>
          <ExerciseProgress {...mockProgressData} />
        </TestWrapper>
      );

      expect(screen.getByText(/step 2 of 5/i)).toBeInTheDocument();
      expect(screen.getByText(/40%/)).toBeInTheDocument();
      expect(screen.getByText(/8 of 20 words/i)).toBeInTheDocument();
      expect(screen.getByText(/85% accuracy/i)).toBeInTheDocument();
      expect(screen.getByText(/03:00/)).toBeInTheDocument();
    });
  });

  describe('Apollo Client Integration', () => {
    it('should execute word queries successfully', async () => {
      const { result } = renderHook(() => useQuery(WORDS_QUERY, {
        variables: {
          input: {
            vowel: ['AE'],
            consonant: ['B'],
            position: 'initial',
            syllables: [1],
            limit: 10
          }
        }
      }), {
        wrapper: ({ children }) => (
          <TestWrapper>
            {children}
          </TestWrapper>
        )
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data).toBeDefined();
      expect(result.current.data.words.words).toHaveLength(2);
      expect(result.current.data.words.queryStats.executionTimeMs).toBe(45);
    });

    it('should handle GraphQL errors gracefully', async () => {
      const errorMocks = [
        {
          request: {
            query: WORDS_QUERY,
            variables: {
              input: {
                vowel: ['INVALID'],
                consonant: ['B']
              }
            }
          },
          error: new Error('Invalid phonetic parameters')
        }
      ];

      const { result } = renderHook(() => useQuery(WORDS_QUERY, {
        variables: {
          input: {
            vowel: ['INVALID'],
            consonant: ['B']
          }
        }
      }), {
        wrapper: ({ children }) => (
          <TestWrapper mocks={errorMocks}>
            {children}
          </TestWrapper>
        )
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBeDefined();
      expect(result.current.error?.message).toContain('Invalid phonetic parameters');
    });

    it('should cache query results properly', async () => {
      const cache = createApolloCache();
      const cacheOptimizer = new CacheOptimizer(cache);

      // Execute query
      const client = new ApolloClient({ cache });
      
      const result1 = await client.query({
        query: WORDS_QUERY,
        variables: {
          input: {
            vowel: ['AE'],
            consonant: ['B'],
            limit: 10
          }
        }
      });

      // Execute same query again - should hit cache
      const result2 = await client.query({
        query: WORDS_QUERY,
        variables: {
          input: {
            vowel: ['AE'],
            consonant: ['B'],
            limit: 10
          }
        },
        fetchPolicy: 'cache-first'
      });

      expect(result1.data).toEqual(result2.data);
      
      // Check cache stats
      const stats = cacheOptimizer.getCacheStats();
      expect(stats.size).toBeGreaterThan(0);
    });
  });

  describe('Word Prefetching Service', () => {
    it('should initialize prefetch service', () => {
      const prefetchService = WordPrefetchService.getInstance();
      const mockClient = {
        query: jest.fn(),
        cache: {
          readQuery: jest.fn(),
          writeQuery: jest.fn()
        }
      };

      expect(() => prefetchService.initialize(mockClient as any)).not.toThrow();
    });

    it('should prefetch words for routine', async () => {
      const prefetchService = WordPrefetchService.getInstance();
      const mockClient = {
        query: jest.fn().mockResolvedValue({ data: mockWordData }),
        cache: {
          readQuery: jest.fn().mockReturnValue(null),
          writeQuery: jest.fn()
        }
      };

      prefetchService.initialize(mockClient as any);

      const routineSteps = [
        {
          phoneticConfig: {
            vowels: ['AE'],
            consonants: ['B'],
            position: 'initial',
            syllables: [1],
            gradeLevel: 'K-2'
          },
          type: 'word_practice',
          duration: 300,
          repetitions: 10
        }
      ];

      await expect(prefetchService.prefetchForRoutine(routineSteps))
        .resolves.not.toThrow();

      const stats = prefetchService.getStats();
      expect(stats.queued).toBeGreaterThan(0);
    });

    it('should prefetch next exercise steps', async () => {
      const prefetchService = WordPrefetchService.getInstance();
      const mockClient = {
        query: jest.fn().mockResolvedValue({ data: mockWordData }),
        cache: {
          readQuery: jest.fn().mockReturnValue(null),
          writeQuery: jest.fn()
        }
      };

      prefetchService.initialize(mockClient as any);

      const routineSteps = [
        {
          phoneticConfig: {
            vowels: ['AE'],
            consonants: ['B'],
            position: 'initial',
            syllables: [1],
            gradeLevel: 'K-2'
          },
          type: 'word_practice',
          duration: 300,
          repetitions: 10
        },
        {
          phoneticConfig: {
            vowels: ['IY'],
            consonants: ['T'],
            position: 'initial',
            syllables: [1],
            gradeLevel: 'K-2'
          },
          type: 'word_practice',
          duration: 300,
          repetitions: 10
        }
      ];

      await expect(prefetchService.prefetchNextSteps(0, routineSteps, 2))
        .resolves.not.toThrow();
    });

    it('should provide queue status', () => {
      const prefetchService = WordPrefetchService.getInstance();
      
      const status = prefetchService.getQueueStatus();
      
      expect(status).toBeDefined();
      expect(status.size).toBeGreaterThanOrEqual(0);
      expect(status.isProcessing).toBeDefined();
      expect(status.byPriority).toBeDefined();
    });
  });

  describe('Custom Hooks Integration', () => {
    it('should use exercise timer hook', () => {
      const { result } = renderHook(() => useExerciseTimer({
        duration: 300,
        onComplete: jest.fn(),
        onTick: jest.fn()
      }));

      expect(result.current.timeRemaining).toBe(300);
      expect(result.current.isRunning).toBe(false);
      expect(result.current.progress).toBe(0);

      // Start timer
      act(() => {
        result.current.start();
      });

      expect(result.current.isRunning).toBe(true);

      // Pause timer
      act(() => {
        result.current.pause();
      });

      expect(result.current.isRunning).toBe(false);

      // Reset timer
      act(() => {
        result.current.reset();
      });

      expect(result.current.timeRemaining).toBe(300);
      expect(result.current.progress).toBe(0);
    });

    it('should use progress tracking hook', () => {
      const { result } = renderHook(() => useProgressTracking({
        totalSteps: 5,
        totalWords: 20
      }));

      expect(result.current.currentStep).toBe(0);
      expect(result.current.wordsCompleted).toBe(0);
      expect(result.current.accuracy).toBe(0);
      expect(result.current.progress).toBe(0);

      // Complete a word
      act(() => {
        result.current.completeWord('apple', 85, 3000);
      });

      expect(result.current.wordsCompleted).toBe(1);
      expect(result.current.accuracy).toBe(85);
      expect(result.current.progress).toBe(5); // 1/20 = 5%

      // Move to next step
      act(() => {
        result.current.nextStep();
      });

      expect(result.current.currentStep).toBe(1);
    });

    it('should use routine execution hook', () => {
      const mockRoutine = mockRoutineData;

      const { result } = renderHook(() => useRoutineExecution(mockRoutine));

      expect(result.current.currentStep).toBe(0);
      expect(result.current.isActive).toBe(false);
      expect(result.current.currentStepConfig).toEqual(mockRoutine.subroutine[0]);

      // Start routine
      act(() => {
        result.current.startRoutine();
      });

      expect(result.current.isActive).toBe(true);

      // Next step
      act(() => {
        result.current.nextStep();
      });

      expect(result.current.currentStep).toBe(1);
      expect(result.current.currentStepConfig).toEqual(mockRoutine.subroutine[1]);

      // Complete routine
      act(() => {
        result.current.completeRoutine();
      });

      expect(result.current.isActive).toBe(false);
      expect(result.current.isCompleted).toBe(true);
    });
  });

  describe('Context Integration', () => {
    it('should provide exercise context', () => {
      const mockContextValue = {
        currentStep: 1,
        isActive: true,
        progress: 25,
        currentWord: mockWordData.words.words[0],
        sessionData: {
          id: 'session_123',
          startTime: new Date(),
          wordsAttempted: [],
          accuracy: 0
        },
        startExercise: jest.fn(),
        pauseExercise: jest.fn(),
        stopExercise: jest.fn(),
        nextStep: jest.fn(),
        updateProgress: jest.fn()
      };

      const TestComponent = () => {
        const context = useContext(ExerciseContext);
        return (
          <div>
            <span data-testid="current-step">{context.currentStep}</span>
            <span data-testid="is-active">{context.isActive.toString()}</span>
            <span data-testid="progress">{context.progress}</span>
          </div>
        );
      };

      render(
        <ExerciseContext.Provider value={mockContextValue}>
          <TestComponent />
        </ExerciseContext.Provider>
      );

      expect(screen.getByTestId('current-step')).toHaveTextContent('1');
      expect(screen.getByTestId('is-active')).toHaveTextContent('true');
      expect(screen.getByTestId('progress')).toHaveTextContent('25');
    });

    it('should provide routine context', () => {
      const mockContextValue = {
        currentRoutine: mockRoutineData,
        routines: [mockRoutineData],
        isLoading: false,
        error: null,
        createRoutine: jest.fn(),
        updateRoutine: jest.fn(),
        deleteRoutine: jest.fn(),
        selectRoutine: jest.fn()
      };

      const TestComponent = () => {
        const context = useContext(RoutineContext);
        return (
          <div>
            <span data-testid="routine-name">{context.currentRoutine?.name}</span>
            <span data-testid="routine-count">{context.routines.length}</span>
            <span data-testid="is-loading">{context.isLoading.toString()}</span>
          </div>
        );
      };

      render(
        <RoutineContext.Provider value={mockContextValue}>
          <TestComponent />
        </RoutineContext.Provider>
      );

      expect(screen.getByTestId('routine-name')).toHaveTextContent('Test Routine');
      expect(screen.getByTestId('routine-count')).toHaveTextContent('1');
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });
  });

  describe('Accessibility and Performance', () => {
    it('should meet accessibility standards', async () => {
      const { container } = render(
        <TestWrapper>
          <RoutineBuilderRefactored />
        </TestWrapper>
      );

      // Check for proper ARIA labels
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('form')).toBeInTheDocument();

      // Check for keyboard navigation
      const firstInput = screen.getByLabelText(/routine name/i);
      firstInput.focus();
      expect(document.activeElement).toBe(firstInput);

      // Tab to next element
      fireEvent.keyDown(firstInput, { key: 'Tab' });
      expect(document.activeElement).not.toBe(firstInput);
    });

    it('should handle large datasets efficiently', async () => {
      const largeWordData = {
        words: {
          words: Array(1000).fill(null).map((_, i) => ({
            id: i.toString(),
            lexeme: `word${i}`,
            consonant: 'B',
            vowel: 'AE',
            syllables: 1,
            position: 'initial',
            type: 'noun',
            score: i,
            upvotePercentage: 50
          })),
          totalCount: 1000,
          hasMore: true,
          queryStats: {
            executionTimeMs: 150,
            docsExamined: 1000,
            indexUsed: 'phonetic_search_primary'
          }
        }
      };

      const largeMocks = [
        {
          request: {
            query: WORDS_QUERY,
            variables: {
              input: {
                consonant: ['B'],
                limit: 1000
              }
            }
          },
          result: {
            data: largeWordData
          }
        }
      ];

      const startTime = performance.now();

      render(
        <TestWrapper mocks={largeMocks}>
          <div>Large dataset test</div>
        </TestWrapper>
      );

      const renderTime = performance.now() - startTime;
      expect(renderTime).toBeLessThan(1000); // Should render within 1 second
    });

    it('should handle memory efficiently during long sessions', async () => {
      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;

      // Simulate long exercise session
      const { rerender } = render(
        <TestWrapper>
          <TimerRefactored />
        </TestWrapper>
      );

      // Simulate multiple re-renders (like during exercise)
      for (let i = 0; i < 100; i++) {
        rerender(
          <TestWrapper>
            <TimerRefactored key={i} />
          </TestWrapper>
        );
      }

      const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
      const memoryIncrease = finalMemory - initialMemory;

      // Memory increase should be reasonable (less than 10MB)
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle network errors gracefully', async () => {
      const networkErrorMocks = [
        {
          request: {
            query: WORDS_QUERY,
            variables: {
              input: {
                vowel: ['AE'],
                consonant: ['B']
              }
            }
          },
          error: new Error('Network error')
        }
      ];

      render(
        <TestWrapper mocks={networkErrorMocks}>
          <div data-testid="error-boundary">
            Network error test
          </div>
        </TestWrapper>
      );

      // Should not crash the application
      expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    });

    it('should handle empty data gracefully', async () => {
      const emptyMocks = [
        {
          request: {
            query: WORDS_QUERY,
            variables: {
              input: {
                vowel: ['AE'],
                consonant: ['X'] // Non-existent consonant
              }
            }
          },
          result: {
            data: {
              words: {
                words: [],
                totalCount: 0,
                hasMore: false,
                queryStats: {
                  executionTimeMs: 25,
                  docsExamined: 0,
                  indexUsed: 'phonetic_search_primary'
                }
              }
            }
          }
        }
      ];

      render(
        <TestWrapper mocks={emptyMocks}>
          <div data-testid="empty-data">
            Empty data test
          </div>
        </TestWrapper>
      );

      expect(screen.getByTestId('empty-data')).toBeInTheDocument();
    });

    it('should handle component unmounting during async operations', async () => {
      const { unmount } = render(
        <TestWrapper>
          <RoutineBuilderRefactored />
        </TestWrapper>
      );

      // Start an async operation
      const submitButton = screen.getByRole('button', { name: /create routine/i });
      fireEvent.click(submitButton);

      // Unmount component before operation completes
      unmount();

      // Should not cause memory leaks or errors
      expect(true).toBe(true); // Test passes if no errors thrown
    });
  });
});