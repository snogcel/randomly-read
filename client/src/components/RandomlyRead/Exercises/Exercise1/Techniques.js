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

import Technique1 from '../../Techniques/Technique1/Component.js';
import Technique2 from '../../Techniques/Technique2/Component.js';

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
        Beginner Techniques
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
                Phonation
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                Stop, Breathe, Relax, Phonate
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails className={classes.techniqueAccordionDetails}>
          <Grid container>
            <Grid item xs={12}>
              <Technique1 />
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

      <br /><br />

      <Typography variant="h5" component="h2" className={classes.definitionListHeading} color="textPrimary">
        Definitions
      </Typography>

      <List className={classes.definitionListRoot}>

        <ListItem alignItems="flex-start" disableGutters>
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
        </ListItem>

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
                  Pelvic Floor
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography variant="body1" component="span" color="textSecondary" className={classes.definitionSecondaryText}>
                  The Pelvic Floor is a group of muscles located in the pelvic region which provide support for internal organs such as the bladder, rectum and uterus/prostate. In the context of this program, the relaxation of these muscles allow the speaker to short-circuit an Effort Closure.
                  <br /><br />
                  Learn More:
                  <Link href="https://drtarasalay.com/what-is-the-pelvic-floor/" className={classes.textLink} color="textSecondary" variant="body1">
                    What is the Pelvic Floor?
                  </Link> and
                  <Link href="https://www.wikihow.com/Relax-Your-Pelvic-Floor" className={classes.textLink} color="textSecondary" variant="body1">
                    How to Relax Your Pelvic Floor
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
                  Articulation
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography variant="body1" component="span" color="textSecondary" className={classes.definitionSecondaryText}>
                  Articulation is the act of speaking words through the movement of speech organs including lips, teeth and tongue. In other words, it is the process which allows us to produce words by shaping the "humming" sound produced through the act of Phonation.
                  <br /><br />
                  Learn More:
                  <Link href="https://www.differencebetween.com/difference-between-articulation-and-vs-pronunciation/" className={classes.textLink} color="textSecondary" variant="body1">
                    Difference Between Articulation and Pronunciation
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
                  Larynx
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography variant="body1" component="span" color="textSecondary" className={classes.definitionSecondaryText}>
                  The Layrnx or "voice box" is a fundamental component in speech production and is located in the throat. When air is pushed through the Layrnx it causes vocal folds to vibrate which in turn generates sound.
                  <br /><br />
                  Learn More:
                  <Link href="https://www.nidcd.nih.gov/health/what-is-voice-speech-language" className={classes.textLink} color="textSecondary" variant="body1">
                    What Is Voice? What Is Speech? What Is Language?
                  </Link> and
                  <Link href="https://www.atosmedical.us/wp-content/uploads/2018/01/mc0824_caretip_09_artificial_larynx_basic_training_201801web-1.pdf" className={classes.textLink} color="textSecondary" variant="body1">
                    Artificial Larynx Basic Training
                  </Link>
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
