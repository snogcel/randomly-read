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

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
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

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box className={classes.techniqueRoot}>

      <Typography variant="h5" component="h2" className={classes.contentHeading}>
        Advanced Techniques
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

      <Accordion elevation={3} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          className={classes.techniqueAccordionSummary}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5" component="h2" className={classes.techniqueMainHeading}>
                Resonant Speech
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                Stop, Breathe, Relax, Phonate, Transfer, Pinch, Resonance
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails className={classes.techniqueAccordionDetails}>
          <Grid container>
            <Grid item xs={12}>
              <Technique4 />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <br /><br />

      <Typography variant="h5" component="h2" className={classes.definitionListHeading} color="textPrimary">
        Definitions
      </Typography>

      <List className={classes.definitionListRoot}>
        <ListItemText
          primary={
            <React.Fragment>
              <FontAwesomeIcon icon={faInfoCircle} size="2x" pull="left" className={classes.definitionIcon} />
              <Typography variant="body1" component="span" className={classes.definitionHeading} color="textPrimary">
                Diaphragmatic Breathing
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography variant="body1" component="span" color="textSecondary" className={classes.definitionSecondaryText}>
                This technique is commonly used in meditation and focuses on driving the breath using your Diaphragm rather than your chest. The most basic type of diaphragmatic breathing is done by inhaling through your nose and breathing out through your mouth.
                <br /><br />
                Learn More:
                <Link href="https://www.healthline.com/health/diaphragmatic-breathing" className={classes.textLink} color="textSecondary" variant="body1">
                  What Is Diaphragmatic Breathing?
                </Link>
              </Typography>
            </React.Fragment>
          }
        />
        <ListItem alignItems="flex-start" disableGutters>
          <ListItemText
            primary={
              <React.Fragment>
                <FontAwesomeIcon icon={faInfoCircle} size="2x" pull="left" className={classes.definitionIcon} />
                <Typography variant="body1" component="span" className={classes.definitionHeading} color="textPrimary">
                  Phonation
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography variant="body1" component="span" color="textSecondary" className={classes.definitionSecondaryText}>
                  Phonation is the act of producing sound through the vibration of the vocal folds in the larynx. Phonation can be viewed as a sort of "droning" or "humming" sound and is used to drive the production of the vowel sounds which allows for the production of speech.
                  <br /><br />
                  Learn More:
                  <Link href="https://www.valsalva.org/phonation-blocks.htm" className={classes.textLink} color="textSecondary" variant="body1">
                    Phonation and Valsalva-Stuttering Blocks
                  </Link>
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>

        <ListItem alignItems="flex-start" disableGutters>
          <ListItemText
            primary={
              <React.Fragment>
                <FontAwesomeIcon icon={faInfoCircle} size="2x" pull="left" className={classes.definitionIcon} />
                <Typography variant="body1" component="span" className={classes.definitionHeading} color="textPrimary">
                  Transfer
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography variant="body1" component="span" color="textSecondary" className={classes.definitionSecondaryText}>
                  Transfer is the process of routing the "robotic" speech generated in the nasal passages into normal sounding speech which is centered in the mouth. Transfer can be verified by gently placing an index finger against the nose to see if you feel vibration (you should not feel any at completion of Transfer).
                  <br /><br />
                  Learn More:
                  <Link href="https://thevoicelady.com/nasal-voice/" className={classes.textLink} color="textSecondary" variant="body1">
                    Take This Test to See If Your Voice Is Nasal or Not
                  </Link>
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>


        <ListItem alignItems="flex-start" disableGutters>
          <ListItemText
            primary={
              <React.Fragment>
                <FontAwesomeIcon icon={faInfoCircle} size="2x" pull="left" className={classes.definitionIcon} />
                <Typography variant="body1" component="span" className={classes.definitionHeading} color="textPrimary">
                  Resonance
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography variant="body1" component="span" color="textSecondary" className={classes.definitionSecondaryText}>
                  Resonant speech is the goal of this treatment program and is simply a "condensed" version of the Transfer concept. The idea is to begin speech production in the nasal passages, then quickly and smoothly transitioning that speech into the mouth in a way that produces natural-sounding speech.
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>

      </List>

    </Box>
  );
}

const TechniquesWrapped = withStyles(styles)(Techniques);

export default TechniquesWrapped;
