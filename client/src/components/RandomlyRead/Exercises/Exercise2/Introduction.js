import React from 'react';
import { styles } from '../../../../exerciseThemeHandler';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
                      Description
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
                      Description
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
                      Description
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
                      Description
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
