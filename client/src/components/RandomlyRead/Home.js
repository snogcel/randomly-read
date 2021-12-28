import React from 'react';
import { withStyles } from "@material-ui/core/styles";

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
import Typography from '@material-ui/core/Typography';
import Header from './Header/Component';
import RoutineDescriptionContainer from './Exercises/RoutineDescriptionContainer';
import WordCardContainer from './Exercises/WordCardContainer';
import ExerciseHistoryContainer from './Exercises/ExerciseHistoryContainer';
import ProgressIndicator from '../RRLayout/ProgressIndicatorContainer'
import IdentityConfig from './Identities/Config';
import Subnavigation from './Exercises/SubnavigationContainer';
import WordHistoryList from '../WordHistoryList/Container';

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

  return (

    <Container maxWidth="lg" className={classes.homeContainer}>
      <Grid className={classes.root}>
          <Grid container alignItems="center" justify="center" spacing={0}>

            <Grid item xs={12} sm={11} md={11} lg={12}>
              <Header />
            </Grid>

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

            <Grid item xs={12} sm={11} md={11} lg={12} align="center">
              <br /><br /><br />
              <Typography variant="body1" color="textSecondary" component="p" >
                Copyright &copy; 2021 Black Circle Technologies, LLC
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
