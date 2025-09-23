import React from 'react';
import { styles } from '../../themeHandler';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';

function Intermission(props) {
  const theme = useTheme();
  const classes = styles(theme);

  return (
    <Typography variant="h3" component="h3" className={classes.intermission}>
      {props.intermissionText}
    </Typography>
  );
}

export default Intermission;
