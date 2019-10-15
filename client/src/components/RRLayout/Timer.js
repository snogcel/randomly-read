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
      timeLeft: 0,
      isOn: false,
      start: 0,
      lastUpdated: -1,
      rangeVal: 3,
      mode: 'Word',
      vowel: [],
      consonant: [],
      templates: [],
      syllables: [],
      location: 'initial',
      limit: 1,
    };

    this.timerHandler = this.timerHandler.bind(this);

    this.routineSelectHandler = this.routineSelectHandler.bind(this);
    this.updateRange = this.updateRange.bind(this);

    this.startTimer = this.startTimer.bind(this);
    this.resumeTimer = this.resumeTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimerAndQuery = this.resetTimerAndQuery.bind(this);
    this.resetTimer = this.resetTimer.bind(this);

    // this.resetTimerQueryAndEH = this.resetTimerQueryAndEH.bind(this); // ??

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

      this.props.addExercise([]);
      this.props.addExerciseNumber(null);
      this.props.addWord([]);

    } else {

      for (let i = 0; i < routine.subroutine.length; i++) {
        this.exerciseStack.push(routine.subroutine[i]);
      }

      this.exercisePointer = 0; // fetch first entry in routine stack

      // add current exercise to props and state
      this.props.addExercise(this.exerciseStack);
      this.setExercise(this.exerciseStack[this.exercisePointer]);

      // add current timer value to props and state
      // this.updateRange(this.exerciseStack[this.exercisePointer].rangeVal);
      // this.props.setRange(this.exerciseStack[this.exercisePointer].rangeVal);

      this.props.addExerciseNumber(null); // TODO - delete?
      this.completed = 0; // TODO - delete?
      this.props.addWord([]); // TODO - delete?

      this.stopTimer();
      this.resetTimerAndQuery();

    }

  }

  setExercise(exercise) {

    console.log("Modify exerciseConfig...");

    // Stub out exerciseConfig
    let duration = (parseInt(exercise.repetitions) * parseInt(exercise.rangeVal));

    exercise.duration = duration; // calculation exercise duration
    exercise.templates = []; // for future functionality
    exercise.limit = 1; // for future functionality
    (exercise.mode === "word") ? exercise.map = "randomly" : exercise.map = "default";

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
    this.props.updateTimeLeft(parseInt(exercise.rangeVal));

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
      start: Date.now() - this.state.time,
      lastUpdated: Date.now()
    });

    this.timer = setInterval(() => this.setState({
      time: Date.now()
    }), 25);

    // TODO - initiate routine

    let routineKeys = this.currentRoutine.keys();
    let currentKey = routineKeys.next().value;

    this.timerHandler(this.currentRoutine.get(currentKey));
    this.currentRoutine.delete(currentKey);

  }

  shouldComponentUpdate(nextProps, nextState) {

    // TODO - Throttle

    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    /*
    if(this.props.isModalOpen === false && this.props.currentExerciseNumber !== null) {
      this.resumeTimer();
      this.props.setModalOpen(null);
    }
    if(this.props.isModalOpen === true) {
      this.stopTimer();
      this.props.setModalOpen(null);
    }
    */

    if(this.props.completed !== this.completed && this.completed !== 0) {
      console.log("DEBUG: update completed: ", this.completed);
      this.props.updateCompleted(this.completed);
    }
    if(this.props.total !== this.total && this.total !== 0) {
      console.log("DEBUG: update total: ", this.total);
      this.props.updateTotal(this.total);
    }

    if(this.props.currentExerciseNumber !== null && this.props.currentExerciseNumber !== this.exercisePointer) {
      console.log("DEBUG: update currentExerciseNumber: ", this.props.currentExerciseNumber);
      this.exercisePointer = this.props.currentExerciseNumber;
      this.setExercise(this.exerciseStack[this.exercisePointer]);
    }

    if (((prevState.time - this.state.lastUpdated) > (this.state.rangeVal * 1000)) && (prevState.isOn)) {

      let routineKeys = this.currentRoutine.keys();
      let currentKey = routineKeys.next().value;

      let nextAction = this.currentRoutine.get(currentKey);

      if (!nextAction && (this.exercisePointer === (this.exerciseStack.length - 1))) {

        console.log("-end of exercise stack reached!");

        this.setState({timeLeft: null});

        this.props.updateTimeLeft(null); // Calling the "updateTimeLeft" action function to update the global state "timeLeft"

        console.log(this.props.timeLeft);

        this.stopTimer();

      }

      if (!nextAction && (this.exerciseStack.length > 0) && (this.exercisePointer < (this.exerciseStack.length - 1))) {

        // Check if end of exercise stack

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

        this.timerHandler(nextAction);
        this.currentRoutine.delete(currentKey);

        this.setState({
          lastUpdated: Date.now()
        });
      }


    } else if (prevState.isOn) {

      this.timeLeftLastUpdated++;

      if (this.timeLeftLastUpdated > 1) {

        this.timeLeftLastUpdated = 0;

        let timeLeft = (Math.round(((this.state.rangeVal * 1000) - (prevState.time - this.state.lastUpdated))/1000)); // Math.ceil() was rounding up and increase the range + 1, round() returns the exact range selected

        if (timeLeft > this.state.rangeVal) timeLeft = this.state.rangeVal; // edge cases where timeLeft > rangeVal

        if (timeLeft !== this.state.timeLeft) {

          this.setState({
            timeLeft: timeLeft
          });

          this.props.updateTimeLeft(timeLeft) // Calling the "updateTimeLeft" action function to update the global state "timeLeft"

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

    console.log("-reset timer and query-");

    this.exercisePointer = 0;
    this.setState({time: 0, isOn: false})
    this.props.addRoutineVowel(null);
    this.props.removeConsonant();
    this.props.addSyllables([1])
    this.props.setMode('Word');

  }

  resetTimer() {

    console.log("-reset timer and exercise stack-");

    this.exercisePointer = 0;
    this.setState({time: 0, isOn: false});
    this.props.addExerciseNumber(this.exercisePointer);

    this.props.addRoutineVowel(null);
    this.props.removeConsonant();
    this.props.addSyllables([1]);
    this.props.setMode('Word');

  }

  /*
  resetTimerQueryAndEH() {

    this.updateRange(this.exerciseStack[this.exercisePointer].rangeVal);
    this.completed = 0;
    this.props.updateCompleted(this.completed); // what does this do?
    this.exercisePointer = 0;
    this.completed = 0;
    // this.setState({time: 0, isOn: false})
    this.setState({isOn: false})
    this.props.setRange(0);
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
  */

  timerHandler(options) {
    let mode = this.state.mode;
    let vowel = this.state.vowel;
    let consonant = this.state.consonant;
    let templates = this.state.templates;
    let syllables = this.state.syllables;

    let refresh = false;

    function difference(lastProps, newProps) {
      let newSet = new Set(newProps);
      return lastProps.filter(function(x) { return !newSet.has(x); });
    }

    // Handle Consonants
    let newConsonants = options.consonant;
    let removedConsonants = difference(consonant, newConsonants);
    if (removedConsonants.length === 0) refresh = true;
    // this.consonantCheckboxes.current.unsetMany(removedConsonants);
    // this.consonantCheckboxes.current.setMany(newConsonants);

    // Handle Vowels
    // let newVowels = options.vowel;
    // let removedVowels = difference(vowel, newVowels);
    // this.vowelCheckboxes.current.unsetMany(removedVowels);
    // this.vowelCheckboxes.current.setMany(newVowels);

    // Handle Syllables
    // this.syllablesSelect.current.removeAll();
    // this.syllablesSelect.current.setMany(options.syllables);

    let limitText = this.state.limit;

    if(!options.intermissionText) {

      // Handle Word / Sentence Mode
      // this.modeSelect.current.set(options.mode);

    } else {

      // Handle Intermission
      // this.queryWindow.current.setMode('intermission', options.intermissionText);

    }

    mode = options.mode;
    vowel = options.vowel;
    consonant = options.consonant;
    templates = options.templates;
    syllables = options.syllables;

    // passes updated variables to redux
    console.log("- passing updated variables to redux..");
    this.props.addRoutineVowel(options.vowel); // pass to TimerContainer
    this.props.addConsonant(options.consonant); // pass to TimerContainer
    this.props.addSyllables(options.syllables); // pass to TimerContainer
    this.props.setLimit(limitText); // pass to TimerContainer
    this.props.setMode(mode); // pass to TimerContainer
    this.props.setIntermissionText(options.intermissionText); // pass to TimerContainer

    if (this.state.mode === "Intermission") refresh = false;

    this.setState({
      mode: mode,
      vowel: vowel,
      consonant: consonant,
      templates: templates,
      syllables: syllables,
      limit: limitText,
      time: Math.round((new Date()).getTime())
    });

    if (refresh) {
      console.log("Refetching...");
      // this.queryWindow.current.refreshQuery();
    } else {
      console.log("Fetching...");
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
    let resume = (this.state.time === 0 || this.state.isOn || this.state.timeLeft === null) ?
      null : <Button className={classes.button} onClick={this.resumeTimer} size="medium" variant="contained" color={"primary"} ><b>Resume</b></Button>;
    let reset = (this.state.time === 0 || this.state.isOn) ?
      null : <Button className={classes.button} onClick={this.resetTimer} size="small" variant="contained" color={"primary"} ><b>Reset</b></Button>;


    return(

      <Grid>
        <div className="RoutineSelector">
          <RoutineSelectContainer ref={this.routineSelect} action={this.routineSelectHandler} />
        </div>

        <br /><br />

        <div className="TimerControls">
          {start}
          {resume}
          {stop}
          {reset}
        </div>

        <br /><br />

        {/* <div className="RangeContainer"> <Range range={rangeVal} updateRange={this.updateRange}/> </div> */}
        {/*  <Typography style={{color: this.props.dark === true ? 'white' : 'black'}} variant="h6">{currentExercise}</Typography> */}
        {/* <Typography style={{color: this.props.dark === true ? 'white' : 'black'}} variant="h6">{completeExerciseStack}</Typography> */}

      </Grid>


    )
  }
}

export default withStyles(styles)(Timer);
