import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function SaveButton(props) {
  const classes = useStyles();

  return (
    <div>
      <Button onClick={() => { props.action(); }} variant="contained" className={classes.button}>
        Save Settings
      </Button>
    </div>
  );
}
