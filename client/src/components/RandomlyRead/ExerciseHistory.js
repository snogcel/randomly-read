import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from '@material-ui/core/List';
import CheckboxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';

import { styles } from '../../exerciseThemeHandler';


const StyledListItem = withStyles({
  root: {
    border: "0px solid #E0E0F5",
    marginTop: 2,
    marginBottom: 2,
    "&$selected, &$selected:hover, &$selected:focus": {
      backgroundColor: "transparent"
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

  render() {
    const { classes, currentExerciseNumber, inProgress } = this.props;
    const { width } = this.props;

    let exerciseHistory = <React.Fragment>
      <List dense={true}>

        { this.props.currentExercise.map(function(step, stepNumber) {

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

            if (step.vowels.length > 0 && step.vowels.length !== 14) {
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

            if (step.consonants.length > 0 && step.consonants.length !== 23) {

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

            return null;

          }

          if ((width === "xs" || width === "sm") && (currentExerciseNumber === stepNumber)) {
            return null;

            /*
            return(
              <StyledListItem key={stepNumber} selected={true} className={classes.exerciseHistoryMobile}>
                <Typography variant="h6" color="secondary"><ListItemText primary={(listItemText)} /></Typography>
              </StyledListItem>
            );



            className={((currentExerciseNumber === stepNumber) && inProgress) ? classes.activeRoutineStep : null}


            primaryTypographyProps={{ style: classes.activeRoutineStep }}

            (((currentExerciseNumber < stepNumber) && inProgress) ? classes.completedRoutineStep : null)

            */

          } else if (width === "md" || width === "lg" || width === "xl") {
            return(
              <StyledListItem key={stepNumber} selected={((currentExerciseNumber === stepNumber) && inProgress)} className={classes.exerciseHistoryDesktop} disableGutters>
                <ListItemIcon className={classes.routineStepCheckbox}>
                  {((!currentExerciseNumber) || (currentExerciseNumber < stepNumber) || (currentExerciseNumber === stepNumber && inProgress)) ? (
                    <CheckboxOutlineBlankIcon
                      className={((currentExerciseNumber === stepNumber) && inProgress) ? classes.activeRoutineStepCheckbox : null }
                    />
                  ) : (
                    <CheckBoxIcon
                      className={classes.completedRoutineStep}
                    />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={listItemText}
                  primaryTypographyProps={{ className: ((currentExerciseNumber === stepNumber) && inProgress) ? classes.activeRoutineStep : (((stepNumber < currentExerciseNumber) && inProgress) ? classes.completedRoutineStep : null) }}
                  secondary={subHeaderText}
                  secondaryTypographyProps={{ className: ((currentExerciseNumber === stepNumber) && inProgress) ? classes.activeRoutineStepSecondary : (((stepNumber < currentExerciseNumber) && inProgress) ? classes.completedRoutineStep : null) }}
                />
              </StyledListItem>
            );
          } else {
            return null;
          }

        })}
      </List>
    </React.Fragment>;



   // Wrap Exercise History

    let exerciseHistoryWrapped;

    if (width === "md" || width === "lg" || width === "xl") {

      exerciseHistoryWrapped = <React.Fragment>

        <Paper className={classes.exerciseHistoryCard} elevation={0}>

            <Grid container>

              <Box className={classes.exerciseStepsCard}>

                <Typography gutterBottom variant="body1" color="textSecondary" component="p" className={classes.exerciseHistoryHeading}>Practice Routine Outline</Typography>

                {exerciseHistory}

              </Box>

            </Grid>

        </Paper>

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
