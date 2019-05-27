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
    this.resetTimer = this.resetTimer.bind(this);

    this.exerciseStack = [];
    this.exercisePointer = 0;

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
      
    }
    else {
      
      for (let i = 0; i < routine.subroutine.length; i++) {
        this.exerciseStack.push(routine.subroutine[i]);
      }
      // fetch first entry in routine stack
      this.exercisePointer = 0;
  
      this.updateRange(this.exerciseStack[this.exercisePointer].rangeVal);
      this.setExercise(this.exerciseStack[this.exercisePointer]);
  
      this.stopTimer();
      this.resetTimer();
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

    if ((prevState.time - this.state.lastUpdated) > (this.state.rangeVal * 1000)) {

      let routineKeys = this.currentRoutine.keys();
      let currentKey = routineKeys.next().value;

      let nextAction = this.currentRoutine.get(currentKey);

      if (!nextAction && (this.exerciseStack.length > 0) && (this.exercisePointer < (this.exerciseStack.length - 1))) {

        this.exercisePointer++;

        console.log("Exercise Stack Pointer: ", this.exercisePointer);

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

  resetTimer() {
    console.log(this.props)
    this.exercisePointer = 0;
    this.setState({time: 0, isOn: false})
    this.props.addRoutineVowel(null);
    this.props.removeConsonant();
    this.props.addSyllables([1])
    this.props.setMode('Word');
  }

  render() {
    
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

    let status = completed + ' of ' + total + ' Exercises Completed';
    let isDisabled = currentExercise === null ? true : false;
    let start = (this.state.time === 0) ?
      <Button onClick={this.startTimer} disabled={isDisabled} size="medium" variant="contained" color="primary" >Start Routine</Button> : null;
    let stop = (this.state.time === 0 || !this.state.isOn) ?
      null : <Button onClick={this.stopTimer} size="medium" variant="contained" color="primary" >Pause</Button>;
    let resume = (this.state.time === 0 || this.state.isOn) ?
      null : <Button onClick={this.resumeTimer} size="medium" variant="contained" color="primary" >Resume</Button>;
    let reset = (this.state.time === 0 || this.state.isOn) ?
      null : <Button onClick={this.resetTimer} size="small" variant="contained" color="primary" >Reset</Button>;

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
                <h4>{status} ({ms(this.state.time, {compact: true})})</h4>
                <br /><br />

                <Typography variant="h6" >{currentExercise}</Typography>
                <Typography variant="h6">{completeExerciseStack}</Typography>
      </Grid>


    )
  }
}

export default Timer;
