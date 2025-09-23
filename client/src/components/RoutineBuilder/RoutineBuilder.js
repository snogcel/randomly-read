import React from 'react';
import { styled } from "@mui/material/styles";
import Grid from '@mui/material/Grid';

import Hidden from '@mui/material/Hidden';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';

import Modal from '@mui/material/Modal';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// import { makeStyles } from '@mui/material/styles';

import NewRoutineButton from './elements/NewRoutineButton';
import DeleteRoutineButton from './elements/DeleteRoutineButton';
import InsertButton from './elements/InsertButton';
import UpdateButton from './elements/UpdateButton';
import DeleteButton from './elements/DeleteButton';
import PreviewButton from './elements/PreviewButton';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import DescriptionEditor from './elements/DescriptionEditor';

import StepList from './elements/StepList';
import UserSelect from './elements/UserSelect';
import RoutinesSelect from './elements/RoutinesSelect';
import RoutineName from './elements/RoutineName';
import ModeSelect from './elements/ModeSelect';
import SyllableSelect from './elements/SyllableSelect';
import GradeLevelSelect from './elements/GradeSelect';
import PositionSelect from './elements/PositionSelect';
import DurationSlider from './elements/DurationSlider';
import RepetitionSlider from './elements/RepetitionSlider';
import VowelSelect from './elements/VowelSelect';
import ConsonantCheckboxes from './elements/ConsonantCheckboxes';
import IntermissionText from './elements/IntermissionText';

import RoutinePreview from './elements/RoutinePreview';

import getBlacklist from '../../util/blacklists'

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
  { id: "UH", name: "ʊ"},
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
  { id: "UH", name: "ʊ"},
  { id: "UW", name: "u"},
  { id: "B", name: "b"},
  { id: "CH", name: "tʃ"},
  { id: "D", name: "d"},
  { id: "DH", name: "ð"},
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
  { id: "Z", name: "Z"},
  { id: "ZH", name: "ʒ"}
];

const defaultConsonants = [
  { id: "B", name: "b"},
  { id: "CH", name: "tʃ"},
  { id: "D", name: "d"},
  { id: "DH", name: "ð"},
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
  { id: "Z", name: "Z"},
  { id: "ZH", name: "ʒ"}
];

const availableModes = [
  { id: "Word", name: "Word"},
  { id: "Sentence", name: "Sentence"},
  { id: "Intermission", name: "Intermission"},
];

const availablePositions = [
  { id: "initial", name: "Initial"},
  { id: "medial", name: "Medial"},
  { id: "final", name: "Final"},
];

const availableGradeLevels = [
  { id: "0", name: "All Grade Levels"},
  { id: "7", name: "1st Grade" },
  { id: "8", name: "2nd Grade" },
  { id: "9", name: "3rd Grade" },
  { id: "10", name: "4th Grade" },
  { id: "11", name: "5th Grade" },
  { id: "12", name: "6th Grade" },
  { id: "13", name: "7th Grade" },
  { id: "14", name: "8th Grade" },
  { id: "15", name: "9th Grade" },
  { id: "16", name: "10th Grade" },
  { id: "17", name: "11th Grade" },
  { id: "18", name: "12th Grade" },
  { id: "22", name: "College" }
];

class RoutineBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      showDescriptionEditor: true,
      open: false
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
    this.descriptionHandler = this.descriptionHandler.bind(this);
    this.vowelHandler = this.vowelHandler.bind(this);
    this.consonantHandler = this.consonantHandler.bind(this);
    this.modeHandler = this.modeHandler.bind(this);
    this.positionHandler = this.positionHandler.bind(this);
    this.gradeLevelHandler = this.gradeLevelHandler.bind(this);
    this.rangeValHandler = this.rangeValHandler.bind(this);
    this.repetitionHandler = this.repetitionHandler.bind(this);
    this.syllableHandler = this.syllableHandler.bind(this);
    this.intermissionHandler = this.intermissionHandler.bind(this);

    this.expandLessHandler = this.expandLessHandler.bind(this);
    this.expandMoreHandler = this.expandMoreHandler.bind(this);

    this.routinePreview = React.createRef();

  }

  componentDidUpdate(prevProps) {

    if (prevProps.lastUpdated !== this.props.lastUpdated) {
      if (this.props.id !== 0) this.saveHandler();
    }

    if (prevProps.id !== this.props.id) {
      // routine select change
      this.routineSelectHandler(this.props.id);
    }

  }

  componentDidMount() {
    this.props.resetRoutineBuilder();

    if (typeof this.props.user !== "undefined") this.prepareRoutineBuilder();
  }

  prepareRoutineBuilder(){
    this.props.fetchUsers();
  }

  componentDidMount() {

  }

  expandLessHandler() {
    this.setState({showDescriptionEditor: false});
  }

  expandMoreHandler() {
    this.setState({showDescriptionEditor: true});
  }

  createHandler(routineName) {

    if (routineName.length > 0 && this.props.userId !== 0) {

      let userId = this.props.userId;
      this.props.attemptCreateRoutine(userId, routineName);

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
    if (this.routinePreview.current) {
      this.setState({"open": true});
      this.routinePreview.current.refreshQuery();
    }
  }

  handlePreviewClose = () => {
    this.setState({"open": false});
  };

  saveHandler() {

    let id = this.props.id;
    let name = this.props.name;
    let description = JSON.stringify(this.props.description);
    let age = this.props.age;

    let routine = this.props.routine;

    let body = {
      "data": {
        "id": id,
        "attributes": {
          "id": id,
          "name": name,
          "description": description,
          "age": age,
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

  descriptionHandler(description) {
    this.props.updateDescription(description);
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

  gradeLevelHandler(age) {
    this.props.updateGradeLevel(age);

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
      syllables: [],
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

        try {
          // set description
          this.props.updateDescription(JSON.parse(this.props.availableRoutines[i].attributes.description));
        } catch {}

        // set grade level / complexity
        this.props.updateGradeLevel(this.props.availableRoutines[i].attributes.age);

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

  parseGradeLevel(age) {
    let gradeLevelObj = { "gradeLevel": "0" }; // default

    let obj = availableGradeLevels.find(o => o.id === age);
    if (obj) gradeLevelObj.gradeLevel = obj.id;

    return gradeLevelObj;
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

  parseDescription(description) {
    let descriptionObj = { content: description };

    return descriptionObj;
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

    // console.log("blacklisted consonants: ", blacklistedConsonants);

    for (let i = 0; i < blacklistedConsonants.length; i++) {

      consonants = consonants.filter(o => o.id !== blacklistedConsonants[i]);

    }

    return consonants;
  }

  filterAvailableConsonants(consonantArr) {

    /*
    console.log("Mode: ", this.props.mode);
    console.log("Position:", this.props.position);
    console.log("Age:", this.props.age);
    console.log("Syllables: ", this.props.syllables);
    console.log("Vowels: ", this.props.vowels);
    console.log("Selected Consonants: ", this.props.consonants);
    */

    let age = this.props.age;
    let mode = this.props.mode;
    let position = this.props.position;
    let syllables = this.props.syllables;
    let vowels = this.props.vowels;
    let consonants = this.props.consonants;

    let result = [];
    let blacklist = {};

    // apply relevant blacklist to age + mode + position
    blacklist = getBlacklist(age, mode, position);

    // search for all syllables if none defined
    if (syllables.length === 0) syllables = [1, 2, 3, 4, 5];

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

    // iterate through selected consonants and remove if exist on blacklist array
    for (let i = 0; i < consonants.length; i++) {

      if (result.indexOf(consonants[i]) > -1) {
        this.props.removeConsonant(consonants[i]); // remove consonant from state
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
      "UH": false,
      "B": false,
      "CH": false,
      "D": false,
      "DH": false,
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
      "Z": false,
      "ZH": false
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
    const { userId, name, description, id, routine, vowels, consonants, mode, position, age, rangeVal, repetitions, syllables, intermissionText, isIntermission } = this.props;
    const { classes } = this.props;

    const { width } = this.props;

    let exerciseContainerWidth = 12;
    let routineBuilderContainerWidth = 12;

    // laptop or desktop
    if (width === "xl") {
      exerciseContainerWidth = 2;
      routineBuilderContainerWidth = 6;
    }

    if (width === "lg") {
      exerciseContainerWidth = 4;
      routineBuilderContainerWidth = 8;
    }

    let availableUsers = this.parseAvailableUsers(this.props.availableUsers);
    let selectedUserObj = this.parseSelectedUser(userId, availableUsers);

    let availableRoutines = this.parseAvailableRoutines(this.props.availableRoutines); // format options from JSON API
    let selectedRoutineObj = this.parseSelectedRoutine(id, availableRoutines);

    let nameObj = this.parseName(name);
    let descriptionObj = this.parseDescription(description);

    let modeObj = this.parseMode(mode);
    let positionObj = this.parsePosition(position);
    let gradeLevelObj = this.parseGradeLevel(age);
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

            <Grid container spacing={0} justify="center">

              <Grid item xs={exerciseContainerWidth}>

                  <Grid container spacing={0} justify="center">

                    <Grid item xs={12}>

                      <Card className={classes.userAdminCard}>
                        <CardContent>

                          <Typography gutterBottom variant="h5" component="h2" className={classes.heading}>
                            Routine Builder
                          </Typography>
                          {user.superuser ? (
                            <>

                              <Typography variant="body2" color="textSecondary" component="p">
                                Use the menu to select a user and routine.
                              </Typography>
                              <br />
                              <UserSelect action={this.userSelectHandler} options={availableUsers} user={selectedUserObj} />

                            </> ) : ( null )
                          }

                          <Grid container className={classes.routineBuilderSelectContainer}>

                            <Grid item>

                              <div className={classes.RoutineBuilderSelector}>
                                <RoutinesSelect action={this.routineSelectHandler} options={availableRoutines} routine={selectedRoutineObj} />
                              </div>

                            </Grid>

                            <Grid item>

                              <div className={classes.RoutineBuilderControls}>
                                <NewRoutineButton action={this.createHandler} />
                                <DeleteRoutineButton action={this.deleteRoutineHandler} routineId={this.props.id} />
                              </div>

                            </Grid>

                            <Grid item xs={12}>

                              <StepList action={this.stepListHandler} index={this.state.index} routine={routine} />

                              { id !== 0 ? (
                                <>
                                  <InsertButton action={this.insertHandler} />
                                </>
                              ) : ( null )}

                            </Grid>

                          </Grid>

                        </CardContent>
                      </Card>

                    </Grid>



                  </Grid>

              </Grid>


              {(id !== 0) ? (
                <>

                <Grid item xs={routineBuilderContainerWidth}>
                  <Card className={classes.routineBuilderCard}>
                    <CardContent>

                      <Grid container justify="space-between">

                        <Grid item>
                          <Typography gutterBottom variant="h5" component="h2" className={classes.heading}>
                            Routine Settings
                          </Typography>
                        </Grid>

                        <Grid item>
                          { this.state.showDescriptionEditor ? <IconButton aria-label="less" onClick={() => { this.expandLessHandler(); }}><ExpandLessIcon /></IconButton> : <IconButton aria-label="more" onClick={() => { this.expandMoreHandler(); }}><ExpandMoreIcon /></IconButton> }
                        </Grid>

                      </Grid>

                      <Grid container spacing={0}>

                        <Grid item>

                          { true ? <RoutineName action={this.nameHandler} name={nameObj} /> : <Hidden xlDown><RoutineName action={this.nameHandler} name={nameObj} /></Hidden> }

                        </Grid>

                        <Grid item>

                          { true ? <GradeLevelSelect action={this.gradeLevelHandler} options={availableGradeLevels} gradeLevel={gradeLevelObj} /> : <Hidden xlDown><GradeLevelSelect action={this.gradeLevelHandler} options={availableGradeLevels} gradeLevel={gradeLevelObj} /></Hidden> }

                        </Grid>

                      </Grid>

                      <Grid container spacing={0}>

                        <Grid item xs={12} className={classes.DescriptionEditor}>

                          { this.state.showDescriptionEditor ? <DescriptionEditor action={this.descriptionHandler} description={descriptionObj}/> : <Hidden xlDown><DescriptionEditor action={this.descriptionHandler} description={descriptionObj}/></Hidden> }

                        </Grid>

                      </Grid>

                    </CardContent>
                  </Card>

                  <Card className={classes.routineBuilderCard}>
                    <CardContent>

                      <Typography gutterBottom variant="h5" component="h2" className={classes.heading}>
                        Routine Step Editor
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Use the options below to configure each step in this custom routine.
                      </Typography>
                      <br />

                      <Grid container spacing={0}>

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
                                  <PreviewButton action={this.previewHandler} />

                                </Grid>
                              </> ) : ( <> </> )}


                            {(this.state.index > 0) ? (
                              <>
                              <Grid item>

                                <br />
                                <DeleteButton action={this.deleteHandler} />

                              </Grid>
                              </> ) : ( <> </> )}


                          </Grid>

                        </Grid>

                      </Grid>

                    </CardContent>
                  </Card>

                  <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handlePreviewClose}
                    keepMounted
                  >
                    <div className={classes.previewPaper}>
                      <RoutinePreview routineStep={routineStep} ref={this.routinePreview}/>
                    </div>
                  </Modal>

                </Grid>

                </> ) : ( <>

                  <Grid item xs={routineBuilderContainerWidth}>

                    <Grid container spacing={0} justify="center">

                      <Grid item xs={12}>

                      </Grid>

                    </Grid>

                  </Grid>

                </> )}

            </Grid>

          </>
        ) : ( this.props.history.push("/") )}

      </Grid>

    )

  }
}

RoutineBuilder.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

const RoutineBuilderWrapped = withStyles(styles)(RoutineBuilder);

export default withWidth()(RoutineBuilderWrapped);
