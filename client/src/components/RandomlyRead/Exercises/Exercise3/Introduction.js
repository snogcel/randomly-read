import React from 'react';
import { styles } from '../../../../exerciseThemeHandler';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { styled, useTheme } from '@mui/material/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

class Introduction extends React.Component {

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Box>
          
          <Typography variant="body1" color="textPrimary" component="p" >
            In this phase, we will focus on techniques relating to <strong>Phonation</strong>, <strong>Transfer</strong> and <strong>Resonance</strong>. These techniques aim to facilitate fluency by quickly and smoothly transferring "raw" phonation into natural-sounding speech.
          </Typography>

        </Box>
      </React.Fragment>
    );
  }
}

// Wrapper component to provide theme and styles
function IntroductionWrapper(props) {
  const theme = useTheme();
  const classes = styles(theme);
  
  return <Introduction {...props} classes={classes} theme={theme} />;
}

export default IntroductionWrapper;
