import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styles } from '../../../themeHandler';
import StepList from '../elements/StepList';
import { ExerciseStepListProps } from '../../../types/routineBuilder';

const ExerciseStepList: React.FC<ExerciseStepListProps> = ({
  routine,
  currentIndex,
  onStepSelect
}) => {
  const theme = useTheme();
  const classes = styles(theme);

  return (
    <Card className={classes.userAdminCard}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h3">
          Exercise Steps
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
          Click on a step to edit its configuration.
        </Typography>
        
        <StepList 
          routine={routine}
          index={currentIndex}
          action={onStepSelect}
        />
      </CardContent>
    </Card>
  );
};

export default ExerciseStepList;