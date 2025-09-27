import React, { useCallback, useMemo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Fade,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { WordDisplayProps, FONT_SIZE_MAP, EXERCISE_COLORS } from './types';

const StyledCard = styled(Card)(({ theme }) => ({
  minHeight: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: EXERCISE_COLORS.background.paper,
  border: `2px solid ${theme.palette.primary.light}`,
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.main,
  },
}));

const WordText = styled(Typography)<{ fontSize: 'small' | 'medium' | 'large' }>(
  ({ fontSize }) => ({
    fontWeight: 600,
    textAlign: 'center',
    color: EXERCISE_COLORS.text.primary,
    fontSize: FONT_SIZE_MAP[fontSize].word,
    lineHeight: 1.2,
    userSelect: 'none',
    transition: 'color 0.2s ease-in-out',
  })
);

const SentenceText = styled(Typography)<{ fontSize: 'small' | 'medium' | 'large' }>(
  ({ fontSize }) => ({
    fontWeight: 400,
    textAlign: 'center',
    color: EXERCISE_COLORS.text.primary,
    fontSize: FONT_SIZE_MAP[fontSize].sentence,
    lineHeight: 1.4,
    userSelect: 'none',
    transition: 'color 0.2s ease-in-out',
  })
);

const PhoneticText = styled(Typography)<{ fontSize: 'small' | 'medium' | 'large' }>(
  ({ fontSize, theme }) => ({
    fontStyle: 'italic',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: FONT_SIZE_MAP[fontSize].phonetic,
    marginTop: theme.spacing(1),
    userSelect: 'none',
  })
);

const IntermissionBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '200px',
  padding: theme.spacing(3),
  backgroundColor: EXERCISE_COLORS.background.exercise,
  borderRadius: theme.spacing(2),
  border: `2px dashed ${theme.palette.divider}`,
}));

const TargetHighlight = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-4px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80%',
    height: '3px',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '2px',
  },
}));

const WordDisplay: React.FC<WordDisplayProps> = ({
  currentWord,
  displayMode,
  fontSize = 'medium',
  showPhonetics = false,
  highlightTarget = false,
  className,
  onWordInteraction,
}) => {
  const theme = useTheme();

  const handleWordClick = useCallback(() => {
    if (currentWord && onWordInteraction) {
      onWordInteraction({
        type: 'click',
        word: currentWord,
        timestamp: new Date(),
      });
    }
  }, [currentWord, onWordInteraction]);

  const handleWordHover = useCallback(() => {
    if (currentWord && onWordInteraction) {
      onWordInteraction({
        type: 'hover',
        word: currentWord,
        timestamp: new Date(),
      });
    }
  }, [currentWord, onWordInteraction]);

  const phoneticDisplay = useMemo(() => {
    if (!currentWord || !showPhonetics) return null;
    
    // Extract phonetic information from the word
    const phonetic = `/${currentWord.consonant || ''}-${currentWord.vowel || ''}/`;
    return phonetic !== '/-/' ? phonetic : null;
  }, [currentWord, showPhonetics]);

  const wordMetadata = useMemo(() => {
    if (!currentWord) return null;
    
    return (
      <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
        {currentWord.syllables && (
          <Chip
            label={`${currentWord.syllables} syllable${currentWord.syllables !== 1 ? 's' : ''}`}
            size="small"
            variant="outlined"
            color="primary"
          />
        )}
        {currentWord.type && (
          <Chip
            label={currentWord.type}
            size="small"
            variant="outlined"
            color="secondary"
          />
        )}
      </Box>
    );
  }, [currentWord]);

  if (displayMode === 'intermission') {
    return (
      <Fade in timeout={500}>
        <IntermissionBox className={className}>
          <Typography variant="h4" color="textSecondary" gutterBottom>
            Take a Break
          </Typography>
          <Typography variant="body1" color="textSecondary" textAlign="center">
            Relax and prepare for the next exercise
          </Typography>
        </IntermissionBox>
      </Fade>
    );
  }

  if (!currentWord) {
    return (
      <Fade in timeout={500}>
        <StyledCard className={className}>
          <CardContent>
            <Typography variant="h5" color="textSecondary" textAlign="center">
              Loading next word...
            </Typography>
          </CardContent>
        </StyledCard>
      </Fade>
    );
  }

  const renderWordContent = () => {
    const wordElement = (
      <Box>
        {displayMode === 'sentence' ? (
          <SentenceText fontSize={fontSize}>
            {currentWord.lexeme}
          </SentenceText>
        ) : (
          <WordText fontSize={fontSize}>
            {currentWord.lexeme}
          </WordText>
        )}
        
        {phoneticDisplay && (
          <PhoneticText fontSize={fontSize}>
            {phoneticDisplay}
          </PhoneticText>
        )}
        
        {wordMetadata}
      </Box>
    );

    return highlightTarget ? (
      <TargetHighlight>{wordElement}</TargetHighlight>
    ) : (
      wordElement
    );
  };

  return (
    <Fade in timeout={500}>
      <StyledCard
        className={className}
        onClick={handleWordClick}
        onMouseEnter={handleWordHover}
        elevation={highlightTarget ? 8 : 2}
      >
        <CardContent sx={{ width: '100%', textAlign: 'center' }}>
          {renderWordContent()}
        </CardContent>
      </StyledCard>
    </Fade>
  );
};

export default WordDisplay;