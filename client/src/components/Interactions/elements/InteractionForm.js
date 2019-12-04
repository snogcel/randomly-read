import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Slider from '@material-ui/lab/Slider';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TableCell from "./InteractionTable";

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
  },
  interactionSlider: {
    alignItems: "center",
    display:"grid",
    justifyItems: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

// Stubbed Out Interaction Settings

const ease = [
  { label: "Difficult", value: 0 },
  { label: "Easy", value: 100 }
];

export default function InteractionForm(props) {
  const classes = useStyles();

  const [value, setValue] = React.useState('');

  const [state, setState] = React.useState({
    position: "start",
    word: "",
    ease: 50
  });

  const handleSubmit = event => {

    props.action(state);  // pass form submission back to InteractionsHome

    let defaultState = {
      position: "start",
      word: "",
      ease: 50
    };

    // reset form state
    setState( defaultState );

  };

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleRadioGroupChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleSliderChange = name => (event, value) => {
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); } }>

            <Grid container justify="center">

              <Grid item xs={4}>

                <TextField
                  id="outlined-word-name"
                  label="Word Spoken"
                  className={classes.textField}
                  style={{ margin: 8 }}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  defaultValue={state.word}
                  value={state.word}
                  onChange={handleChange('word')}
                />

                <RadioGroup aria-label="position" name="position" value={state.position} onChange={handleRadioGroupChange('position')} row>
                  <FormControlLabel
                    value="start"
                    control={<Radio color="primary" />}
                    label="Start"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    value="middle"
                    control={<Radio color="primary" />}
                    label="Middle"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Radio color="primary" />}
                    label="End"
                    labelPlacement="bottom"
                  />
                </RadioGroup>

              </Grid>

              <Grid item xs={8} className={classes.interactionSlider}>

                <Slider
                  value={state.ease}
                  aria-labelledby="ease"
                  step={5}
                  valueLabelDisplay="auto"
                  marks={ease}
                  onChange={handleSliderChange('ease', value)}
                />

                <Button type="submit">Submit!</Button>

              </Grid>

            </Grid>

      </form>
    </div>
  );
}
