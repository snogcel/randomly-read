import React from 'react';
import { styles } from '../../themeHandler';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

class Intermission extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <Typography variant="h3" component="h3" className={classes.intermission}>
        {this.props.intermissionText}
      </Typography>
    );
  }
}

const IntermissionWrapped = withStyles(styles)(Intermission);

export default IntermissionWrapped;
