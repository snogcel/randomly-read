import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
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

export default function UserSelectAdmin(props) {
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
  let activeUsers = [];
  let inactiveUsers = [];

  for (let i = 0; i < props.options.length; i++) {
    console.log(props.options[i]);
    if (props.options[i].isActive) {
      activeUsers.push(props.options[i]);
    } else {
      inactiveUsers.push(props.options[i]);
    }
  }

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="admin-user-input">Active Users</InputLabel>
        <Select
          defaultValue={props.options[0]}
          value={props.user.user}
          onChange={handleChange}
          inputProps={{
            name: 'user',
            id: 'user-input',
          }}
        >
          <ListSubheader>Active Users</ListSubheader>
          {activeUsers.map(user => (
            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
          ))}
          <ListSubheader>Inactive Users</ListSubheader>
          {inactiveUsers.map(user => (
            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}
