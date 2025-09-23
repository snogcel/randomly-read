import React from 'react';
import { styles } from '../../../../exerciseThemeHandler';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core';

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

const IntroductionWrapped = withStyles(styles)(Introduction);

export default IntroductionWrapped;
