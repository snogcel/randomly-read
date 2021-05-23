import React from 'react';
import { withRouter } from 'react-router';
import Identities from './Identities/Identities';
import { styles } from '../../exerciseThemeHandler';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core';

class Subnavigation extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  handleClick(e, pathname, routineId) {
    if (this.props.history.location.pathname !== pathname) {
      this.props.setInProgress(false);
      this.props.setExercisePause(false);
      this.props.updateTime(0);
      this.props.updateTimeLeft(0);
      this.props.resetRoutineSelect();
      this.props.clearQueryResults();
      this.props.resetWordCard();
      this.props.updateId(routineId);
      this.props.history.push({pathname})
    }
  }

  render() {
    const { history, classes } = this.props;

    return (
      <React.Fragment>
        <Typography className={classes.root}>

          { Identities.map((item, i) => ( <Link href="#" key={i} className={classes.subnavigationLink + " " + ((item.pathname === history.location.pathname) ? classes.subnavigationLinkSelected : '')} onClick={e => this.handleClick(e, item.pathname, item.user.routines[0])}>{item.alias}</Link> )) }

        </Typography>
        <br />
      </React.Fragment>
    );
  }
}

const SubnavigationWrapped = withRouter(withStyles(styles)(Subnavigation));

export default SubnavigationWrapped;
