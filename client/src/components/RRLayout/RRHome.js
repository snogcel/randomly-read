import React from 'react';
//import styled from 'styled-components/macro';
import { withStyles } from "@material-ui/core/styles";
import WordCardContainer from './WordCardContainer';
import TimerContainer from './TimerContainer';
import Interactions from '../Interactions/InteractionsHomeContainer';
import Grid from '@material-ui/core/Grid';

import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
//import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckboxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import ExerciseHistoryContainer from './ExerciseHistoryContainer';
import ProgressIndicator from './ProgressIndicatorContainer'
import WordHistory from './WordHistoryContainer'

import WordHistoryList from '../WordHistoryList/Container';

import LoginFormContainer from '../LoginForm/Container';

import { styles } from '../../themeHandler';

//import CheckboxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";


const RRHome = props => {

  const {classes, user} = props;
  const { width } = props;

  let exerciseHistoryContainerWidth = 12;
  let timerContainerWidth = 12;
  let interactionContainerWidth = 12;

  // laptop or desktop
  if (width === "xl" || width === "lg") {
    exerciseHistoryContainerWidth = 3;
    timerContainerWidth = 6;
    interactionContainerWidth = 3;
  }

  /*

  <Grid className={classes.root}>

      <Card elevation={0} className={classes.userAdminCard}>

        <CardContent>



        </CardContent>

      </Card>

    </Grid>

   */

  return (

      <Grid className={classes.root}>

        {user ? (
          <>
            <Grid container spacing={0}>

              <Grid item xs={exerciseHistoryContainerWidth}>

                <TimerContainer />

                <ExerciseHistoryContainer />

              </Grid>

              <Grid item xs={timerContainerWidth}>

                <WordCardContainer />

                <ProgressIndicator />

                <WordHistoryList />

              </Grid>

              <Grid item xs={interactionContainerWidth}>

                <Hidden smDown><Interactions /></Hidden>

              </Grid>

            </Grid>
          </>
        ) : ( props.history.push("/login") )}

      </Grid>

  )};

RRHome.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

const RRHomeWrapped = withStyles(styles)(RRHome);

export default withWidth()(RRHomeWrapped);
