import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import InputBase from '@material-ui/core/InputBase';
import { withStyles } from "@material-ui/core/styles";

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
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function UserSelect(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({});

  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));

    props.action(event.target.value); // pass to redux
  };

  // split users list into active / inactive
  let activeUserRoutines = [];
  let inactiveUserRoutines = [];

  for (let i = 0; i < props.options.length; i++) {
    if (props.options[i].isActive) {
      activeUserRoutines.push(props.options[i]);
    } else {
      inactiveUserRoutines.push(props.options[i]);
    }
  }

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="routine-user-input">Users</InputLabel>
        <Select
          defaultValue={props.options[0]}
          value={props.user.user}
          onChange={handleChange}
          input={<BootstrapInput name="user" id="user-customized-select" />}
          inputProps={{
            name: 'user',
            id: 'user-input',
          }}
        >

          <ListSubheader>Active Users</ListSubheader>
          {activeUserRoutines.map(user => (
            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
          ))}

          <ListSubheader>Inactive Users</ListSubheader>
          {inactiveUserRoutines.map(user => (
            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
          ))}

        </Select>
      </FormControl>
    </form>
  );
}
