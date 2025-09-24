import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let MuiTheme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#14197E'
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#2f8eed',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    overrides: {

    },
    // error: will use the default color
  }
});

// EDEDF3

MuiTheme = responsiveFontSizes(MuiTheme);

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  heading: {
    color: "#14197E",
    fontWeight: "bold"
  },
  mobileRoutineSelectContainer: {
    textAlign: "center",
  },
  mobileHeading: {
    marginTop: theme.spacing(2),
    color: "#14197E",
    fontWeight: "bold"
  },
  sliderRoot:{
    width: 500,
    margin: 50
  },
  margin: {
    height: theme.spacing(3)
  },
  formTable: {
    marginTop: theme.spacing(3)
  },
  form: {
    textAlign: "left",
  },
  formControl: {
    marginRight: 40,
  },
  columnDesktop: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    paddingRight: "50%"
  },
  column: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  sideColumn: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  previewPaper: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    minWidth: 400,
    minHeight: 200,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paper: {
    position: "absolute",
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none"
  },
  wordGrid: {
    alignItems: "end",
    minHeight: 150,
    marginTop: theme.spacing(4),
    paddingRight: "50%"
  },
  wordGridDesktop: {
    alignItems: "end",
    minHeight: 150,
    marginTop: theme.spacing(4),
    paddingRight: "50%"
  },
  wordHistoryGrid: {
    alignItems: "center"
  },
  wordHistoryGridDesktop: {
    alignItems: "center",
    paddingRight: "50%"
  },
  timerControlGrid: {
    alignItems: "center"
  },
  card: {
    textAlign: "center",
    backgroundColor:"#FBFBFB",
    boxShadow: "0 4px 20px -6px rgba(0,0,0,0.15)",
  },
  previewCard: {
    marginTop: theme.spacing(2),
    textAlign: "center",
    backgroundColor:"#FBFBFB",
  },
  exerciseStepsCard: {
    width: "100%",
    transition: "0.3s",
  },
  routineSelectCard: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
  },
  userSelectCard: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
  },
  routineBuilderCard: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  userAdminCard: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  sideCard: {
    marginBottom: 20
  },
  cardHeader: {
    backgroundColor:"#333",
  },
  word: {
    fontWeight: "bold",
    color: "#2f8eed"
  },
  exerciseIndicator: {
    color: "#2f8eed"
  },
  intermissionIndicator: {
    color: "#dba987",
  },
  intermission: {
    fontWeight: "bold",
    color: "#dba987",
  },
  vowelButton: {
    fontSize: 24,
    fontFamily: "'Noto Sans', sans-serif",
    fontWeight: "bold",
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: "center"
  },
  historyTitle: {
    color: "rgba(0, 0, 0, 0.25)"
  },
  historyTitleNovote: {
    color: "rgba(0, 0, 0, 0.25)",
  },
  historyTitleUpvote: {
    color: "rgba(0, 0, 0, 0.25)",
  },
  historyTitleDownvote: {
    color: "rgba(0, 0, 0, 0.25)",
  },
  subtitle: {
    fontSize: 20
  },
  sideTitle: {
    fontSize: 18
  },
  seeMore: {
    fontSize: 18,
    cursor: "pointer"
  },
  submitButton: {
    margin: 5,
    minWidth: 100,
    padding: 4,
    "&:hover": {
      backgroundColor: "#2d90e5"
    },
    backgroundColor: '#33a0ff',
  },
  iconButton: {
    margin: theme.spacing(0),
    padding: theme.spacing(1)
  },
  button: {
    margin: 4,
    minWidth: 35,
    padding: 4,
    "&:hover": {
      backgroundColor: "#2d90e5"
    },
    backgroundColor: '#33a0ff',
  },
  seeMorebutton: {
    "&:hover": {
      backgroundColor: "#2d90e5"
    },
    backgroundColor: '#33a0ff',
  },
  activeButton: {
    margin: 4,
    minWidth: 35,
    padding: 4,
    backgroundColor: "#EFEFEF"
  },
  activeExercise: {
    backgroundColor: "#EFEFEF"
  },
  exerciseHeadline: {
    margin: "0.25em"
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  },
  wordHistoryContainer: {
  },
  wordHistoryWrapper: {
    textAlign: "center",
    alignItems: "center",
    display:"grid",
    justifyItems: "center",
    marginBottom: theme.spacing(2),
  },
  RoutineSelector: {
    display: "inline-flex",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  TimerControls: {
    display: "inline-flex",
  },
  RoutineBuilderControls: {
    display: "inline-flex",
  },
  exerciseHistoryMobile: {
    display:'flex',
    justifyContent:'center'
  },
  exerciseHistoryDesktop: {
    display:'flex',
    justifyContent:'left'
  },
  exerciseHistoryHeader: {
    textAlign: "center"
  },
  interactionSlider: {
    alignItems: "center",
    display:"grid",
    justifyItems: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  isActiveSelector: {
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  focusWordCardMobile: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  DescriptionEditor: {
    margin: theme.spacing(1),
  },
  routineDetails: {
    padding: theme.spacing(3, 2),
    marginTop: theme.spacing(4),
  },
  homePageContainer: {

  },
  homePageHeader: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    textAlign: "center",
    backgroundImage: "url(./connect-20333.png)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  homePageMobileHeader: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    textAlign: "center",
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  homePageHeaderBox: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    textAlign: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 10
  },
  homePageItems: {
    backgroundColor: "#F7F7F7",
  },
  homePageSubHeader: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  homePageBulletPointContainer: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    backgroundColor: "#FFFFFF",
    borderRadius: 10
  },
  homePageGetStartedContainer: {
    marginTop: theme.spacing(3),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  homePageBulletPoint: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(3.5),
    marginBottom: theme.spacing(3.5),
    marginLeft: theme.spacing(2)
  },
  contactFormContainer: {

  },
  homepageTitleHeading: {
    color: "#14197E",
    fontWeight: "bold"
  },
  homepageTitleHeadingContainer: {
    backgroundColor: "#fbfbfb",
    padding: theme.spacing(1)
  },
  homepageTitleSubheading: {
    color: "#FFF",
    marginTop: theme.spacing(1)
  },
  homepageTitleSubheadingContainer: {
    backgroundColor: "#2f8eed",
    padding: theme.spacing(1)
  },
  homepageScreenshotContainer: {
    textAlign: "center",
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    color: "#2f8eed",
  },
  homePageHeading: {
    color: "#14197E",
    fontWeight: "bold",
    textAlign: "left"
  },
  signupHeading: {
    color: "#14197E",
    fontWeight: "bold",
    textAlign: "center"
  },
  signupContainer: {
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  homePageSignupText: {
    textAlign: "center"
  },
  homePagePreviewImage: {
    cursor: "pointer",
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(2),
    borderRadius: 10
  },
  previewImage: {
    position: 'absolute',
    width: 800,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
  routineSelectContainer: {
    display: "flex",
    alignItems: "center",
  },
  routineBuilderSelectContainer: {
    display: "flex",
  },
  RoutineBuilderSelector: {
    display: "inline-flex",
  },
  userAdminSelectContainer: {
    display: "flex",
  }
});

export {
  MuiTheme,
  styles,
}
