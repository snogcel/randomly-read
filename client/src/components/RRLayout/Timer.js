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

import { getRoutineSettings } from '../../util/api';

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

    // TODO - remove "test" from state

    this.state = {
      time: 0,
      timeLeft: 0,
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
    this.total = 0;
    this.timeLeftLastUpdated = 0;
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

  }

  routineSelectHandler(routine) {

    this.exerciseStack = [];

    if(this.isEmpty(routine)) {

      this.setState({test: "None"}); // TODO: remove?

      this.props.addExercise([]);
      this.props.addExerciseNumber(null);
      this.props.addWord([]);

    }
    else {

      for (let i = 0; i < routine.subroutine.length; i++) {
        this.exerciseStack.push(routine.subroutine[i]);
      }

      this.exercisePointer = 0;
      this.props.addExercise(this.exerciseStack);
      this.updateRange(this.exerciseStack[this.exercisePointer].rangeVal);
      this.props.setRange(this.exerciseStack[this.exercisePointer].rangeVal);
      this.setExercise(this.exerciseStack[this.exercisePointer]);
      this.props.addExerciseNumber(null);
      this.completed = 0;
      this.props.addWord([]);
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
    this.resetTimer(); */

  }

  setExercise(exercise) {

    console.log("Modify exerciseConfig...");

    // Stub out exerciseConfig
    let duration = (parseInt(exercise.repetitions) * parseInt(exercise.rangeVal));

    exercise.duration = duration; // calculation exercise duration
    exercise.templates = []; // for future functionality
    exercise.limit = 1; // for future functionality
    exercise.map = "randomly";

    if (exercise.isIntermission) {
      exercise.consonants = [];
      exercise.vowels = [];
      exercise.syllables = [];
      exercise.map = "intermission";
      exercise.mode = "Intermission";
    }

    // Update Timer Value
    this.setState({ rangeVal: exercise.rangeVal });
    this.props.setRange(parseInt(exercise.rangeVal));

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
        console.log("Exercise Map (Intermission)", this.currentRoutine);
        this.props.addWord([]); // resetting the word array in redux to reset the WordHistory
        break;
      default:
        break;
    }
  }

  updateRange(val) {

    this.setState({
      lastUpdated: Date.now() - this.state.start
    });

    this.stopTimer();

    this.setState({
      rangeVal: val
    });

    this.props.setRange(val);

  }

  resumeTimer() {
    this.props.setExercisePause(false);
    this.setState({
      isOn: true,
      start: Date.now() - this.state.time
    });

    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);

  }

  startTimer() {
    this.props.setRange(this.state.rangeVal)
    this.props.setExercisePause(false)
    this.props.addExercise(this.exerciseStack)
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

    // TODO - Throttle

    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if(this.props.isModalOpen === false && this.props.currentExerciseNumber !== null) {
      this.resumeTimer();
      this.props.setModalOpen(null);
    }
    if(this.props.isModalOpen === true) {
      this.stopTimer();
      this.props.setModalOpen(null);
    }

    if(this.props.completed !== this.completed && this.completed !== 0) {
      this.props.updateCompleted(this.completed);
    }
    if(this.props.total !== this.total && this.total !== 0) {
      this.props.updateTotal(this.total);
    }

    if(this.props.currentExerciseNumber !== null && this.props.currentExerciseNumber !== this.exercisePointer) {
      this.exercisePointer = this.props.currentExerciseNumber
      this.setExercise(this.exerciseStack[this.exercisePointer]);
    }

    if ((prevState.time - this.state.lastUpdated) > (this.state.rangeVal * 1000)) {

      let routineKeys = this.currentRoutine.keys();

      let currentKey = routineKeys.next().value;

      /*

      console.log(routineKeys)
      console.log(currentKey)
      console.log("CURRENT KEY:", this.currentRoutine.get(currentKey))
      console.log("CURRENT Exercise Number(Timer.js):", this.exercisePointer)

      let test = this.exercisePointer === this.props.currentExerciseNumber
      console.log("Are they equal", test)
      console.log("CURRENT Exercise Number:", this.props.currentExerciseNumber)
      console.log("PROPS", this.props.currentExercise[this.props.currentExerciseNumber])

      console.log("Next Action", nextAction)

      */


      let nextAction = this.currentRoutine.get(currentKey);


      if (!nextAction && (this.exerciseStack.length > 0) && (this.exercisePointer < (this.exerciseStack.length - 1))) {

        this.count++;
        if(this.exerciseStack[this.exercisePointer].map !== 'intermission') this.completed++;

        this.exercisePointer++;
        this.props.addExerciseNumber(this.exercisePointer);

        /*
        console.log("Does it reach the increment? ", this.exercisePointer);
        console.log("Exercise Stack Pointer: ", this.exercisePointer);
        console.log("CURRENT EXERCISE: ", this.exerciseStack[this.exercisePointer]);
        */

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


    } else {

      this.timeLeftLastUpdated++;

      if (this.timeLeftLastUpdated > 25) {

        this.timeLeftLastUpdated = 0;

        let timeLeft = (Math.round(((this.state.rangeVal * 1000) - (prevState.time - this.state.lastUpdated))/1000)); // Math.ceil() was rounding up and increase the range + 1, round() returns the exact range selected

        if (timeLeft !== this.state.timeLeft) {
          this.setState({
            timeLeft: timeLeft
          });

          console.log(timeLeft); // TODO - pass this back to ProgressIndicator

          this.props.updatetimeLeft(timeLeft) // Calling the "updateTimeLeft" action function to update the global state "timeLeft"

        }

      }

    }



  }

  stopTimer() {
    this.setState({isOn: false});

    clearInterval(this.timer);

    this.props.setExercisePause(true);
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

    this.updateRange(this.exerciseStack[this.exercisePointer].rangeVal);
    this.completed = 0;
    this.props.updateCompleted(this.completed)
    this.exercisePointer = 0;
    this.completed = 0;
    this.setState({time: 0, isOn: false})
    this.props.setRange(0)
    this.props.addWord([])
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
    let completed = 0;
    this.total = 0;

    if (this.exerciseStack && this.exerciseStack.length > 0) {

      let className = 'RoutineContainer';

      for (let i = 0; i < this.exerciseStack.length; i++) {

        if (i === current) {
          className = 'CurrentRoutineContainer';
        } else {
          className = 'RoutineContainer';
        }

        if (this.exerciseStack[i].mode === 'Word' || this.exerciseStack[i].mode === 'Sentence') {
          this.total++;
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

    let status = this.completed + ' of ' + this.total + ' Exercises Completed';
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
            <Range range={rangeVal} updateRange={this.updateRange}/>
          </div>
        </div>

        <br /><br />
        <div className="RoutineSelector">
                    <RoutineSelectContainer ref={this.routineSelect} action={this.routineSelectHandler} />
                </div>
                <br /><br />
                <Typography variant="h6">({ms(this.state.time, {compact: true})})</Typography>
                <br /><br />

               {/*  <Typography style={{color: this.props.dark === true ? 'white' : 'black'}} variant="h6">{currentExercise}</Typography> */}
                {/* <Typography style={{color: this.props.dark === true ? 'white' : 'black'}} variant="h6">{completeExerciseStack}</Typography> */}
      </Grid>


    )
  }
}

export default withStyles(styles)(Timer);
