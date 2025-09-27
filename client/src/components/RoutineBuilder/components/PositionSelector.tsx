import React from 'react';
import { Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styles } from '../../../themeHandler';
import { PositionOption } from '../../../types/routineBuilder';

interface PositionSelectorProps {
  position: string;
  availablePositions: PositionOption[];
  onPositionChange: (position: string) => void;
  disabled?: boolean;
}

const PositionSelector: React.FC<PositionSelectorProps> = ({
  position,
  availablePositions,
  onPositionChange,
  disabled = false
}) => {
  const theme = useTheme();
  const classes = styles(theme);

  const handlePositionChange = (event: any) => {
    onPositionChange(event.target.value);
  };

  const getPositionDescription = (pos: string) => {
    switch (pos) {
      case 'initial':
        return 'Words that start with the selected consonant sounds';
      case 'medial':
        return 'Words that contain the selected consonant sounds in the middle';
      case 'final':
        return 'Words that end with the selected consonant sounds';
      default:
        return 'Select a position to see description';
    }
  };

  return (
    <Card className={classes.userAdminCard}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h3">
          Consonant Position
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
          Choose where the selected consonants should appear in the words.
        </Typography>

        <FormControl fullWidth margin="normal" disabled={disabled}>
          <InputLabel id="position-select-label">Consonant Position</InputLabel>
          <Select
            labelId="position-select-label"
            id="position-select"
            value={position}
            onChange={handlePositionChange}
            label="Consonant Position"
          >
            {availablePositions.map((pos) => (
              <MenuItem key={pos.id} value={pos.id}>
                {pos.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {getPositionDescription(position)}
          </FormHelperText>
        </FormControl>

        {/* Visual examples */}
        <Typography variant="body2" color="textSecondary" component="div" style={{ marginTop: 16 }}>
          <strong>Examples:</strong>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li><strong>Initial:</strong> "bat", "cat", "dog" (consonant at beginning)</li>
            <li><strong>Medial:</strong> "rabbit", "butter", "happy" (consonant in middle)</li>
            <li><strong>Final:</strong> "cat", "dog", "book" (consonant at end)</li>
          </ul>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PositionSelector;