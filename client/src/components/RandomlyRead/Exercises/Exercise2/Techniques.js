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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

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

      <Typography variant="h5" component="h2" className={classes.contentHeading}>
        Intermediate Techniques
      </Typography>

      <Accordion elevation={3} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className={classes.techniqueAccordionSummary}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5" component="h2" className={classes.techniqueMainHeading}>
                Phonation & Articulation
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                Stop, Breathe, Relax, Phonate, Articulate, Pinch
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails className={classes.techniqueAccordionDetails}>
          <Grid container>
            <Grid item xs={12}>
              <Technique2 />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion elevation={3} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          className={classes.techniqueAccordionSummary}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5" component="h2" className={classes.techniqueMainHeading}>
                Phonation & Transfer
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                Stop, Breathe, Relax, Phonate, Articulate, Transfer, Pinch
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails className={classes.techniqueAccordionDetails}>
          <Grid container>
            <Grid item xs={12}>
              <Technique3 />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

    </Box>
  );
}

const TechniquesWrapped = withStyles(styles)(Techniques);

export default TechniquesWrapped;
