import React, { useState, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { styles } from '../../themeHandler';
import { Typography } from '@material-ui/core';

import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';

import Grid from "./RRHome";

function ProgressIndicator(props) {

  const {classes} = props;

  let status = null;
  let progressClass = classes.intermissionIndicator;

  if (typeof props.currentExercise !== "undefined" && typeof props.currentExerciseNumber !== "undefined" && props.currentExerciseNumber !== null) {
    if (!props.currentExercise[props.currentExerciseNumber].isIntermission) {
      progressClass = classes.exerciseIndicator;
      status = 'Exercise ' + (parseInt(props.completed) + 1) + ' of ' + props.total;
    }
  }

  let range = props.range;

  let timeLeft = (parseInt(range) - parseInt(props.timeLeft)) || 0;

  let increment = 100 / parseInt(range) || 0;
  let total = (increment * parseInt(range)) || 0;

  let value = (total - (increment * (range - timeLeft)));

  const { width } = props;

  let size = 36;

  if (width === "md" || width === "sm" || width === "xs") size = 28;

  return (
    <div className={classes.column}>

      {(props.currentExerciseNumber !== null) ? (
        <>
          <CircularProgress size={size} variant="static" value={value} color="inherit" className={progressClass} />
          <br />
          <Typography variant="h6" color="secondary">{status}</Typography>
        </>
      ) : (
        <>

        </>
      )}

    </div>
  );

}

ProgressIndicator.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

const ProgressIndicatorWrapped = withStyles(styles)(ProgressIndicator);

export default withWidth()(ProgressIndicatorWrapped);
