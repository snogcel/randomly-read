import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function InteractionButton(props) {
  const classes = useStyles();

  return (
    <div>
      <Button className={classes.button} onClick={() => { this.props.buttonHandler() }}>Default</Button>
    </div>
  );
}
