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

export default function NewUsername(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({});

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    props.action(event.target.value);
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="new-username-text"
        error={props.error.length === 0 ? false : true }
        helperText={props.error}
        label="Username"
        style={{ margin: 8 }}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        value={values.username}
        onChange={handleChange('username')}
      />
    </form>
  );
}
