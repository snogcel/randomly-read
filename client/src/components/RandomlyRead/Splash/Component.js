import React from 'react';
import { styles } from '../../../exerciseThemeHandler';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Hidden from '@material-ui/core/Hidden';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

// import { withStyles } from "@material-ui/core/styles";

import withStyles from '@material-ui/core/styles/withStyles';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';

const SplashPage = props => {

  const { classes, width } = props;

  const [open_1, setOpen_1] = React.useState(false);
  const [open_2, setOpen_2] = React.useState(false);

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
    <React.Fragment>
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

              <Box className={classes.homePageBulletPointContainer}>

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

              </Box>

            </Grid>

            <Hidden xsDown>
              <Grid item xs={12} sm={4} lg={3} xl={3} className={classes.homepageScreenshotContainer}>

                <img src="./rr_preview_1.png" onClick={handleOpen_1} className={classes.homePagePreviewImage} alt="Preview 1" />

                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={open_1}
                  onClose={handleClose_1}
                >
                  <div className={classes.previewImage}>
                    <img src="./rr_preview_1_large.png" alt="Preview 1" />
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
                    <img src="./rr_preview_2_large.png" alt="Preview 2" />
                  </div>
                </Modal>

              </Grid>
            </Hidden>

          </Grid>

        </Grid>

      </Grid>
    </React.Fragment>
  );

};

const SplashWrapped = withStyles(styles)(SplashPage);

SplashWrapped.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(SplashWrapped);
