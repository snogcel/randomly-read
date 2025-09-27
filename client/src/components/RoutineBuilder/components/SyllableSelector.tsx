import React from 'react';
import { Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, Chip, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styles } from '../../../themeHandler';
import { SyllableOption } from '../../../types/routineBuilder';

interface SyllableSelectorProps {
  syllables: number[];
  availableSyllables: SyllableOption[];
  onSyllableChange: (syllables: string[]) => void;
  disabled?: boolean;
}

const SyllableSelector: React.FC<SyllableSelectorProps> = ({
  syllables,
  availableSyllables,
  onSyllableChange,
  disabled = false
}) => {
  const theme = useTheme();
  const classes = styles(theme);

  // Parse syllables for display
  const parseSyllables = (syllableIds: number[]) => {
    return syllableIds.map(id => {
      const syllable = availableSyllables.find(s => s.id === id);
      return syllable ? syllable.name : '';
    }).filter(name => name !== '');
  };

  const handleSyllableChange = (event: any) => {
    const selectedValues = event.target.value as string[];
    onSyllableChange(selectedValues);
  };

  const parsedSyllables = parseSyllables(syllables);

  return (
    <Card className={classes.userAdminCard}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h3">
          Syllable Configuration
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
          Select the number of syllables for word filtering.
        </Typography>

        <FormControl fullWidth margin="normal" disabled={disabled}>
          <InputLabel id="syllable-select-label">Number of Syllables</InputLabel>
          <Select
            labelId="syllable-select-label"
            id="syllable-select"
            multiple
            value={parsedSyllables}
            onChange={handleSyllableChange}
            label="Number of Syllables"
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={`${value} syllable${value !== '1' ? 's' : ''}`} size="small" />
                ))}
              </Box>
            )}
          >
            {availableSyllables.map((syllable) => (
              <MenuItem key={syllable.id} value={syllable.name}>
                {syllable.name} syllable{syllable.name !== '1' ? 's' : ''}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {parsedSyllables.length === 0 && (
          <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 8 }}>
            No syllable restrictions will be applied. Words of all syllable counts will be included.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default SyllableSelector;