import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import { checkMinLength, checkMaxLength } from '../../../util/validators';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2),
  }
}));

export default function EditPassword(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({});
  const [errorText, setErrorText] = React.useState('');

  const handleChange = name => event => {

    // check password length
    if (checkMinLength(event.target.value, 8)) {
      setErrorText('Password must be greater than 8 characters in length.');
    } else if (checkMaxLength(event.target.value, 72)) {
      setErrorText('Password must be less than 72 characters in length.');
    } else {
      setErrorText('');
    }

    setValues({ ...values, [name]: event.target.value });
    props.action(event.target.value);
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="password-text"
        error={errorText.length === 0 ? false : true }
        helperText={errorText}
        label="Password"
        style={{ margin: 8 }}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange('password')}
      />
    </form>
  );
}
