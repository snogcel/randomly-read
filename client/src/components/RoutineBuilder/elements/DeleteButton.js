import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function DeleteButton(props) {
  const classes = useStyles();

  return (
    <div>
      <Button onClick={() => { props.action(); }} variant="outlined" className={classes.button}>
        Delete Exercise Step
      </Button>
    </div>
  );
}
