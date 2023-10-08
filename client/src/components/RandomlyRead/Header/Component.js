import React from 'react';
import { styles } from '../../../exerciseThemeHandler';
import { withStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

class Header extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h4" component="span" color="textPrimary" className={classes.headerText}>
          EasyOnset.com
        </Typography>
      </React.Fragment>
    );
  }
}

const HeaderWrapped = withStyles(styles)(Header);

export default HeaderWrapped;
