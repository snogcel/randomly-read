import React from 'react';
import { styles } from '../../themeHandler';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

const Intermission = props => {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Typography className={classes.intermission}>
        {this.props.intermissionText}
      </Typography>
    );
  }
}

const IntermissionWrapped = withStyles(styles)(Intermission);

export default IntermissionWrapped;
