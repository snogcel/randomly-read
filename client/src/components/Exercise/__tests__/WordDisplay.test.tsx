import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import WordDisplay from '../WordDisplay';
import { Word } from '../types';

const theme = createTheme();

const mockWord: Word = {
  id: '1',
  cmudict_id: 123,
  wordid: 456,
  lexeme: 'hello',
  consonant: 'h-l',
  vowel: 'e-o',
  type: 'noun',
  subtype: 'common',
  stress: 1,
  syllables: 2,
  wordsXsensesXsynsets: [],
  score: 85,
  votes: [],
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('WordDisplay Component', () => {
  it('renders word correctly in word mode', () => {
    renderWithTheme(
      <WordDisplay
        currentWord={mockWord}
        displayMode="word"
        fontSize="medium"
        showPhonetics={false}
        highlightTarget={false}
      />
    );

    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('renders word correctly in sentence mode', () => {
    renderWithTheme(
      <WordDisplay
        currentWord={mockWord}
        displayMode="sentence"
        fontSize="medium"
        showPhonetics={false}
        highlightTarget={false}
      />
    );

    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('shows intermission message in intermission mode', () => {
    renderWithTheme(
      <WordDisplay
        currentWord={null}
        displayMode="intermission"
        fontSize="medium"
        showPhonetics={false}
        highlightTarget={false}
      />
    );

    expect(screen.getByText('Take a Break')).toBeInTheDocument();
    expect(screen.getByText('Relax and prepare for the next exercise')).toBeInTheDocument();
  });

  it('shows loading message when no word is provided', () => {
    renderWithTheme(
      <WordDisplay
        currentWord={null}
        displayMode="word"
        fontSize="medium"
        showPhonetics={false}
        highlightTarget={false}
      />
    );

    expect(screen.getByText('Loading next word...')).toBeInTheDocument();
  });

  it('displays phonetics when showPhonetics is true', () => {
    renderWithTheme(
      <WordDisplay
        currentWord={mockWord}
        displayMode="word"
        fontSize="medium"
        showPhonetics={true}
        highlightTarget={false}
      />
    );

    expect(screen.getByText('/h-l-e-o/')).toBeInTheDocument();
  });

  it('displays word metadata chips', () => {
    renderWithTheme(
      <WordDisplay
        currentWord={mockWord}
        displayMode="word"
        fontSize="medium"
        showPhonetics={false}
        highlightTarget={false}
      />
    );

    expect(screen.getByText('2 syllables')).toBeInTheDocument();
    expect(screen.getByText('noun')).toBeInTheDocument();
  });

  it('calls onWordInteraction when word is clicked', () => {
    const mockOnWordInteraction = jest.fn();
    
    renderWithTheme(
      <WordDisplay
        currentWord={mockWord}
        displayMode="word"
        fontSize="medium"
        showPhonetics={false}
        highlightTarget={false}
        onWordInteraction={mockOnWordInteraction}
      />
    );

    const wordCard = screen.getByText('hello').closest('[role="button"]') || screen.getByText('hello').closest('div');
    if (wordCard) {
      fireEvent.click(wordCard);
    }

    expect(mockOnWordInteraction).toHaveBeenCalledWith({
      type: 'click',
      word: mockWord,
      timestamp: expect.any(Date),
    });
  });

  it('calls onWordInteraction when word is hovered', () => {
    const mockOnWordInteraction = jest.fn();
    
    renderWithTheme(
      <WordDisplay
        currentWord={mockWord}
        displayMode="word"
        fontSize="medium"
        showPhonetics={false}
        highlightTarget={false}
        onWordInteraction={mockOnWordInteraction}
      />
    );

    const wordCard = screen.getByText('hello').closest('[role="button"]') || screen.getByText('hello').closest('div');
    if (wordCard) {
      fireEvent.mouseEnter(wordCard);
    }

    expect(mockOnWordInteraction).toHaveBeenCalledWith({
      type: 'hover',
      word: mockWord,
      timestamp: expect.any(Date),
    });
  });

  it('applies correct font size classes', () => {
    const { rerender } = renderWithTheme(
      <WordDisplay
        currentWord={mockWord}
        displayMode="word"
        fontSize="small"
        showPhonetics={false}
        highlightTarget={false}
      />
    );

    // Test small font size
    expect(screen.getByText('hello')).toBeInTheDocument();

    // Test large font size
    rerender(
      <ThemeProvider theme={theme}>
        <WordDisplay
          currentWord={mockWord}
          displayMode="word"
          fontSize="large"
          showPhonetics={false}
          highlightTarget={false}
        />
      </ThemeProvider>
    );

    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('handles word with single syllable correctly', () => {
    const singleSyllableWord: Word = {
      ...mockWord,
      lexeme: 'cat',
      syllables: 1,
    };

    renderWithTheme(
      <WordDisplay
        currentWord={singleSyllableWord}
        displayMode="word"
        fontSize="medium"
        showPhonetics={false}
        highlightTarget={false}
      />
    );

    expect(screen.getByText('1 syllable')).toBeInTheDocument();
  });

  it('handles word without phonetic information', () => {
    const wordWithoutPhonetics: Word = {
      ...mockWord,
      consonant: '',
      vowel: '',
    };

    renderWithTheme(
      <WordDisplay
        currentWord={wordWithoutPhonetics}
        displayMode="word"
        fontSize="medium"
        showPhonetics={true}
        highlightTarget={false}
      />
    );

    // Should not display phonetics when they're empty
    expect(screen.queryByText('/-/')).not.toBeInTheDocument();
  });
});