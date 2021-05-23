import React from 'react';
//import styled from 'styled-components/macro';
import { withStyles } from "@material-ui/core/styles";
import YouTube from 'react-youtube';

import SignupForm from '../SignupForm/Container';

import RoutineDescriptionContainer from './Exercises/RoutineDescriptionContainer';
import WordCardContainer from './Exercises/WordCardContainer';

import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';

import CheckBoxIcon from '@material-ui/icons/CheckBox';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Paper from '@material-ui/core/Paper';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
//import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckboxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import ExerciseHistoryContainer from './Exercises/ExerciseHistoryContainer';
import ProgressIndicator from '../RRLayout/ProgressIndicatorContainer'
import WordHistory from '../RRLayout/WordHistoryContainer'

import Subnavigation from './Exercises/SubnavigationContainer';

import WordHistoryList from '../WordHistoryList/Container';

import LoginFormContainer from '../LoginForm/Container';

import { styles } from '../../exerciseThemeHandler';

//import CheckboxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";


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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const RRHome = props => {

  const { TimerContainer, RoutineSelectContainer, ExerciseIntroduction, ApolloClient } = props;
  const { classes, user, routineSelectId, token } = props;

  const { width } = props;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let exerciseHistoryContainerWidth = 12;
  let timerContainerWidth = 12;
  let interactionContainerWidth = 12;

  // desktop - widescreen
  if (width === "xl") {
    exerciseHistoryContainerWidth = 2;
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
  */

  // tablet - vertical
  if (width === "sm") {
    timerContainerWidth = 10;
  }

  return (

      <Grid className={classes.root}>

          <Grid container justify="center">
            <Grid item xs={10}>

              <br /><br />

              <Grid container>

                <Grid item xs={12}>

                  <Subnavigation />

                </Grid>

                <Grid item xs={12}>

                  <AppBar position="static" color="primary" elevation={0}>
                    <Tabs value={value} onChange={handleChange}>
                      <LinkTab disableRipple disableFocusRipple label="Introduction" {...a11yProps(0)} />
                      <LinkTab disableRipple disableFocusRipple label="Exercises" {...a11yProps(1)} />
                    </Tabs>
                  </AppBar>

                </Grid>

                <Grid item xs={12}>

                  <TabPanel value={value} index={0}>
                    <Grid container spacing={1}>
                      <Grid item>
                        <ExerciseIntroduction />
                      </Grid>
                    </Grid>
                  </TabPanel>

                </Grid>

                <Grid item xs={12}>

                  <TabPanel value={value} index={1}>

                    <Grid container spacing={5}>

                      <Grid item xs={exerciseHistoryContainerWidth}>

                        <TimerContainer RoutineSelectContainer={RoutineSelectContainer} />

                        <ExerciseHistoryContainer />

                      </Grid>

                      <Grid item xs={timerContainerWidth}>

                        <RoutineDescriptionContainer />

                        <WordCardContainer ApolloClient={ApolloClient} classes={classes} />

                        <ProgressIndicator />

                        <WordHistoryList />

                      </Grid>

                    </Grid>

                  </TabPanel>

                </Grid>

              </Grid>

            </Grid>
          </Grid>

      </Grid>

  )};

RRHome.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

const RRHomeWrapped = withStyles(styles)(RRHome);

export default withWidth()(RRHomeWrapped);
