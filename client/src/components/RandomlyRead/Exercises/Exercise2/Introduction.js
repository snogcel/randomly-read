import React from 'react';
import { styles } from '../../../../exerciseThemeHandler';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

class Introduction extends React.Component {

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Box>
          <Typography variant="h5" component="h2" className={classes.contentHeading}>
            Intermediate Introduction
          </Typography>

          <br />

          <Typography variant="body1" color="textPrimary" component="p" >
            This program provides step-by-step speaking techniques and practice routines that will teach you how to use a speech therapy approach known as Fluency Shaping. This program is intended for people who stutter (PWS) and involves three phases.
          </Typography>


          <List className={classes.introductionListRoot}>
            <ListItem alignItems="flex-start">
              <FontAwesomeIcon icon={faChevronCircleRight} size="2x" pull="left" className={classes.introductionIcon} />
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography variant="body1" component="span" className={classes.introductionHeading} color="textPrimary">
                      Beginner
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography variant="body1" component="span" color="textPrimary" className={classes.introductionSecondaryText}>
                      Learn speaking techniques centered on phonation.
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <ListItem alignItems="flex-start">
              <FontAwesomeIcon icon={faChevronCircleRight} size="2x" pull="left" className={classes.introductionIconActive} />
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography variant="h5" component="h2" className={classes.introductionHeading} color="textPrimary">
                      Intermediate
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography variant="body1" component="span" color="textPrimary" className={classes.introductionPrimaryText}>
                      Transfer phonation into normal-sounding speech.
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <ListItem alignItems="flex-start">
              <FontAwesomeIcon icon={faChevronCircleRight} size="2x" pull="left" className={classes.introductionIcon} />
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography variant="h5" component="h2" className={classes.introductionHeading} color="textPrimary">
                      Advanced
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography variant="body1" component="span" color="textSecondary" className={classes.introductionSecondaryText}>
                      Adapt these techniques for everyday use.
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>

          <Typography variant="body1" color="textPrimary" component="p" >
            In this phase, we will focus on techniques relating to <strong>Phonation</strong>, <strong>Articulation</strong> and <strong>Transfer</strong>. These techniques allow you to begin to transfer the "raw" phonation produced in the previous phase into natural-sounding speech. Before we begin it’s important to understand the following definitions.
          </Typography>

          <br />

          <Typography variant="h5" component="h2" className={classes.definitionListHeading} color="textPrimary">
            Definitions
          </Typography>

          <List className={classes.definitionListRoot}>
            <ListItem alignItems="flex-start">
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
                      </Link>
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>

            <ListItem alignItems="flex-start">
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

            <ListItem alignItems="flex-start">
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

            <ListItem alignItems="flex-start">
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

          </List>

        </Box>
      </React.Fragment>
    );
  }
}

const IntroductionWrapped = withStyles(styles)(Introduction);

export default IntroductionWrapped;
