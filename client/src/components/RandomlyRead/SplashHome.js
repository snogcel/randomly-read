import React from 'react';
import ReactGA from "react-ga4";
import { withStyles } from "@material-ui/core/styles";
import { useTheme } from '@material-ui/core/styles';

import Identities from './Identities/Identities';

import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Hidden from '@material-ui/core/Hidden';
import Fade from '@material-ui/core/Fade';

import Header from './Header/Container';
import RoutineDescriptionContainer from './Exercises/RoutineDescriptionContainer';
import WordCardContainer from './Exercises/WordCardContainer';
import ExerciseHistoryContainer from './Exercises/ExerciseHistoryContainer';
import ProgressIndicator from '../RRLayout/ProgressIndicatorContainer'
import IdentityConfig from './Identities/SplashConfig';
import Subnavigation from './Exercises/SubnavigationContainer';
import WordHistoryList from '../WordHistoryList/Container';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import BuyMeACoffee from './Donate/Component';
import SiteFooter from './Footer/Component';

import { styles } from '../../exerciseThemeHandler';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const RRHome = props => {

  const { TimerContainer, RoutineSelectContainer, ExerciseIntroduction, ExerciseTechniques, ApolloClient } = props;
  const { classes } = props;

  const [open_1, setOpen_1] = React.useState(false);
  const [open_2, setOpen_2] = React.useState(false);

  const theme = useTheme();

  const { width } = props;

  let { stages } = IdentityConfig;

  let location = props.history.location.pathname;

  let selectedStage = 0; // set default stage

  for (let i = 0; i < stages.length; i++) {
    if (location.includes(stages[i])) {
      selectedStage = i; // render selected stage
    }
  }

  const [value, setValue] = React.useState(selectedStage);

  const handleChange = (event, newValue) => {
    updatePathname(newValue);
    setValue(newValue);
  };

  function updatePathname(subpath) {

    // set router url to match page section
    let { root, levels, stages } = IdentityConfig;

    if (!subpath) subpath = 0;

    let location = props.history.location.pathname;

    for (let i = 0; i < levels.length; i++) {
      if (location.includes(levels[i])) {
        location = root + stages[subpath];
        props.history.push(location);
      }
    }
    
    const GA_ID = 'G-HZ4HM6M2GK'; // your google analytics id
    ReactGA.initialize(GA_ID);
    ReactGA.send({ hitType: "pageview", page: location });  

  }

  function handleClick(e, pathname, routineId) {
    if (props.history.location.pathname !== pathname) {
      props.setInProgress(false);
      props.setExercisePause(false);
      props.updateTime(0);
      props.updateTimeLeft(0);
      props.resetRoutineSelect();
      props.clearQueryResults();
      props.resetWordCard();
      props.updateId(routineId);
      props.history.push({pathname});
    }
  }

  let exerciseHistoryContainerWidth = 12;
  let timerContainerWidth = 12;

  // desktop - widescreen
  if (width === "xl") {
    exerciseHistoryContainerWidth = 8;
    timerContainerWidth = 4;
  }

  // laptop or desktop
  if (width === "lg" || width === "md") {
    exerciseHistoryContainerWidth = 8;
    timerContainerWidth = 4;
  }

  const handleOpen_1 = () => {
    setOpen_1(true);
  };

  const handleClose_1 = () => {
    setOpen_1(false);
  };

  const handleOpen_2 = () => {
    setOpen_2(true);
  };

  const handleClose_2 = () => {
    setOpen_2(false);
  };

  // <LinkTab disableRipple disableFocusRipple className={classes.introTabLink} label="Customizable" {...a11yProps(1)} />

  return (

    <Container maxWidth="lg" className={classes.homeContainer}>

      <Grid className={classes.root}>

          <Grid container alignItems="center" justify="center" spacing={0}>

          <Grid className={classes.headerBackground} container spacing={0}>
            <Grid item xs={4} sm={4} md={6}>
              <Header />
            </Grid>

            <Grid item xs={8} sm={8} md={6}>
              <Box display="flex" justifyContent="flex-end">
                <Subnavigation />
              </Box>
            </Grid>
          </Grid>

            <Grid item xs={12} sm={11} md={11} lg={12}>

              <Grid container spacing={0}>

                <Grid item xs={12}>
                  <AppBar position="static" color="secondary" elevation={0}>
                    <Tabs value={value} onChange={handleChange}>
                      <LinkTab disableRipple disableFocusRipple className={classes.introTabLink} label="Overview" {...a11yProps(0)} />
                    </Tabs>
                  </AppBar>
                </Grid>

                <Grid item xs={12}>
                  <TabPanel value={value} index={0} className={classes.homeTabPanel}>

                    <Fade in={true} timeout={750}>
                      <Grid container justify="center" spacing={0} className={classes.introContainer}>

                        <Grid item xs={12}>

                          <Box>
                            
                            <br />

                            <Typography variant="body1" color="textPrimary" component="p" >
                              Welcome to EasyOnset.com, a free speech therapy service for People Who Stutter. This program is the result of my own personal experience learning to use speaking techniques to overcome stuttering as a child and to maintain it as an adult. If you find this resource useful, please support the site and <Link href="https://www.buymeacoffee.com/easyonset">buy me a coffee</Link>.
                            </Typography>

                            <br />

                            <Typography variant="body1" color="textPrimary" component="p" >
                              The key to this program is an automated training system which displays dynamically generated word lists using timed flash cards. These word lists form a series of therapy routines aimed at achieving phonetic balance while helping you get the most out of every practice session.
                            </Typography>

                          </Box>

                        </Grid>

                        <Grid item xs={12} align="center" className={classes.getStartedButtonContainer}>

                          <Button className={classes.getStartedButton} variant="outlined" color="primary" onClick={e => handleClick(e, Identities[1].pathname[0], Identities[1].user.routines[0])}>Click Here To Get Started</Button> 

                        </Grid>

                      </Grid>
                    </Fade>

                  </TabPanel>
                </Grid>

                <Grid item xs={12}>
                  <TabPanel value={value} index={1} className={classes.introTabPanel}>
                    <Fade in={true} timeout={750}>
                      <Grid container spacing={0} className={classes.techniquesContainer}>

                        <Grid item xs={12}>

                          <Box>
                            <Typography variant="h5" component="h2" className={classes.contentHeading}>
                              Customizable
                            </Typography>

                            <br />

                            <Typography variant="body1" color="textPrimary" component="p" >
                              EasyOnset.com has been customized to address Stuttering and is heavily influenced by the work of Dr. Peter Ramig (Speech Therapy) and Dr. William Perry (Valsalva Hypothesis / Self-Help). This tool has been inspired through my own personal journey learning how to successfully manage my stutter.
                            </Typography>

                            <br />

                            <Typography variant="body1" color="textPrimary" component="p" >
                              EasyOnset.com aims to make the “practice” and “maintenance” aspects of Speech Therapy as user-friendly and efficient as possible.
                            </Typography>

                          </Box>


                          <Grid container spacing={5}>

                            <Grid item xs={12} sm={8}>

                              <br />

                              <Typography variant="h5" component="h2" className={classes.definitionListHeading} color="textPrimary">
                                How does it work?
                              </Typography>

                              <br />

                              <Typography variant="body1" color="textPrimary" component="p" >
                                Through the use of a password-protected administrator console, customized routines can be created for a group of clients who share a common deficit such as Lisping or Stuttering. Additionally, fully customized routines can be created for an individual based on their needs.
                              </Typography>

                              <br />

                              <Typography variant="body1" color="textPrimary" component="p" >
                                These exercise routines provide a structure for these practice routines and can even go so far as to track whether or not the person has completed the assigned exercises. In addition to providing structure, these exercise routines also provide a targeted set of words to practice as opposed to simply reading text out of magazines, newspapers or books.
                              </Typography>

                              <br />

                              <Typography variant="h5" component="h2" className={classes.definitionListHeading} color="textPrimary">
                                Practice Smarter.
                              </Typography>

                              <br />

                              <Typography variant="body1" color="textPrimary" component="p" >
                                Using a proprietary system, EasyOnset.com is able to filter and focus the system-generated exercise routine on specific consonants and vowels, the placement of those sounds within the word, the number of syllables in the word, and even so far as grade level that the word is first acquired. This approach allows for a more efficient usage of time while practicing, ensuring that the user is focusing their efforts – working “smart” instead of working “hard”.
                              </Typography>



                            </Grid>


                            <Hidden xsDown>
                              <Grid item xs={12} sm={4}>

                                <br /><br /><br />

                                <img src="./fluencyShaping_admin1_preview.png" onClick={handleOpen_1} className={classes.homePagePreviewImage} alt="Preview 1"/>

                                <Modal
                                  aria-labelledby="simple-modal-title"
                                  aria-describedby="simple-modal-description"
                                  open={open_1}
                                  onClose={handleClose_1}
                                >
                                  <div className={classes.previewImage}>
                                    <img src="./fluencyShaping_admin1.PNG" alt="Preview 1"/>
                                  </div>
                                </Modal>

                                <br /><br /><br />

                                <img src="./fluencyShaping_admin2_preview.png" onClick={handleOpen_2} className={classes.homePagePreviewImage} alt="Preview 2" />

                                <Modal
                                  aria-labelledby="simple-modal-title"
                                  aria-describedby="simple-modal-description"
                                  open={open_2}
                                  onClose={handleClose_2}
                                >
                                  <div className={classes.previewImage}>
                                    <img src="./fluencyShaping_admin2.PNG" alt="Preview 2"/>
                                  </div>
                                </Modal>

                              </Grid>
                            </Hidden>

                          </Grid>

                          <br />

                          <Box>

                            <Typography variant="h5" component="h2" className={classes.definitionListHeading} color="textPrimary">
                              Contact Us.
                            </Typography>

                            <br />

                            <Typography variant="body1" color="textPrimary" component="p" >
                              This platform aims to bridge the gap between “on-site” speech therapy and “self-help” speech therapy. To learn more about how this tool could be used in your own practice please reach out to <Link href="mailto:jon@blackcircletechnologies.com">jon@blackcircletechnologies.com</Link>.
                            </Typography>
                          </Box>

                        </Grid>
                      </Grid>
                    </Fade>
                  </TabPanel>
                </Grid>

              </Grid>
            </Grid>

            <Grid item xs={12} sm={11} md={11} lg={12} align="center" className={classes.siteFooterWrapper}>

              <Typography variant="body2" color="textSecondary" component="p" >
                Copyright &copy; {(new Date().getFullYear())} Black Circle Technologies, LLC <br />All Rights Reserved, email us <Link href="mailto:hello@easyonset.com" variant="body3" color="textPrimary">hello@easyonset.com</Link>
              </Typography>

            </Grid>

          </Grid>
    
      </Grid>
      
      
    </Container>

  )};


// { (width === "xs" || width === "sm") ? (((!props.inProgress) ? ((!props.inProgress && !props.isCompleted) ? ( <RoutineDescriptionContainer /> ) : null ) : null )) : ( <RoutineDescriptionContainer /> ) }

RRHome.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

const RRHomeWrapped = withStyles(styles)(RRHome);

export default withWidth()(RRHomeWrapped);
