import React from 'react';
import { styles } from '../../../themeHandler';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

class Word extends React.Component {

  constructor(props) {
    super(props);

    this.name = null;
    this.selectedVowel = null;

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    this.name = JSON.stringify([this.props.value.name]);
    this.selectedVowel = JSON.stringify(this.props.value.selectedVowel);

  }

  render() {
    const { classes } = this.props;

    return (
      <Typography className={classes.title}>
        {this.props.value.name}
      </Typography>
    );
  }
}

const WordWrapped = withStyles(styles)(Word);

export default WordWrapped;
