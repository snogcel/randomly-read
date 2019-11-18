import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let MuiTheme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#2f8eed'
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#14197E',
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
  },
  wordHistoryGrid: {
    alignItems: "center"
  },
  timerControlGrid: {
    alignItems: "center"
  },
  card: {
    textAlign: "center",
  },
  exerciseStepsCard: {
    maxWidth: 350,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
  },
  sideCard: {
    marginBottom: 20
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
    color: "#666666"
  },
  historyTitleNovote: {
    color: "#666666",
  },
  historyTitleUpvote: {
    color: "#8A0C93"
  },
  historyTitleDownvote: {
    color: "#C70E4C"
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
    margin: theme.spacing(1)
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
    justifyItems: "center"
  },
  RoutineSelector: {
    paddingLeft: theme.spacing.unit * 2
  },
  TimerControls: {

  },
  exerciseHistoryMobile: {
    display:'flex',
    justifyContent:'center'
  }
});

export {
  MuiTheme,
  styles,
}
