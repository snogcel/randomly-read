import React, { useState, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = theme => ({
    column: {
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    barColorPrimary: {
      backgroundColor: '#33a0ff',
    }
  });

function ProgressIndicator(props) {

  const [range, setRange] = useState(props.range)
  const [count, setCount] = useState(null)
  const [delay, setDelay] = useState(1000)
  const [i, setI] = useState(0);
  console.log("COUNT", count)
  console.log("PROPS.RANGE", props.range)
  console.log("RANGE", range)
  useEffect(() => {
    if(range !== props.range) setRange(props.range) 

    if(range !== props.range && props.range !== 0) {
      setRange(props.range)
      setCount(props.range)
    }
    if(props.currentExerciseNumber === null) {
      setI(0)
    }
    if(props.currentExerciseNumber % 2 !== 0) {
      setI(0)
    }
    if(count === 0) {
      if(props.currentExerciseNumber !== null && !props.isPaused)  setI(i+20)
      console.log("INCREMENT", i)
      setCount(range);
    }
   
    }) 

  useInterval(() => {
    // Your custom logic here
   // console.log("PROPS RANGE", props.range)
   // console.log("RANGE", range)
   // console.log("COUNT", count)
    console.log("INTERVAL TEST")
    setCount(count - 1);

  }, !props.isPaused && !props.isModalOpen ? delay : null);

  let status = props.completed + ' of ' + 
  props.total + ' Exercises Completed';
  const {classes} = props;
//  console.log(completed)
console.log("INCREMENT 2", i)
return (
    <div className={classes.column}>
    <Card square elevation="1" style={{backgroundColor: props.dark === true ? "#262626" : '#ffffff'}}>
    <CardContent>
    <Typography style={{color: props.dark === true ? 'white' : 'black'}} variant="h6">{status}</Typography>
    {props.currentExerciseNumber === null ? '' : <Typography style={{color: props.dark === true ? 'white' : 'black'}} variant="h3">{count}</Typography>}
    {props.currentExerciseNumber === null ? '' : <LinearProgress style={{color: "#33a0ff"}} classes={{colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary}} variant="determinate" value={i} />}
    </CardContent>
    </Card> 
    </div>
    );
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const ProgressIndicatorWrapped = withStyles(styles)(ProgressIndicator);


export default ProgressIndicatorWrapped;