import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 75,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

export default function RepetitionInput(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({});

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    props.action(event.target.value); // pass to redux
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="repetition-input"
        label="Repetitions"
        value={values.repetitions}
        onChange={handleChange('repetitions')}
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
      />
    </form>
  );
}
