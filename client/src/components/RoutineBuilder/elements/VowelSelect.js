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
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from "@material-ui/core/styles";

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

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

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
        <InputLabel shrink={true} htmlFor="select-multiple-chip-vowel">Vowels</InputLabel>
        <Select
          id="vowel-customized-select"
          labelId="select-multiple-chip-vowel"
          multiple
          value={props.vowels}
          onChange={handleChange}
          input={<BootstrapInput id="vowel-customized-select" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(vowel => (
                <Chip key={vowel} value={vowel} label={vowel} className={classes.chip} />
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
