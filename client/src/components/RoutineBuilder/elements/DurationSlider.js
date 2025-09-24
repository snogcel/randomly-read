import React from 'react';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import Slider from '@mui/material/Slider';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
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
  if (props.duration.duration > 1) unit = "seconds";

  return (
    <div className={classes.root}>
      <InputLabel shrink={true} htmlFor="discrete-slider-duration" className={classes.slider}>Display for {props.duration.duration} {unit}</InputLabel>
      <Slider
        defaultValue={props.duration}
        value={props.duration.duration}
        aria-labelledby="discrete-slider-duration"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={15}
        onChange={handleSliderChange('duration', value)}
      />
    </div>
  );
}
