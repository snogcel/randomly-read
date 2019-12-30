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

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


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

  console.log("detected width: ", width);


  // desktop - widescreen
  if (width === "xl") {
    exerciseHistoryContainerWidth = 2;
    timerContainerWidth = 6;
    interactionContainerWidth = 2;
  }

  // laptop or desktop
  if (width === "lg") {
    exerciseHistoryContainerWidth = 3;
    timerContainerWidth = 6;
    interactionContainerWidth = 3;
  }

  // tablet - horizontal
  if (width === "md") {
    timerContainerWidth = 10;
    interactionContainerWidth = 10;
  }

  // tablet - vertical
  if (width === "sm") {
    console.log("-sm-");
    timerContainerWidth = 10;
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
            <Grid container spacing={0} justify="center">

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

                <Hidden mdDown><Interactions /></Hidden>

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
                  Tactical practice routines that allow you to practice smarter, not harder
                </Typography>

              </Grid>

              <Grid item xs={12} className={classes.homePageItems}>

                <Grid container justify="center">

                  <Grid item xs={12} sm={4} md={3} xl={2} className={classes.homePageHeaderBox}>

                    <Typography variant="h6" component="h2" className={classes.heading}>
                      Customizable
                    </Typography>

                    <Typography variant="body2" color="textPrimary" component="p">
                      Define specific consonant and vowel sounds as well as what part of the word to practice. Exercise routines can be fully tailored to client needs.
                    </Typography>

                  </Grid>

                  <Grid item xs={12} sm={4} md={3} xl={2} className={classes.homePageHeaderBox}>

                    <Typography variant="h6" component="h2" className={classes.heading}>
                      Structured
                    </Typography>

                    <Typography variant="body2" color="textPrimary" component="p">
                      Words and Sentences are displayed in a timed sequence allowing for a more structured practice session which leads to greater success.
                    </Typography>

                  </Grid>

                  <Grid item xs={12} sm={4} md={3} xl={2} className={classes.homePageHeaderBox}>

                    <Typography variant="h6" component="h2" className={classes.heading}>
                      Focused
                    </Typography>

                    <Typography variant="body2" color="textPrimary" component="p">
                      Fully automated usage allows your client to focus on their speaking technique without having to flip through flash cards or reading materials.
                    </Typography>
                  </Grid>

                </Grid>

              </Grid>

              <Grid item xs={12} className={classes.homePageSubHeader}>

                <Grid container justify="center">

                  <Grid item xs={12} sm={5} lg={6} xl={3}>

                    <div  className={classes.homePageBulletPointContainer}>

                      <Typography gutterBottom variant="h5" component="h3" className={classes.signupHeading}>
                        Engineered for client success
                      </Typography>

                      <Typography variant="body1" color="textPrimary" component="p" className={classes.homePageBulletPoint}>
                        <div><CheckBoxIcon fontSize="small" /></div>&nbsp;&nbsp;<div>Allow your client to practice anywhere using a desktop or mobile device</div>
                      </Typography>

                      <Typography variant="body1" color="textPrimary" component="p" className={classes.homePageBulletPoint}>
                        <div><CheckBoxIcon fontSize="small" /></div>&nbsp;&nbsp;<div>Track words that your client has trouble with and practice similar words</div>
                      </Typography>

                      <Typography variant="body1" color="textPrimary" component="p" className={classes.homePageBulletPoint}>
                        <div><CheckBoxIcon fontSize="small"/></div>&nbsp;&nbsp;<div>Generate words or partial sentences with a focus on specific sounds</div>
                      </Typography>

                      <Typography variant="body1" color="textPrimary" component="p" className={classes.homePageBulletPoint}>
                        <div><CheckBoxIcon fontSize="small"/></div>&nbsp;&nbsp;<div>Draw from 155,000 words to create variety and flexibility in exercise routines</div>
                      </Typography>

                      <Typography variant="body1" color="textPrimary" component="p" className={classes.homePageBulletPoint}>
                        <div><CheckBoxIcon fontSize="small" /></div>&nbsp;&nbsp;<div>Create accountability for client practice habits with system usage reporting</div>
                      </Typography>

                    </div>

                    <br />

                    <Typography gutterBottom variant="h5" component="h3" className={classes.signupHeading}>
                      How do I get started?
                    </Typography>

                    <Typography variant="body1" color="textPrimary" component="p" className={classes.homePageSignupText}>
                      <strong>Use the sign up form to create a free demonstration account.</strong>
                    </Typography>

                    <br />

                    <Typography variant="body2" color="textPrimary" component="p" className={classes.homePageSignupText}>
                      This limited demonstration provides a pre-defined set of exercise routines and is meant to preview the features that Randomly Read could provide to your clients.
                    </Typography>

                    <br />

                    <Typography variant="body2" color="textPrimary" component="p" className={classes.homePageSignupText}>
                      We'll contact you at the provided email address to open a conversation on how to tailor these routines to your clients' needs, how to report on client usage of the tool, and to answer any questions you have.
                    </Typography>

                    <br />

                  </Grid>

                  <Grid item xs={12} sm={4} lg={3} xl={3} className={classes.signupContainer}>

                    <Typography gutterBottom variant="h5" component="h3" className={classes.signupHeading}>
                      Sign up for a free account
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
