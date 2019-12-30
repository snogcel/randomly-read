import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let MuiTheme = createMuiTheme({
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
    height: theme.spacing.unit * 3
  },
  formTable: {
    marginTop: theme.spacing.unit * 3
  },
  form: {
    textAlign: "left",
  },
  formControl: {
    marginRight: 40,
  },
  column: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  sideColumn: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  wordGrid: {
    alignItems: "center",
    minHeight:150,
    marginTop: theme.spacing(4),
  },
  wordHistoryGrid: {
    alignItems: "center"
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
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4,
  },
  userAdminCard: {
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4,
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
  intermission: {
    fontWeight: "bold",
    color: "#dba987"
  },
  vowelButton: {
    fontSize: 24,
    fontFamily: "'Noto Sans', sans-serif",
    fontWeight: "bold",
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 1,
    textAlign: "center"
  },
  historyTitle: {
    color: "rgba(0, 0, 0, 0.25)"
  },
  historyTitleNovote: {
    color: "rgba(0, 0, 0, 0.25)",
  },
  historyTitleUpvote: {
    color: "#C70E4C"
  },
  historyTitleDownvote: {
    color: "#8A0C93"
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
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  },
  wordHistoryWrapper: {
    textAlign: "center",
    alignItems: "center",
    display:"grid",
    justifyItems: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  RoutineSelector: {
    display: "inline-flex",
    paddingLeft: theme.spacing.unit * 1,
    paddingRight: theme.spacing.unit * 1
  },
  TimerControls: {
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
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  homePageHeader: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    textAlign: "center"
  },
  homePageHeaderBox: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    textAlign: "center"
  },
  homePageItems: {
    backgroundColor: "#F7F7F7",
  },
  homePageSubHeader: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  homePageBulletPointContainer: {
    marginBottom: theme.spacing(3)
  },
  homePageBulletPoint: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(2)
  },
  contactFormContainer: {

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
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  homePageSignupText: {
    textAlign: "center"
  },
  routineSelectContainer: {
    display: "flex",
    alignItems: "center",
  }
});

export {
  MuiTheme,
  styles,
}
