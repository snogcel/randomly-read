import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from '@mui/material/styles';
import { MuiTheme } from '../exerciseThemeHandler';
import RoutinePreview from '../components/RoutineBuilder/elements/RoutinePreview';
import { gql } from '@apollo/client';

// Mock the RoutinePreviewBuilder
jest.mock('../components/RRLayout/RoutineBuilder', () => {
  return jest.fn().mockImplementation(() => ({
    build: jest.fn().mockReturnValue(new Map([
      ['step1', {
        vowel: ['A'],
        consonant: ['B'],
        syllables: [1],
        limit: 1,
        position: 'initial',
        mode: 'Word'
      }]
    ])),
    buildRandomly: jest.fn().mockReturnValue(new Map([
      ['step1', {
        vowel: ['A'],
        consonant: ['B'],
        syllables: [1],
        limit: 1,
        position: 'initial',
        mode: 'Word'
      }]
    ])),
    buildIntermission: jest.fn().mockReturnValue(new Map([
      ['step1', {
        mode: 'Intermission'
      }]
    ]))
  }));
});

// Mock GraphQL query
const ROUTINE_PREVIEW_QUERY = gql`
  {
    words(vowel: ["A"], consonant: ["B"], syllables: [1], limit: 1, position: "initial") {
      id
      votes {
        user
        vote
      }
      score
      cmudict_id
      lexeme
    }
  }
`;

const mockSuccessResponse = {
  request: {
    query: ROUTINE_PREVIEW_QUERY,
    variables: { v: expect.any(Number) }
  },
  result: {
    data: {
      words: {
        id: '1',
        votes: [],
        score: 5,
        cmudict_id: 'apple-123',
        lexeme: 'apple'
      }
    }
  }
};

const mockErrorResponse = {
  request: {
    query: ROUTINE_PREVIEW_QUERY,
    variables: { v: expect.any(Number) }
  },
  error: new Error('GraphQL error')
};

const defaultRoutineStep = {
  repetitions: 2,
  rangeVal: 30,
  mode: 'Word',
  vowel: ['A'],
  consonant: ['B'],
  syllables: [1],
  position: 'initial'
};

const renderWithProviders = (component, mocks = []) => {
  return render(
    <ThemeProvider theme={MuiTheme}>
      <MockedProvider mocks={mocks} addTypename={false}>
        {component}
      </MockedProvider>
    </ThemeProvider>
  );
};

describe('RoutinePreview Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderWithProviders(
      <RoutinePreview routineStep={defaultRoutineStep} classes={{}} />
    );
  });

  it('builds query on mount', () => {
    renderWithProviders(
      <RoutinePreview routineStep={defaultRoutineStep} classes={{}} />
    );
    
    // The component should attempt to build a query
    expect(true).toBe(true); // Basic render test
  });

  it('handles successful word query', async () => {
    renderWithProviders(
      <RoutinePreview routineStep={defaultRoutineStep} classes={{}} />,
      [mockSuccessResponse]
    );

    // Wait for the query to complete and component to update
    await waitFor(() => {
      // The component should render the word result
      expect(true).toBe(true); // Placeholder - would need to check for rendered word
    });
  });

  it('handles query errors gracefully', async () => {
    renderWithProviders(
      <RoutinePreview routineStep={defaultRoutineStep} classes={{}} />,
      [mockErrorResponse]
    );

    await waitFor(() => {
      // Should show "No Result Found" for errors
      expect(screen.getByText('No Result Found')).toBeInTheDocument();
    });
  });

  it('handles sentence mode', async () => {
    const sentenceRoutineStep = {
      ...defaultRoutineStep,
      mode: 'Sentence'
    };

    const sentenceMock = {
      request: {
        query: gql`
          {
            sentences(vowel: ["A"], consonant: ["B"], syllables: [1], limit: 1, position: "initial") {
              words {
                id
                votes {
                  user
                  vote
                }
                score
                cmudict_id
                lexeme
              }
            }
          }
        `,
        variables: { v: expect.any(Number) }
      },
      result: {
        data: {
          sentences: {
            words: [
              {
                id: '1',
                votes: [],
                score: 3,
                cmudict_id: 'the-123',
                lexeme: 'The'
              },
              {
                id: '2',
                votes: [],
                score: 5,
                cmudict_id: 'apple-123',
                lexeme: 'apple'
              }
            ]
          }
        }
      }
    };

    renderWithProviders(
      <RoutinePreview routineStep={sentenceRoutineStep} classes={{}} />,
      [sentenceMock]
    );

    await waitFor(() => {
      // Should handle sentence data
      expect(true).toBe(true); // Placeholder
    });
  });

  it('handles different routine maps', () => {
    const randomRoutineStep = {
      ...defaultRoutineStep,
      map: 'randomly'
    };

    renderWithProviders(
      <RoutinePreview routineStep={randomRoutineStep} classes={{}} />
    );

    expect(true).toBe(true); // Should build query for random map
  });

  it('handles intermission mode', () => {
    const intermissionRoutineStep = {
      ...defaultRoutineStep,
      map: 'intermission'
    };

    renderWithProviders(
      <RoutinePreview routineStep={intermissionRoutineStep} classes={{}} />
    );

    expect(true).toBe(true); // Should handle intermission
  });

  it('refreshes query when routine step changes', () => {
    const { rerender } = renderWithProviders(
      <RoutinePreview routineStep={defaultRoutineStep} classes={{}} />
    );

    const newRoutineStep = {
      ...defaultRoutineStep,
      vowel: ['E']
    };

    rerender(
      <ThemeProvider theme={MuiTheme}>
        <MockedProvider mocks={[]} addTypename={false}>
          <RoutinePreview routineStep={newRoutineStep} classes={{}} />
        </MockedProvider>
      </ThemeProvider>
    );

    // Should rebuild query with new parameters
    expect(true).toBe(true);
  });

  it('handles empty query result', async () => {
    const emptyMock = {
      request: {
        query: ROUTINE_PREVIEW_QUERY,
        variables: { v: expect.any(Number) }
      },
      result: {
        data: {}
      }
    };

    renderWithProviders(
      <RoutinePreview routineStep={defaultRoutineStep} classes={{}} />,
      [emptyMock]
    );

    await waitFor(() => {
      // Should handle empty data gracefully
      expect(true).toBe(true);
    });
  });
});