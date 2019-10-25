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
    minWidth: 300
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

export default function RoutineName(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState(props.name);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    props.action(event.target.value);
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="outlined-routine-name"
        label="Routine Name"
        className={classes.textField}
        style={{ margin: 8 }}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        defaultValue={props.name.name}
        value={props.name.name}
        onChange={handleChange('name')}
      />
    </form>
  );
}
