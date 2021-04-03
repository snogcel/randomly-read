import RoutineBuilder from '../RRLayout/RoutineBuilder';
//import Routines from './Routines.js';
//import { AwesomeButton } from 'react-awesome-button';
import Button from '@material-ui/core/Button';
import React from 'react';
import ms from 'pretty-ms';
import Grid from '@material-ui/core/Grid';


import RoutineSelectContainer from './Exercises/Exercise1/RoutineSelectContainer';


import { Typography } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';

import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';


import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';


import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

import ReplayIcon from '@material-ui/icons/Replay';


import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';



import { styles } from '../../themeHandler';
import InteractionForm from "../Interactions/InteractionsHome";

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
      position: 'initial',
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

    this.exerciseStack = [];
    this.exercisePointer = null;
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

    } else {

      // populate subroutine with word complexity (age)
      let age = routine.age || "0";

      for (let i = 0; i < routine.subroutine.length; i++) {
        routine.subroutine[i].age = age;

        this.exerciseStack.push(routine.subroutine[i]);
      }

      this.exercisePointer = 0; // fetch first entry in routine stack

      // add current exercise to props and state
      this.props.addExercise(this.exerciseStack);
      this.setExercise(this.exerciseStack[this.exercisePointer]);
      this.props.addExerciseNumber(this.exercisePointer);

      this.completed = 0; // TODO - delete?

      this.stopTimer();
      this.resetTimerAndQuery();

    }

  }

  setExercise(exercise) {

    // console.log("Modify exerciseConfig...");

    // console.log(exercise);

    // Stub out exerciseConfig
    let duration = (parseInt(exercise.repetitions) * parseInt(exercise.rangeVal));
    let defaultConsonants = ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","DH","ZH"]; // 23
    let defaultVowels = ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW"]; // 14

    exercise.duration = duration; // calculation exercise duration
    exercise.templates = []; // for future functionality
    exercise.limit = 1; // for future functionality
    (exercise.mode === "Word") ? exercise.map = "randomly" : exercise.map = "default";

    if (exercise.isIntermission) {
      exercise.consonants = [];
      exercise.vowels = [];
      exercise.syllables = [];
      exercise.map = "intermission";
      exercise.mode = "Intermission";
    } else {

      if (exercise.vowels.length === 0) exercise.vowels = defaultVowels;
      if (exercise.consonants.length === 0) exercise.consonants = defaultConsonants;

    }

    // console.log("Consonant Array Length: ", exercise.consonants.length);
    // console.log("Vowel Array Length: ", exercise.vowels.length);

    // Update Timer Value
    this.setState({ rangeVal: exercise.rangeVal });
    this.props.setRange(parseInt(exercise.rangeVal));
    this.props.updateTimeLeft(parseInt(exercise.rangeVal));

    switch (exercise.map) {
      case 'default':
        this.currentRoutine = this.routineBuilder.build(exercise);
        // console.log("Exercise Map", this.currentRoutine);
        break;
      case 'randomly':
        this.currentRoutine = this.routineBuilder.buildRandomly(exercise);
        // console.log("Exercise Map", this.currentRoutine);
        break;
      case 'intermission':
        this.currentRoutine = this.routineBuilder.buildIntermission(exercise);
        // console.log("Exercise Map (Intermission)", this.currentRoutine);
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

    let prevTime = this.state.time;
    let time = Date.now();
    let lastUpdated = this.state.lastUpdated;

    lastUpdated += (time - prevTime);

    this.setState({
      isOn: true,
      start: time,
      lastUpdated: lastUpdated
    });

    this.timer = setInterval(() => this.setState({
      time: Date.now()
    }), 25);

  }

  startTimer() {
    this.props.setRange(this.state.rangeVal);
    this.props.setExercisePause(false);
    this.props.addExercise(this.exerciseStack);
    this.props.addExerciseNumber(this.exercisePointer);

    this.setExercise(this.exerciseStack[this.exercisePointer]);

    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now(),
      lastUpdated: Date.now()
    });

    this.timer = setInterval(() => this.setState({
      time: Date.now()
    }), 25);

    let routineKeys = this.currentRoutine.keys();
    let currentKey = routineKeys.next().value;

    this.timerHandler(this.currentRoutine.get(currentKey));
    this.currentRoutine.delete(currentKey);

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    // Updates the total number of Completed Exercises in Routine
    if(this.props.completed !== this.completed && this.completed !== 0) {
      this.props.updateCompleted(this.completed);
    }

    // Updates the total number of Exercises in Routine
    if(this.props.total !== this.total && this.total !== 0) {
      this.props.updateTotal(this.total);
    }

    // Allows user to skip ahead in Exercise Set...
    /*
    if(this.props.currentExerciseNumber !== null && this.props.currentExerciseNumber !== this.exercisePointer) {
      console.log("DEBUG: update currentExerciseNumber: ", this.props.currentExerciseNumber);
      this.exercisePointer = this.props.currentExerciseNumber;
      this.setExercise(this.exerciseStack[this.exercisePointer]);
    }
    */

    // Detects if Routine to advance to next Action
    if (((prevState.time - this.state.lastUpdated) > (this.state.rangeVal * 1000)) && (prevState.isOn)) {

      let routineKeys = this.currentRoutine.keys();
      let currentKey = routineKeys.next().value;

      let nextAction = this.currentRoutine.get(currentKey);

      // If end of Exercise Stack is reached, stop Timer
      if (!nextAction && (this.exercisePointer === (this.exerciseStack.length - 1))) {
        this.setState({timeLeft: null});
        this.props.updateTimeLeft(null); // Calling the "updateTimeLeft" action function to update the global state "timeLeft"

        this.stopTimer();
      }

      // If no 'next Action' in Exercise, advance to next Exercise Set in Routine
      if (!nextAction && (this.exerciseStack.length > 0) && (this.exercisePointer < (this.exerciseStack.length - 1))) {

        if(this.exerciseStack[this.exercisePointer].map !== 'intermission') this.completed++;

        this.exercisePointer++;

        this.props.addExerciseNumber(this.exercisePointer);

        this.setExercise(this.exerciseStack[this.exercisePointer]);

        routineKeys = this.currentRoutine.keys();

        currentKey = routineKeys.next().value;

        nextAction = this.currentRoutine.get(currentKey);
      }

      // Proceed to 'next Action' in Exercise
      if (nextAction) {

        this.timerHandler(nextAction);
        this.currentRoutine.delete(currentKey);

        this.setState({
          lastUpdated: Date.now()
        });

      }

    } else if (prevState.isOn) {

      // Handle Progress Indicator / timeLeft

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

  stopTimer() {
    this.setState({isOn: false});

    clearInterval(this.timer);

    this.props.setExercisePause(true);
  }

  resetTimerAndQuery() {

    // console.log("-reset timer and query-");

    this.exercisePointer = 0;
    this.setState({time: 0, isOn: false});
    this.props.addExerciseNumber(null);

    this.props.addRoutineVowel([]); // null?
    this.props.removeConsonant();
    this.props.addSyllables([1]);
    this.props.setMode('Word');

    // Clear Query History
    this.props.clearQueryResults();

    // Reset Current Exercise
    this.completed = 0;
    this.props.updateCompleted(0);

  }

  resetTimer() {

    // console.log("-reset timer and exercise stack-");

    this.exercisePointer = 0;
    this.setState({time: 0, isOn: false});
    this.props.addExerciseNumber(null);

    this.props.addRoutineVowel([]); // null?
    this.props.removeConsonant();
    this.props.addSyllables([1]);
    this.props.setMode('Word');

    // Clear Query History
    this.props.clearQueryResults();

    // Reset Current Exercise
    this.completed = 0;
    this.props.updateCompleted(0);

  }

  timerHandler(options) {
    let mode = this.state.mode;
    let vowel = this.state.vowel;
    let consonant = this.state.consonant;
    let position = this.state.position;
    let age = this.state.age;
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
    position = options.position;
    age = options.age;

    // passes updated variables to redux
    // console.log("- passing updated variables to redux..");
    this.props.addExerciseNumber(this.exercisePointer);
    this.props.addRoutineVowel(options.vowel); // pass to TimerContainer
    this.props.addConsonant(options.consonant); // pass to TimerContainer
    this.props.addSyllables(options.syllables); // pass to TimerContainer
    this.props.setLimit(limitText); // pass to TimerContainer
    this.props.setMode(mode); // pass to TimerContainer
    this.props.setPosition(position); // pass to TimerContainer
    this.props.setAge(age); // pass to TimerContainer
    this.props.setIntermissionText(options.intermissionText); // pass to TimerContainer

    if (this.state.mode === "Intermission") refresh = false;

    this.setState({
      mode: mode,
      vowel: vowel,
      consonant: consonant,
      position: position,
      age: age,
      templates: templates,
      syllables: syllables,
      limit: limitText,
      time: Math.round((new Date()).getTime())
    });

    if (refresh) {
      // console.log("Refetching...");
      // this.queryWindow.current.refreshQuery();
    } else {
      // console.log("Fetching...");
    }

  }

  render() {

    const { classes } = this.props;
    const { width } = this.props;
    const { rangeVal } = this.state;

    let currentExercise = null;

    if(this.exerciseStack.length === 0) {
      currentExercise = null;
    }

    let current = this.exercisePointer;
    let completed = 0;

    this.total = 0;

    if (this.exerciseStack && this.exerciseStack.length > 0) {

      for (let i = 0; i < this.exerciseStack.length; i++) {

        if (this.exerciseStack[i].mode === 'Word' || this.exerciseStack[i].mode === 'Sentence') {
          this.total++;
          if (i < current) completed++;
        }

      }

    }

    /*

    let start = (this.state.time === 0) ?
      <Button onClick={this.startTimer} size="small" variant="outlined" color={"default"} ><b>Start</b></Button> : null;

    let stop = (this.state.time === 0 || !this.state.isOn) ?
      null : <Button onClick={this.stopTimer} size="small" variant="outlined" color={"default"} ><b>Pause</b></Button>;

    let resume = (this.state.time === 0 || this.state.isOn || this.state.timeLeft === null) ?
      null : <Button onClick={this.resumeTimer} size="small" variant="outlined" color={"default"} ><b>Resume</b></Button>;

    let reset = (this.state.time === 0 || this.state.isOn) ?
      null : <Button onClick={this.resetTimer} size="small" variant="outlined" color={"default"} ><b>Reset</b></Button>;

    console.log("Current Exercise: ", this.props.currentExercise);
     */


    let start = (this.state.time === 0) ?
      <IconButton onClick={this.startTimer} className={classes.iconButton} aria-label="start" color={"primary"}><PlayCircleFilledIcon fontSize="large" /></IconButton> : null;
    let stop = (this.state.time === 0 || !this.state.isOn) ?
      null : <IconButton onClick={this.stopTimer} className={classes.iconButton} aria-label="start" color={"primary"}><PauseCircleFilledIcon fontSize="large" /></IconButton>;
    let resume = (this.state.time === 0 || this.state.isOn || this.state.timeLeft === null) ?
      null : <IconButton onClick={this.resumeTimer} className={classes.iconButton} aria-label="start" color={"primary"}><PlayCircleFilledIcon fontSize="large" /></IconButton>;
    let reset = (this.state.time === 0 || this.state.isOn) ?
      null : <IconButton disableFocusRipple onClick={this.resetTimer} className={classes.iconButton} aria-label="start" color={"primary"} style={{ backgroundColor: 'transparent' }} ><ReplayIcon /></IconButton>;

    let TimerFragment = <React.Fragment>
      <Grid container justify="center" className={classes.routineSelectContainer}>

        <Grid item>
          <div className={classes.RoutineSelector}>
            <RoutineSelectContainer ref={this.routineSelect} action={this.routineSelectHandler} />
          </div>
        </Grid>

        <Grid item>
          {(this.props.currentExercise.length > 0) ? (
            <>
              <div className={classes.TimerControls}>
                {start}
                {resume}
                {stop}
                {reset}
              </div>
            </>
          ) : ( <> </> )}
        </Grid>

      </Grid>
    </React.Fragment>;


    if (width === "lg" || width === "xl") {

      return (
        <Card className={classes.userAdminCard}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className={classes.heading}>
              Available Routines
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Use the dropdown menu to select a practice routine or to focus on a specific word.
            </Typography>
            <br />
            {TimerFragment}
          </CardContent>
        </Card>
      )

    } else {

      return (
        <React.Fragment>

          <Grid container className={classes.timerControlGrid} spacing={0} justify="center">

            <Grid item xs={12} className={classes.mobileRoutineSelectContainer}>
              <Typography variant="h5" component="h2" className={classes.mobileHeading}>
                Available Routines
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                Use the menu to select a practice routine.
              </Typography>
            </Grid>

            <Grid item xs={12} className={classes.mobileRoutineSelectContainer}>
              {TimerFragment}
            </Grid>
          </Grid>

        </React.Fragment>
      )

    }

  }
}

/*

<Grid container className={classes.timerControlGrid} spacing={0} justify="center">
          <Grid item>
            {TimerFragment}
          </Grid>
        </Grid>

 */

Timer.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

const TimerWrapped = withStyles(styles)(Timer);

export default withWidth()(TimerWrapped);
