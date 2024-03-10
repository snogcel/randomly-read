import React from 'react';
import ReactGA from "react-ga4";
import { Helmet } from 'react-helmet';

import { withStyles } from "@material-ui/core/styles";
import { useTheme } from '@material-ui/core/styles';

import Identities from './Identities/Identities';

import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Hidden from '@material-ui/core/Hidden';
import Fade from '@material-ui/core/Fade';

import Header from './Header/Container';
import RoutineDescriptionContainer from './Exercises/RoutineDescriptionContainer';
import WordCardContainer from './Exercises/WordCardContainer';
import ExerciseHistoryContainer from './Exercises/ExerciseHistoryContainer';
import ProgressIndicator from '../RRLayout/ProgressIndicatorContainer'
import IdentityConfig from './Identities/SplashConfig';
import Subnavigation from './Exercises/SubnavigationContainer';
import WordHistoryList from '../WordHistoryList/Container';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import BuyMeACoffee from './Donate/Component';
import SiteFooter from './Footer/Component';

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

  const [open_1, setOpen_1] = React.useState(false);
  const [open_2, setOpen_2] = React.useState(false);

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
        location = root + stages[subpath];
        props.history.push(location);
      }
    }
    
    const GA_ID = 'G-HZ4HM6M2GK'; // your google analytics id
    ReactGA.initialize(GA_ID);
    ReactGA.send({ hitType: "pageview", page: location });  

  }

  function handleClick(e, pathname, routineId) {
    if (props.history.location.pathname !== pathname) {
      props.setInProgress(false);
      props.setExercisePause(false);
      props.updateTime(0);
      props.updateTimeLeft(0);
      props.resetRoutineSelect();
      props.clearQueryResults();
      props.resetWordCard();
      props.updateId(routineId);
      props.history.push({pathname});
    }
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

  // <LinkTab disableRipple disableFocusRipple className={classes.introTabLink} label="Customizable" {...a11yProps(1)} />

  return (

    <Container maxWidth="lg" className={classes.homeContainer}>

    <Helmet>
      <title>Easy Onset - Free Stuttering Therapy</title>
      <meta name="description" content="EasyOnset.com is a free virtual speech therapy service for people who stutter." />
      <meta property="og:title" content="Easy Onset - Free Stuttering Therapy" />
      <meta property="og:description" content="EasyOnset.com is a free virtual speech therapy service for people who stutter." />
    </Helmet>

      <Grid className={classes.root}>

          <Grid container alignItems="center" justify="center" spacing={0}>

          <Grid className={classes.headerBackground} container spacing={0}>
            <Grid item xs={4} sm={4} md={6}>
              <Header />
            </Grid>

            <Grid item xs={8} sm={8} md={6}>
              <Box display="flex" justifyContent="flex-end">
                <Subnavigation />
              </Box>
            </Grid>
          </Grid>

            <Grid item xs={12} sm={11} md={11} lg={12}>

              <Grid container spacing={0}>

                <Grid item xs={12}>
                  <AppBar position="static" color="secondary" elevation={0}>
                    <Tabs value={value} onChange={handleChange}>
                      <LinkTab disableRipple disableFocusRipple className={classes.introTabLink} label="Overview" {...a11yProps(0)} />
                      <LinkTab disableRipple disableFocusRipple className={classes.introTabLink} label="Value-for-Value" {...a11yProps(1)} />
                    </Tabs>
                  </AppBar>
                </Grid>

                <Grid item xs={12}>
                  <TabPanel value={value} index={0} className={classes.homeTabPanel}>

                    <Fade in={true} timeout={750}>
                      <Grid container justify="center" spacing={0} className={classes.introContainer}>

                        <Grid item xs={12}>

                          <Box>
                            
                            <br />

                            <Typography variant="body1" color="textPrimary" component="p" >
                              Welcome to EasyOnset.com, a <u>free</u> virtual speech therapy service for people who stutter. If you find this useful, please support the site with a <Link href="https://www.paypal.com/donate/?business=YEJFDTW8JQ6LE&no_recurring=0&item_name=There%27s+a+real+lack+of+options+for+people+who+stutter.+My+goal+is+to+provide+a+free+speech+therapy+resource+for+everyone.&currency_code=USD">donation</Link>.
                            </Typography>

                            <br />

                            <Typography variant="h5" component="h2" className={classes.definitionListHeading} color="textPrimary">
                              What is EasyOnset.com?
                            </Typography>

                            <br />

                            <Typography variant="body1" color="textPrimary" component="p" >
                              First, a little bit of my own personal context: I was diagnosed with a moderate-to-severe stutter when I was a child. For two years I was a client of speech therapist Dr. Peter Ramig, co-author of <Link href="https://www.amazon.com/Adolescent-Stuttering-Treatment-Activity-Resource/dp/1435481178"><i>The Child and Adolescent Stuttering Treatment & Activity Resource Guide</i></Link>.
                            </Typography>

                            <br />

                            <Typography variant="body1" color="textPrimary" component="p" >
                              During that time I learned many speaking techniques including <i>Easy Onset</i>, which focuses on sensing the vibration created by words while speaking and works by stretching out the production of the word itself. I found a lot of success with that method through my teenage years and into college.
                            </Typography>

                            <br />

                            <Typography variant="body1" color="textPrimary" component="p" >
                              It wasn't until after graduation, and into my adult life, that I found my stutter had come back. By the time I'd reached my mid 30s, I realized that I needed to find a better way to respond to my blocks and learned of <Link href="https://www.amazon.com/Understanding-Controlling-Stuttering-Comprehensive-Hypothesis/dp/1737955504"><i>Understanding and Controlling Stuttering</i></Link>, endorsed by the <Link href="https://westutter.org/product-category/books/">National Stuttering Association</Link> and written by Dr. William Perry.
                            </Typography>

                            <br />

                            <Typography variant="h5" component="h2" className={classes.definitionListHeading} color="textPrimary">
                              Vowel Focused Stuttering Therapy
                            </Typography>

                            <br />

                            <Typography variant="body1" color="textPrimary" component="p" >
                              In <Link href="https://isad.live/isad-2013/papers-presented-by-2013/dismantling-the-brick-wall-of-stuttering/"><i>Dismantling the "Brick Wall" of Stuttering</i></Link>, Dr. Perry describes the composition of stuttering blocks and how Valsalva Stuttering Therapy can help. This hypothesis states that relaxing the muscles beneath your stomach breaks the chain of muscles that is related to and drives the stuttering block. 
                            </Typography>

                            
                            <br />

                            <Typography variant="body1" color="textPrimary" component="p" >
                              This chain of muscles leads to a block that you can feel all the way up your body into your throat. This type of Effort Impulse can be short-circuited by intentionally relaxing the <i>Pelvic Floor</i>, which is a basket-like set of muscles which supports the stomach. This program relies on consistent practice and ultimately only works if you dedicate enough time to it.
                            </Typography>

                          </Box>

                        </Grid>

                        <Grid item xs={12} md={8}>

                          <Box>
                            
                          <br />

                          <Typography variant="body1" color="textPrimary" component="p" >
                            EasyOnset.com offers a free automated training system which displays dynamically generated word lists using timed flash cards. These word lists form a series of practice routines aimed at achieving phonetic balance while helping you get the most out of every practice session.
                          </Typography>

                          </Box>
                        </Grid>

                        <Grid item xs={12} md={4} align="center" className={classes.getStartedButtonContainer}>

                          <Button className={classes.getStartedButton} variant="contained" color="primary" onClick={e => handleClick(e, Identities[1].pathname[0], Identities[1].user.routines[0])}>Click Here To Get Started</Button> 

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

                          <Box>
                            
                            <br />

                            <Typography variant="body1" color="textPrimary" component="p" >
                              EasyOnset.com is brought to you through the power of <i>value-for-value</i> and is a 100% free service. There's a real lack of options for adults and adolescents who stutter, and my hope is that this resource can provide a solution for those willing to fight it out using self-help therapy. If you find this service useful and valuable, please give back either by donating your time, talent, or treasure.
                            </Typography>

                            <br />

                            <Grid container spacing={5}>

                              <Grid item xs={12} sm={6}>
                                <Typography variant="h5" component="h2" className={classes.contentHeading}>
                                  Time & Talent
                                </Typography>

                                <br />

                                <Typography variant="body1" color="textPrimary" component="p" >
                                  Have an idea on a way to improve the site? Willing to share your personal experience using this program as a written testimonial? Comments and suggestions are welcomed, and I'm always looking for help spreading the word about the site.
                                </Typography>

                                <br />

                                <Typography variant="body1" color="textPrimary" component="p" >
                                  Email any time at <Link href="mailto:hello@easyonset.com">hello@easyonset.com</Link>.
                                </Typography>
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <Typography variant="h5" component="h2" className={classes.contentHeading}>
                                  Treasure
                                </Typography>

                                <br />

                                <Typography variant="body1" color="textPrimary" component="p" >
                                  This program unfortunately does not offer overnight success, and requires a lot of hard work. This is being offered for free and on a <i>value-for-value</i> basis. The amount of value you get out of it will be directly related to how much you put in.
                                </Typography>

                                <br />

                                <Typography variant="body1" color="textPrimary" component="p" >
                                For those that are willing and able to give back financially, please <Link href="https://www.paypal.com/donate/?business=YEJFDTW8JQ6LE&no_recurring=0&item_name=There%27s+a+real+lack+of+options+for+people+who+stutter.+My+goal+is+to+provide+a+free+speech+therapy+resource+for+everyone.&currency_code=USD">donate</Link>!
                                </Typography>

                                <br />

                                <center><Link href="https://www.paypal.com/donate/?business=YEJFDTW8JQ6LE&no_recurring=0&item_name=There%27s+a+real+lack+of+options+for+people+who+stutter.+My+goal+is+to+provide+a+free+speech+therapy+resource+for+everyone.&currency_code=USD"><img src="./paypal_donate.png" alt="donate with paypal"/></Link></center>
                                                                
                              </Grid>

                            </Grid>

                          </Box>

                        </Grid>
                      </Grid>
                    </Fade>
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
    
      </Grid>
      
      
    </Container>

  )};


// { (width === "xs" || width === "sm") ? (((!props.inProgress) ? ((!props.inProgress && !props.isCompleted) ? ( <RoutineDescriptionContainer /> ) : null ) : null )) : ( <RoutineDescriptionContainer /> ) }

RRHome.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

const RRHomeWrapped = withStyles(styles)(RRHome);

export default withWidth()(RRHomeWrapped);
