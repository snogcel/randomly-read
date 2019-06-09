import React, { useState, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from "@material-ui/core/LinearProgress";
import { styles } from '../../themeHandler';

function ProgressIndicator(props) {

  // props.range == the current interval between words
  // props.currentExerciseNumber =
  // props.completed =
  // props.total

  let status = props.completed + ' of ' + props.total + ' Exercises Completed';

 // let timeLeft = props.timeLeft;

  const {classes} = props;

  return (
      <div className={classes.column}>

        {status}
        <br></br>

       {props.currentExerciseNumber !== null ? props.timeLeft : ''}

      </div>
      );
  }


const ProgressIndicatorWrapped = withStyles(styles)(ProgressIndicator);


export default ProgressIndicatorWrapped;
