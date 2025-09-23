import React from 'react';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(0),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  formLabel: {
    margin: theme.spacing(1),
  },
  formControlLabel: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  checkbox: {

  }
}));

export default function CheckboxesGroup(props) {
  const classes = useStyles();
  const [state, setState] = React.useState(props.consonants);

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });

    props.action(name, event.target.checked); // pass to redux
  };

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup row="true">

          {props.options.map(consonant => (
            <FormControlLabel
            className={classes.formControlLabel}
            control={<Checkbox color="primary" disableRipple key={consonant.id} checked={props.consonants[consonant.id]} onChange={handleChange(consonant.id)} value={consonant.name} />}
            label={consonant.name}
            labelPlacement="top"
            />
          ))}

        </FormGroup>
      </FormControl>
    </div>
  );
}
