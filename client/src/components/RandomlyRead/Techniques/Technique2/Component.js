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

import Modal from '@material-ui/core/Modal';
import Definitions from '../../Definitions/Container';

import ReactPlayer from 'react-player/youtube';

class Technique extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Articulation: false,
      Diaphragm: false,
      PelvicFloor: false,
      Transfer: false
    };
  }

  handleOpenArticulation() {
    this.setState({Articulation: true});
  }
  handleCloseArticulation() {
    this.setState({Articulation: false});
  }

  handleOpenDiaphragm() {
    this.setState({Diaphragm: true});
  }
  handleCloseDiaphragm() {
    this.setState({Diaphragm: false});
  }

  handleOpenPelvicFloor() {
    this.setState({PelvicFloor: true});
  }
  handleClosePelvicFloor() {
    this.setState({PelvicFloor: false});
  }

  handleOpenTransfer() {
    this.setState({Transfer: true});
  }
  handleCloseTransfer() {
    this.setState({Transfer: false});
  }

  /*
  
  <Typography variant="body1" component="span" color="textSecondary" className={classes.techniqueDescriptionText}>
    While keeping your <Link className={classes.definitionLink} color="textSecondary" variant="body1" onClick={handleOpenPelvicFloor}>Pelvic Floor</Link> relaxed, breathe in making sure not to pause at the top of your breath. Exhale using <Link className={classes.definitionLink} color="textSecondary" variant="body1" onClick={handleOpenDiaphragm}>Diaphragmatic Breathing</Link> and, while remaining focused on the vowel sound, <Link className={classes.definitionLink} color="textSecondary" variant="body1" onClick={handleOpenArticulation}>Articulate</Link> your mouth and tongue as if you were speaking the word normally while gently pinching your thumb and middle finger on the vowel sound. The resulting speech will sound quite "robotic" which is addressed in subsequent exercises.
  </Typography>
  
  */

  render() {
    const { classes } = this.props;

    const handleOpenArticulation = () => this.handleOpenArticulation();
    const handleCloseArticulation = () => this.handleCloseArticulation();

    const handleOpenDiaphragm = () => this.handleOpenDiaphragm();
    const handleCloseDiaphragm = () => this.handleCloseDiaphragm();

    const handleOpenPelvicFloor = () => this.handleOpenPelvicFloor();
    const handleClosePelvicFloor = () => this.handleClosePelvicFloor();

    const handleOpenTransfer = () => this.handleOpenTransfer();
    const handleCloseTransfer = () => this.handleCloseTransfer();

    return (
      <React.Fragment>

        <Grid container>     

        <Grid item xs={12} lg={6}>
            
            <Grid item xs={12}>
              <Typography variant="h5" component="h2" className={classes.techniqueContentHeading}>
                II. Phonation with Articulation
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                Breathe, Relax, Phonate, Articulate, Pinch
              </Typography>
            </Grid>

            <Typography variant="body1" component="span" color="textSecondary" className={classes.techniqueDescriptionText}>
              This exercise expands on the previous one. Articulate your mouth and tongue as if you were speaking the word normally. Gently pinch your thumb and middle finger on the vowel sound.
            </Typography>
            
            <ReactPlayer 
              url="https://www.youtube.com/watch?v=3pFHLaPdgJ0&ab_channel=fotios"
              className={classes.techniquePlayerWrapper}
              width="100%"
              controls={true}
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
        </Grid>

        </Grid>
        
        
        


        

        <Modal
          open={this.state.Articulation}
          onClose={handleCloseArticulation}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.descriptionTextModal}>
            <Definitions word="Articulation"/>
          </Box>
        </Modal>

        <Modal
          open={this.state.Diaphragm}
          onClose={handleCloseDiaphragm}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.descriptionTextModal}>
            <Definitions word="Diaphragm"/>
          </Box>
        </Modal>

        <Modal
          open={this.state.PelvicFloor}
          onClose={handleClosePelvicFloor}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.descriptionTextModal}>
            <Definitions word="PelvicFloor"/>
          </Box>
        </Modal>

      </React.Fragment>
    );
  }
}

const TechniqueWrapped = withStyles(styles)(Technique);

export default TechniqueWrapped;
