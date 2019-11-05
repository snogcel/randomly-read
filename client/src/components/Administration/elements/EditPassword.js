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
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2),
  }
}));

export default function EditPassword(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({});

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    // props.action(event.target.value);
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="password-text"
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
