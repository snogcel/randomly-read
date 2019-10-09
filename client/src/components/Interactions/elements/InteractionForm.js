import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Slider from '@material-ui/lab/Slider';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  submit: {
    textAlign: 'center'
  }
}));

// Stubbed Out Interaction Settings

const ease = [
  { label: "Difficult", value: 0 },
  { label: "Easier", value: 50 },
  { label: "Easy", value: 100 }
];

export default function InteractionForm(props) {
  const classes = useStyles();

  const [value, setValue] = React.useState('');

  const [state, setState] = React.useState({
    audience: "",
    intention: false,
    applied: false,
    ease: 0
  });

  const handleSubmit = event => {

    if (!state.audience) {
      alert("Who did you speak with?")
    } else {
      props.action(state);  // pass form submission back to InteractionsHome

      let defaultState = {
        audience: "",
        intention: false,
        applied: false,
        ease: 0
      };

      // reset form state
      setState( defaultState );
    }
  };

  const handleRadioGroupChange = name => event => {
    setValue(event.target.value);
    setState({ ...state, [name]: event.target.value });
  };

  const handleSliderChange = name => (event, value) => {
    setState({ ...state, [name]: value });
  };

  const handleSwitchChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); } }>
        <Grid container>

          <Grid item xs={12}><FormLabel component="legend"><h2>{ props.options.name }</h2><br /></FormLabel></Grid>

          <Grid item xs={3}>
            <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup aria-label="audience" name="audience" onChange={handleRadioGroupChange('audience')} value={state.audience} >
                  {  props.options.audience.map((item) => (
                    <FormControlLabel
                    value={item}
                    control={<Radio color="primary" />}
                    label={item}

                    />
                    )) }
                </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={6}>

            <FormControlLabel
              control={ <Switch checked={state.intention} onChange={handleSwitchChange('intention')} value="intention" color="primary" /> }
              label="Remembered your Intention"
            />

            <br /><br />

            <FormControlLabel
              control={ <Switch checked={state.applied} onChange={handleSwitchChange('applied')} value="applied" color="primary" /> }
              label="Spoke with Intention"
            />

            <br /><br />

            <Slider
              value={state.ease}
              aria-labelledby="ease"
              step={5}
              valueLabelDisplay="auto"
              marks={ease}
              onChange={handleSliderChange('ease', value)}
            />
          </Grid>

          <Grid item xs={12} className={classes.submit}>

            <Button type="submit">Submit!</Button>

          </Grid>

        </Grid>
      </form>
    </div>
  );
}
