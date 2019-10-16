import React, { useState, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { styles } from '../../themeHandler';
import { Typography } from '@material-ui/core';
import Grid from "./RRHome";

function ProgressIndicator(props) {

  const {classes} = props;

  console.log(props);

  let status = null;

  if (typeof props.currentExercise !== "undefined" && typeof props.currentExerciseNumber !== "undefined" && props.currentExerciseNumber !== null) {
    if (!props.currentExercise[props.currentExerciseNumber].isIntermission) {
      status = 'Exercise ' + (parseInt(props.completed) + 1) + ' of ' + props.total;
    }
  }

  let range = props.range;

  let timeLeft = (parseInt(range) - parseInt(props.timeLeft)) || 0;

  let increment = 100 / parseInt(range) || 0;
  let total = (increment * parseInt(range)) || 0;

  let value = (total - (increment * (range - timeLeft)));

  return (
    <div className={classes.column}>

      {!props.isPaused ? (
        <>
          <CircularProgress variant="static" value={value} color="secondary" />
          <br />
          <Typography color="secondary">{status}</Typography>
        </>
      ) : (
        <>

        </>
      )}

    </div>
  );

}

const ProgressIndicatorWrapped = withStyles(styles)(ProgressIndicator);

export default ProgressIndicatorWrapped;
