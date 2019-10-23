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

export default function PositionSelect(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState(props.position);

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
        <InputLabel htmlFor="mode-input">Position</InputLabel>
        <Select
          defaultValue={props.position}
          value={props.position.position}
          onChange={handleChange}
          inputProps={{
            name: 'position',
            id: 'position-input',
          }}
        >
          {props.options.map(position => (
            <MenuItem key={position.id} value={position.id}>{position.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}
