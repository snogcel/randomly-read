import React from 'react';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';

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

export default function GradeSelect(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState(props.gradeLevel);

  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: values,
    }));
    props.action(event.target.value); // TODO - pass to redux
  };

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="mode-input">Reading Level</InputLabel>
        <Select
          defaultValue={props.gradeLevel}
          value={props.gradeLevel.gradeLevel}
          onChange={handleChange}
          input={<BootstrapInput name="position" id="position-customized-select" />}
          inputProps={{
            name: 'position',
            id: 'position-input',
          }}
        >
          {props.options.map(gradeLevel => (
            <MenuItem key={gradeLevel.id} value={gradeLevel.id}>{gradeLevel.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}
