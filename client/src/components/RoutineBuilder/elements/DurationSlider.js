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

export default function DurationSlider(props) {
  const classes = useStyles();

  const [value] = React.useState('');
  const [state, setState] = React.useState(props.duration);

  const handleSliderChange = name => (event, value) => {
    setState({ ...state, [name]: value });
    props.action(value); // pass to redux
  };

  let unit = "second";
  if (state.duration > 1) unit = "seconds";

  return (
    <div className={classes.root}>
      <InputLabel htmlFor="discrete-slider-duration" className={classes.slider}>Display for {state.duration} {unit}</InputLabel>
      <Slider
        defaultValue={props.duration}
        value={state.duration}
        aria-labelledby="discrete-slider-duration"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
        onChange={handleSliderChange('duration', value)}
      />
    </div>
  );
}
