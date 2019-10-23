import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

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

  /*

    <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={event => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>

      <Divider />

   */

  return (
    <div className={classes.root}>

      <List component="nav" aria-label="routine steps">

        {props.routine.map(function(step) {

          console.log("current step: ", step);

          let mode = availableModes.find(o => o.id === step.mode);
          let plural = false;
          if (step.repetitions > 1) plural = true;

          let listItemText = "";

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

          let subHeaderText = "";

          if (step.position === "initial") subHeaderText += "that start with ";
          if (step.position === "medial") subHeaderText += "that contain ";
          if (step.position === "final") subHeaderText += "that end with ";

          if (step.consonants.length > 0) {
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

          return(
            <ListItem
              button
              selected={props.index === step.index}
              onClick={event => handleListItemClick(event, step.index)}
            >
              <ListItemText primary={listItemText} secondary={subHeaderText} />
            </ListItem>
            );

        })}

      </List>
    </div>
  );
}
