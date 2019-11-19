import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from "./VowelSelect";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(0),
    marginTop: theme.spacing(0)
  },
  formLabel: {
    margin: theme.spacing(1),
  },
  formControlLabel: {
    marginLeft: 0,
    marginRight: 0
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
        <FormLabel component="legend" className={classes.formLabel}>Consonants</FormLabel>
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
