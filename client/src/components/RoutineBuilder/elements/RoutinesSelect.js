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
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function RoutinesSelect(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState(props.routine);

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
        <InputLabel htmlFor="routine-input">Available Routines</InputLabel>
        <Select
          defaultValue={props.options[0]}
          value={props.routine.routine}
          onChange={handleChange}
          inputProps={{
            name: 'routine',
            id: 'routine-input',
          }}
        >
          {props.options.map(routine => (
            <MenuItem key={routine.id} value={routine.id}>{routine.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}
