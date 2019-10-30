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

export default function UserSelect(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({});
  // const [values, setValues] = React.useState(props.routine);

  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));

    props.action(event.target.value); // pass to redux
  };

  // props.options == the list of superuser and clients
  // props.user == currently selected user id

  // console.log(props.options);

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="routine-input">Available Users</InputLabel>
        <Select
          defaultValue={props.options[0]}
          value={props.user.user}
          onChange={handleChange}
          inputProps={{
            name: 'user',
            id: 'user-input',
          }}
        >
          {props.options.map(user => (
            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}
