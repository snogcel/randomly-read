import React from 'react';
import { styles } from '../../themeHandler';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

class Intermission extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Typography variant="h5" className={classes.intermission}>
        {this.props.intermissionText}
      </Typography>
    );
  }
}

const IntermissionWrapped = withStyles(styles)(Intermission);

export default IntermissionWrapped;
