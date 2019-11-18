import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import CheckboxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Checkbox from '@material-ui/core/Checkbox';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';

import { styles } from '../../themeHandler';

const StyledListItem = withStyles({
  root: {
    border: "1px solid #F9F9FE",
    marginTop: 10,
    marginBottom: 10,
    "&$selected, &$selected:hover, &$selected:focus": {
      backgroundColor: "#AFD5FA"
    }
  },
  selected: {}
})(ListItem);

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

const availableModes = [
  { id: "word", name: "Word"},
  { id: "sentence", name: "Sentence"},
  { id: "intermission", name: "Intermission"},
];

class ExerciseHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(number) {

    this.setState({isChecked: !this.state.isChecked});
    this.props.addExerciseNumber(number);

  }

  componentWillReceiveProps() {

  }

  render() {
    const {classes, currentExerciseNumber} = this.props;
    const { width } = this.props;

    let exerciseHistory = <React.Fragment>
      <List>

        {this.props.currentExercise.map(function(step, stepNumber) {

          let mode = availableModes.find(o => o.name === step.mode);

          // backwards compatibility for randomly-read-dev
          if (typeof mode === "undefined") step.isIntermission = true;

          let listItemText = "";
          let subHeaderText = "";

          if (!step.isIntermission) {

            let plural = false;
            if (step.repetitions > 1) plural = true;

            if (plural) {
              listItemText += step.repetitions + " " + step.mode + "s";
            } else {
              listItemText += step.repetitions + " " + step.mode;
            }

            if (step.vowels.length > 0) {
              let vowels = "";
              for (let i = 0; i < step.vowels.length; i++) {

                let vowel = availableConsonants.find(o => o.id === step.vowels[i]);
                vowels += vowel.name;
                if (i < (step.vowels.length - 2)) {
                  vowels += ", ";
                } else if (i < (step.vowels.length - 1)) {
                  vowels += " and ";
                }
              }
              listItemText += " focused on " + vowels;
            }

            if (step.consonants.length > 0) {

              if (step.position === "initial") subHeaderText += "that start with ";
              if (step.position === "medial") subHeaderText += "that contain ";
              if (step.position === "final") subHeaderText += "that end with ";

              let consonants = "";
              for (let i = 0; i < step.consonants.length; i++) {

                let consonant = availableConsonants.find(o => o.id === step.consonants[i]);
                consonants += consonant.name;
                if (i < (step.consonants.length - 2)) {
                  consonants += ", ";
                } else if (i < (step.consonants.length - 1)) {
                  consonants += " and ";
                }

              }
              subHeaderText += consonants;
            }

          } else {

            listItemText += "Intermission for " + step.rangeVal + " seconds";
            subHeaderText += step.intermissionText;

          }

          if ((width === "xs" || width === "sm" || width === "md") && (currentExerciseNumber === stepNumber)) {
            return(
              <StyledListItem selected={true} className={classes.exerciseHistoryMobile}>
                <Typography variant="h6" color="secondary"><ListItemText primary={listItemText} /></Typography>
              </StyledListItem>
            );
          } else if (width === "lg" || width === "xl") {
            return(
              <StyledListItem selected={currentExerciseNumber === stepNumber} >
                <ListItemText primary={listItemText} secondary={(currentExerciseNumber === stepNumber) ? (subHeaderText) : ( null ) } />
              </StyledListItem>
            );
          } else {
            return null;
          }

        })}
      </List>
    </React.Fragment>;
    let exerciseHistoryWrapped;

    if (width === "lg" || width === "xl") {

      exerciseHistoryWrapped = <React.Fragment>

        <Card className={classes.exerciseStepsCard}>
          <CardContent>

            {exerciseHistory}

          </CardContent>
        </Card>

      </React.Fragment>;

    } else {
      exerciseHistoryWrapped = exerciseHistory;
    }

    return exerciseHistoryWrapped;

  }

}

ExerciseHistory.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

const ExerciseHistoryWrapped = withStyles(styles)(ExerciseHistory);

export default withWidth()(ExerciseHistoryWrapped);
