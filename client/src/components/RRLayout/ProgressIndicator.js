import React, { useState, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { styles } from '../../themeHandler';

function ProgressIndicator(props) {

  // props.range == the current interval between words
  // props.currentExerciseNumber =
  // props.completed =
  // props.total

  // let status = props.completed + ' of ' + props.total + ' Exercises Completed';

  // let timeLeft = props.timeLeft;


  /*

  React.useEffect(() => {

    function progress() {
      setCompleted(prevCompleted => (prevCompleted >= 99 ? 0 : prevCompleted + 33));
    }

    const timer = setInterval(progress, 1000);

    return () => {
      clearInterval(timer);
    };

  }, []);

  */

  // const classes = useStyles();

  const {classes} = props;

  console.log(props);

  let range = props.range;

  let timeLeft = (parseInt(range) - parseInt(props.timeLeft)) || 0;

  let increment = 100 / parseInt(range) || 0;
  let total = (increment * parseInt(range)) || 0;

  /*
  console.log("total: ", total);
  console.log("increment: ", increment);
  console.log("timeLeft: ", timeLeft);
  */

  let value = (total - (increment * (range - timeLeft)));

  return (
    <div className={classes.column}>
      <CircularProgress variant="static" value={value}/>
    </div>
  );

}

const ProgressIndicatorWrapped = withStyles(styles)(ProgressIndicator);

export default ProgressIndicatorWrapped;
