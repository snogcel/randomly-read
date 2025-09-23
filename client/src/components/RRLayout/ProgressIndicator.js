import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';
import { styles } from '../../themeHandler';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

// Create styled components from the styles
const StyledColumn = styled('div')(({ theme }) => styles(theme).column);
const StyledColumnDesktop = styled('div')(({ theme }) => styles(theme).columnDesktop);

function ProgressIndicator(props) {
  const theme = useTheme();
  const classes = styles(theme);
  
  // Use useMediaQuery to replace withWidth
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isXl = useMediaQuery(theme.breakpoints.only('xl'));
  
  let width;
  if (isXs) width = 'xs';
  else if (isSm) width = 'sm';
  else if (isMd) width = 'md';
  else if (isLg) width = 'lg';
  else if (isXl) width = 'xl';

  let status = null;
  let progressClass = classes.intermissionIndicator;
  let intermissionMultiplier = 1;

  if (typeof props.currentExercise !== "undefined" && props.currentExercise.length > 0 && typeof props.currentExerciseNumber !== "undefined" && props.currentExerciseNumber !== null) {
    if (!props.currentExercise[props.currentExerciseNumber].isIntermission) {
      progressClass = classes.exerciseIndicator;
      intermissionMultiplier = 1;
      status = (parseInt(props.completed) + 1) + ' of ' + props.total;
    }
  }

  let range = props.range;

  let timeLeft = (parseInt(range) - parseInt(props.timeLeft)) || 0;

  let increment = 100 / parseInt(range) || 0;
  let total = (increment * parseInt(range)) || 0;

  let value = (total - (increment * (range - timeLeft)));

  let size = 36;

  if (width === "md" || width === "sm" || width === "xs") size = 28;

  size = size * intermissionMultiplier;

// {(width === "md" || width === "sm" || width === "xs") ? ( <>{classes.column}</> ) : ( <>{classes.column}</>) }

  if ((width === "xs" || width === "sm")) {
    return (
      <StyledColumn>
        {(props.currentExerciseNumber !== null && props.text !== "" && props.auto) ? (
          <>
            <CircularProgress size={size} variant="determinate" value={value} color="inherit" className={progressClass} />      
          </>
        ) : (
          <>
          </>
        )}
        <br />
        {(props.currentExerciseNumber !== null && props.text !== "") ? (
          <>          
            <Typography variant="h6" color="secondary">{status}</Typography>
          </>
        ) : (
          <>
          </>
        )}
      </StyledColumn>
    );
  } else if ((width === "md" || width === "lg" || width === "xl")) {
    return (
      <StyledColumnDesktop>
        {(props.currentExerciseNumber !== null && props.text !== "" && props.auto) ? (
          <>
            <CircularProgress size={size} variant="determinate" value={value} color="inherit" className={progressClass} />      
          </>
        ) : (
          <>
          </>
        )}
        <br />
        {(props.currentExerciseNumber !== null && props.text !== "") ? (
          <>          
            <Typography variant="h6" color="secondary">{status}</Typography>
          </>
        ) : (
          <>
          </>
        )}
      </StyledColumnDesktop>
    );
  } 

  

}

ProgressIndicator.propTypes = {
  // width is now determined internally using useMediaQuery
};

export default ProgressIndicator;
