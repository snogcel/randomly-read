import React from 'react';
import { makeStyles, withStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import InputBase from '@mui/material/InputBase';

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

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
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
      [event.target.name]: values,
    }));

    props.action(event.target.value); // pass to redux
  };

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <Select
          defaultValue={props.options[0]}
          value={props.routine.routine}
          onChange={handleChange}
          input={<BootstrapInput name="routine" id="routines-customized-select" />}
          displayEmpty
          inputProps={{
            name: 'routine',
            id: 'routine-select',
          }}
        >
          <MenuItem value="">
            <em>Select routine...</em>
          </MenuItem>
          {props.options.map(routine => (
            <MenuItem key={routine.id} value={routine.id}>{routine.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}
