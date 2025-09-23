import React from 'react';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(4)
  },
  input: {
    display: 'none',
  },
}));

export default function ChangePasswordButton(props) {
  const classes = useStyles();

  return (
    <div>
      <Button onClick={() => { props.action(); }} className={classes.button} >Password</Button>
    </div>
  );
}
