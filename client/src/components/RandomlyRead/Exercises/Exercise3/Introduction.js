import React from 'react';
import { styles } from '../../../../exerciseThemeHandler';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core';

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

const IntroductionWrapped = withStyles(styles)(Introduction);

export default IntroductionWrapped;
