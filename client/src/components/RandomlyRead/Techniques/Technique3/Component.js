import React from 'react';
import { styles } from '../../../../exerciseThemeHandler';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Modal from '@mui/material/Modal';
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
    This technique is intended to transfer the "robotic" sounding speech into something that resembles natural speech. The key to performing a transfer is to become aware of the flow of air while speaking normally through your mouth compared to humming using your nasal passages. To confirm that you are successfully completing a transfer, gently hold your index finger against the side of your nose and notice how the vibration stops once the flow of air is transferred to your mouth.
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
                Exercise 3 - Easy Onset
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                Breathe, Relax, Phonate, Articulate, Transfer, Pinch
              </Typography>
            </Grid>

            <Typography variant="body1" component="span" color="textSecondary" className={classes.techniqueDescriptionText}>
            Easy Onset expands on these phonation and articulation exercises. The goal of this technique is to gently transfer phonation to the layrnx, and to work towards producing natural sounding speech.
            </Typography>
            
            <ReactPlayer 
              url="https://www.youtube.com/watch?v=Ut9Gw2_tu-E&ab_channel=fotios"
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
                    The word should start as a vibration in the nose and finish sounding like normal speech.
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

        <Modal
          open={this.state.Transfer}
          onClose={handleCloseTransfer}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.descriptionTextModal}>
            <Definitions word="Transfer"/>
          </Box>
        </Modal>

      </React.Fragment>
    );
  }
}

const TechniqueWrapped = withStyles(styles)(Technique);

export default TechniqueWrapped;
