import React from 'react';
import ReactGA from "react-ga4";
import { withRouter } from 'react-router';
import Identities from '../Identities/Identities';
import { styles } from '../../../exerciseThemeHandler';
import { withStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

class Header extends React.Component {
  constructor(props) {
    super(props);

  }

  onChange = e => {

    // Extract value of select like so. Use parseInt for
    // improved type safety
    const selectedMode = 0;

    this.props.selectSiteMode(selectedMode);
    
    // Update distance in state via setState()
    // this.setState({ appMode : selectedMode });

    let pathname = Identities[selectedMode].pathname[0];
    let routineId = Identities[selectedMode].user.routines[0];
    let alias = Identities[selectedMode].alias;

    if (this.props.history.location.pathname !== pathname) {
      this.props.setInProgress(false);
      this.props.setExercisePause(false);
      this.props.updateTime(0);
      this.props.updateTimeLeft(0);
      this.props.resetRoutineSelect();
      this.props.clearQueryResults();
      this.props.resetWordCard();
      this.props.updateId(routineId);
      this.props.history.push({pathname});

      if (alias !== 'Home') {
        document.title = 'EasyOnset.com | ' + alias + ' Introduction';
      } else {
        document.title = 'EasyOnset.com';
      }

      const GA_ID = 'G-HZ4HM6M2GK'; // your google analytics id
      ReactGA.initialize(GA_ID);
      ReactGA.send({ hitType: "pageview", page: pathname });      
    }

  }

  handleClick(e, pathname, routineId, alias) {
    
    if (this.props.history.location.pathname !== pathname) {
      this.props.setInProgress(false);
      this.props.setExercisePause(false);
      this.props.updateTime(0);
      this.props.updateTimeLeft(0);
      this.props.resetRoutineSelect();
      this.props.clearQueryResults();
      this.props.resetWordCard();
      this.props.updateId(routineId);
      this.props.history.push({pathname});

      if (alias !== 'Home') {
        document.title = 'EasyOnset.com | ' + alias + ' Introduction';
      } else {
        document.title = 'EasyOnset.com';
      }

      const GA_ID = 'G-HZ4HM6M2GK'; // your google analytics id
      ReactGA.initialize(GA_ID);
      ReactGA.send({ hitType: "pageview", page: pathname });      
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography onClick={this.onChange} variant="h4" component="span" color="textPrimary" className={classes.headerTextStart}>Easy</Typography>
        <Typography onClick={this.onChange} variant="h4" component="span" color="textPrimary" className={classes.headerTextEnd}>Onset.com</Typography>
      </React.Fragment>
    );
  }
}

const HeaderWrapped = withRouter(withStyles(styles)(Header));

export default HeaderWrapped;
