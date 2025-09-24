import React from 'react';
import { styles } from '../../../../exerciseThemeHandler';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { withStyles } from '@mui/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Modal from '@mui/material/Modal';
import Definitions from '../../Definitions/Container';

import ReactPlayer from 'react-player/youtube';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

class Technique extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Phonate: false,
      Articulation: false,
      Diaphragm: false,
      PelvicFloor: false
    };
  }

  // this is a really ugly way to do this...
  handleOpenPhonate() {
    this.setState({Phonate: true});
  }
  handleClosePhonate() {
    this.setState({Phonate: false});
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

  /*
  
  <Typography variant="body1" component="span" color="Primary" className={classes.techniqueDescriptionText}>
    The goal of this exercise is to learn how to <Link className={classes.definitionLink} color="textSecondary" variant="body1" onClick={handleOpenPhonate}>Phonate</Link> using the nasal passages and diaphragm and should result in a gentle humming sound. When practicing this technique it is not necessary to <Link className={classes.definitionLink} color="textSecondary" variant="body1" onClick={handleOpenArticulation}>Articulate</Link> the word being displayed, instead, focus on the vowel sound which drives the word. Generate a smooth flow of air using <Link className={classes.definitionLink} color="textSecondary" variant="body1" onClick={handleOpenDiaphragm}>Diaphragmatic Breathing</Link> while keeping your <Link className={classes.definitionLink} color="textSecondary" variant="body1" onClick={handleOpenPelvicFloor}>Pelvic Floor</Link> relaxed.
  </Typography>

  */

  render() {
    const { classes } = this.props;

    const handleOpenPhonate = () => this.handleOpenPhonate();
    const handleClosePhonate = () => this.handleClosePhonate();

    const handleOpenArticulation = () => this.handleOpenArticulation();
    const handleCloseArticulation = () => this.handleCloseArticulation();

    const handleOpenDiaphragm = () => this.handleOpenDiaphragm();
    const handleCloseDiaphragm = () => this.handleCloseDiaphragm();

    const handleOpenPelvicFloor = () => this.handleOpenPelvicFloor();
    const handleClosePelvicFloor = () => this.handleClosePelvicFloor();

    return (
      <React.Fragment>

        

        <Grid container>     

          <Grid item xs={12} lg={6}>
              
              <Grid item xs={12}>
                <Typography variant="h5" component="h2" className={classes.techniqueContentHeading}>
                  Exercise 1 -  Vowels
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                  Breathe, Relax, Phonate
                </Typography>
              </Grid>

              <Typography variant="body1" component="span" color="Primary" className={classes.techniqueDescriptionText}>
                The goal of this exercise is to learn how to create sound using the nasal passages and diaphragm. Also known as phonation, this should result in a humming sound.
              </Typography>
              
              <ReactPlayer 
                url="https://www.youtube.com/watch?v=5_KWYjf5XDo&ab_channel=fotios"
                className={classes.techniquePlayerWrapper}
                width="100%"
                controls={true}
              />           

          </Grid>

          <Grid item xs={12} lg={6}>
            <List className={classes.techniqueListRoot}>

              <ListItem alignItems="flex-start">
                <FontAwesomeIcon icon={faAngleRight} size="2x" pull="left" style={{color: "#4045A6", margin: "8px"}} />
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
                <FontAwesomeIcon icon={faAngleRight} size="2x" pull="left" style={{color: "#4045A6", margin: "8px"}} />
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
                <FontAwesomeIcon icon={faAngleRight} size="2x" pull="left" style={{color: "#4045A6", margin: "8px"}} />
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
                        Use this flow of air to begin producing a gentle “hum” with your mouth partially open.
                      </Typography>
                      <Typography variant="body1" component="span" color="textSecondary" className={classes.techniqueSecondaryText}>
                        As you produce this “hum” place your right index finger on your nose to feel the vibration.
                      </Typography>
                      <Typography variant="body1" component="span" color="textSecondary" className={classes.techniqueSecondaryText}>
                        Slowly increase the volume of your voice while “humming” the vowel sound of the displayed word.
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Grid>
          
        </Grid>

        

        


        <Modal
          open={this.state.Phonate}
          onClose={handleClosePhonate}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.descriptionTextModal}>
            <Definitions word="Phonate"/>
          </Box>
        </Modal>

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

// Wrap the class component with withStyles
const TechniqueWithStyles = withStyles(styles)(Technique);

// Wrapper component to provide theme
function TechniqueWrapper(props) {
  const theme = useTheme();
  
  return <TechniqueWithStyles {...props} theme={theme} />;
}

export default TechniqueWrapper;
