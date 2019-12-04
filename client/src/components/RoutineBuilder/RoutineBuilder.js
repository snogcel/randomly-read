import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';

import isEqual from 'lodash.isequal';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import store from "../../store";

import LoginFormContainer from '../LoginForm/Container';

import DurationInput from './elements/DurationInput'; // TODO - remove
import RepetitionInput from './elements/RepetitionInput'; // TODO - remove

import Empty from '../shared/Empty';

import NewRoutineButton from './elements/NewRoutineButton';
import DeleteRoutineButton from './elements/DeleteRoutineButton';

import ResetButton from './elements/ResetButton';
import InsertButton from './elements/InsertButton';
import UpdateButton from './elements/UpdateButton';
import DeleteButton from './elements/DeleteButton';
import SaveButton from './elements/SaveButton';
import PreviewButton from './elements/PreviewButton';

import StepList from './elements/StepList';

import UserSelect from './elements/UserSelect';
import RoutinesSelect from './elements/RoutinesSelect';
import RoutineName from './elements/RoutineName';
import ModeSelect from './elements/ModeSelect';
import SyllableSelect from './elements/SyllableSelect';
import PositionSelect from './elements/PositionSelect';
import DurationSlider from './elements/DurationSlider';
import RepetitionSlider from './elements/RepetitionSlider';
import VowelSelect from './elements/VowelSelect';
import ConsonantCheckboxes from './elements/ConsonantCheckboxes';
import IntermissionText from './elements/IntermissionText';

import RoutinePreview from './elements/RoutinePreview';

import InitialSentenceBlacklist from '../RRLayout/InitialSentenceBlacklist';
import MedialSentenceBlacklist from '../RRLayout/MedialSentenceBlacklist';
import FinalSentenceBlacklist from '../RRLayout/FinalSentenceBlacklist';

import InitialWordBlacklist from '../RRLayout/InitialWordBlacklist';
import MedialWordBlacklist from '../RRLayout/MedialWordBlacklist';
import FinalWordBlacklist from '../RRLayout/FinalWordBlacklist';

import { styles } from '../../themeHandler';

// TODO - set up constants for all form options, for now these are stored in each element.
const availableSyllables = [
  { id: 1, name: "1"},
  { id: 2, name: "2"},
  { id: 3, name: "3"},
  { id: 4, name: "4"},
  { id: 5, name: "5"}
];

const availableVowels = [
  { id: "AA", name: "ɑ"},
  { id: "AE", name: "æ"},
  { id: "AH", name: "ʌ"},
  { id: "AO", name: "ɔ"},
  { id: "AW", name: "aʊ"},
  { id: "AY", name: "aɪ"},
  { id: "EH", name: "ɛ"},
  { id: "ER", name: "ɝ"},
  { id: "EY", name: "eɪ"},
  { id: "IH", name: "ɪ"},
  { id: "IY", name: "i"},
  { id: "OW", name: "oʊ"},
  { id: "OY", name: "ɔɪ"},
  { id: "UW", name: "u"}
];

const availableConsonants = [
  { id: "AA", name: "ɑ"},
  { id: "AE", name: "æ"},
  { id: "AH", name: "ʌ"},
  { id: "AO", name: "ɔ"},
  { id: "AW", name: "aʊ"},
  { id: "AY", name: "aɪ"},
  { id: "EH", name: "ɛ"},
  { id: "ER", name: "ɝ"},
  { id: "EY", name: "eɪ"},
  { id: "IH", name: "ɪ"},
  { id: "IY", name: "i"},
  { id: "OW", name: "oʊ"},
  { id: "OY", name: "ɔɪ"},
  { id: "UW", name: "u"},
  { id: "B", name: "b"},
  { id: "CH", name: "tʃ"},
  { id: "D", name: "d"},
  { id: "F", name: "f"},
  { id: "G", name: "g"},
  { id: "HH", name: "h"},
  { id: "JH", name: "dʒ"},
  { id: "K", name: "k"},
  { id: "L", name: "l"},
  { id: "M", name: "m"},
  { id: "N", name: "n"},
  { id: "P", name: "p"},
  { id: "R", name: "ɹ"},
  { id: "S", name: "s"},
  { id: "SH", name: "ʃ"},
  { id: "T", name: "t"},
  { id: "TH", name: "θ"},
  { id: "V", name: "v"},
  { id: "W", name: "w"},
  { id: "Y", name: "j"},
  { id: "Z", name: "Z"}
];

const defaultConsonants = [
  { id: "B", name: "b"},
  { id: "CH", name: "tʃ"},
  { id: "D", name: "d"},
  { id: "F", name: "f"},
  { id: "G", name: "g"},
  { id: "HH", name: "h"},
  { id: "JH", name: "dʒ"},
  { id: "K", name: "k"},
  { id: "L", name: "l"},
  { id: "M", name: "m"},
  { id: "N", name: "n"},
  { id: "P", name: "p"},
  { id: "R", name: "ɹ"},
  { id: "S", name: "s"},
  { id: "SH", name: "ʃ"},
  { id: "T", name: "t"},
  { id: "TH", name: "θ"},
  { id: "V", name: "v"},
  { id: "W", name: "w"},
  { id: "Y", name: "j"},
  { id: "Z", name: "Z"}
];

const availableModes = [
  { id: "Word", name: "Word"},
  { id: "Sentence", name: "Sentence"},
  { id: "Intermission", name: "Intermission"},
];

const availablePositions = [
  { id: "initial", name: "Opening"},
  { id: "medial", name: "Middle"},
  { id: "final", name: "Closing"},
];

class RoutineBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };

    this.saveHandler = this.saveHandler.bind(this);

    this.previewHandler = this.previewHandler.bind(this);
    this.createHandler = this.createHandler.bind(this);
    this.deleteRoutineHandler = this.deleteRoutineHandler.bind(this);

    this.resetHandler = this.resetHandler.bind(this);
    this.insertHandler = this.insertHandler.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.stepListHandler = this.stepListHandler.bind(this);
    this.routineSelectHandler = this.routineSelectHandler.bind(this);
    this.userSelectHandler = this.userSelectHandler.bind(this);

    this.nameHandler = this.nameHandler.bind(this);
    this.vowelHandler = this.vowelHandler.bind(this);
    this.consonantHandler = this.consonantHandler.bind(this);
    this.modeHandler = this.modeHandler.bind(this);
    this.positionHandler = this.positionHandler.bind(this);
    this.rangeValHandler = this.rangeValHandler.bind(this);
    this.repetitionHandler = this.repetitionHandler.bind(this);
    this.syllableHandler = this.syllableHandler.bind(this);
    this.intermissionHandler = this.intermissionHandler.bind(this);

    this.routinePreview = React.createRef();

  }

  componentDidUpdate(prevProps) {

    if (prevProps.lastUpdated !== this.props.lastUpdated) {

      console.log("-- auto save --");
      if (this.props.id !== 0) this.saveHandler();

    }

  }

  componentWillMount() {

    this.props.resetRoutineBuilder();

    if (typeof this.props.user !== "undefined") this.prepareRoutineBuilder();

  }

  prepareRoutineBuilder(){
    this.props.fetchUsers();
  }

  componentDidMount() {

  }

  createHandler(routineName) {

    if (routineName.length > 0 && this.props.userId !== 0) {

      let userId = this.props.userId;
      this.props.attemptCreateRoutine(userId, routineName);
      // this.resetStepList();

    }

    if (this.routinePreview.current) this.routinePreview.current.state.query = null; // clear preview window

  };

  deleteRoutineHandler(routineId) {

    if (routineId !== 0) {

      let userId = this.props.userId;
      this.props.attemptDeleteRoutine(userId, routineId);
      this.resetStepList();

    }

    if (this.routinePreview.current) this.routinePreview.current.state.query = null; // clear preview window

  }

  previewHandler() {
    if (this.routinePreview.current) this.routinePreview.current.refreshQuery();
  }

  saveHandler() {

    let id = this.props.id;
    let name = this.props.name;
    let routine = this.props.routine;

    let body = {
      "data": {
        "id": id,
        "attributes": {
          "id": id,
          "name": name,
          "subroutine": routine
        }
      }
    };

    this.props.attemptUpdateRoutine(id, body);
    this.props.resetWordCard(); // reset Word Card
    this.props.resetRoutineSelect(); // reset Routine Selector

    // this.props.fetchRoutines();
  }

  consonantHandler(consonant, value) {
    if (value) {
      this.props.addConsonant(consonant); // add consonant to state
    } else {
      this.props.removeConsonant(consonant); // remove consonant from state
    }

    this.routinePreview.current.state.query = null; // clear preview window
  }

  nameHandler(name) {
    this.props.updateName(name); // pass to redux
  }

  vowelHandler(vowels) {
    let vowelArr = [];

    if (typeof vowels !== "undefined") {

      for (let i = 0; i < vowels.length; i++) {
        let obj = availableVowels.find(o => o.name === vowels[i]);
        if (obj) vowelArr.push(obj.id);
      }

    }

    this.props.updateVowels(vowelArr); // pass to redux

    this.routinePreview.current.state.query = null; // clear preview window
  }

  syllableHandler(syllables) {
    let syllableArr = [];

    if (typeof syllables !== "undefined") {

      for (let i = 0; i < syllables.length; i++) {
        let obj = availableSyllables.find(o => o.name === syllables[i]);
        if (obj) syllableArr.push(obj.id);
      }

    }

    this.props.updateSyllables(syllableArr); // pass to redux

    this.routinePreview.current.state.query = null; // clear preview window
  }

  modeHandler(mode) {
    this.props.updateMode(mode);

    if (mode === "Intermission") {
      this.props.updateIsIntermission(true);
    } else {
      this.props.updateIsIntermission(false);
    }

    this.routinePreview.current.state.query = null; // clear preview window
  }

  positionHandler(position) {
    this.props.updatePosition(position);

    this.routinePreview.current.state.query = null; // clear preview window
  }

  rangeValHandler(rangeVal) {
    this.props.updateRangeVal(rangeVal);

    this.routinePreview.current.state.query = null; // clear preview window
  }

  repetitionHandler(repetitions) {
    this.props.updateRepetitions(repetitions);

    this.routinePreview.current.state.query = null; // clear preview window
  }

  intermissionHandler(intermissionText) {
    this.props.updateIntermissionText(intermissionText);

    this.routinePreview.current.state.query = null; // clear preview window
  }

  insertHandler() {

    this.resetHandler();

    const initialState = {
      availableUsers: [],
      userId: 0,
      availableRoutines: [],
      name: '',
      id: 0,
      routine: [],
      index: 0,
      vowels: [],
      consonants: [],
      mode: 'Word',
      rangeVal: 5,
      repetitions: 10,
      syllables: [1,2,3],
      position: 'initial',
      intermissionText: '',
      isIntermission: false,
      lastUpdated: null,
      isFetching: false
    };

    let { vowels, consonants, mode, position, rangeVal, repetitions, syllables, intermissionText, isIntermission } = initialState;

    let step = {
      "index": Date.now(),
      "rangeVal": rangeVal,
      "repetitions": repetitions,
      "mode": mode,
      "isIntermission": isIntermission
    };

    if (isIntermission) {
      step.intermissionText = intermissionText;
    } else {
      step.vowels = vowels;
      step.consonants = consonants;
      step.syllables = syllables;
      step.position = position;
    }

    this.setState({ "index": step.index });
    this.props.insertStep(step);
  }

  deleteHandler() {

    let index = this.state.index;

    if (index > 0 && this.props.routine.length > 0) {

      let depth = 0;

      // determine depth in routine stack
      for (let i = 0; i < this.props.routine.length; i++) {
        if (index === this.props.routine[i].index) {
          depth = i;
        }
      }

      if (depth === (this.props.routine.length - 1) && depth !== 0) { // if deleting from end of StepList

        depth--;
        this.stepListHandler(this.props.routine[depth].index);

      } else if (depth > 0 ) {

        depth++;
        this.stepListHandler(this.props.routine[depth].index); // advance to next StepList

      } else if (depth === 0 && this.props.routine.length > 1) {

        depth++;
        this.stepListHandler(this.props.routine[depth].index);

      } else {

        // this.resetStepList();

      }

      // remove routine from redux
      this.props.removeStep(index);

    }

  }

  resetHandler() {
    this.props.resetForm();
  }

  resetStepList() {
    this.props.resetStepList();
  }

  stepListHandler(index) {

    if (index > 0) {

      let routine = {};

      for (let i = 0; i < this.props.routine.length; i++) {
        if (index === this.props.routine[i].index) {
           routine = this.props.routine[i];
        }
      }

      let { vowels, consonants, mode, position, rangeVal, repetitions, syllables, intermissionText, isIntermission } = routine;

      this.props.updateIndex(index);
      this.props.updateRangeVal(rangeVal);
      this.props.updateRepetitions(repetitions);
      this.props.updateMode(mode);
      this.props.updateIsIntermission(isIntermission);

      if (isIntermission) {
        this.props.updateIntermissionText(intermissionText);
      } else {
        this.props.updateVowels(vowels);
        this.props.updateConsonants(consonants);
        this.props.updateSyllables(syllables);
        this.props.updatePosition(position);
      }

      this.setState({ "index": index });
      this.routinePreview.current.state.query = null;
    }

    // this.saveHandler();

  }

  updateHandler() {
    if (this.props.routine.length > 0) {

      let index = this.state.index;
      let routineStack = this.props.routine;

      let { vowels, consonants, mode, position, rangeVal, repetitions, syllables, intermissionText, isIntermission } = this.props;

      for (let i = 0; i < routineStack.length; i++) {
        if (index === routineStack[i].index) {

          let step = {
            "index": routineStack[i].index,
            "rangeVal": rangeVal,
            "repetitions": repetitions,
            "mode": mode,
            "isIntermission": isIntermission
          };

          if (isIntermission) {
            step.intermissionText = intermissionText;
          } else {
            step.vowels = vowels;
            step.consonants = consonants;
            step.syllables = syllables;
            step.position = position;
          }

          routineStack[i] = step;

        }
      }

      this.props.updateStep(routineStack);
      this.stepListHandler(index);
    }
  }

  routineSelectHandler(id) {

    this.resetStepList();

    for (let i = 0; i < this.props.availableRoutines.length; i++) {
      if (id === this.props.availableRoutines[i].attributes.id) {

        // set id
        this.props.updateId(this.props.availableRoutines[i].attributes.id);

        // set name
        this.props.updateName(this.props.availableRoutines[i].attributes.name);

        // iterate through subroutines
        for (let j = 0; j < this.props.availableRoutines[i].attributes.subroutine.length; j++) {

          let { vowels, consonants, mode, position, rangeVal, repetitions, syllables, intermissionText, isIntermission } = this.props.availableRoutines[i].attributes.subroutine[j];

          let step = {
            "index": (Date.now() + j),
            "rangeVal": rangeVal,
            "repetitions": repetitions,
            "mode": mode
          };

          if (mode === "Intermission") {
            step.isIntermission = true;
          } else {
            step.isIntermission = false;
          }

          if (isIntermission) {
            step.intermissionText = intermissionText;
          } else {
            step.vowels = vowels;
            step.consonants = consonants;
            step.syllables = syllables;
            step.position = position;
          }

          if (typeof step.position === "undefined") step.position = "initial"; // TODO - remove

          // display first step in Routine Builder
          if (j ===0 ) {

            this.setState({ "index": step.index });

            this.props.updateIndex(step.index);
            this.props.updateRangeVal(step.rangeVal);
            this.props.updateRepetitions(step.repetitions);
            this.props.updateMode(step.mode);
            this.props.updateIsIntermission(step.isIntermission);

            if (step.isIntermission) {
              this.props.updateIntermissionText(step.intermissionText);
            } else {
              this.props.updateVowels(step.vowels);
              this.props.updateConsonants(step.consonants);
              this.props.updateSyllables(step.syllables);
              this.props.updatePosition(step.position);
            }
          }

          this.props.insertStep(step); // add step to routine stack

        }

      }
    }
  }

  userSelectHandler(id) {
    for (let i = 0; i < this.props.availableUsers.length; i++) {
      if (id === this.props.availableUsers[i].attributes.id) {

        // set user id
        this.props.updateUserId(this.props.availableUsers[i].attributes.id);

        this.props.fetchRoutines(this.props.availableUsers[i].attributes.id);

        this.resetStepList();
      }
    }
  }

  parseSyllables(syllables) {
    let syllablesArr = [];

    if (typeof syllables !== "undefined") {

      for (let i = 0; i < syllables.length; i++) {
        let obj = availableSyllables.find(o => o.id === syllables[i]);
        if (obj) syllablesArr.push(obj.name);
      }

    }

    return syllablesArr;
  }

  parseVowels(vowels) {
    let vowelArr = [];

    if (typeof vowels !== "undefined") {

      for (let i = 0; i < vowels.length; i++) {
        let obj = availableVowels.find(o => o.id === vowels[i]);
        if (obj) vowelArr.push(obj.name);
      }

    }

    return vowelArr;
  }

  parseMode(mode) {
    let modeObj = { mode: '' };

    let obj = availableModes.find(o => o.id === mode);
    if (obj) modeObj.mode = obj.id;

    return modeObj;
  }

  parseDuration(duration) {
    let durationObj = { duration: parseInt(duration) };

    return durationObj;
  }

  parseRepetition(repetition) {
    let repetitionObj = { repetition: parseInt(repetition) };

    return repetitionObj;
  }

  parsePosition(position) {
    let positionObj = { position: '' };

    let obj = availablePositions.find(o => o.id === position);
    if (obj) positionObj.position = obj.id;

    return positionObj;
  }

  parseAvailableRoutines(routines) {
    let availableRoutines = [];

    if (typeof routines !== "undefined") {

      for (let i = 0; i < routines.length; i++) {
        availableRoutines.push({
          "id": routines[i].attributes.id,
          "name": routines[i].attributes.name
        });
      }

      // display first routine from list by default
      if(typeof availableRoutines[0] !== "undefined" && this.props.id === 0) {
        // this.routineSelectHandler(availableRoutines[0].id);
      }

    }

    return availableRoutines;
  }

  parseSelectedRoutine(id, availableRoutines) {
    let selectedRoutineObj = { "routine": '' };

    let obj = availableRoutines.find(o => o.id === id);
    if (obj) selectedRoutineObj.routine = obj.id;

    return selectedRoutineObj;
  }

  parseAvailableUsers(users) {
    let availableUsers = []; // list superuser first

    if (typeof users !== "undefined") {

      for (let i = 0; i < users.length; i++) {
        availableUsers.push({
          "id": users[i].attributes.id,
          "name": users[i].attributes.firstName + " " + users[i].attributes.lastName,
          "isActive": users[i].attributes.isActive
        });
      }

      // display first user from list by default
      if(typeof availableUsers[0] !== "undefined" && this.props.userId === 0) {
        this.userSelectHandler(availableUsers[0].id);
      }

    }

    return availableUsers;
  }

  parseSelectedUser(id, availableUsers) {
    let selectedUserObj = { "user": '' };

    let obj = availableUsers.find(o => o.id === id);
    if (obj) selectedUserObj.user = obj.id;

    return selectedUserObj;
  }

  parseName(name) {
    let nameObj = { name: name };

    return nameObj;
  }

  parseIntermissionText(intermissionText) {
    let intermissionObj = { intermissionText: intermissionText };

    return intermissionObj;
  }

  parseConsonantCheckboxOptions(vowels) {
    let vowelArr = [];

    if (typeof vowels !== "undefined") {

      for (let i = 0; i < vowels.length; i++) {
        let obj = availableVowels.find(o => o.id === vowels[i]);
        if (obj) vowelArr.push(obj);
      }

    }

    let consonants = vowelArr.concat(defaultConsonants);

    let blacklistedConsonants = this.filterAvailableConsonants(consonants);

    console.log("blacklisted consonants: ", blacklistedConsonants);

    for (let i = 0; i < blacklistedConsonants.length; i++) {

      consonants = consonants.filter(o => o.id !== blacklistedConsonants[i]);

      /*
      delete consonantObj[blacklistedConsonants[i]]; // remove blacklisted item
       */

    }

    console.log(consonants);

    return consonants;
  }

  filterAvailableConsonants(consonantArr) {

    console.log("Mode: ", this.props.mode);
    console.log("Position:", this.props.position);
    console.log("Syllables: ", this.props.syllables);
    console.log("Vowels: ", this.props.vowels);

    let mode = this.props.mode;
    let position = this.props.position;
    let syllables = this.props.syllables;
    let vowels = this.props.vowels;

    let result = [];
    let blacklist = {};

    // apply relevant blacklist to mode + position
    console.log("Mode: ", mode);

    // sentences
    if (mode === "Sentence" && position === "initial") blacklist = InitialSentenceBlacklist;

    if (mode === "Sentence" && position === "medial") blacklist = MedialSentenceBlacklist;

    if (mode === "Sentence" && position === "final") blacklist = FinalSentenceBlacklist;

    // words
    if (mode === "Word" && position === "initial") blacklist = InitialWordBlacklist;

    if (mode === "Word" && position === "medial") blacklist = MedialWordBlacklist;

    if (mode === "Word" && position === "final") blacklist = FinalWordBlacklist;

    if (mode === "Intermission" || typeof mode === "undefined") return result;

    // iterate through vowel array (in cases where more than one vowel is being filtered on)
    for (let i = 0; i < vowels.length; i++) {

      // determine overlap
      for (let j = 0; j < syllables.length; j++) {

        if (j === 0 && i === 0) { // for first iteration, include full array
          result = blacklist[vowels[i]].consonants[(syllables[j] - 1)];
        } else { // find intersection of arrays
          result = result.filter(function(value) {
            return blacklist[vowels[i]].consonants[(syllables[j] - 1)].indexOf(value) > -1;
          });
        }
      }

    }

    return result;
  }

  parseConsonants(consonants) {
    let consonantObj = {
      "AA": false,
      "AE": false,
      "AH": false,
      "AO": false,
      "AW": false,
      "AY": false,
      "EH": false,
      "ER": false,
      "EY": false,
      "IH": false,
      "IY": false,
      "OW": false,
      "OY": false,
      "UW": false,
      "B": false,
      "CH": false,
      "D": false,
      "F": false,
      "G": false,
      "HH": false,
      "JH": false,
      "K": false,
      "L": false,
      "M": false,
      "N": false,
      "P": false,
      "R": false,
      "S": false,
      "SH": false,
      "T": false,
      "TH": false,
      "V": false,
      "W": false,
      "Y": false,
      "Z": false
    };

    if (typeof consonants !== "undefined") {

      for (let i = 0; i < consonants.length; i++) {
        let obj = availableConsonants.find(o => o.id = consonants[i]);

        if (obj) consonantObj[obj.id] = true;
      }

    }

    return consonantObj;
  }

  parseCurrentRoutineStep() {
    let routineStep = {};

    for (let i = 0; i < this.props.routine.length; i++) {
      if (this.props.routine[i].index === this.props.index) routineStep = this.props.routine[i];
    }

    return routineStep;
  }

  render() {

    const { user } = this.props;
    const { userId, name, id, routine, index, vowels, consonants, mode, position, rangeVal, repetitions, syllables, intermissionText, isIntermission } = this.props;
    const { classes } = this.props;

    const { width } = this.props;

    let exerciseContainerWidth = 12;
    let routineBuilderContainerWidth = 12;

    // laptop or desktop
    if (width === "xl" || width === "lg") {
      exerciseContainerWidth = 3;
      routineBuilderContainerWidth = 9;
    }

    let availableUsers = this.parseAvailableUsers(this.props.availableUsers);
    let selectedUserObj = this.parseSelectedUser(userId, availableUsers);

    let availableRoutines = this.parseAvailableRoutines(this.props.availableRoutines); // format options from JSON API
    let selectedRoutineObj = this.parseSelectedRoutine(id, availableRoutines);

    let nameObj = this.parseName(name);

    let modeObj = this.parseMode(mode);
    let positionObj = this.parsePosition(position);
    let vowelArr = this.parseVowels(vowels); // convert routine format into MUI format
    let consonantObj = this.parseConsonants(consonants); // convert routine format into MUI format
    let consonantCheckboxOptions = this.parseConsonantCheckboxOptions(vowels); // display available consonants + vowels
    let syllableArr = this.parseSyllables(syllables);
    let durationObj = this.parseDuration(rangeVal);
    let repetitionObj = this.parseRepetition(repetitions);
    let intermissionTextObj = this.parseIntermissionText(intermissionText);

    let routineStep = this.parseCurrentRoutineStep();

    return (

      <Grid className={classes.root}>

        {user ? (
          <>

            <Grid container spacing={0}>

              <Grid item xs={exerciseContainerWidth}>

                <div className={classes.routineSelectCard}>

                  <Grid container spacing={0}>

                    {user.superuser ? (
                      <>
                      <Grid item xs={12}>

                        <UserSelect action={this.userSelectHandler} options={availableUsers} user={selectedUserObj} />

                      </Grid>
                      </> ) : ( null )
                    }

                    <Grid item xs={8}>

                      <RoutinesSelect action={this.routineSelectHandler} options={availableRoutines} routine={selectedRoutineObj} />

                    </Grid>

                    <Grid item xs={2} justify="center">

                      <NewRoutineButton action={this.createHandler} />

                    </Grid>

                    <Grid item xs={2} justify="center">

                      <DeleteRoutineButton action={this.deleteRoutineHandler} routineId={this.props.id} />

                    </Grid>

                    <Grid item xs={12}>

                      <StepList action={this.stepListHandler} index={this.state.index} routine={routine} />

                    </Grid>

                  </Grid>

                </div>



              </Grid>


              {(id !== 0) ? (
                <>

                <Grid item xs={routineBuilderContainerWidth}>

                  <Card className={classes.routineBuilderCard}>
                    <CardContent>

                      <Grid container spacing={0}>

                        <Grid item xs={6}>

                          <RoutineName action={this.nameHandler} name={nameObj} />

                        </Grid>

                        <Grid item xs={12}>

                          <Grid container spacing={0}>

                            {isIntermission && (
                              <>
                              <Grid item><ModeSelect action={this.modeHandler} options={availableModes} mode={modeObj} /></Grid>

                              <Grid item><IntermissionText action={this.intermissionHandler} intermissionText={intermissionTextObj} /></Grid>
                              </>
                            )}

                            <Grid item>
                              <DurationSlider action={this.rangeValHandler} duration={durationObj} />
                            </Grid>

                            {!isIntermission ? (
                              <>

                              <Grid item>
                                <RepetitionSlider action={this.repetitionHandler} repetitions={repetitionObj} />
                              </Grid>

                              </> ) : ( <> </> )}

                          </Grid>

                        </Grid>

                        <Grid item xs={12}>

                          <Grid container spacing={2}>

                            {!isIntermission ? (
                              <>

                              <Grid item><ModeSelect action={this.modeHandler} options={availableModes} mode={modeObj} /></Grid>

                              <Grid item><PositionSelect action={this.positionHandler} options={availablePositions} position={positionObj} /></Grid>

                              <Grid item><SyllableSelect action={this.syllableHandler} options={availableSyllables} syllables={syllableArr} /></Grid>

                              <Grid item><VowelSelect action={this.vowelHandler} options={availableVowels} vowels={vowelArr} /></Grid>

                              </> ) : ( <> </> )}

                          </Grid>

                        </Grid>

                        <Grid item xs={12}>

                          <Grid container spacing={2}>

                            <Grid item>
                              {!isIntermission ? (
                                <>
                                <ConsonantCheckboxes action={this.consonantHandler} options={consonantCheckboxOptions} consonants={consonantObj} />
                                </> ) : ( <> </> )}

                            </Grid>

                          </Grid>


                        </Grid>

                        <Grid item xs={12}>

                          <Grid container spacing={2}>

                            <Grid item>

                              <br />

                              <InsertButton action={this.insertHandler} />

                            </Grid>

                            {(this.state.index > 0) ? (
                              <>
                              <Grid item>

                                <br />
                                <UpdateButton action={this.updateHandler} />
                              </Grid>
                              </> ) : ( <> </> )}


                            {(this.state.index > 0) ? (
                              <>
                              <Grid item>

                                <br />
                                <DeleteButton action={this.deleteHandler} />

                              </Grid>
                              </> ) : ( <> </> )}

                            {(this.state.index > 0) ? (
                              <>
                                <Grid item>

                                  <br />
                                  <PreviewButton action={this.previewHandler} />

                                </Grid>
                              </> ) : ( <> </> )}

                          </Grid>

                        </Grid>

                      </Grid>

                    </CardContent>
                  </Card>

                  <Grid item xs={12}>

                    <RoutinePreview routineStep={routineStep} ref={this.routinePreview}/>

                  </Grid>

                </Grid>

                </> ) : ( <>

                  <Grid item xs={9}>

                    <Grid container spacing={0}>

                      <Grid item xs={12} justify="center">



                      </Grid>

                    </Grid>

                  </Grid>

                </> )}

            </Grid>

          </>
        ) : ( this.props.history.push("/login") )}

      </Grid>

    )

  }
}

RoutineBuilder.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

const RoutineBuilderWrapped = withStyles(styles)(RoutineBuilder);

export default withWidth()(RoutineBuilderWrapped);
