import React from 'react';
import RoutineBuilder from '../RRLayout/RoutineBuilder';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';

import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import ReplayIcon from '@material-ui/icons/Replay';

import { styles } from '../../exerciseThemeHandler';

class Timer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      age: this.props.age || 0,
      time: this.props.time || 0,
      timeLeft: this.props.timeLeft,
      isOn: !!this.props.isPaused,
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
    this.completed = this.props.completed || 0;
    this.total = 0;
    this.timeLeftLastUpdated = 0;
    this.routineBuilder = new RoutineBuilder();

    this.currentRoutine = {};
    this.isEmpty = this.isEmpty.bind(this);

    this.debug = false;

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

  componentWillUnmount() {
    this.stopTimer();
  }

  routineSelectHandler(routine) {

    let routineChange = !(JSON.stringify(this.props.currentExercise) === JSON.stringify(routine.subroutine));
    let timerReset = false;

    if (!routineChange) {

      // no change in routine (likely a page refresh)
      if (this.debug) console.log("resuming exercise...");

      // add current exercise to props and state
      this.exerciseStack = this.props.currentExercise;
      this.exercisePointer = this.props.currentExerciseNumber || 0; // TODO? -- confirm this should be 0
      this.setExercise(this.exerciseStack[this.exercisePointer]);

    } else {

      // routine change has been detected
      if (this.debug) console.log("routine change detected");

      // reset timer
      timerReset = true;
      this.props.updateTime(0);
      this.setState({time: 0, timeLeft: 0, isOn: false});
      this.props.setMode('Word');
      this.props.setInProgress(false);

      // reset exercise
      this.exerciseStack = [];
      this.exercisePointer = 0;

      // remove last displayed word
      this.props.removeWord();

      if(this.isEmpty(routine)) {

        this.exercisePointer = null;

      } else {

        this.exercisePointer = 0;

        // populate subroutine with word complexity (age)
        let age = routine.age || "0";

        for (let i = 0; i < routine.subroutine.length; i++) {
          routine.subroutine[i].age = age;
          this.exerciseStack.push(routine.subroutine[i]);
        }
      }
    }

    // add current exercise to props and state
    this.props.addExercise(this.exerciseStack);
    this.props.addExerciseNumber(this.exercisePointer);

    // set exercise (if needed)
    if (this.exercisePointer >= 0 && timerReset) {

      if (this.debug) console.log("-routine select change... ", this.props);

      // if (this.props.mode !== "Intermission") this.props.buildGraphQL(this.props);

      this.setExercise(this.exerciseStack[this.exercisePointer]);
    }

    if (timerReset) {
      this.resetTimer(); // full reset
    } else {
      this.softResetTimer(); // soft reset (routine in progress)
    }

  }

  setExercise(exercise) {

    // Stub out the exercise configuration
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

    // Stub out initial query
    let nextAction = this.currentRoutine.get(0);

    if (this.debug) console.log("current routine: ", nextAction);

    if (nextAction.mode !== "Intermission") this.props.buildGraphQL(nextAction);

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

    this.props.setInProgress(true);

    this.setState({
      isOn: true,
      start: time,
      lastUpdated: lastUpdated
    });

    this.timer = setInterval(() => this.setState({
      time: Date.now()
    }), 25);

    /*
    let routineKeys = this.currentRoutine.keys();
    let currentKey = routineKeys.next().value;
    let currentRoutine = this.currentRoutine.get(currentKey);
    */

  }

  startTimer() {

    this.props.setRange(this.state.rangeVal);
    this.props.setExercisePause(false);
    this.props.addExercise(this.exerciseStack);
    this.props.addExerciseNumber(this.props.currentExerciseNumber);

    this.exercisePointer = this.props.currentExerciseNumber || 0; // TODO -- added in support of L492
    this.setExercise(this.exerciseStack[this.exercisePointer]);

    if (this.debug) console.log("-timer: current exercise pointer: ", this.exercisePointer);
    if (this.debug) console.log("-timer: current exercise number: ", this.props.currentExerciseNumber);

    this.timer = setInterval(() => this.setState({
      time: Date.now()
    }), 25);

    let routineKeys = this.currentRoutine.keys();
    let currentKey = routineKeys.next().value;
    let currentRoutine = this.currentRoutine.get(currentKey);

    this.timerHandler(currentRoutine);

    this.props.setInProgress(true);

    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now(),
      lastUpdated: Date.now()
    });

    this.currentRoutine.delete(currentKey);

  }

  shouldComponentUpdate(nextProps) {

    if ((JSON.stringify(this.props.currentExercise) !== JSON.stringify(nextProps.currentExercise))) {
      if (this.debug) console.log("-other resetTimer()-");
      this.resetTimerAndQuery();
    }

    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    // Updates the total number of Exercises in Routine
    if(this.props.total !== this.total && this.total !== 0) {
      this.props.updateTotal(this.total);
    }

    if (JSON.stringify(prevProps.currentExercise) === JSON.stringify(this.props.currentExercise)) {

      if (this.props.completed !== null) this.completed = this.props.completed;

      if (this.props.currentExerciseNumber !== null) {
        this.exercisePointer = this.props.currentExerciseNumber;

        if (this.props.currentExerciseNumber !== this.exercisePointer) {
          console.log("-resuming exercise stack: ", this.exerciseStack);
          this.setExercise(this.exerciseStack[this.exercisePointer]);
        }

      }

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

      // If no 'next Action' in Exercise, advance to next Exercise Set in Routine
      if (!nextAction && (this.exerciseStack.length > 0) && (this.exercisePointer < (this.exerciseStack.length - 1))) {

        if(this.exerciseStack[this.exercisePointer].map !== 'intermission') {
          this.completed++;
          this.props.updateCompleted(this.completed);
        }

        this.exercisePointer++;

        this.props.addExerciseNumber(this.exercisePointer);

        this.setExercise(this.exerciseStack[this.exercisePointer]);

        routineKeys = this.currentRoutine.keys();

        currentKey = routineKeys.next().value;

        nextAction = this.currentRoutine.get(currentKey);
      }

      // If end of Exercise Stack is reached, stop Timer
      if (!nextAction && (this.exercisePointer === (this.exerciseStack.length - 1))) {
        this.setState({timeLeft: null});
        this.props.updateTimeLeft(null); // Calling the "updateTimeLeft" action function to update the global state "timeLeft"

        this.props.setInProgress(false);
        this.props.setIsCompleted(true);
        this.stopTimer();
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

    this.props.updateTime(this.state.time);
    this.props.setExercisePause(true);
  }

  resetTimerAndQuery() {

    if (this.debug) console.log("-reset timer and query-");

    this.props.updateTime(0);
    this.props.updateTimeLeft(0);

    this.props.setInProgress(false);
    this.props.addExerciseNumber(null);
    this.props.setMode('Word');

    this.props.addRoutineVowel([]); // null?
    this.props.removeConsonant();
    this.props.addSyllables([1]);

    this.stopTimer();

    this.exercisePointer = 0;

    this.setState({time: 0, timeLeft: 0, isOn: false});

    this.setExercise(this.exerciseStack[0]);

    // Clear Query History
    this.props.clearQueryResults();
    this.props.removeWord();

    // Reset Current Exercise
    this.completed = 0;
    this.props.updateCompleted(0);

  }

  softResetTimer() {

    let consonant = this.props.consonant;
    let vowel = this.props.vowel;

    if ((typeof(consonant) !== "undefined" && consonant) || ( vowel === null && consonant === null)) {

      if (this.debug) console.log("-routine in progress-");

    } else {

      this.stopTimer();

      this.exercisePointer = 0;
      this.setState({time: 0, timeLeft: 0, isOn: false});

      this.props.setInProgress(false);
      this.props.addExerciseNumber(null);

      // Reset card
      if (this.exercisePointer === 0) this.props.removeWord();

      // Reset Exercise Stack
      this.setExercise(this.exerciseStack[this.exercisePointer]);

      // Clear Query History
      this.props.clearQueryResults();

      // Reset Current Exercise
      this.completed = 0;
      this.props.setIsCompleted(false);
      this.props.updateCompleted(0);
    }

  }

  resetTimer() {

    this.stopTimer();

    this.exercisePointer = null; // TODO - check this out?
    this.setState({time: 0, timeLeft: 0, isOn: false});

    this.props.updateTime(0);
    this.props.updateTimeLeft(0);

    this.props.setInProgress(false);
    this.props.addExerciseNumber(null);
    this.props.setMode('Word');

    this.setExercise(this.exerciseStack[0]); // TODO -- see L493

    // Clear Query History
    this.props.clearQueryResults();
    this.props.removeWord();

    // Reset Current Exercise
    this.completed = 0;
    this.props.setIsCompleted(false);
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

    // let refresh = false;

    /*
    function difference(lastProps, newProps) {
      let newSet = new Set(newProps);
      return lastProps.filter(function(x) { return !newSet.has(x); });
    }
    */

    // Handle Consonants
    // let newConsonants = options.consonant;
    // let removedConsonants = difference(consonant, newConsonants);
    // if (removedConsonants.length === 0) refresh = true;
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

    mode = options.mode;
    vowel = options.vowel;
    consonant = options.consonant;
    templates = options.templates;
    syllables = options.syllables;
    position = options.position;
    age = options.age;

    // passes updated variables to redux
    this.props.addExerciseNumber(this.exercisePointer);
    this.props.addRoutineVowel(options.vowel); // pass to TimerContainer
    this.props.addConsonant(options.consonant); // pass to TimerContainer
    this.props.addSyllables(options.syllables); // pass to TimerContainer
    this.props.setLimit(limitText); // pass to TimerContainer
    this.props.setMode(mode); // pass to TimerContainer
    this.props.setPosition(position); // pass to TimerContainer
    this.props.setAge(age); // pass to TimerContainer
    this.props.setIntermissionText(options.intermissionText); // pass to TimerContainer
    this.props.updateTimeLeft(0);

    let graphQL = {
      vowel: vowel,
      consonant: consonant,
      syllables: syllables,
      limit: 1,
      position: position,
      age: age,
      mode: mode
    };

    // build updated graphQL query
    if (mode !== "Intermission") this.props.buildGraphQL(graphQL);

    this.setState({
      mode: mode,
      vowel: vowel,
      consonant: consonant,
      position: position,
      age: age,
      templates: templates,
      syllables: syllables,
      limit: limitText,
      time: Math.round((new Date()).getTime()),
      timeLeft: 0
    });

  }

  render() {

    const { classes } = this.props;
    const { RoutineSelectContainer } = this.props;

    // TODO -- move this, it shouldn't be in render()
    this.total = 0;

    if (this.exerciseStack && this.exerciseStack.length > 0) {
      for (let i = 0; i < this.exerciseStack.length; i++) {
        if (this.exerciseStack[i].mode === 'Word' || this.exerciseStack[i].mode === 'Sentence') {
          this.total++;
        }
      }
    }

    let start = (this.props.isPaused && !this.props.inProgress && !this.props.isCompleted) ?
      <IconButton onClick={this.startTimer} className={classes.iconButton} aria-label="start" color={"primary"}><PlayCircleFilledIcon fontSize="large" /></IconButton> : null;

    let stop = (this.props.isPaused || !this.state.isOn) ?
      null : <IconButton onClick={this.stopTimer} className={classes.iconButton} aria-label="stop" color={"primary"}><PauseCircleFilledIcon fontSize="large" /></IconButton>;

    let resume = ((this.state.time === 0 || !this.props.isPaused) || !this.props.inProgress) ?
      null : <IconButton onClick={this.resumeTimer} className={classes.iconButton} aria-label="resume" color={"primary"}><PlayCircleFilledIcon fontSize="large" /></IconButton>;

    let reset = ((this.props.isPaused && !this.props.inProgress && !this.props.isCompleted) || !this.props.isPaused) ?
      null : <IconButton onClick={this.resetTimer} className={classes.iconButton} aria-label="reset" color={"primary"}><ReplayIcon fontSize="large" /></IconButton>;

    let TimerFragment = <React.Fragment>
      <Grid container className={classes.routineSelectContainer}>

        <Grid item xs={8} sm={5} md={3}>

          <Box className={classes.RoutineSelector}>
            <RoutineSelectContainer ref={this.routineSelect} action={this.routineSelectHandler} />
          </Box>

        </Grid>

        <Grid item xs={4} sm={7} md={9}>

          {(this.props.currentExercise.length > 0) ? (
            <>
              <Box className={classes.TimerControls}>
                {start}
                {resume}
                {stop}
                {reset}
              </Box>
            </>
          ) : ( <> </> )}

        </Grid>

      </Grid>
    </React.Fragment>;



    return (
      <React.Fragment>

        <Grid container className={classes.timerControlGrid} spacing={0}>

          <Grid item xs={12} className={classes.mobileRoutineSelectContainer}>

            { TimerFragment }

            <Grid container justify="flex-end">
              <Grid item>

              </Grid>
            </Grid>

          </Grid>
        </Grid>

      </React.Fragment>
    )


  }
}

Timer.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

const TimerWrapped = withStyles(styles)(Timer);

export default withWidth()(TimerWrapped);
