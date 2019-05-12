import RoutineBuilder from './RoutineBuilder';
import Range from "./Range";
import Routines from './Routines.js';
import { AwesomeButton } from 'react-awesome-button';

const React = require('react');
const ms = require('pretty-ms');

class Timer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      time: 0,
      isOn: false,
      start: 0,
      lastUpdated: -1,
      rangeVal: 3
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
  }

  componentDidMount() {

    // TODO - find a better way to set routines

    this.routineSelectHandler(Routines[1]);

  }

  routineSelectHandler(routine) {

    this.exerciseStack = [];

    // Build Routine Stack
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
  }

  resetTimer() {
    this.exercisePointer = 0;
    this.setState({time: 0, isOn: false})
  }

  render() {
    const { rangeVal } = this.state;

    let currentExercise = null;

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

    let start = (this.state.time === 0) ?
      <AwesomeButton action={this.startTimer} size="medium" type="primary">Start Routine</AwesomeButton> : null;
    let stop = (this.state.time === 0 || !this.state.isOn) ?
      null : <AwesomeButton action={this.stopTimer} size="medium" type="primary">Pause</AwesomeButton>;
    let resume = (this.state.time === 0 || this.state.isOn) ?
      null : <AwesomeButton action={this.resumeTimer} size="medium" type="primary">Resume</AwesomeButton>;
    let reset = (this.state.time === 0 || this.state.isOn) ?
      null : <AwesomeButton action={this.resetTimer} size="small" type="primary">Reset</AwesomeButton>;

    return(
      <div>


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

        <h4>{status} ({ms(this.state.time, {compact: true})})</h4>

      </div>
    )
  }
}

export default Timer;
