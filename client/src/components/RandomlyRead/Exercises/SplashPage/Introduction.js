import React from 'react';
import { styles } from '../../../../exerciseThemeHandler';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { styled, useTheme } from '@mui/material/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function Introduction(props) {
  const theme = useTheme();
  const classes = styles(theme);

  return (
    <React.Fragment>
      <Box>
        <Typography variant="h5" component="h2" className={classes.contentHeading}>
          Advanced Introduction
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
              <FontAwesomeIcon icon={faChevronCircleRight} size="2x" pull="left" className={classes.introductionIconActive} />
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
                    <Typography variant="body1" component="span" color="textPrimary" className={classes.introductionPrimaryText}>
                      Adapt these techniques for everyday use.
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>

          <Typography variant="body1" color="textPrimary" component="p" >
            In this phase, we will focus on techniques relating to <strong>Phonation</strong>, <strong>Transfer</strong> and <strong>Resonance</strong>. These techniques aim to facilitate fluency by quickly and smoothly transferring "raw" phonation into natural-sounding speech. Before we begin it’s important to understand the following definitions.
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
    </React.Fragment>
  );
}

export default Introduction;
