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
            Beginner Introduction
          </Typography>

          <br />

          <Typography variant="body1" color="textPrimary" component="p" >
            This program provides step-by-step speaking techniques and practice routines that will teach you how to use a speech therapy approach known as Fluency Shaping. This program is intended for people who stutter (PWS) and involves three phases.
          </Typography>


          <List className={classes.introductionListRoot}>
            <ListItem alignItems="flex-start">
              <FontAwesomeIcon icon={faChevronCircleRight} size="2x" pull="left" className={classes.introductionIconActive} />
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
                    <Typography variant="body1" component="span" color="textPrimary" className={classes.introductionPrimaryText}>
                      Learn speaking techniques centered on phonation.
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
                      Intermediate
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography variant="body1" component="span" color="textSecondary" className={classes.introductionSecondaryText}>
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
            In this phase, we will focus on techniques relating to <strong>Phonation</strong> and <strong>Articulation</strong>. The techniques that are discussed in this phase are foundational to this program and will be often repeated throughout your practice. Before we begin it’s important to understand the following definitions.
          </Typography>

          <br />

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
                      Fluency Shaping
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography variant="body1" component="span" color="textSecondary" className={classes.definitionSecondaryText}>
                      The main focus of fluency shaping intervention is to increase fluent speech through teaching one or more of the following: easy onsets, loose contacts, changing breathing, prolonging sounds or words, pausing, as well as other methods that reduce speaking rate.
                      <br /><br />
                      Learn More:
                      <Link href="https://www.mnsu.edu/comdis/isad7/papers/ramig7.html" className={classes.textLink} color="textSecondary" variant="body1">
                        Fluency Shaping Intervention: Helpful, But Why It Is Important to Know More
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
                      Effort Closure
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography variant="body1" component="span" color="textSecondary" className={classes.definitionSecondaryText}>
                      An effort closure, as defined by the Valsalva Hypothesis, is what your body does when it is attempting to lift, push or pull a heavy object. Your chest and shoulders become rigid, the muscles in your abdomen tighten and your throat (layrnx) becomes completely locked.
                      <br /><br />
                      Learn More:
                      <Link href="https://www.mnsu.edu/comdis/kuster/Infostuttering/Harrison/block.html" className={classes.textLink} color="textSecondary" variant="body1">
                        Understanding the Speech Block
                      </Link> and
                      <Link href="https://valsalva.org" className={classes.textLink} color="textSecondary" variant="body1">
                        Valsalva Hypothesis
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
