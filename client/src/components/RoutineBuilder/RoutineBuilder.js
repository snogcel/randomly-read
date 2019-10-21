import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import store from "../../store";

import LoginFormContainer from '../LoginForm/Container';

import ModeSelect from './elements/ModeSelect';
import DurationInput from './elements/DurationInput';
import RepetitionInput from './elements/RepetitionInput';
import SyllableSelect from './elements/SyllableSelect';
import PositionSelect from './elements/PositionSelect';

import VowelSelect from './elements/VowelSelect';
import ConsonantCheckboxes from './elements/ConsonantCheckboxes';

import { styles } from '../../themeHandler';

// TODO - set up constants for all form options, for now these are stored in each element.

const defaultSyllables = [
  { id: "1", name: "1 Syllable"},
  { id: "2", name: "2 Syllables"},
  { id: "3", name: "3 Syllables"},
  { id: "4", name: "4 Syllables"},
  { id: "5", name: "5 Syllables"}
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

class RoutineBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.vowelHandler = this.vowelHandler.bind(this);
    this.consonantHandler = this.consonantHandler.bind(this);
    this.modeHandler = this.modeHandler.bind(this);
    this.positionHandler = this.positionHandler.bind(this);
    this.rangeValHandler = this.rangeValHandler.bind(this);
    this.repetitionHandler = this.repetitionHandler.bind(this);
    this.syllableHandler = this.syllableHandler.bind(this);

  }

  componentWillMount() {
    if (typeof this.props.user !== "undefined") this.prepareRoutineBuilder();
  }

  prepareRoutineBuilder(){

  }

  componentDidMount() {

  }

  consonantHandler(consonant, value) {
    if (value) {
      this.props.addConsonant(consonant); // add consonant to state
    } else {
      this.props.removeConsonant(consonant); // remove consonant from state
    }
  }

  parseConsonants(consonants) {
    let consonantObj = {};

    for (let i = 0; i < consonants.length; i++) {
      let obj = availableConsonants.find(o => o.id = consonants[i]);
      if (obj) consonantObj[obj.id] = true;
    }

    return consonantObj;
  }

  vowelHandler(vowels) {
    let vowelArr = [];

    for (let i = 0; i < vowels.length; i++) {
      let obj = availableVowels.find(o => o.name === vowels[i]);
      if (obj) vowelArr.push(obj.id);
    }

    this.props.updateVowels(vowelArr); // pass to redux
  }

  syllableHandler(syllables) {
    let syllableArr = [];

    for (let i = 0; i < syllables.length; i++) {
      let obj = defaultSyllables.find(o => o.name === syllables[i]);
      if (obj) syllableArr.push(obj.id);
    }

    console.log(syllableArr);

    this.props.updateSyllables(syllableArr); // pass to redux
  }

  parseVowels(vowels) {
    let vowelArr = [];

    for (let i = 0; i < vowels.length; i++) {
      let obj = availableVowels.find(o => o.id === vowels[i]);
      if (obj) vowelArr.push(obj.name);
    }

    return vowelArr;
  }

  parseConsonantCheckboxOptions(vowels) {
    let vowelArr = [];

    for (let i = 0; i < vowels.length; i++) {
      let obj = availableVowels.find(o => o.id === vowels[i]);
      if (obj) vowelArr.push(obj);
    }

    return vowelArr.concat(defaultConsonants);
  }

  modeHandler(mode) {
    this.props.updateMode(mode);
  }

  positionHandler(mode) {
    this.props.updateMode(mode);
  }

  rangeValHandler(rangeVal) {
    this.props.updateRangeVal(rangeVal);
  }

  repetitionHandler(repetitions) {
    this.props.updateRepetitions(repetitions);
  }

  render() {

    const { user } = this.props;
    const { vowels, consonants, mode, position, rangeVal, repetitions, syllables } = this.props;
    const { classes } = this.props;

    console.log("vowels: ", vowels);
    console.log("consonants: ", consonants);
    console.log("mode: ", mode);
    console.log("position: ", position);
    console.log("rangeVal: ", rangeVal);
    console.log("repetitions: ", repetitions);
    console.log("syllables: ", syllables);

    let vowelArr = this.parseVowels(vowels); // convert routine format into MUI format
    let consonantObj = this.parseConsonants(consonants); // convert routine format into MUI format
    let consonantCheckboxOptions = this.parseConsonantCheckboxOptions(vowels); // display available consonants + vowels


    // TODO - User
    // TODO - Routine Name
    // TODO - Edit Name


    // TODO - parse Mode

    // TODO - parse Position

    // TODO - parse rangeVal <-- use slider?

    // TODO - parse repetitions <-- use slider?

    // TODO - parse syllables


    // TODO - handle Intermission Mode
    // TODO - IntermissionText


    // TODO - Display Exercise Steps (table)
    // TODO - Preview Exercise Step

    // TODO - Copy, Delete, Add Steps

    
    return (

      <Grid className={classes.root} container>

        {user ? (
          <>

            <Grid item>
              <ModeSelect action={this.modeHandler} />
            </Grid>

            <Grid item>
              <VowelSelect action={this.vowelHandler} vowels={vowelArr} />
            </Grid>

            <Grid item>
              <DurationInput action={this.rangeValHandler} />
            </Grid>

            <Grid item>
              <RepetitionInput action={this.repetitionHandler} />
            </Grid>

            <Grid item>
              <SyllableSelect action={this.syllableHandler} />
            </Grid>

            <Grid item>
              <PositionSelect action={this.positionHandler} />
            </Grid>

            <Grid item>
              <ConsonantCheckboxes action={this.consonantHandler} options={consonantCheckboxOptions} consonants={consonantObj} />
            </Grid>


          </>
        ) : (
          <>
            <LoginFormContainer />
          </>
        )}

      </Grid>

    )

  }
}

const RoutineBuilderWrapped = withStyles(styles)(RoutineBuilder);

export default RoutineBuilderWrapped;
