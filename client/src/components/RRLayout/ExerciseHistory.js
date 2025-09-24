import React from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ListItemIcon from "@mui/material/ListItemIcon";
import List from '@mui/material/List';
import CheckboxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useTheme } from '@mui/material/styles';
import { withStyles } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';

import { styles } from '../../themeHandler';


const StyledListItem = styled(ListItem)({
  border: "0px solid #E0E0F5",
  marginTop: 2,
  marginBottom: 2,
  "&.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus": {
    backgroundColor: "#ECECEC"
  }
});

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
    const {currentExerciseNumber, classes, width} = this.props;

    let exerciseHistory = <React.Fragment>
      <List dense={true}>

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

          if ((width === "xs" || width === "sm" || width === "md") && (currentExerciseNumber === stepNumber)) {
            return(
              <StyledListItem key={stepNumber} selected={true} className={classes.exerciseHistoryMobile}>
                <Typography variant="h6" color="secondary"><ListItemText primary={(listItemText)} /></Typography>
              </StyledListItem>
            );
          } else if ((width === "lg" || width === "xl")) {
            return(
              <StyledListItem key={stepNumber} selected={currentExerciseNumber === stepNumber} className={classes.exerciseHistoryDesktop}>
                <ListItemIcon>
                  {(currentExerciseNumber <= stepNumber) ? ( <CheckboxOutlineBlankIcon /> ) : ( <CheckBoxIcon /> )}
                </ListItemIcon>
                <ListItemText primary={listItemText} secondary={subHeaderText} />
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

        <Card className={classes.userAdminCard} justify="center">
          <CardContent>
            <Grid container>

              <div className={classes.exerciseStepsCard}>

                {exerciseHistory}

              </div>

            </Grid>
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

// Wrapper component to provide theme and width
// Wrap the class component with withStyles
const ExerciseHistoryWithStyles = withStyles(styles)(ExerciseHistory);

function ExerciseHistoryWrapper(props) {
  const theme = useTheme();
  
  // Use useMediaQuery to replace withWidth
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isXl = useMediaQuery(theme.breakpoints.only('xl'));
  
  let width;
  if (isXs) width = 'xs';
  else if (isSm) width = 'sm';
  else if (isMd) width = 'md';
  else if (isLg) width = 'lg';
  else if (isXl) width = 'xl';
  
  return <ExerciseHistoryWithStyles {...props} theme={theme} width={width} />;
}

export default ExerciseHistoryWrapper;
