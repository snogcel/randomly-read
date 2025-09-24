import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

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

export default function DurationInput(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({});

  /*

  const [values, setValues] = React.useState({
    rangeVal: 5,
  });

   */

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    props.action(event.target.value); // pass to redux
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="rangelVal-input"
        label="Seconds"
        value={values.rangeVal}
        onChange={handleChange('rangeVal')}
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
