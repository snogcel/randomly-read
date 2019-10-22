import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 175,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 175,
    },
  },
};

// TODO - import

const syllables = [
  { id: "1", name: "One"},
  { id: "2", name: "Two"},
  { id: "3", name: "Three"},
  { id: "4", name: "Four"},
  { id: "5", name: "Five"}
];

export default function SyllableSelect(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [selectedSyllables, setSyllable] = React.useState(props.syllables);

  const handleChange = event => {
    setSyllable(event.target.value); // record to internal state
    props.action(event.target.value); // pass to redux
  };

  return (
    <div className={classes.root}>



      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-chip-syllables">Syllables</InputLabel>
        <Select
          multiple
          defaultValue={props.syllables}
          value={selectedSyllables}
          onChange={handleChange}
          input={<Input id="select-multiple-chip-syllables" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {syllables.map(syllable => (
            <MenuItem key={syllable.id} value={syllable.name}>
              {syllable.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </div>
  );
}
