import React from 'react';
import { styles } from '../../../../exerciseThemeHandler';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Modal from '@mui/material/Modal';
import { styled, useTheme } from '@mui/material/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import Definitions from '../../Definitions/Container';

class Introduction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Box>
          
          <Typography variant="body1" color="textPrimary" component="p" >
            In this phase, we will focus on techniques relating to <strong>Breathing</strong>, <strong>Phonation</strong> and <strong>Articulation</strong>. The techniques that are discussed in this phase are foundational to this program and will be often repeated throughout your practice.
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
