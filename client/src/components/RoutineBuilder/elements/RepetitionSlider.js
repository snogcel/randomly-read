import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
  slider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  }
}));

export default function RepetitionSlider(props) {
  const classes = useStyles();

  const [value] = React.useState('');
  const [state, setState] = React.useState(props.repetitions);

  const handleSliderChange = name => (event, value) => {
    setState({ ...state, [name]: value });
    props.action(value); // pass to redux
  };

  let unit = "time";
  if (state.repetition > 1) unit = "times";

  return (
    <div className={classes.root}>
      <InputLabel htmlFor="discrete-slider-duration" className={classes.slider}>Repeat {state.repetition} {unit}</InputLabel>
      <Slider
        defaultValue={props.repetitions}
        value={state.repetition}
        aria-labelledby="discrete-slider-duration"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={25}
        onChange={handleSliderChange('repetition', value)}
      />
    </div>
  );
}
