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
      main: '#4045A6',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#FFFFFF',
    },
    overrides: {

      tabs: {
        color:"#000000"
      }
    }
  }
});

MuiTheme = responsiveFontSizes(MuiTheme);

MuiTheme.typography.h6 = {
  fontSize: '1.0rem',
  fontFamily: "'Gudea', sans-serif",
  [MuiTheme.breakpoints.up('md')]: {
    fontSize: '1.0rem',
  },
};

MuiTheme.typography.h5 = {
  fontSize: '1.5rem',
  fontFamily: "'Gudea', sans-serif",
  [MuiTheme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
  },
};

/* Used for Word Card */
MuiTheme.typography.h3 = {
  fontSize: '5.5rem',
  [MuiTheme.breakpoints.down('sm')]: {
    fontSize: '4.5rem',
  },
};

MuiTheme.typography.h2 = {
  fontFamily: "'Gudea', sans-serif",
};

MuiTheme.typography.h1 = {
  fontFamily: "'Gudea', sans-serif",
};


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  homeContainer: {
    marginTop: theme.spacing(2)
  },
  footerText: {
    padding: theme.spacing(5, 0, 1, 0)
  },
  introTabPanel: {
    '& .MuiBox-root': {
      padding: theme.spacing(0)
    },
  },
  introTabLink: {
    padding: theme.spacing(0, 2, 0, 2),
    fontFamily: "'Gudea', sans-serif",
    [MuiTheme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
    },
  },
  introTabIndicator: {
    padding: theme.spacing(0, 0, 0, 0)
  },
  introContainer: {
    padding: theme.spacing(1, 0, 1, 0)
  },
  techniquesContainer: {
    padding: theme.spacing(1, 0, 1, 0)
  },
  homeTabPanel: {
    '& .MuiBox-root': {
      padding: theme.spacing(0)
    },
  },
  routineSelector: {
    //backgroundColor: "#FCFCFF",
    padding: theme.spacing(1.5, 0, 1.5, 0)
  },
  routineSelectContainer: {
    display: "flex",
    alignItems: "center",
  },
  routineSelectorHeading: {
    color: "#14197E",
    fontWeight: "500"
  },
  RoutineSelector: {
    marginRight: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginRight: 40,
  },
  activeRoutineStep: {
    fontWeight: "500",
    fontSize: "1rem",
    color: "#0B0F65"
  },
  activeRoutineStepSecondary: {
    fontSize: "1rem",
    color: "#0B0F65"
  },
  activeRoutineStepCheckbox: {
    color: "#0B0F65"
  },
  completedRoutineStepCheckbox: {
    color: "#D1D1D1"
  },
  completedRoutineStep: {
    color: "#D1D1D1",
    fontSize: "1rem"
  },
  routineStep: {
    fontSize: "1rem"
  },
  routineStepCheckbox: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(2),
    minWidth: "auto"
  },
  exerciseHistoryHeading: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(1),
    color: "#0B0F65",
    fontWeight: "500",
    fontSize: "1.25rem"
  },
  routineDescriptionHeading: {
    color: "#0B0F65",
    fontWeight: "bold",
    marginTop: theme.spacing(0.5)
  },
  heading: {
    color: "#14197E",
    fontWeight: "bold"
  },
  mobileRoutineSelectContainer: {
    textAlign: "left",
  },
  introductionListItem: {
    margin: theme.spacing(1.25, 0),
    padding: theme.spacing(1, 2)
  },
  introductionListRoot: {
    flexGrow: 1,
    margin: theme.spacing(1.5, 0)
  },
  introductionPrimaryText: {
    display: "block",
    fontWeight: "500",
  },
  introductionSecondaryText: {
    display: "block",
    color: "rgba(0, 0, 0, 0.95)",    
    '&:hover': {      
      cursor: "pointer",
      textDecoration: "underline"
   }
  },
  introductionHeadingActive: {
    marginTop: theme.spacing(0),
    color: "#0B0F65",
    fontWeight: "500",
    fontSize: "1.25rem"    
  },
  introductionHeading: {
    marginTop: theme.spacing(0),
    fontWeight: "500",
    fontSize: "1.25rem",    
    '&:hover': {      
      cursor: "pointer",
      textDecoration: "underline"
   }
  },
  introductionIconActive: {
    color: "#0B0F65",
    margin: theme.spacing(2, 0),
    paddingRight: theme.spacing(1)
  },
  introductionIcon: {
    color: "#B9BBE9",
    margin: theme.spacing(2, 0),
    paddingRight: theme.spacing(1)
  },
  definitionListRoot: {
    flexGrow: 1,
    margin: theme.spacing(0, 0)
  },
  definitionListHeading: {
    margin: theme.spacing(1.5, 0, 0.5, 0),
    color: "#0B0F65",
    fontWeight: "500",
    fontSize: "1.25rem"
  },
  definitionHeading: {
    margin: theme.spacing(0),
    fontSize: "1.15rem"
  },
  definitionSecondaryText: {
    display: "block",
  },
  definitionIcon: {
    color: "#EBECFB",
    margin: theme.spacing(1, 0, 1, 0),
    paddingRight: theme.spacing(1)
  },
  contentHeading: {
    marginTop: theme.spacing(2),
    color: "#0B0F65",
    fontWeight: "bold"
  },
  headerTextStart: {
    display: "block",
    fontWeight: "500",
    fontFamily: "'Mitr', sans-serif",
    color: "#14197E",
    fontSize: theme.spacing(5),
    margin: theme.spacing(2.5, 0, 0, 1),    
    '&:hover': {      
      cursor: "pointer"
   }
  },
  headerTextEnd: {
    display: "block",
    fontWeight: "400",
    fontFamily: "'Mitr', sans-serif",
    color: "#14197E",
    fontSize: theme.spacing(4),
    margin: theme.spacing(-1, 0, 2, 2),
    textAlign: "bottom",    
    '&:hover': {      
      cursor: "pointer"
   }
  },
  headerBackground: {
    // backgroundColor:"#F4F2F9",
  },
  modeHelperText: {
    fontFamily: "'Gudea', sans-serif",
    color: "#F4F2F9",
    fontWeight: 500,
    lineHeight: 1.75,
    textTransform: "uppercase",
    textAlign: "center"
  },
  modeSelectContainer: {    
    border: 4,
    borderLeft: 0,
    borderRight: 0,
    backgroundColor: "#4045A6"
  },
  modeSelect: {
    //backgroundColor:"#FFFDEE",
    //backgroundColor:"#F4F2F9",
    backgroundColor:"#FFF",
    //paddingLeft: theme.spacing(2),
    fontFamily: "'Gudea', sans-serif",
    minWidth: theme.spacing(24),
    padding: theme.spacing(0,1,0,1)
  },
  modeSelectText: {    
    paddingLeft: theme.spacing(1),
    margin: theme.spacing(0, 0, 1.5, 2),
  },
  techniqueDivider: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  techniqueContentHeading: {
    marginTop: theme.spacing(2),
    color: "#0B0F65",
    fontWeight: "bold"
  },
  techniqueSecondaryContentHeading: {
    marginTop: theme.spacing(1),
    color: "#0B0F65",
    fontWeight: "bold"
  },
  techniqueVideoWrapper: {
    display: "flex",
    alignItems: "flex-end",
    alignContent: "flex-start",
    justifyContent: "center",
    flexDirection: "row"
  },
  techniquePlayerWrapper: {
    padding: theme.spacing(3),
    height: "auto !important",
    aspectRatio: "16/9"
  },
  techniqueMainHeading: {
    marginTop: theme.spacing(0),
    color: "#0B0F65",
    fontWeight: "bold"
  },
  techniqueHeading: {
    marginTop: theme.spacing(0),
    color: "#0B0F65",
    fontWeight: "bold"
  },
  techniqueIcon: {
    marginTop: theme.spacing(1),
    color: "#B9BBE9",
  },
  techniqueAccordion: {
    paddingTop: theme.spacing(0)
  },
  techniqueAccordionContainer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 2)
  },
  techniqueListRoot: {
    flexGrow: 1,
    paddingTop: theme.spacing(0)
  },
  techniquePrimaryText: {
    display: "block",
    fontWeight: "500",
    margin: theme.spacing(0.75, 0, 0.75, 0)
  },
  techniqueSecondaryText: {
    display: "block",
    margin: theme.spacing(0.75, 0, 0.75, 0),
    color: "rgba(0, 0, 0, 0.95)"
  },
  techniqueDescriptionText: {
    display: "block",
    margin: theme.spacing(3, 1.25, 1.5, 0),
    color: "rgba(0, 0, 0, 0.95)",
    textAlign: "center"
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
    //alignItems: "end",
    minHeight: theme.spacing(20),
    marginTop: theme.spacing(2),
  },
  wordHistoryGrid: {
    alignItems: "center"
  },
  timerControlGrid: {
    alignItems: "center"
  },
  wordCardContainer: {
    //minHeight: theme.spacing(20),
  },
  card: {
    textAlign: "center",
    minHeight: theme.spacing(20),
    minWidth: theme.spacing(38),
    border: '0px solid #242A99',
    borderRadius: theme.spacing(2),
    boxShadow: '0 0 32px #C7D0D8',
    justifyContent: "center",
    display: "flex",
    alignItems: "center"
  },
  intermissionCard: {
    textAlign: "center",
    minHeight: theme.spacing(20),
    minWidth: theme.spacing(38),
    //border: '0px solid #242A99',
    //borderRadius: theme.spacing(2),
    //boxShadow: '0 0 32px #C7D0D8',
    backgroundColor: "#FFFBF6",
    justifyContent: "center",
    display: "flex",
    alignItems: "center"
  },
  cardContent: {
    margin: "0 auto",
    
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  },
  descriptionTextContainer: {
    marginBottom: theme.spacing(2)
  },
  descriptionTextModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    padding: theme.spacing(2)
  },
  descriptionTextHeader: {
    paddingBottom: theme.spacing(3)
  },
  getStartedButtonContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8)
  },
  getStartedButton: {
    maxWidth: theme.spacing(36),
    minWidth: theme.spacing(36),
    maxHeight: theme.spacing(8),
    minHeight: theme.spacing(8),
    margin: "0 auto"
  },
  incrementButton: {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(2),
    margin: "0 auto",
    display: "flex"
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
  exerciseDescriptionContainer: {

  },
  subnavigationLink: {
    display: "inline-flex",
    marginLeft: theme.spacing(3.5),
    marginRight: theme.spacing(3.5),
    [MuiTheme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(1.5),
      marginRight: theme.spacing(1.5),
    },
  },
  subnavigationLinkSelected: {
    fontWeight: "700",
    fontSize: "1.125rem"
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
  exerciseHistoryCard: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    backgroundColor: 'transparent',
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
    margin: theme.spacing(0.75, 0.25, 0.25, 0.25),
    padding: theme.spacing(0.75)
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
  wordHistoryWrapper: {
    textAlign: "center",
    alignItems: "center",
    display:"grid",
    justifyItems: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
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
  exerciseDetails: {
    padding: theme.spacing(2, 0, 1, 0),
    marginTop: theme.spacing(0),
    backgroundColor: 'transparent',
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
  textLink: {
    marginLeft: theme.spacing(0.5),
    textDecoration: 'underline'
  },
  definitionLink: {
    color: "#4045A6",
    textDecoration: "underline",
    cursor: "pointer"
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
  routineBuilderSelectContainer: {
    display: "flex",
  },
  RoutineBuilderSelector: {
    display: "inline-flex",
  },
  userAdminSelectContainer: {
    display: "flex",
  },
});

export {
  MuiTheme,
  styles,
}
