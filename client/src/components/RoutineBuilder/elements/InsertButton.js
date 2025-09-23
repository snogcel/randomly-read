import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  input: {
    display: 'none',
  },
}));

export default function InsertButton(props) {
  const classes = useStyles();

  return (
    <div>
      <Button onClick={() => { props.action(); }} variant="contained" color="primary" className={classes.button}>
        Insert Exercise Step
      </Button>
    </div>
  );
}
