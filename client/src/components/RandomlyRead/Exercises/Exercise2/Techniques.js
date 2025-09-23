import React from 'react';
import { styled } from '@mui/material/styles';
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

  const [expanded, setExpanded] = React.useState('panel2');

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

const TechniquesWrapped = withStyles(styles)(Techniques);

export default TechniquesWrapped;
