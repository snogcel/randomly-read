import React from 'react';
import { styles } from '../../../../exerciseThemeHandler';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import ReactPlayer from 'react-player/youtube';

class Technique extends React.Component {


  /* 
  
  <Typography variant="body1" component="span" color="textSecondary" className={classes.techniqueDescriptionText}>
    This technique is intended to produce natural-sounding speech and is similar to "Phonation & Transfer". The goal in this case is to minimize the amount of time spent "humming" and to maximize the amount of time spent articulating and speaking. Over time, the duration of initial phonation will decrease and with practice can be condensed to a point that only the speaker will be able to detect it.
  </Typography>
  
  */

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        
        <Grid container>     

        <Grid item xs={12} lg={6}>
            
            <Grid item xs={12}>
              <Typography variant="h5" component="h2" className={classes.techniqueContentHeading}>
                IV. Resonant Speech
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                Breathe, Relax, Phonate, Transfer, Pinch, Resonance
              </Typography>
            </Grid>

            <Typography variant="body1" component="span" color="textSecondary" className={classes.techniqueDescriptionText}>
              This technique is intended to produce natural-sounding speech and is similar to "Phonation & Transfer". Our goal is to minimize the amount of time spent "humming" and to maximize the amount of time spent articulating and speaking.
            </Typography>
            
            <ReactPlayer 
              url="https://www.youtube.com/watch?v=yqWX86uT5jM&ab_channel=fotios"
              className={classes.techniquePlayerWrapper}
              width="100%"
              controls={false}
            />            

        </Grid>

        <Grid item xs={12} lg={6}>
        <List className={classes.techniqueListRoot}>

          <ListItem alignItems="flex-start">
            <FontAwesomeIcon icon={faAngleRight} size="2x" pull="left" className={classes.techniqueIcon} />
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography variant="h5" component="h2" className={classes.techniqueHeading} color="textPrimary">
                    Breathe
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography variant="body1" component="span" color="textPrimary" className={classes.techniquePrimaryText}>
                    Breathe in by expanding your rib cage outwards to your sides.
                  </Typography>
                  <Typography variant="body1" component="span" color="textSecondary" className={classes.techniqueSecondaryText}>
                    As your lungs fill with air you should feel your Diaphragm expand downwards.
                  </Typography>
                  <Typography variant="body1" component="span" color="textSecondary" className={classes.techniqueSecondaryText}>
                    Place your left hand just beneath your belly and notice how it moves as you breathe.
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <FontAwesomeIcon icon={faAngleRight} size="2x" pull="left" className={classes.techniqueIcon} />
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography variant="h5" component="h2" className={classes.techniqueHeading} color="textPrimary">
                    Relax
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography variant="body1" component="span" color="textPrimary" className={classes.techniquePrimaryText}>
                    As you approach the top of your breath consciously relax your Pelvic Floor.
                  </Typography>
                  <Typography variant="body1" component="span" color="textSecondary" className={classes.techniqueSecondaryText}>
                    Continue to relax your Pelvic Floor as you breathe out.
                  </Typography>
                  <Typography variant="body1" component="span" color="textSecondary" className={classes.techniqueSecondaryText}>
                    Pay attention not to pause at the top of your breath.
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <FontAwesomeIcon icon={faAngleRight} size="2x" pull="left" className={classes.techniqueIcon} />
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography variant="h5" component="h2" className={classes.techniqueHeading} color="textPrimary">
                    Phonate
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography variant="body1" component="span" color="textPrimary" className={classes.techniquePrimaryText}>
                    Use this flow of air to begin producing a gentle "hum" with your mouth partially open.
                  </Typography>
                  <Typography variant="body1" component="span" color="textSecondary" className={classes.techniqueSecondaryText}>
                    Notice how the vowel sound drives the word.
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <FontAwesomeIcon icon={faAngleRight} size="2x" pull="left" className={classes.techniqueIcon} />
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography variant="h5" component="h2" className={classes.techniqueHeading} color="textPrimary">
                    Transfer
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography variant="body1" component="span" color="textPrimary" className={classes.techniquePrimaryText}>
                    Transfer the "hum" from your nose to your mouth.
                  </Typography>
                  <Typography variant="body1" component="span" color="textSecondary" className={classes.techniqueSecondaryText}>
                    Relax your throat and larynx to transfer the flow of air to your mouth.
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <FontAwesomeIcon icon={faAngleRight} size="2x" pull="left" className={classes.techniqueIcon} />
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography variant="h5" component="h2" className={classes.techniqueHeading} color="textPrimary">
                    Pinch
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography variant="body1" component="span" color="textPrimary" className={classes.techniquePrimaryText}>
                    During the Transfer, pinch your right thumb and middle finger together.
                  </Typography>
                  <Typography variant="body1" component="span" color="textSecondary" className={classes.techniqueSecondaryText}>
                    Notice how this contrasts the relaxation in your Pelvic Floor and Diaphragm.
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <FontAwesomeIcon icon={faAngleRight} size="2x" pull="left" className={classes.techniqueIcon} />
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography variant="h5" component="h2" className={classes.techniqueHeading} color="textPrimary">
                    Resonance
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography variant="body1" component="span" color="textPrimary" className={classes.techniquePrimaryText}>
                    Focus on minimizing the duration of time you are "humming".
                  </Typography>
                  <Typography variant="body1" component="span" color="textSecondary" className={classes.techniqueSecondaryText}>
                    The word should start as a brief vibration in the nose and sound like normal speech.
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
        </Grid>

        </Grid>




        
      </React.Fragment>
    );
  }
}

const TechniqueWrapped = withStyles(styles)(Technique);

export default TechniqueWrapped;
