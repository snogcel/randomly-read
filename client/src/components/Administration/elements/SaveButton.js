import React from 'react';
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

export default function SaveButton(props) {
  const classes = useStyles();

  return (
    <div>
      <Button onClick={() => { props.action(); }} variant="contained" color="primary" className={classes.button}>Save</Button>
    </div>
  );
}
