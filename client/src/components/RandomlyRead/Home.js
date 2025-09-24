import React from 'react';
import ReactGA from "react-ga4";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from 'react-router-dom';

import Identities from './Identities/Identities';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Hidden from '@mui/material/Hidden';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
// import Header from './Header/Container';
import RoutineDescriptionContainer from './Exercises/RoutineDescriptionContainer';
import WordCardContainer from './Exercises/WordCardContainer';
import ExerciseHistoryContainer from './Exercises/ExerciseHistoryContainer';
import ProgressIndicator from '../RRLayout/ProgressIndicatorContainer'
import IdentityConfig from './Identities/Config';
// import Subnavigation from './Exercises/SubnavigationContainer';
import WordHistoryList from '../WordHistoryList/Container';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import BuyMeACoffee from './Donate/Component';

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
  const theme = useTheme();
  const classes = styles(theme);
  const navigate = useNavigate();
  const location = useLocation();

  const { TimerContainer, RoutineSelectContainer, ExerciseIntroduction, ExerciseTechniques, ApolloClient, auto } = props;
  
  // Use useMediaQuery to replace withWidth
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isXl = useMediaQuery(theme.breakpoints.only('xl'));
  
  let width = 'xs';
  if (isXl) width = 'xl';
  else if (isLg) width = 'lg';
  else if (isMd) width = 'md';
  else if (isSm) width = 'sm';

  let subpath = 0;
  let { root, levels, stages, leveltitle, pathtitle } = IdentityConfig;

  let location = props.history.location.pathname;

  for (let i = 0; i < levels.length; i++) {
    if (location.includes(levels[i])) {
      subpath = i;   
    }
  }
  
  if (leveltitle !== 'Home') {
    document.title = 'EasyOnset.com | ' + leveltitle[subpath];
  } else {
    document.title = 'EasyOnset.com';
  }

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
    // console.log(subpath);

    let { root, levels, stages, leveltitle, pathtitle } = IdentityConfig;

    if (!subpath) subpath = 0;

    let currentLocation = location.pathname;

    for (let i = 0; i < levels.length; i++) {
      if (currentLocation.includes(levels[i])) {
        currentLocation = root + levels[i] + "/" + stages[subpath];
        navigate(currentLocation);
      }
    }
    
    const GA_ID = 'G-HZ4HM6M2GK'; // your google analytics id
    ReactGA.initialize(GA_ID);
    ReactGA.send({ hitType: "pageview", page: location });  

  }

  function handleShortcut(e, subpath, location, routineId) {

    // set router url to match page section
    console.log(subpath);

    let { root, levels, stages, leveltitle, pathtitle } = IdentityConfig;

    if (!subpath) subpath = 0;

    // let location = props.history.location.pathname;

    console.log(location);

    if (props.history.location.pathname !== location) {
      props.setInProgress(false);
      props.setExercisePause(false);
      props.updateTime(0);
      props.updateTimeLeft(0);
      props.resetRoutineSelect();
      props.clearQueryResults();
      props.resetWordCard();
      props.updateId(routineId);      
    }

    for (let i = 0; i < levels.length; i++) {
      if (location.includes(levels[i])) {
        location = root + levels[i] + "/" + stages[subpath];
        navigate(location);
      }
    }
    
    const GA_ID = 'G-HZ4HM6M2GK'; // your google analytics id
    ReactGA.initialize(GA_ID);
    ReactGA.send({ hitType: "pageview", page: location });  

    setValue(subpath);

  }

  function handleClick(e, pathname, routineId) {

    // console.log(pathname);

    if (props.history.location.pathname !== pathname) {
      props.setInProgress(false);
      props.setExercisePause(false);
      props.updateTime(0);
      props.updateTimeLeft(0);
      props.resetRoutineSelect();
      props.clearQueryResults();
      props.resetWordCard();
      props.updateId(routineId);

      updatePathname(pathname);
      setValue(pathname);
      navigate(pathname);
    }
  }

  let exerciseHistoryContainerWidth = 12;
  let timerContainerWidth = 12;

  // desktop - widescreen
  if (width === "xl") {
    exerciseHistoryContainerWidth = 4;
    timerContainerWidth = 8;
  }

  // laptop or desktop
  if (width === "lg" || width === "md") {
    exerciseHistoryContainerWidth = 4;
    timerContainerWidth = 8;
  }

  // console.log(props.pageContext)

  return (

    <Container maxWidth="lg" className={classes.homeContainer}>
      <Grid className={classes.root}>
          <Grid container alignItems="center" justify="center" spacing={0}>

            <Grid className={classes.headerBackground} container spacing={0}>
              <Grid item xs={4} sm={4} md={6}>
                
              </Grid>

              <Grid item xs={8} sm={8} md={6}>
                <Box display="flex" justifyContent="flex-end">
                  
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={11} md={11} lg={12}>

              <Grid container spacing={0}>              

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

                          <Typography variant="h5" component="h2" className={classes.contentHeading}>
                            Introduction
                          </Typography>

                          <br />

                          <Typography variant="body1" color="textPrimary" component="p" >
                            This program divides Easy Onset into smaller parts by breaking the speaking techniques into three training stages:
                          </Typography>
                          
                          <List className={classes.introductionListRoot}>
                            <ListItem alignItems="flex-start">
                              { (props.pageContext === "beginner" ? <><FontAwesomeIcon icon={faChevronCircleRight} size="2x" pull="left" style={{color: "#4045A6"}} /></> : <><FontAwesomeIcon icon={faChevronCircleRight} size="2x" pull="left" style={{color: "#CCCCCC"}} /></>) }
                              <ListItemText
                                primary={
                                  <React.Fragment>
                                    <Typography variant="h5" component="h2" className={classes.introductionHeading} color="textPrimary" onClick={e => handleShortcut(e, 2, Identities[1].pathname[2], Identities[1].user.routines[0])}>
                                      Beginner Training
                                    </Typography>
                                  </React.Fragment>
                                }
                                secondary={
                                  <React.Fragment>
                                    <Typography variant="body1" component="span" color="textPrimary" className={classes.introductionSecondaryText} onClick={e => handleShortcut(e, 1, Identities[1].pathname[1], Identities[1].user.routines[0])}>
                                      Learn speaking techniques centered on phonation
                                    </Typography>
                                  </React.Fragment>
                                }
                              />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                            { (props.pageContext === "intermediate" ? <><FontAwesomeIcon icon={faChevronCircleRight} size="2x" pull="left" style={{color: "#4045A6"}} /></> : <><FontAwesomeIcon icon={faChevronCircleRight} size="2x" pull="left" style={{color: "#CCCCCC"}} /></>) }
                              <ListItemText
                                primary={
                                  <React.Fragment>
                                    <Typography variant="h5" component="h2" className={classes.introductionHeading} color="textPrimary" onClick={e => handleShortcut(e, 2, Identities[2].pathname[2], Identities[2].user.routines[0])}>
                                      Intermediate Training
                                    </Typography>
                                  </React.Fragment>
                                }
                                secondary={
                                  <React.Fragment>
                                    <Typography variant="body1" component="span" color="textSecondary" className={classes.introductionSecondaryText} onClick={e => handleShortcut(e, 1, Identities[2].pathname[1], Identities[2].user.routines[0])}>
                                      Transfer phonation into normal-sounding speech
                                    </Typography>
                                  </React.Fragment>
                                }
                              />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                            { (props.pageContext === "advanced" ? <><FontAwesomeIcon icon={faChevronCircleRight} size="2x" pull="left" style={{color: "#4045A6"}} /></> : <><FontAwesomeIcon icon={faChevronCircleRight} size="2x" pull="left" style={{color: "#CCCCCC"}} /></>) }
                              <ListItemText
                                primary={
                                  <React.Fragment>
                                    <Typography variant="h5" component="h2" className={classes.introductionHeading} color="textPrimary" onClick={e => handleShortcut(e, 2, Identities[3].pathname[2], Identities[3].user.routines[0])}>
                                      Advanced Training
                                    </Typography>
                                  </React.Fragment>
                                }
                                secondary={
                                  <React.Fragment>
                                    <Typography variant="body1" component="span" color="textSecondary" className={classes.introductionSecondaryText} onClick={e => handleShortcut(e, 1, Identities[3].pathname[1], Identities[3].user.routines[0])}>
                                      Adapt these techniques for everyday use
                                    </Typography>
                                  </React.Fragment>
                                }
                              />
                            </ListItem>
                          </List>

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
                      <Grid container spacing={0} className={classes.routineSelector}>
                        <Grid item xs={12}>
                          <TimerContainer RoutineSelectContainer={RoutineSelectContainer} />
                        </Grid>
                      </Grid>
                    </Fade>

                    <Hidden xsUp={(!(props.routineSelectId !== 0))}>

                      <Fade in={true} timeout={1250}>
                        <Grid container spacing={2}>

                          { (width === "xs" || width === "sm" ? null : <><Grid item xs={exerciseHistoryContainerWidth}><ExerciseHistoryContainer /></Grid></>) }

                          <Grid item xs={timerContainerWidth}>
                            <RoutineDescriptionContainer />
                            <WordCardContainer ApolloClient={ApolloClient} classes={classes} />
                            <ProgressIndicator />
                            <WordHistoryList />
                          </Grid>
                        </Grid>
                      </Fade>

                    </Hidden>

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

      {/* <BuyMeACoffee /> */}

      </Grid>

    </Container>

  )};


// { (width === "xs" || width === "sm") ? (((!props.inProgress) ? ((!props.inProgress && !props.isCompleted) ? ( <RoutineDescriptionContainer /> ) : null ) : null )) : ( <RoutineDescriptionContainer /> ) }

export default RRHome;
