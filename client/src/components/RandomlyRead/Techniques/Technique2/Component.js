import React from 'react';
import { styles } from '../../../../exerciseThemeHandler';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

class Technique extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <List className={classes.techniqueListRoot}>

          <Typography variant="body1" component="span" color="textSecondary" className={classes.techniqueDescriptionText}>
            While keeping your Pelvic Floor relaxed, breathe in making sure not to pause at the top of your breath. Exhale using Diaphragmatic Phonation and, while remaining focused on the vowel sound, articulate your mouth and tongue as if you were speaking the word normally while gently pinching your thumb and middle finger on the vowel sound. The resulting speech will sound quite "robotic" which is addressed in subsequent exercises.
          </Typography>

          <ListItem alignItems="flex-start">
            <FontAwesomeIcon icon={faAngleRight} size="2x" pull="left" className={classes.techniqueIcon}/>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography variant="h5" component="h2" className={classes.techniqueHeading} color="textPrimary">
                    Stop
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography variant="body1" component="span" color="textPrimary" className={classes.techniquePrimaryText}>
                    Breathe out while paying attention to your Diaphragm.
                  </Typography>
                  <Typography variant="body1" component="span" color="textSecondary" className={classes.techniqueSecondaryText}>
                    You should be breathing downwards through your spine towards the floor.
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
                    Articulate
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography variant="body1" component="span" color="textPrimary" className={classes.techniquePrimaryText}>
                    Articulate your mouth as if you were speaking the word normally.
                  </Typography>
                  <Typography variant="body1" component="span" color="textSecondary" className={classes.techniqueSecondaryText}>
                    The resulting speech will sound robotic and weird.
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
                    As you produce this "hum", pinch your right thumb and middle finger together.
                  </Typography>
                  <Typography variant="body1" component="span" color="textSecondary" className={classes.techniqueSecondaryText}>
                    Notice how this contrasts the relaxation in your Pelvic Floor and Diaphragm.
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </React.Fragment>
    );
  }
}

const TechniqueWrapped = withStyles(styles)(Technique);

export default TechniqueWrapped;
