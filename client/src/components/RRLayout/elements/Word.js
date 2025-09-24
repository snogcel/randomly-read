import React from 'react';
import { styles } from '../../../exerciseThemeHandler';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';

class Word extends React.Component {

  constructor(props) {
    super(props);

    this.name = null; // TODO - wrap with redux stuff
    this.selectedVowel = null;

  }

  shouldComponentUpdate(nextProps) {
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    this.name = JSON.stringify([this.props.value.name]);
    this.selectedVowel = JSON.stringify(this.props.value.selectedVowel);

  }

  render() {
    const { mode, classes } = this.props;

    if (mode === "Word") {
      return (
        <Typography variant="h3" component="h3" className={classes.word}>
          {this.props.value.name}
        </Typography>
      );
    } else {
      return null;
    }

  }
}

const WordWrapped = withStyles(styles)(Word);

export default WordWrapped;
