import RoutineBuilder from './RoutineBuilder';
import Range from "./Range";
//import Routines from './Routines.js';
//import { AwesomeButton } from 'react-awesome-button';
import Button from '@material-ui/core/Button';
import React from 'react';
import ms from 'pretty-ms';
import Grid from '@material-ui/core/Grid';
import RoutineSelectContainer from './RoutineSelect'
import { Typography } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    "&:disabled": {
      backgroundColor: "#d3d3d3",
      color: '#7d7d7d' 
    },
    "&:hover": {
      backgroundColor: "#2d90e5"
    },
      backgroundColor: '#33a0ff',
     

  }
});



class Timer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      time: 0,
      isOn: false,
      start: 0,
      lastUpdated: -1,
      rangeVal: 3,
      test: "test"
    };

    this.routineSelectHandler = this.routineSelectHandler.bind(this);
    this.updateRange = this.updateRange.bind(this);

    this.startTimer = this.startTimer.bind(this);
    this.resumeTimer = this.resumeTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimerAndQuery = this.resetTimerAndQuery.bind(this);
    this.resetTimerQueryAndEH = this.resetTimerQueryAndEH.bind(this)
    this.exerciseStack = [];
    this.exercisePointer = null;
    this.count = 0;
    this.completed = 0;
    this.routineBuilder = new RoutineBuilder();

    this.currentRoutine = {};
    this.isEmpty = this.isEmpty.bind(this)
  }

  isEmpty(obj) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
  componentDidMount() {

    // TODO - find a better way to set routines

   // this.routineSelectHandler(Routines[1]);

  }

  routineSelectHandler(routine) {

    console.log("test", routine);
    this.exerciseStack = [];
    if(this.isEmpty(routine)) {
      console.log("Hello 1");
      this.setState({test: "None"})
      this.props.addExercise([])
      
    }
    else {
      
      for (let i = 0; i < routine.subroutine.length; i++) {
        this.exerciseStack.push(routine.subroutine[i]);
      }
      // fetch first entry in routine stack
    //  this.props.addExerciseNumber(null)
      this.exercisePointer = 0;
      this.props.addExercise(this.exerciseStack)
      this.updateRange(this.exerciseStack[this.exercisePointer].rangeVal);
      this.setExercise(this.exerciseStack[this.exercisePointer]);
  
      this.stopTimer();
      this.resetTimerAndQuery();
    }




    
    // Build Routine Stack
    /* for (let i = 0; i < routine.subroutine.length; i++) {
      this.exerciseStack.push(routine.subroutine[i]);
    }

    // fetch first entry in routine stack
    this.exercisePointer = 0;

    this.updateRange(this.exerciseStack[this.exercisePointer].rangeVal);
    this.setExercise(this.exerciseStack[this.exercisePointer]);

    this.stopTimer();
    this.resetTimer() */;

  }

  setExercise(exercise) {
    console.log("Set Exercise: ", exercise);

    switch (exercise.map) {
      case 'default':
        this.currentRoutine = this.routineBuilder.build(exercise);
        console.log("Exercise Map", this.currentRoutine);
        break;
      case 'randomly':
        this.currentRoutine = this.routineBuilder.buildRandomly(exercise);
        console.log("Exercise Map", this.currentRoutine);
        break;
      case 'intermission':
        this.currentRoutine = this.routineBuilder.buildIntermission(exercise);
        console.log("Exercise Map", this.currentRoutine);
        break;
      default:
        break;
    }
  }

  updateRange(val) {
    this.setState({
      rangeVal: val
    })
  }

  resumeTimer() {
    this.setState({
      isOn: true,
      start: Date.now() - this.state.time
    });

    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);

  }

  startTimer() {
    console.log(this.exerciseStack)
    this.props.addExercise(this.exerciseStack)
    console.log("TESTTTTTTTTTTTTT", this.exercisePointer)
    this.props.addExerciseNumber(this.exercisePointer)
    this.setExercise(this.exerciseStack[this.exercisePointer]);
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    });

    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);

    // TODO - initiate routine
    
    let routineKeys = this.currentRoutine.keys();
    let currentKey = routineKeys.next().value;

    this.props.action(this.currentRoutine.get(currentKey));
    this.currentRoutine.delete(currentKey);

    this.setState({
      lastUpdated: 0
    });

  }

  shouldComponentUpdate(nextProps, nextState) {

    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if(this.props.isPaused === false) {
      this.resumeTimer();
      this.props.setExercisePause(null);
    }
    if(this.props.isPaused === true) {
      this.stopTimer();
      this.props.setExercisePause(null);
    }


    if(this.props.currentExerciseNumber !== null && this.props.currentExerciseNumber !== this.exercisePointer) {
      this.exercisePointer = this.props.currentExerciseNumber
      this.setExercise(this.exerciseStack[this.exercisePointer]);
    }

    
    if ((prevState.time - this.state.lastUpdated) > (this.state.rangeVal * 1000)) {

      let routineKeys = this.currentRoutine.keys();
      console.log(routineKeys)
      let currentKey = routineKeys.next().value;
      console.log(currentKey)
      console.log("CURRENT KEY:", this.currentRoutine.get(currentKey))
      console.log("CURRENT Exercise Number(Timer.js):", this.exercisePointer)
      let test = this.exercisePointer === this.props.currentExerciseNumber
      console.log("Are they equal", test)
      console.log("CURRENT Exercise Number:", this.props.currentExerciseNumber)
      console.log("PROPS", this.props.currentExercise[this.props.currentExerciseNumber])
      

      let nextAction = this.currentRoutine.get(currentKey);

      console.log("Next Action", nextAction)
      if (!nextAction && (this.exerciseStack.length > 0) && (this.exercisePointer < (this.exerciseStack.length - 1))) {

        this.count++;
        if(this.count % 2 === 0) this.completed++;

        this.exercisePointer++;
        this.props.addExerciseNumber(this.exercisePointer);

        console.log("Does it reach the increment? ", this.exercisePointer);
        console.log("Exercise Stack Pointer: ", this.exercisePointer);
        console.log("CURRENT EXERCISE: ", this.exerciseStack[this.exercisePointer]);
        this.updateRange(this.exerciseStack[this.exercisePointer].rangeVal);
        this.setExercise(this.exerciseStack[this.exercisePointer]);

        routineKeys = this.currentRoutine.keys();
        currentKey = routineKeys.next().value;

        nextAction = this.currentRoutine.get(currentKey);
      }
    
      if (nextAction) {
        
        this.props.action(nextAction);
        this.currentRoutine.delete(currentKey);

        this.setState({
          lastUpdated: Date.now() - this.state.start
        });
      }

     
    }

  

  }

  stopTimer() {
    this.setState({isOn: false});
    clearInterval(this.timer);

    console.log(this.state);
    console.log(this.exerciseStack)
    console.log(this.exercisePointer)
  }

  resetTimerAndQuery() {
  
    this.exercisePointer = 0;
    this.setState({time: 0, isOn: false})
    this.props.addRoutineVowel(null);
    this.props.removeConsonant();
    this.props.addSyllables([1])
    this.props.setMode('Word');

  }

  resetTimerQueryAndEH() {
  
    this.exercisePointer = 0;
    this.completed = 0;
    this.setState({time: 0, isOn: false})
    this.props.addRoutineVowel(null);
    this.props.removeConsonant();
    this.props.addSyllables([1])
    this.props.setMode('Word');
    this.resetEH();
  }

  resetEH() {
    if(this.props.currentExercise.length >= 0) {
      this.props.addExercise([])
      this.props.addExerciseNumber(null)
    }
  }

  render() {

    const { classes } = this.props;
    
    const { rangeVal } = this.state;

    let currentExercise = null;

    if(this.exerciseStack.length === 0) {
      currentExercise = null;
      console.log(this.state.test)
    } 


    if (this.exerciseStack[this.exercisePointer]) {
      currentExercise =
        <div className='CurrentRoutineContainer'>
          <label>&gt; Duration: </label><span>{((this.exerciseStack[this.exercisePointer].duration))} seconds</span> ({this.exerciseStack[this.exercisePointer].rangeVal} seconds x {this.exerciseStack[this.exercisePointer].repetitions} {this.exerciseStack[this.exercisePointer].mode})<br />
          <br />
        </div>;
      
    }
    let completeExerciseStack = [];

    let current = this.exercisePointer;
    let total = 0;
    let completed = 0;

    if (this.exerciseStack && this.exerciseStack.length > 0) {

      let className = 'RoutineContainer';

      for (let i = 0; i < this.exerciseStack.length; i++) {

        if (i === current) {
          className = 'CurrentRoutineContainer';
        } else {
          className = 'RoutineContainer';
        }

        if (this.exerciseStack[i].mode === 'Word' || this.exerciseStack[i].mode === 'Sentence') {
          total++;
          if (i < current) completed++;

          completeExerciseStack.push(
            <div className={className}>
              <label>Duration: </label><span>{((this.exerciseStack[i].duration))} seconds</span> ({this.exerciseStack[i].rangeVal} seconds x {this.exerciseStack[i].repetitions} {this.exerciseStack[i].mode})<br />
              <br />
            </div>
          )

        }

      }

    }

    let status = this.completed + ' of ' + total + ' Exercises Completed';
    let isDisabled = currentExercise === null ? true : false;
    let start = (this.state.time === 0) ?
      <Button className={classes.button} onClick={this.startTimer} disabled={isDisabled} size="medium" variant="contained" color={"primary"} ><b>Start Routine</b></Button> : null;
    let stop = (this.state.time === 0 || !this.state.isOn) ?
      null : <Button className={classes.button} onClick={this.stopTimer} size="medium" variant="contained" color={"primary"} ><b>Pause</b></Button>;
    let resume = (this.state.time === 0 || this.state.isOn) ?
      null : <Button className={classes.button} onClick={this.resumeTimer} size="medium" variant="contained" color={"primary"} ><b>Resume</b></Button>;
    let reset = (this.state.time === 0 || this.state.isOn) ?
      null : <Button className={classes.button} onClick={this.resetTimerQueryAndEH} size="small" variant="contained" color={"primary"} ><b>Reset</b></Button>;


    return(

      <Grid>
        <div className="TimerControls">
          {start}
          {resume}
          {stop}
          {reset}
          <div className="RangeContainer">
            <Range theme={this.props.dark} range={rangeVal} updateRange={this.updateRange}/>
          </div>
        </div>

        <br /><br />
        <div className="RoutineSelector">
                    <RoutineSelectContainer theme={this.props.dark} ref={this.routineSelect} action={this.routineSelectHandler} />
                </div>
                <br /><br />
                <Typography style={{color: this.props.dark === true ? 'white' : 'black'}} variant="h6">{status} ({ms(this.state.time, {compact: true})})</Typography>
                <br /><br />

               {/*  <Typography style={{color: this.props.dark === true ? 'white' : 'black'}} variant="h6">{currentExercise}</Typography> */}
                {/* <Typography style={{color: this.props.dark === true ? 'white' : 'black'}} variant="h6">{completeExerciseStack}</Typography> */}
      </Grid>


    )
  }
}

export default withStyles(styles)(Timer);
