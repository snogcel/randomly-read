import React from 'react';
//import styled from 'styled-components/macro';
import { withStyles } from "@material-ui/core/styles";

import SignupForm from '../SignupForm/Container';

import WordCardContainer from './WordCardContainer';
import TimerContainer from './TimerContainer';
import Interactions from '../Interactions/InteractionsHomeContainer';
import Grid from '@material-ui/core/Grid';

import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';

import CheckBoxIcon from '@material-ui/icons/CheckBox';

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
        ) : (
          <>
            <Grid container className={classes.homePageContainer}>

              <Grid item xs={12} className={classes.homePageHeader}>

                <Typography variant="h4" component="h1" className={classes.heading}>
                  Practice smarter with exercise routines that focus on specific sounds
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  Tactical practice routines allow you to practice smarter, not harder
                </Typography>

              </Grid>

              <Grid item xs={12} className={classes.homePageItems}>

                <Grid container justify="center">

                  <Grid item xs={12} sm={4} md={3} xl={2} className={classes.homePageHeaderBox}>

                    <Typography variant="h6" component="h2" className={classes.heading}>
                      Customizable
                    </Typography>

                    <Typography variant="body2" color="textPrimary" component="p">
                      Using specific consonant and vowel sounds as well as placements, practice routines can be fully tailored to client needs.
                    </Typography>

                  </Grid>

                  <Grid item xs={12} sm={4} md={3} xl={2} className={classes.homePageHeaderBox}>

                    <Typography variant="h6" component="h2" className={classes.heading}>
                      Structured
                    </Typography>

                    <Typography variant="body2" color="textPrimary" component="p">
                      Words and Sentences are displayed in sequence, enabling a structured practice routine leading to greater success.
                    </Typography>

                  </Grid>

                  <Grid item xs={12} sm={4} md={3} xl={2} className={classes.homePageHeaderBox}>

                    <Typography variant="h6" component="h2" className={classes.heading}>
                      Focused
                    </Typography>

                    <Typography variant="body2" color="textPrimary" component="p">
                      Randomly Read is fully automated, allowing the client to better focus on speaking techniques and posture.
                    </Typography>
                  </Grid>

                </Grid>

              </Grid>

              <Grid item xs={12} className={classes.homePageSubHeader}>

                <Grid container justify="center">

                  <Grid item xs={12} sm={5} xl={3} className={classes.homePageBulletPointContainer}>

                    <Typography gutterBottom variant="h5" component="h3" className={classes.signupHeading}>
                      Randomly Read is designed to enable greater success
                    </Typography>

                    <Typography variant="body1" color="textPrimary" component="p" className={classes.homePageBulletPoint}>
                      <div><CheckBoxIcon fontSize="small" /></div>&nbsp;&nbsp;<div>Practice anywhere, anytime using a desktop or mobile device.</div>
                    </Typography>

                    <Typography variant="body1" color="textPrimary" component="p" className={classes.homePageBulletPoint}>
                      <div><CheckBoxIcon fontSize="small" /></div>&nbsp;&nbsp;<div>Mark words for more practice using system generated routines.</div>
                    </Typography>

                    <Typography variant="body1" color="textPrimary" component="p" className={classes.homePageBulletPoint}>
                      <div><CheckBoxIcon fontSize="small" /></div>&nbsp;&nbsp;<div>Gain better visibility over practice habits with system reporting.</div>
                    </Typography>

                  </Grid>

                  <Grid item xs={12} sm={4} xl={3} className={classes.signupContainer}>

                    <Typography gutterBottom variant="h5" component="h3" className={classes.signupHeading}>
                      Sign up for a free demo account
                    </Typography>

                    <SignupForm />

                  </Grid>

                </Grid>

              </Grid>

            </Grid>
          </>
        )}

      </Grid>

  )};

RRHome.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

const RRHomeWrapped = withStyles(styles)(RRHome);

export default withWidth()(RRHomeWrapped);
