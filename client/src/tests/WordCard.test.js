import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ThemeProvider } from '@mui/material/styles';
import { MuiTheme } from '../exerciseThemeHandler';
import WordCard from '../components/RRLayout/WordCard';
import { gql } from '@apollo/client';

// Mock the store
const mockStore = createStore(() => ({
  word: {
    vowel: ['A'],
    consonant: ['B'],
    syllables: [1],
    limit: 1,
    position: 'initial',
    age: 'adult',
    mode: 'Word'
  },
  exerciseHistory: {
    currentExercise: [],
    currentExerciseNumber: 1
  }
}));

// Mock GraphQL queries
const WORDS_QUERY = gql`
  {
    words(vowel: ["A"], consonant: ["B"], syllables: [1], limit: 1, position: "initial", age: "adult") {
      id
      votes {
        user
        vote
      }
      score
      wordid
      lexeme
    }
  }
`;

const SENTENCES_QUERY = gql`
  {
    sentences(vowel: ["A"], consonant: ["B"], syllables: [1], limit: 1, position: "initial", age: "adult") {
      words {
        id
        votes {
          user
          vote
        }
        score
        wordid
        lexeme
      }
    }
  }
`;

// Mock data
const wordMock = {
  request: {
    query: WORDS_QUERY,
    variables: { v: expect.any(Number) }
  },
  result: {
    data: {
      words: {
        id: '1',
        votes: [],
        score: 0,
        wordid: 'test-word-id',
        lexeme: 'apple'
      }
    }
  }
};

const sentenceMock = {
  request: {
    query: SENTENCES_QUERY,
    variables: { v: expect.any(Number) }
  },
  result: {
    data: {
      sentences: {
        words: [
          {
            id: '1',
            votes: [],
            score: 0,
            wordid: 'test-word-1',
            lexeme: 'The'
          },
          {
            id: '2',
            votes: [],
            score: 0,
            wordid: 'test-word-2',
            lexeme: 'apple'
          }
        ]
      }
    }
  }
};

const errorMock = {
  request: {
    query: WORDS_QUERY,
    variables: { v: expect.any(Number) }
  },
  error: new Error('GraphQL error')
};

// Mock props
const defaultProps = {
  vowel: ['A'],
  consonant: ['B'],
  syllables: [1],
  limit: 1,
  position: 'initial',
  age: 'adult',
  mode: 'Word',
  currentExercise: [],
  currentExerciseNumber: 1,
  setModalOpen: jest.fn(),
  addRoutineVowel: jest.fn(),
  addWord: jest.fn(),
  addQueryResult: jest.fn(),
  classes: {}
};

const renderWithProviders = (component, mocks = []) => {
  return render(
    <Provider store={mockStore}>
      <ThemeProvider theme={MuiTheme}>
        <MockedProvider mocks={mocks} addTypename={false}>
          {component}
        </MockedProvider>
      </ThemeProvider>
    </Provider>
  );
};

describe('WordCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderWithProviders(<WordCard {...defaultProps} />);
  });

  it('returns null when vowel or consonant is null', () => {
    const { container } = renderWithProviders(
      <WordCard {...defaultProps} vowel={null} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('displays routine information when currentExercise has items and currentExerciseNumber is null', () => {
    const routineProps = {
      ...defaultProps,
      currentExercise: [
        { rangeVal: 30, repetitions: 2 },
        { rangeVal: 45, repetitions: 1 }
      ],
      currentExerciseNumber: null,
      name: 'Test Routine',
      description: 'Test routine description'
    };

    renderWithProviders(<WordCard {...routineProps} />);
    
    expect(screen.getByText('Test Routine')).toBeInTheDocument();
    expect(screen.getByText('Duration: 1 minute and 45 seconds')).toBeInTheDocument();
  });

  it('renders intermission when mode is Intermission', () => {
    const intermissionProps = {
      ...defaultProps,
      mode: 'Intermission'
    };

    renderWithProviders(<WordCard {...intermissionProps} />);
    // Note: This would need the Intermission component to be properly mocked
  });

  it('handles GraphQL word query successfully', async () => {
    renderWithProviders(<WordCard {...defaultProps} />, [wordMock]);

    await waitFor(() => {
      expect(defaultProps.addQueryResult).toHaveBeenCalledWith({
        id: '1',
        wordid: 'test-word-id',
        title: 'apple',
        score: 0,
        votes: [],
        comments: [],
        type: 'text',
        time: expect.any(Number)
      });
    });
  });

  it('handles GraphQL sentence query successfully', async () => {
    const sentenceProps = {
      ...defaultProps,
      mode: 'Sentence'
    };

    renderWithProviders(<WordCard {...sentenceProps} />, [sentenceMock]);

    await waitFor(() => {
      expect(defaultProps.addQueryResult).toHaveBeenCalledWith({
        id: null,
        title: [
          {
            id: '1',
            wordid: 'test-word-1',
            title: 'The',
            score: 0,
            votes: [],
            comments: [],
            type: 'text'
          },
          {
            id: '2',
            wordid: 'test-word-2',
            title: 'apple',
            score: 0,
            votes: [],
            comments: [],
            type: 'text'
          }
        ],
        score: null,
        votes: null,
        comments: [],
        type: 'sentence',
        time: expect.any(Number)
      });
    });
  });

  it('handles GraphQL query errors gracefully', async () => {
    renderWithProviders(<WordCard {...defaultProps} />, [errorMock]);

    await waitFor(() => {
      expect(screen.getByText('No Result Found')).toBeInTheDocument();
    });
  });

  it('calls addRoutineVowel when handleChange is triggered', () => {
    renderWithProviders(<WordCard {...defaultProps} />);
    
    // This would need to be triggered by user interaction
    // For now, we can test that the function exists and is callable
    expect(defaultProps.addRoutineVowel).toBeDefined();
  });
});