import React from 'react';
import { styled } from "@mui/material/styles";
import SignupForm from '../SignupForm/Container';

import WordCardContainer from './WordCardContainer';
import TimerContainer from './TimerContainer';
import Interactions from '../Interactions/InteractionsHomeContainer';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Hidden from '@mui/material/Hidden';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Typography from '@mui/material/Typography';
import ExerciseHistoryContainer from './ExerciseHistoryContainer';
import ProgressIndicator from './ProgressIndicatorContainer'
import WordHistoryList from '../WordHistoryList/Container';

import { styles } from '../../themeHandler';

const RRHome = props => {
  const theme = useTheme();
  const classes = styles(theme);
  const { user } = props;
  
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

  const [open_1, setOpen_1] = React.useState(false);
  const [open_2, setOpen_2] = React.useState(false);

  let exerciseHistoryContainerWidth = 12;
  let timerContainerWidth = 12;
  let interactionContainerWidth = 12;

  // console.log("detected width: ", width);

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
    timerContainerWidth = 10;
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

              {(width === "xs") ? (
                <Grid item xs={12} className={classes.homePageMobileHeader}>

                  <Typography variant="h4" component="h1" className={classes.heading}>
                    Practice smarter with automated therapy exercises
                  </Typography>
                  <Typography variant="body1" color="textSecondary" component="p">
                    Speech therapy with a focus on specific consonant and vowel sounds
                  </Typography>

                </Grid>
              ) : (
                <Grid item xs={12} className={classes.homePageHeader}>

                  <Typography variant="h4" component="h1" className={classes.homepageTitleHeading}>
                    <span className={classes.homepageTitleHeadingContainer}>Practice smarter with automated therapy exercises</span>
                  </Typography>
                  <Typography variant="body1" component="p" className={classes.homepageTitleSubheading}>
                    <span className={classes.homepageTitleSubheadingContainer}>Speech therapy with a focus on specific consonant and vowel sounds</span>
                  </Typography>

                </Grid>
              )}

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

                    <div className={classes.homePageBulletPointContainer}>

                      <Typography gutterBottom variant="h5" component="h3" className={classes.signupHeading}>
                        Engineered for client success
                      </Typography>

                      <Typography variant="body1" color="textPrimary" component="p" className={classes.homePageBulletPoint}>
                        <span><CheckBoxIcon fontSize="small" /></span>&nbsp;&nbsp;<span>Practice anywhere, anytime, using a desktop or mobile device</span>
                      </Typography>

                      <Typography variant="body1" color="textPrimary" component="p" className={classes.homePageBulletPoint}>
                        <span><CheckBoxIcon fontSize="small" /></span>&nbsp;&nbsp;<span>Track words that your client has trouble with outside of therapy</span>
                      </Typography>

                      <Typography variant="body1" color="textPrimary" component="p" className={classes.homePageBulletPoint}>
                        <span><CheckBoxIcon fontSize="small"/></span>&nbsp;&nbsp;<span>Generate words or partial sentences with a focus on specific sounds</span>
                      </Typography>

                      <Typography variant="body1" color="textPrimary" component="p" className={classes.homePageBulletPoint}>
                        <span><CheckBoxIcon fontSize="small"/></span>&nbsp;&nbsp;<span>155,000+ word database provides variety in exercise routines</span>
                      </Typography>

                      <Typography variant="body1" color="textPrimary" component="p" className={classes.homePageBulletPoint}>
                        <span><CheckBoxIcon fontSize="small" /></span>&nbsp;&nbsp;<span>Create accountability for client practice habits with reporting</span>
                      </Typography>

                    </div>

                  </Grid>

                  <Hidden xsDown>
                  <Grid item xs={12} sm={4} lg={3} xl={3} className={classes.homepageScreenshotContainer}>

                      <img src="./rr_preview_1.png" onClick={handleOpen_1} className={classes.homePagePreviewImage} alt="Preview 1"/>

                      <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={open_1}
                        onClose={handleClose_1}
                      >
                        <div className={classes.previewImage}>
                          <img src="./rr_preview_1_large.png" alt="Preview 1"/>
                        </div>
                      </Modal>

                      <br /><br />

                      <img src="./rr_preview_2.png" onClick={handleOpen_2} className={classes.homePagePreviewImage} alt="Preview 2" />

                      <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={open_2}
                        onClose={handleClose_2}
                      >
                        <div className={classes.previewImage}>
                          <img src="./rr_preview_2_large.png" alt="Preview 2"/>
                        </div>
                      </Modal>

                  </Grid>
                  </Hidden>

                </Grid>

                <Grid container justify="center">

                  <Grid item xs={12} sm={5} lg={6} xl={3} className={classes.homePageGetStartedContainer}>

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

                    <Typography variant="body2" color="textPrimary" component="p" className={classes.homePageSignupText}>
                      You can reach us by phone at (303) 946-8829 or through email at <a href="mailto:contact@randomlyread.com">contact@randomlyread.com</a>.
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

export default RRHome;
