import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import store from "../../store";

import LoginFormContainer from '../LoginForm/Container';

import VowelSelect from './elements/VowelSelect';
import ConsonantCheckboxes from './elements/ConsonantCheckboxes';

import { styles } from '../../themeHandler';

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

  render() {

    const { user } = this.props;
    const { vowels, consonants } = this.props;

    console.log("vowels: ", vowels);
    console.log("consonants: ", consonants);

    let vowelArr = this.parseVowels(vowels);
    let consonantObj = this.parseConsonants(consonants);
    let consonantCheckboxOptions = this.parseConsonantCheckboxOptions(vowels);


    return (

      <Grid container>

        {user ? (
          <>

            <VowelSelect action={this.vowelHandler} vowels={vowelArr} />

            <ConsonantCheckboxes action={this.consonantHandler} options={consonantCheckboxOptions} consonants={consonantObj} />

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
