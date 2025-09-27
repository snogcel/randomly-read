import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Divider, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styles } from '../../../themeHandler';

// Import existing element components
import VowelSelect from '../elements/VowelSelect';
import ConsonantCheckboxes from '../elements/ConsonantCheckboxes';
import SyllableSelect from '../elements/SyllableSelect';
import PositionSelect from '../elements/PositionSelect';

// Import filtering utilities
import { 
  getFilteredConsonantOptions, 
  removeBlacklistedConsonants, 
  validatePhoneticConfiguration,
  getPhoneticConfigurationDescription 
} from '../../../utils/phoneticFiltering';

// Import types
import { VowelSound, ConsonantSound, SyllableOption, PositionOption } from '../../../types/routineBuilder';

interface PhoneticSelectorEnhancedProps {
  // Current selections
  vowels: string[];
  consonants: string[];
  syllables: number[];
  position: string;
  gradeLevel: string;
  mode: string;
  
  // Available options
  availableVowels: VowelSound[];
  availableConsonants: ConsonantSound[];
  availableSyllables: SyllableOption[];
  availablePositions: PositionOption[];
  
  // Event handlers
  onVowelChange: (vowels: string[]) => void;
  onConsonantChange: (consonant: string, value: boolean) => void;
  onSyllableChange: (syllables: string[]) => void;
  onPositionChange: (position: string) => void;
  onRemoveConsonant: (consonant: string) => void;
  
  // Configuration
  disabled?: boolean;
  showDescription?: boolean;
}

const PhoneticSelectorEnhanced: React.FC<PhoneticSelectorEnhancedProps> = ({
  vowels,
  consonants,
  syllables,
  position,
  gradeLevel,
  mode,
  availableVowels,
  availableConsonants,
  availableSyllables,
  availablePositions,
  onVowelChange,
  onConsonantChange,
  onSyllableChange,
  onPositionChange,
  onRemoveConsonant,
  disabled = false,
  showDescription = true
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

  // Get filtered consonant options based on current configuration
  const getFilteredConsonants = () => {
    const filterOptions = {
      vowels,
      consonants,
      syllables,
      position,
      gradeLevel,
      mode
    };
    
    try {
      return getFilteredConsonantOptions(availableConsonants, filterOptions);
    } catch (error) {
      console.warn('Error filtering consonants:', error);
      return availableConsonants;
    }
  };

  // Validate current configuration
  const validation = validatePhoneticConfiguration({
    vowels,
    consonants,
    syllables,
    position,
    gradeLevel,
    mode
  });

  // Get configuration description
  const configDescription = showDescription ? getPhoneticConfigurationDescription({
    vowels,
    consonants,
    syllables,
    position,
    gradeLevel,
    mode
  }, availableVowels, availableConsonants) : '';

  // Effect to remove blacklisted consonants when configuration changes
  useEffect(() => {
    const filterOptions = {
      vowels,
      consonants,
      syllables,
      position,
      gradeLevel,
      mode
    };

    try {
      removeBlacklistedConsonants(consonants, [], onRemoveConsonant);
    } catch (error) {
      console.warn('Error removing blacklisted consonants:', error);
    }
  }, [vowels, syllables, position, gradeLevel, mode]);

  const parsedVowels = parseVowels(vowels);
  const parsedSyllables = parseSyllables(syllables);
  const parsedConsonants = parseConsonants(consonants);
  const filteredConsonants = getFilteredConsonants();

  // Don't render if intermission mode
  if (mode === "Intermission") {
    return null;
  }

  return (
    <Card className={classes.userAdminCard}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h3">
          Phonetic Configuration
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
          Configure vowels, consonants, syllables, and position for word filtering.
        </Typography>

        {/* Validation Alert */}
        {!validation.isValid && (
          <Alert severity="warning" style={{ marginBottom: 16 }}>
            {validation.message}
          </Alert>
        )}

        {/* Configuration Description */}
        {showDescription && configDescription && (
          <Alert severity="info" style={{ marginBottom: 16 }}>
            <strong>Current Configuration:</strong> {configDescription}
          </Alert>
        )}

        <Grid container spacing={2}>
          {/* Vowel Selection */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Vowel Sounds
            </Typography>
            <VowelSelect 
              vowels={parsedVowels}
              options={availableVowels}
              action={onVowelChange}
              disabled={disabled}
            />
          </Grid>

          {/* Position Selection */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Consonant Position
            </Typography>
            <PositionSelect 
              position={{ position }}
              options={availablePositions}
              action={onPositionChange}
              disabled={disabled}
            />
          </Grid>

          {/* Syllable Selection */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Number of Syllables
            </Typography>
            <SyllableSelect 
              syllables={parsedSyllables}
              options={availableSyllables}
              action={onSyllableChange}
              disabled={disabled}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Consonant Selection */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Consonant Sounds
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
              Select consonants for word filtering. Available options are automatically filtered based on your vowel, syllable, and position selections to ensure valid word combinations.
            </Typography>
            
            {filteredConsonants.length < availableConsonants.length && (
              <Alert severity="info" style={{ marginBottom: 8 }}>
                {availableConsonants.length - filteredConsonants.length} consonant options have been filtered out based on your current configuration.
              </Alert>
            )}
            
            <ConsonantCheckboxes 
              consonants={parsedConsonants}
              options={filteredConsonants}
              action={onConsonantChange}
              disabled={disabled}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PhoneticSelectorEnhanced;