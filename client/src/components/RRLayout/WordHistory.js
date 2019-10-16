import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { styles } from '../../themeHandler';

/**
 * @return {boolean}
 */
function WordHistory(props) {

  let exerciseResults = [];

  let currentExercise = [{ isIntermission: false }];
  let currentExerciseNumber = 0;

  if (typeof props.currentExercise !== "undefined" && props.currentExercise !== null) {
    currentExercise = props.currentExercise;
  }

  if (typeof props.currentExerciseNumber !== "undefined" && props.currentExerciseNumber !== null) {
    currentExerciseNumber = props.currentExerciseNumber;
  }

  // only show complete array if intermission is true, otherwise trim the last (current) fetched word
  if (typeof currentExercise[currentExerciseNumber] !== "undefined" && currentExercise[currentExerciseNumber].isIntermission === true) {
    exerciseResults = props.exerciseResults.slice(0).reverse();
  } else {
    exerciseResults = props.exerciseResults.slice(0, -1).reverse();
  }

  const {classes} = props;

  console.log(props.exerciseResults);

  return (
    <React.Fragment>
      <Grid spacing={8}>
        { exerciseResults.map((item, i) => (
          <Grid item xs={12}>
            <Card square elevation="0" style={{backgroundColor: 'transparent'}}>
              <CardContent>
                <Typography className={classes.historyTitle} color="textPrimary" variant="h3">{item}</Typography>
              </CardContent>
            </Card>
          </Grid>
        )) }
      </Grid>
    </React.Fragment>
  )

}

const WordHistoryWrapped = withStyles(styles)(WordHistory);

export default WordHistoryWrapped;
