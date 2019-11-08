import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
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
