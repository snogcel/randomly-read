import React from 'react';
import { Card, CardContent, Typography, Grid, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styles } from '../../../themeHandler';

// Import existing element components
import VowelSelect from '../elements/VowelSelect';
import ConsonantCheckboxes from '../elements/ConsonantCheckboxes';

// Import types
import { VowelSound, ConsonantSound } from '../../../types/routineBuilder';

interface PhoneticSelectorProps {
  vowels: string[];
  consonants: string[];
  availableVowels: VowelSound[];
  availableConsonants: ConsonantSound[];
  onVowelChange: (vowels: string[]) => void;
  onConsonantChange: (consonant: string, value: boolean) => void;
  disabled?: boolean;
}

const PhoneticSelector: React.FC<PhoneticSelectorProps> = ({
  vowels,
  consonants,
  availableVowels,
  availableConsonants,
  onVowelChange,
  onConsonantChange,
  disabled = false
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

  // Filter available consonants based on selected vowels and other criteria
  const getFilteredConsonants = () => {
    // Import filtering utilities
    const { getFilteredConsonantOptions } = require('../../../utils/phoneticFiltering');
    
    // Create filter options (these would come from props in a real implementation)
    const filterOptions = {
      vowels,
      consonants,
      syllables: [], // This would come from parent component
      position: 'initial', // This would come from parent component
      gradeLevel: '0', // This would come from parent component
      mode: 'Word' // This would come from parent component
    };
    
    try {
      return getFilteredConsonantOptions(availableConsonants, filterOptions);
    } catch (error) {
      console.warn('Error filtering consonants:', error);
      return availableConsonants;
    }
  };

  const parsedVowels = parseVowels(vowels);
  const parsedConsonants = parseConsonants(consonants);
  const filteredConsonants = getFilteredConsonants();

  return (
    <Card className={classes.userAdminCard}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h3">
          Phonetic Configuration
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
          Select vowels and consonants for word filtering.
        </Typography>

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

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Consonant Selection */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Consonant Sounds
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
              Select consonants that will be used for word filtering. Available options are filtered based on selected vowels and other criteria.
            </Typography>
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

export default PhoneticSelector;