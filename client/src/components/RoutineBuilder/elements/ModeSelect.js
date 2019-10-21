import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const modes = [
  { id: "word", name: "Word"},
  { id: "sentence", name: "Sentence"},
  { id: "intermission", name: "Intermission"},
];

export default function ModeSelect(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    mode: ''
  });

  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    props.action(event.target.value); // pass to redux
  };

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="mode-input">Mode</InputLabel>
        <Select
          value={values.mode}
          onChange={handleChange}
          inputProps={{
            name: 'mode',
            id: 'mode-input',
          }}
        >
          {modes.map(mode => (
            <MenuItem key={mode.id} value={mode.id}>{mode.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}
