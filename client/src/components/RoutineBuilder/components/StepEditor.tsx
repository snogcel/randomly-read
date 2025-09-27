import React from 'react';
import { Card, CardContent, Typography, Grid, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styles } from '../../../themeHandler';

// Import existing element components
import ModeSelect from '../elements/ModeSelect';
import DurationSlider from '../elements/DurationSlider';
import RepetitionSlider from '../elements/RepetitionSlider';
import VowelSelect from '../elements/VowelSelect';
import ConsonantCheckboxes from '../elements/ConsonantCheckboxes';
import SyllableSelect from '../elements/SyllableSelect';
import PositionSelect from '../elements/PositionSelect';
import IntermissionText from '../elements/IntermissionText';
import InsertButton from '../elements/InsertButton';
import UpdateButton from '../elements/UpdateButton';
import DeleteButton from '../elements/DeleteButton';
import ResetButton from '../elements/ResetButton';

import { StepEditorProps } from '../../../types/routineBuilder';

const StepEditor: React.FC<StepEditorProps> = ({
  mode,
  rangeVal,
  repetitions,
  vowels,
  consonants,
  syllables,
  position,
  intermissionText,
  isIntermission,
  availableVowels,
  availableConsonants,
  availableSyllables,
  availableModes,
  availablePositions,
  availableGradeLevels,
  onModeChange,
  onRangeValChange,
  onRepetitionsChange,
  onVowelChange,
  onConsonantChange,
  onSyllableChange,
  onPositionChange,
  onIntermissionTextChange,
  onInsertStep,
  onUpdateStep,
  onDeleteStep,
  onResetForm
}) => {
  const theme = useTheme();
  const classes = styles(theme);

  // Parse vowels for VowelSelect component
  const parseVowels = (vowelIds: string[]) => {
    return vowelIds.map(id => {
      const vowel = availableVowels.find(v => v.id === id);
      return vowel ? vowel.name : '';
    }).filter(name => name !== '');
  };

  // Parse syllables for SyllableSelect component
  const parseSyllables = (syllableIds: number[]) => {
    return syllableIds.map(id => {
      const syllable = availableSyllables.find(s => s.id === id);
      return syllable ? syllable.name : '';
    }).filter(name => name !== '');
  };

  // Parse consonants for ConsonantCheckboxes component
  const parseConsonants = (consonantIds: string[]) => {
    const consonantObj: { [key: string]: boolean } = {};
    
    // Initialize all consonants to false
    availableConsonants.forEach(consonant => {
      consonantObj[consonant.id] = false;
    });
    
    // Set selected consonants to true
    consonantIds.forEach(id => {
      consonantObj[id] = true;
    });
    
    return consonantObj;
  };

  // Parse consonant checkbox options (filtered based on vowels)
  const parseConsonantCheckboxOptions = () => {
    // This logic should be moved to a utility function in the future
    // For now, return all available consonants
    return availableConsonants;
  };

  const parsedVowels = parseVowels(vowels);
  const parsedSyllables = parseSyllables(syllables);
  const parsedConsonants = parseConsonants(consonants);
  const consonantCheckboxOptions = parseConsonantCheckboxOptions();

  return (
    <Card className={classes.userAdminCard}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h3">
          Step Configuration
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
          Configure the settings for this exercise step.
        </Typography>

        <Grid container spacing={2}>
          {/* Mode Selection */}
          <Grid item xs={12}>
            <ModeSelect 
              mode={{ mode }} 
              options={availableModes}
              action={onModeChange}
            />
          </Grid>

          {/* Duration and Repetitions */}
          <Grid item xs={12} sm={6}>
            <DurationSlider 
              duration={{ duration: rangeVal }}
              action={onRangeValChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RepetitionSlider 
              repetition={{ repetition: repetitions }}
              action={onRepetitionsChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Phonetic Configuration - only show if not intermission */}
          {!isIntermission && (
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Phonetic Configuration
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <VowelSelect 
                  vowels={parsedVowels}
                  options={availableVowels}
                  action={onVowelChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <PositionSelect 
                  position={{ position }}
                  options={availablePositions}
                  action={onPositionChange}
                />
              </Grid>

              <Grid item xs={12}>
                <SyllableSelect 
                  syllables={parsedSyllables}
                  options={availableSyllables}
                  action={onSyllableChange}
                />
              </Grid>

              <Grid item xs={12}>
                <ConsonantCheckboxes 
                  consonants={parsedConsonants}
                  options={consonantCheckboxOptions}
                  action={onConsonantChange}
                />
              </Grid>
            </>
          )}

          {/* Intermission Text - only show if intermission */}
          {isIntermission && (
            <Grid item xs={12}>
              <IntermissionText 
                intermissionText={{ intermissionText }}
                action={onIntermissionTextChange}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Step Actions
            </Typography>
            <Grid container spacing={1}>
              <Grid item>
                <InsertButton action={onInsertStep} />
              </Grid>
              <Grid item>
                <UpdateButton action={onUpdateStep} />
              </Grid>
              <Grid item>
                <DeleteButton action={onDeleteStep} />
              </Grid>
              <Grid item>
                <ResetButton action={onResetForm} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StepEditor;