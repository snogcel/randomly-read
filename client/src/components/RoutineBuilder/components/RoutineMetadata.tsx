import React from 'react';
import { Card, CardContent, Typography, IconButton, Grid } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { styles } from '../../../themeHandler';
import RoutineName from '../elements/RoutineName';
import DescriptionEditor from '../elements/DescriptionEditor';
import { RoutineMetadataProps } from '../../../types/routineBuilder';

const RoutineMetadata: React.FC<RoutineMetadataProps> = ({
  name,
  description,
  onNameChange,
  onDescriptionChange,
  showDescriptionEditor,
  onToggleDescriptionEditor
}) => {
  const theme = useTheme();
  const classes = styles(theme);

  return (
    <Card className={classes.userAdminCard}>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography gutterBottom variant="h6" component="h3">
              Routine Information
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={onToggleDescriptionEditor}
              size="small"
              aria-label={showDescriptionEditor ? "Hide description editor" : "Show description editor"}
            >
              {showDescriptionEditor ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Grid>
        </Grid>

        <RoutineName 
          name={name} 
          action={onNameChange} 
        />

        {showDescriptionEditor && (
          <DescriptionEditor 
            description={description} 
            action={onDescriptionChange} 
          />
        )}
      </CardContent>
    </Card>
  );
};

export default RoutineMetadata;