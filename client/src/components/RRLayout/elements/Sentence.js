import React from 'react';
import { styles } from '../../../themeHandler';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

class Sentence extends React.Component {

  constructor(props) {
    super(props);

    this.name = null; // TODO - wrap with redux stuff
    this.selectedVowel = null;

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    this.name = JSON.stringify([this.props.value.name]);
    this.selectedVowel = JSON.stringify(this.props.value.selectedVowel);

  }

  render() {
    const { mode, classes } = this.props;

    if (mode === "Sentence") {
      return (
        <Typography variant="h1" className={classes.word}>
          {this.props.value.name}
        </Typography>
      );
    } else {
      return null;
    }

  }
}

const SentenceWrapped = withStyles(styles)(Sentence);

export default SentenceWrapped;
