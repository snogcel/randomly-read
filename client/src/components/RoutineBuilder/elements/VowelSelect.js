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
    minWidth: 120,
    maxWidth: 240,
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

export default function VowelSelect(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [selectedVowels, setVowel] = React.useState(props.vowels);

  const handleChange = event => {
    setVowel(event.target.value); // record to internal state
    props.action(event.target.value); // pass to redux
  };

  return (
    <div className={classes.root}>

      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-chip-vowel">Vowels</InputLabel>
        <Select
          multiple
          value={selectedVowels}
          onChange={handleChange}
          input={<Input id="select-multiple-chip-vowel" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(vowel => (
                <Chip key={vowel} label={vowel} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {props.options.map(vowel => (
            <MenuItem key={vowel.id} value={vowel.name}>
              {vowel.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </div>
  );
}
