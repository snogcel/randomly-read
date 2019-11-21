import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import FormControlLabel from "./ConsonantCheckboxes";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360
  },
}));

const StyledListItem = withStyles({
  root: {
    border: "1px solid #E0E0F5",
    marginTop: 10,
    marginBottom: 10,
    "&$selected, &$selected:hover, &$selected:focus": {
      backgroundColor: "#82BBF3"
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

export default function StepList(props) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(props.index);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    props.action(index); // fetch selected Routine Step
  };

  let routine = [];

  if (typeof props.routine !== "undefined") {

    routine = props.routine;

  }

  return (
    <div className={classes.root}>

      <List component="nav" aria-label="routine steps">

        {routine.map(function(step) {

          // console.log("current step: ", step);

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

            listItemText += "Intermission for " + step.rangeVal + " seconds"
            subHeaderText += step.intermissionText;

          }

          return(
            <StyledListItem
              button
              selected={props.index === step.index}
              onClick={event => handleListItemClick(event, step.index)}
            >
              <ListItemText primary={listItemText} secondary={subHeaderText} />
            </StyledListItem>
            );

        })}

      </List>
    </div>
  );
}
