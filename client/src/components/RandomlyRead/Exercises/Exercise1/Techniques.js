import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { withStyles } from '@mui/styles';
import { styles } from '../../../../exerciseThemeHandler';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Divider from '@mui/material/Divider';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import Technique1 from '../../Techniques/Technique1/Component.js';
import Technique2 from '../../Techniques/Technique2/Component.js';
import Technique3 from '../../Techniques/Technique3/Component.js';

function Techniques(props) {
  const { classes } = props;

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box className={classes.techniqueRoot}>

      <Grid container>
        
        <Grid item xs={12}>
          <Technique1 />
        </Grid>

        <Grid item xs={12}>
          <br />
          <Divider className={classes.techniqueDivider} />
          <br /><br />
        </Grid>    

        <Grid item xs={12}>
          <Technique2 />
        </Grid>

        <Grid item xs={12}>
          <br />
          <Divider className={classes.techniqueDivider} />
          <br /><br />
        </Grid> 
        
        <Grid item xs={12}>
          <Technique3 />
        </Grid> 
      </Grid>

    </Box>
  );
}

// Wrap the functional component with withStyles
const TechniquesWithStyles = withStyles(styles)(Techniques);

// Wrapper component to provide theme
function TechniquesWrapper(props) {
  const theme = useTheme();
  
  return <TechniquesWithStyles {...props} theme={theme} />;
}

export default TechniquesWrapper;
