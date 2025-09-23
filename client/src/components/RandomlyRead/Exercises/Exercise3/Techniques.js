import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from '../../../../exerciseThemeHandler';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import Technique2 from '../../Techniques/Technique2/Component.js';
import Technique3 from '../../Techniques/Technique3/Component.js';
import Technique4 from '../../Techniques/Technique4/Component.js';

const useStyles = makeStyles((theme) => ({
  techniqueRoot: {
    flexGrow: 1
  },
  contentHeading: {
    margin: theme.spacing(2, 0, 3.5, 0),
    color: "#0B0F65",
    fontWeight: "bold"
  },
  techniqueAccordionSummary: {
    backgroundColor: "#fdfdfd"
  },
  techniqueMainHeading: {
    marginTop: theme.spacing(0),
    color: "#0B0F65",
    fontWeight: "bold"
  },
  techniqueAccordionDetails: {
    backgroundColor: "#fdfdfd",
    paddingTop: theme.spacing(0)
  },
  definitionListRoot: {
    flexGrow: 1,
    margin: theme.spacing(0, 0)
  },
  definitionListHeading: {
    margin: theme.spacing(1.5, 0, 0.5, 0),
    color: "#0B0F65",
    fontWeight: "500",
    fontSize: "1.25rem"
  },
  definitionHeading: {
    margin: theme.spacing(0),
    fontSize: "1.15rem"
  },
  definitionSecondaryText: {
    display: "block",
  },
  definitionIcon: {
    color: "#EBECFB",
    margin: theme.spacing(1, 0, 1, 0),
    paddingRight: theme.spacing(1)
  },
  textLink: {
    marginLeft: theme.spacing(0.5),
    textDecoration: 'underline'
  },
}));

function Techniques() {

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState('panel3');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box className={classes.techniqueRoot}>

      <Grid container>        
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

        <Grid item xs={12}>
          <br />
          <Divider className={classes.techniqueDivider} />
          <br /><br />
        </Grid> 
        <Grid item xs={12}>
          <Technique4 />
        </Grid>              
      </Grid>
      
    </Box>
  );
}

const TechniquesWrapped = withStyles(styles)(Techniques);

export default TechniquesWrapped;
