import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import { useTheme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Hidden from '@material-ui/core/Hidden';
import Fade from '@material-ui/core/Fade';

import RoutineDescriptionContainer from './Exercises/RoutineDescriptionContainer';
import WordCardContainer from './Exercises/WordCardContainer';
import ExerciseHistoryContainer from './Exercises/ExerciseHistoryContainer';
import ProgressIndicator from '../RRLayout/ProgressIndicatorContainer'
import IdentityConfig from './Identities/Config';
import Subnavigation from './Exercises/SubnavigationContainer';
import WordHistoryList from '../WordHistoryList/Container';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

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
        location = root + levels[i] + "/" + stages[subpath];
        props.history.push(location);
      }
    }

  }

  function displayModal() {
    console.log("test");
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

  return (

    <Container maxWidth="lg" className={classes.homeContainer}>

      <Grid className={classes.root}>

          <Grid container alignItems="center" justify="center" spacing={0}>
            <Grid item xs={12} sm={11} md={11} lg={12}>

              <Grid container spacing={0}>

                <Grid item xs={12}>
                  <Subnavigation />
                </Grid>

                <Grid item xs={12}>
                  <AppBar position="static" color="secondary" elevation={0}>
                    <Tabs value={value} onChange={handleChange}>
                      <LinkTab disableRipple disableFocusRipple className={classes.introTabLink} label="Introduction" {...a11yProps(0)} />
                      <LinkTab disableRipple disableFocusRipple className={classes.introTabLink} label="Techniques" {...a11yProps(1)} />
                      <LinkTab disableRipple disableFocusRipple className={classes.introTabLink} label="Practice" {...a11yProps(2)} />
                    </Tabs>
                  </AppBar>
                </Grid>

                <Grid item xs={12}>
                  <TabPanel value={value} index={0} className={classes.introTabPanel}>
                    <Fade in={true} timeout={750}>
                      <Grid container spacing={0} className={classes.introContainer}>
                        <Grid item xs={12}>
                          <ExerciseIntroduction />
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
                          <ExerciseTechniques />
                        </Grid>
                      </Grid>
                    </Fade>
                  </TabPanel>
                </Grid>

                <Grid item xs={12}>
                  <TabPanel value={value} index={2} className={classes.homeTabPanel}>

                      <Fade in={true} timeout={750}>
                        <Grid container spacing={2} justify="center" spacing={0} className={classes.introContainer}>

                          <Grid item xs={12}>

                            <Box>
                              <Typography variant="h5" component="h2" className={classes.contentHeading}>
                                Advanced Introduction
                              </Typography>

                              <br />

                              <Typography variant="body1" color="textPrimary" component="p" >
                                This program provides step-by-step speaking techniques and practice routines that will teach you how to use a speech therapy approach known as Fluency Shaping. This program is intended for people who stutter (PWS) and involves three phases.
                              </Typography>
                            </Box>


                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>

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

                              </Grid>

                              <Grid item xs={12} sm={6}>

                                <TimerContainer RoutineSelectContainer={RoutineSelectContainer} />

                                <WordCardContainer ApolloClient={ApolloClient} classes={classes} />

                                <ProgressIndicator />

                              </Grid>
                            </Grid>






                          </Grid>

                        </Grid>
                      </Fade>


                    <Hidden xsUp={(!(props.routineSelectId !== 0))}>

                      <Fade in={true} timeout={1250}>
                        <Grid container spacing={2}>



                        </Grid>
                      </Fade>

                    </Hidden>

                  </TabPanel>
                </Grid>

              </Grid>
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
