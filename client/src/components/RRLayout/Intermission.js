import React from 'react';
import { styles } from '../../themeHandler';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { withStyles } from '@mui/styles';

function Intermission(props) {
  const theme = useTheme();
  const { classes } = props;

  return (
    <Typography variant="h3" component="h3" className={classes.intermission}>
      {props.intermissionText}
    </Typography>
  );
}

const IntermissionWithStyles = withStyles(styles)(Intermission);

export default IntermissionWithStyles;
