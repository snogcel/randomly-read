import React from 'react';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function CreateButton(props) {
  const classes = useStyles();

  const handleClick = () => {

    props.action();

  };

  return (
    <div>
      <IconButton aria-label="add" className={classes.margin}>
        <AddIcon onClick={handleClick}/>
      </IconButton>
    </div>
  );
}
