import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import { fade, withStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: "center",
    display:"flex",
    justifyItems: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  submit: {
    textAlign: 'center'
  },
  submitButton: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(4)
  },
  interactionSlider: {
    alignItems: "center",
    display:"grid",
    justifyItems: "center",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  wordEntry: {
    fontSize:"12px"
  },
  formControlLabel: {
    fontSize:"12px"
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
    position: "initial",
    word: "",
    ease: 0
  });

  const handleSubmit = event => {

    props.action(state);  // pass form submission back to InteractionsHome

    let defaultState = {
      position: "initial",
      word: "",
      ease: 0
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

  /*

  <Slider
                  value={state.ease}
                  aria-labelledby="ease"
                  step={50}
                  valueLabelDisplay="auto"
                  marks={ease}
                  onChange={handleSliderChange('ease', value)}
                />


<FormControlLabel
                    value="medial"
                    control={<Radio color="primary" />}
                    label={<Typography className={classes.formControlLabel}>Middle</Typography>}
                    labelPlacement="bottom"
                  />

   */


  /*

  <RadioGroup aria-label="position" name="position" value={state.position} onChange={handleRadioGroupChange('position')} row>
                  <FormControlLabel
                    value="initial"
                    control={<Radio color="primary" />}
                    label={<Typography className={classes.formControlLabel}>Start of Word</Typography>}
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    value="final"
                    control={<Radio color="primary" />}
                    label={<Typography className={classes.formControlLabel}>End of Word</Typography>}
                    labelPlacement="bottom"
                  />
                </RadioGroup>

   */

  return (
    <div className={classes.root}>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); } }>

            <Grid container justify="center">

              <Grid item xs={12} sm={6} md={6} lg={12} className={classes.wordEntry}>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink htmlFor="admin-user-input">Word Search</InputLabel>
                  <BootstrapInput
                    id="outlined-word-name"
                    className={classes.textField}
                    margin="dense"
                    inputlabelprops={{
                      shrink: true,
                    }}
                    variant="outlined"
                    value={state.word}
                    onChange={handleChange('word')}
                  />
                </FormControl>

              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={12}>

                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="admin-user-input">Position</InputLabel>
                  <Select
                    value={state.position}
                    onChange={handleChange('position')}
                    input={<BootstrapInput name="user" id="position-customized-select" />}
                    inputProps={{
                      name: 'position',
                      id: 'position-input',
                    }}
                  >
                    <MenuItem key={"initial"} value={"initial"}>Initial</MenuItem>
                    <MenuItem key={"final"} value={"final"}>Final</MenuItem>
                  </Select>
                </FormControl>

                <Button type="submit" variant="outlined" className={classes.submitButton}>Find</Button>

              </Grid>

            </Grid>

      </form>
    </div>
  );
}
