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
          <ListItem alignItems="flex-start">
            <FontAwesomeIcon icon={faAngleRight} size="2x" pull="left" className={classes.techniqueIcon} />
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
                  <Typography variant="body1" component="p" color="textPrimary" className={classes.techniquePrimaryText}>
                    Breathe out while paying attention to your Diaphragm.
                  </Typography>
                  <Typography variant="body1" component="p" color="textSecondary">
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
                  <Typography variant="body1" component="p" color="textPrimary" className={classes.techniquePrimaryText} >
                    Breathe in by expanding your rib cage outwards to your sides.
                  </Typography>
                  <Typography variant="body1" component="p" color="textSecondary">
                    As your lungs fill with air you should feel your Diaphragm expand downwards.
                  </Typography>
                  <Typography variant="body1" component="p" color="textSecondary">
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
                  <Typography variant="body1" component="p" color="textPrimary" className={classes.techniquePrimaryText}>
                    As you approach the top of your breath consciously relax your Pelvic Floor.
                  </Typography>
                  <Typography variant="body1" component="p" color="textSecondary">
                    Continue to relax your Pelvic Floor as you breathe out.
                  </Typography>
                  <Typography variant="body1" component="p" color="textSecondary">
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
                    Vowel
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography variant="body1" component="p" color="textPrimary" className={classes.techniquePrimaryText}>
                    Use this flow of air to begin producing a gentle “hum” with your mouth partially open.
                  </Typography>
                  <Typography variant="body1" component="p" color="textSecondary">
                    As you produce this “hum” place your right index finger on your nose to feel the vibration.
                  </Typography>
                  <Typography variant="body1" component="p" color="textSecondary">
                    Slowly increase the volume of your voice while “humming” the vowel sound of the displayed word.
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
