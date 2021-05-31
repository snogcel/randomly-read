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

import Fade from '@material-ui/core/Fade';

import RoutineDescriptionContainer from './Exercises/RoutineDescriptionContainer';
import WordCardContainer from './Exercises/WordCardContainer';
import ExerciseHistoryContainer from './Exercises/ExerciseHistoryContainer';
import ProgressIndicator from '../RRLayout/ProgressIndicatorContainer'
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

  const { TimerContainer, RoutineSelectContainer, ExerciseIntroduction, ApolloClient } = props;
  const { classes } = props;

  const { width } = props;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  // tablet - horizontal
  /*
  if (width === "md") {
    timerContainerWidth = 10;
    interactionContainerWidth = 10;
  }


  // tablet - vertical
  if (width === "sm") {
    timerContainerWidth = 10;
  }

  */

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
                  <AppBar position="static" color="primary" elevation={0}>
                    <Tabs value={value} onChange={handleChange}>
                      <LinkTab disableRipple disableFocusRipple className={classes.introTabLink} label="Introduction" {...a11yProps(0)} />
                      <LinkTab disableRipple disableFocusRipple className={classes.introTabLink} label="Techniques" {...a11yProps(1)} />
                      <LinkTab disableRipple disableFocusRipple className={classes.introTabLink} label="Practice" {...a11yProps(2)} />
                    </Tabs>
                  </AppBar>
                </Grid>

                <Grid item xs={12}>
                  <TabPanel value={value} index={0} className={classes.introTabPanel}>
                    <Fade in={true}>
                      <Grid container spacing={0} className={classes.introContainer}>
                        <Grid item xs={12}>
                          <ExerciseIntroduction />
                        </Grid>
                      </Grid>
                    </Fade>
                  </TabPanel>

                </Grid>

                <Grid item xs={12}>
                  <TabPanel value={value} index={2} className={classes.homeTabPanel}>
                      <Grid container spacing={0} className={classes.routineSelector}>
                        <Grid item xs={12}>
                            <TimerContainer RoutineSelectContainer={RoutineSelectContainer} />
                        </Grid>
                      </Grid>

                      <Fade in={true}>
                        <Grid container spacing={2}>

                            { (width === "xs" || width === "sm" ? null : <><Grid item xs={exerciseHistoryContainerWidth}><ExerciseHistoryContainer /></Grid></>) }

                            <Grid item xs={timerContainerWidth}>
                              { (width === "xs" || width === "sm") ? ((!props.inProgress) ? <RoutineDescriptionContainer /> : null) : <RoutineDescriptionContainer /> }
                              <WordCardContainer ApolloClient={ApolloClient} classes={classes} />
                              <ProgressIndicator />
                              <WordHistoryList />
                            </Grid>
                        </Grid>
                      </Fade>
                  </TabPanel>
                </Grid>

              </Grid>
            </Grid>
          </Grid>

      </Grid>

    </Container>

  )};

RRHome.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

const RRHomeWrapped = withStyles(styles)(RRHome);

export default withWidth()(RRHomeWrapped);
