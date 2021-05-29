import React from 'react';
import WordHistoryListItem from './Item';

import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import { styles } from '../../themeHandler';

class WordHistoryList extends React.Component {

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  mapPosts = (posts) =>
    posts.map((post, index) => (
      <Grid item xs={12} key={index}><WordHistoryListItem {...post} /></Grid>
    ));

  render() {

    const {classes} = this.props;

    if (!this.props.posts || this.props.posts.length === 0) return null;

    let exerciseResults = this.props.posts || [];
    let currentExercise = [{ isIntermission: false }];
    let currentExerciseNumber = 0;

    if (typeof this.props.currentExercise !== "undefined" && this.props.currentExercise !== null) {
      currentExercise = this.props.currentExercise;
    }

    if (typeof this.props.currentExerciseNumber !== "undefined" && this.props.currentExerciseNumber !== null) {
      currentExerciseNumber = this.props.currentExerciseNumber;
    }

    // only show complete array if intermission is true, otherwise trim the last (current) fetched word
    if (typeof currentExercise[currentExerciseNumber] !== "undefined" && currentExercise[currentExerciseNumber].isIntermission === true) {
      exerciseResults = this.props.posts.slice(0);
    } else {
      exerciseResults = this.props.posts.slice(0, -1);
    }

    return <Grid container className={classes.wordHistoryGrid} direction="column-reverse" spacing={0}>{this.mapPosts(exerciseResults)}</Grid>;

  }
}

const WordHistoryListWrapped = withStyles(styles)(WordHistoryList);

export default WordHistoryListWrapped;
