[eslint] 
src\util\api.js
  Line 217:29:  React Hook "useQuery" is called in function "getGraphQL" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter. React Hook names must start with the word "use"  react-hooks/rules-of-hooks

Search for the keywords to learn more about each error.
WARNING in [eslint] 
src\components\Administration\Component.js
  Line 3:10:  'styled' is defined but never used         no-unused-vars
  Line 8:10:  'useTheme' is defined but never used       no-unused-vars
  Line 9:8:   'useMediaQuery' is defined but never used  no-unused-vars
  Line 10:8:  'PropTypes' is defined but never used      no-unused-vars
  Line 60:3:  Duplicate name 'componentDidMount'         no-dupe-class-members

src\components\Administration\elements\CancelButton.js
  Line 3:10:  'styled' is defined but never used  no-unused-vars

src\components\Administration\elements\ChangePassword.js
  Line 3:10:  'styled' is defined but never used  no-unused-vars

src\components\Administration\elements\CreateButton.js
  Line 3:10:  'styled' is defined but never used  no-unused-vars

src\components\Administration\elements\SaveButton.js
  Line 3:10:  'styled' is defined but never used  no-unused-vars

src\components\Administration\elements\UserStatus.js
  Line 6:9:  'styled' is defined but never used  no-unused-vars

src\components\AppBar\Component.js
  Line 2:8:  'PropTypes' is defined but never used  no-unused-vars

src\components\App\Component.js
  Line 2:10:   'useState' is defined but never used                no-unused-vars
  Line 12:8:   'AppBarContainer' is defined but never used         no-unused-vars
  Line 25:8:   'SplashContainer' is defined but never used         no-unused-vars
  Line 42:21:  'exerciseUser' is assigned a value but never used   no-unused-vars
  Line 42:35:  'exerciseToken' is assigned a value but never used  no-unused-vars

src\components\Interactions\InteractionsHome.js
  Line 2:10:   'styled' is defined but never used                                               
                                                                                                
                                                                                                
                           no-unused-vars
  Line 20:10:  'state' is assigned a value but never used                                       
                                                                                                
                                                                                                
                           no-unused-vars
  Line 20:17:  'setState' is assigned a value but never used                                    
                                                                                                
                                                                                                
                           no-unused-vars
  Line 44:6:   React Hook useEffect has a missing dependency: 'prepareInteractionForm'. Either include it or remove the dependency array                                                        
                                                                                                
                           react-hooks/exhaustive-deps
  Line 52:6:   React Hook useEffect has a missing dependency: 'props'. Either include it or remove the dependency array. However, 'props' will change when *any* prop changes, so the preferred fix is to destructure the 'props' object outside of the useEffect call and refer to those specific props inside useEffect  react-hooks/exhaustive-deps

src\components\PostList\PostTable.js
  Line 33:7:  'StyledUpvoteCell' is assigned a value but never used    no-unused-vars
  Line 37:7:  'StyledDownvoteCell' is assigned a value but never used  no-unused-vars
  Line 41:7:  'StyledVotingCell' is assigned a value but never used    no-unused-vars

src\components\Post\Vote\Component.js
  Line 6:10:  'makeStyles' is defined but never used  no-unused-vars

src\components\RRLayout\Intermission.js
  Line 4:10:  'styled' is defined but never used  no-unused-vars

src\components\RRLayout\ProgressIndicator.js
  Line 7:8:  'PropTypes' is defined but never used  no-unused-vars

src\components\RRLayout\RRHome.js
  Line 2:10:  'styled' is defined but never used         no-unused-vars
  Line 13:8:  'PropTypes' is defined but never used      no-unused-vars
  Line 29:9:  'isXs' is assigned a value but never used  no-unused-vars

src\components\RRLayout\RoutineDescription.js
  Line 4:10:  'styled' is defined but never used  no-unused-vars

src\components\RRLayout\RoutineSelect.js
  Line 7:10:   'styled' is defined but never used         no-unused-vars
  Line 8:8:    'ListSubheader' is defined but never used  no-unused-vars
  Line 135:5:  Duplicate name 'componentDidMount'         no-dupe-class-members

src\components\RRLayout\Timer.js
  Line 7:10:   'styled' is defined but never used         no-unused-vars
  Line 11:10:  'useTheme' is defined but never used       no-unused-vars
  Line 12:8:   'useMediaQuery' is defined but never used  no-unused-vars
  Line 13:8:   'PropTypes' is defined but never used      no-unused-vars

src\components\RRLayout\WordCard.js
  Line 4:10:  'styled' is defined but never used  no-unused-vars

src\components\RRLayout\elements\Sentence.js
  Line 4:10:  'styled' is defined but never used  no-unused-vars

src\components\RRLayout\elements\Word.js
  Line 5:10:  'styled' is defined but never used  no-unused-vars

src\components\RandomlyRead\Definitions\Component.js
  Line 2:10:   'styled' is defined but never used                no-unused-vars
  Line 10:10:  'faChevronCircleRight' is defined but never used  no-unused-vars
  Line 13:3:   Useless constructor                               no-useless-constructor
  Line 213:7:  Duplicate case label                              no-duplicate-case

src\components\RandomlyRead\Donate\Component.js
  Line 2:8:    'ListItem' is defined but never used                  no-unused-vars
  Line 3:8:    'ListItemText' is defined but never used              no-unused-vars
  Line 4:10:   'Typography' is defined but never used                no-unused-vars
  Line 6:10:   'styled' is defined but never used                    no-unused-vars
  Line 7:8:    'Paper' is defined but never used                     no-unused-vars
  Line 8:8:    'Grid' is defined but never used                      no-unused-vars
  Line 9:8:    'Box' is defined but never used                       no-unused-vars
  Line 10:8:   'ListItemIcon' is defined but never used              no-unused-vars
  Line 11:8:   'List' is defined but never used                      no-unused-vars
  Line 12:8:   'CheckboxOutlineBlankIcon' is defined but never used  no-unused-vars
  Line 13:8:   'CheckBoxIcon' is defined but never used              no-unused-vars
  Line 14:10:  'useTheme' is defined but never used                  no-unused-vars
  Line 15:8:   'useMediaQuery' is defined but never used             no-unused-vars
  Line 16:8:   'PropTypes' is defined but never used                 no-unused-vars

src\components\RandomlyRead\Exercises\Exercise1\HomeContainer.js
  Line 20:3:  Duplicate key 'isCompleted'  no-dupe-keys

src\components\RandomlyRead\Exercises\Exercise1\Introduction.js
  Line 3:8:    'List' is defined but never used                  no-unused-vars
  Line 4:8:    'ListItem' is defined but never used              no-unused-vars
  Line 5:8:    'ListItemText' is defined but never used          no-unused-vars
  Line 8:8:    'Link' is defined but never used                  no-unused-vars
  Line 9:8:    'Modal' is defined but never used                 no-unused-vars
  Line 10:10:  'styled' is defined but never used                no-unused-vars
  Line 12:10:  'FontAwesomeIcon' is defined but never used       no-unused-vars
  Line 13:10:  'faChevronCircleRight' is defined but never used  no-unused-vars
  Line 13:32:  'faInfoCircle' is defined but never used          no-unused-vars
  Line 15:8:   'Definitions' is defined but never used           no-unused-vars
  Line 31:13:  'classes' is assigned a value but never used      no-unused-vars

src\components\RandomlyRead\Exercises\Exercise1\Techniques.js
  Line 2:10:   'styled' is defined but never used                 no-unused-vars
  Line 4:8:    'Typography' is defined but never used             no-unused-vars
  Line 8:8:    'Accordion' is defined but never used              no-unused-vars
  Line 9:8:    'AccordionSummary' is defined but never used       no-unused-vars
  Line 10:8:   'AccordionDetails' is defined but never used       no-unused-vars
  Line 11:8:   'ExpandMoreIcon' is defined but never used         no-unused-vars
  Line 15:8:   'List' is defined but never used                   no-unused-vars
  Line 16:8:   'ListItem' is defined but never used               no-unused-vars
  Line 17:8:   'ListItemText' is defined but never used           no-unused-vars
  Line 18:8:   'Link' is defined but never used                   no-unused-vars
  Line 19:10:  'FontAwesomeIcon' is defined but never used        no-unused-vars
  Line 20:10:  'faChevronCircleRight' is defined but never used   no-unused-vars
  Line 20:32:  'faInfoCircle' is defined but never used           no-unused-vars
  Line 29:10:  'expanded' is assigned a value but never used      no-unused-vars
  Line 31:9:   'handleChange' is assigned a value but never used  no-unused-vars

src\components\RandomlyRead\Exercises\Exercise2\Introduction.js
  Line 3:8:    'List' is defined but never used                  no-unused-vars
  Line 4:8:    'ListItem' is defined but never used              no-unused-vars
  Line 5:8:    'ListItemText' is defined but never used          no-unused-vars
  Line 8:8:    'Link' is defined but never used                  no-unused-vars
  Line 9:10:   'styled' is defined but never used                no-unused-vars
  Line 11:10:  'FontAwesomeIcon' is defined but never used       no-unused-vars
  Line 12:10:  'faChevronCircleRight' is defined but never used  no-unused-vars
  Line 12:32:  'faInfoCircle' is defined but never used          no-unused-vars
  Line 21:13:  'classes' is assigned a value but never used      no-unused-vars

src\components\RandomlyRead\Exercises\Exercise2\Techniques.js
  Line 2:10:   'makeStyles' is defined but never used             no-unused-vars
  Line 3:10:   'styled' is defined but never used                 no-unused-vars
  Line 5:8:    'Typography' is defined but never used             no-unused-vars
  Line 9:8:    'Accordion' is defined but never used              no-unused-vars
  Line 10:8:   'AccordionSummary' is defined but never used       no-unused-vars
  Line 11:8:   'AccordionDetails' is defined but never used       no-unused-vars
  Line 12:8:   'ExpandMoreIcon' is defined but never used         no-unused-vars
  Line 16:8:   'List' is defined but never used                   no-unused-vars
  Line 17:8:   'ListItem' is defined but never used               no-unused-vars
  Line 18:8:   'ListItemText' is defined but never used           no-unused-vars
  Line 19:8:   'Link' is defined but never used                   no-unused-vars
  Line 20:10:  'FontAwesomeIcon' is defined but never used        no-unused-vars
  Line 21:10:  'faChevronCircleRight' is defined but never used   no-unused-vars
  Line 21:32:  'faInfoCircle' is defined but never used           no-unused-vars
  Line 32:10:  'expanded' is assigned a value but never used      no-unused-vars
  Line 34:9:   'handleChange' is assigned a value but never used  no-unused-vars

src\components\RandomlyRead\Exercises\Exercise3\Introduction.js
  Line 3:8:    'List' is defined but never used                  no-unused-vars
  Line 4:8:    'ListItem' is defined but never used              no-unused-vars
  Line 5:8:    'ListItemText' is defined but never used          no-unused-vars
  Line 8:8:    'Link' is defined but never used                  no-unused-vars
  Line 9:10:   'styled' is defined but never used                no-unused-vars
  Line 11:10:  'FontAwesomeIcon' is defined but never used       no-unused-vars
  Line 12:10:  'faChevronCircleRight' is defined but never used  no-unused-vars
  Line 12:32:  'faInfoCircle' is defined but never used          no-unused-vars
  Line 21:13:  'classes' is assigned a value but never used      no-unused-vars

src\components\RandomlyRead\Exercises\Exercise3\Techniques.js
  Line 2:10:   'styled' is defined but never used                 no-unused-vars
  Line 4:8:    'Typography' is defined but never used             no-unused-vars
  Line 8:8:    'Accordion' is defined but never used              no-unused-vars
  Line 9:8:    'AccordionSummary' is defined but never used       no-unused-vars
  Line 10:8:   'AccordionDetails' is defined but never used       no-unused-vars
  Line 11:8:   'ExpandMoreIcon' is defined but never used         no-unused-vars
  Line 15:8:   'List' is defined but never used                   no-unused-vars
  Line 16:8:   'ListItem' is defined but never used               no-unused-vars
  Line 17:8:   'ListItemText' is defined but never used           no-unused-vars
  Line 18:8:   'Link' is defined but never used                   no-unused-vars
  Line 19:10:  'FontAwesomeIcon' is defined but never used        no-unused-vars
  Line 20:10:  'faChevronCircleRight' is defined but never used   no-unused-vars
  Line 20:32:  'faInfoCircle' is defined but never used           no-unused-vars
  Line 29:10:  'expanded' is assigned a value but never used      no-unused-vars
  Line 31:9:   'handleChange' is assigned a value but never used  no-unused-vars

src\components\RandomlyRead\Exercises\SplashPage\Introduction.js
  Line 8:8:   'Link' is defined but never used    no-unused-vars
  Line 9:10:  'styled' is defined but never used  no-unused-vars

src\components\RandomlyRead\Exercises\SplashPage\Techniques.js
  Line 17:10:  'faChevronCircleRight' is defined but never used  no-unused-vars
  Line 81:9:   'theme' is assigned a value but never used        no-unused-vars

src\components\RandomlyRead\Footer\Component.js
  Line 2:8:    'ListItem' is defined but never used                  no-unused-vars
  Line 3:8:    'ListItemText' is defined but never used              no-unused-vars
  Line 5:10:   'styled' is defined but never used                    no-unused-vars
  Line 7:8:    'Grid' is defined but never used                      no-unused-vars
  Line 10:8:   'ListItemIcon' is defined but never used              no-unused-vars
  Line 11:8:   'List' is defined but never used                      no-unused-vars
  Line 12:8:   'CheckboxOutlineBlankIcon' is defined but never used  no-unused-vars
  Line 13:8:   'CheckBoxIcon' is defined but never used              no-unused-vars
  Line 14:10:  'useTheme' is defined but never used                  no-unused-vars
  Line 15:8:   'useMediaQuery' is defined but never used             no-unused-vars
  Line 16:8:   'PropTypes' is defined but never used                 no-unused-vars
  Line 18:10:  'styles' is defined but never used                    no-unused-vars
  Line 20:8:   'BuyMeACoffee' is defined but never used              no-unused-vars
  Line 29:7:   Duplicate key 'width'                                 no-dupe-keys

src\components\RandomlyRead\Home.js
  Line 3:10:    'styled' is defined but never used               no-unused-vars
  Line 17:8:    'Button' is defined but never used               no-unused-vars
  Line 35:32:   'faInfoCircle' is defined but never used         no-unused-vars
  Line 37:8:    'BuyMeACoffee' is defined but never used         no-unused-vars
  Line 90:107:  'auto' is assigned a value but never used        no-unused-vars
  Line 93:9:    'isXs' is assigned a value but never used        no-unused-vars
  Line 106:9:   'root' is assigned a value but never used        no-unused-vars
  Line 106:43:  'pathtitle' is assigned a value but never used   no-unused-vars
  Line 142:33:  'leveltitle' is assigned a value but never used  no-unused-vars
  Line 142:45:  'pathtitle' is assigned a value but never used   no-unused-vars
  Line 166:33:  'leveltitle' is assigned a value but never used  no-unused-vars
  Line 166:45:  'pathtitle' is assigned a value but never used   no-unused-vars
  Line 200:12:  'handleClick' is defined but never used          no-unused-vars

src\components\RandomlyRead\RoutineDescription.js
  Line 3:10:    'styled' is defined but never used               no-unused-vars
  Line 143:87:  'width' is assigned a value but never used       no-unused-vars
  Line 161:11:  'handleOpen' is assigned a value but never used  no-unused-vars
  Line 273:9:   'isXs' is assigned a value but never used        no-unused-vars

src\components\RandomlyRead\RoutineSelect.js
  Line 7:10:   'styled' is defined but never used         no-unused-vars
  Line 8:8:    'ListSubheader' is defined but never used  no-unused-vars
  Line 156:5:  Duplicate name 'componentDidMount'         no-dupe-class-members

src\components\RandomlyRead\SplashHome.js
  Line 5:10:   'styled' is defined but never used                                  no-unused-vars
  Line 11:8:   'Modal' is defined but never used                                   no-unused-vars
  Line 21:8:   'Hidden' is defined but never used                                  no-unused-vars
  Line 25:8:   'RoutineDescriptionContainer' is defined but never used             no-unused-vars
  Line 26:8:   'WordCardContainer' is defined but never used                       no-unused-vars
  Line 27:8:   'ExerciseHistoryContainer' is defined but never used                no-unused-vars
  Line 28:8:   'ProgressIndicator' is defined but never used                       no-unused-vars
  Line 31:8:   'WordHistoryList' is defined but never used                         no-unused-vars
  Line 33:8:   'List' is defined but never used                                    no-unused-vars
  Line 34:8:   'ListItem' is defined but never used                                no-unused-vars
  Line 35:8:   'ListItemText' is defined but never used                            no-unused-vars
  Line 38:10:  'FontAwesomeIcon' is defined but never used                         no-unused-vars
  Line 39:10:  'faCheckCircle' is defined but never used                           no-unused-vars
  Line 41:8:   'BuyMeACoffee' is defined but never used                            no-unused-vars
  Line 42:8:   'SiteFooter' is defined but never used                              no-unused-vars
  Line 95:11:  'TimerContainer' is assigned a value but never used                 no-unused-vars
  Line 95:27:  'RoutineSelectContainer' is assigned a value but never used         no-unused-vars
  Line 95:51:  'ExerciseIntroduction' is assigned a value but never used           no-unused-vars
  Line 95:73:  'ExerciseTechniques' is assigned a value but never used             no-unused-vars
  Line 95:93:  'ApolloClient' is assigned a value but never used                   no-unused-vars
  Line 97:10:  'open_1' is assigned a value but never used                         no-unused-vars
  Line 98:10:  'open_2' is assigned a value but never used                         no-unused-vars
  Line 101:9:  'isXs' is assigned a value but never used                           no-unused-vars
  Line 179:5:  'exerciseHistoryContainerWidth' is assigned a value but never used  no-unused-vars
  Line 180:5:  'timerContainerWidth' is assigned a value but never used            no-unused-vars
  Line 183:9:  'handleOpen_1' is assigned a value but never used                   no-unused-vars
  Line 187:9:  'handleClose_1' is assigned a value but never used                  no-unused-vars
  Line 191:9:  'handleOpen_2' is assigned a value but never used                   no-unused-vars
  Line 195:9:  'handleClose_2' is assigned a value but never used                  no-unused-vars

src\components\RandomlyRead\SplashTimer.js
  Line 8:10:   'styled' is defined but never used         no-unused-vars
  Line 11:10:  'useTheme' is defined but never used       no-unused-vars
  Line 12:8:   'useMediaQuery' is defined but never used  no-unused-vars
  Line 13:8:   'PropTypes' is defined but never used      no-unused-vars

src\components\RandomlyRead\Splash\Component.js
  Line 9:10:  'styled' is defined but never used     no-unused-vars
  Line 11:8:  'PropTypes' is defined but never used  no-unused-vars

src\components\RandomlyRead\Techniques\Technique1\Component.js
  Line 5:8:    'Link' is defined but never used                             no-unused-vars      
  Line 10:10:  'styled' is defined but never used                           no-unused-vars      
  Line 20:7:   'style' is assigned a value but never used                   no-unused-vars      
  Line 84:11:  'handleOpenPhonate' is assigned a value but never used       no-unused-vars      
  Line 87:11:  'handleOpenArticulation' is assigned a value but never used  no-unused-vars      
  Line 90:11:  'handleOpenDiaphragm' is assigned a value but never used     no-unused-vars      
  Line 93:11:  'handleOpenPelvicFloor' is assigned a value but never used   no-unused-vars      

src\components\RandomlyRead\Techniques\Technique2\Component.js
  Line 5:8:    'Link' is defined but never used                             no-unused-vars      
  Line 10:10:  'styled' is defined but never used                           no-unused-vars      
  Line 71:11:  'handleOpenArticulation' is assigned a value but never used  no-unused-vars      
  Line 74:11:  'handleOpenDiaphragm' is assigned a value but never used     no-unused-vars      
  Line 77:11:  'handleOpenPelvicFloor' is assigned a value but never used   no-unused-vars      
  Line 80:11:  'handleOpenTransfer' is assigned a value but never used      no-unused-vars      
  Line 81:11:  'handleCloseTransfer' is assigned a value but never used     no-unused-vars      

src\components\RandomlyRead\Techniques\Technique3\Component.js
  Line 5:8:    'Link' is defined but never used                             no-unused-vars      
  Line 10:10:  'styled' is defined but never used                           no-unused-vars      
  Line 71:11:  'handleOpenArticulation' is assigned a value but never used  no-unused-vars      
  Line 74:11:  'handleOpenDiaphragm' is assigned a value but never used     no-unused-vars      
  Line 77:11:  'handleOpenPelvicFloor' is assigned a value but never used   no-unused-vars      
  Line 80:11:  'handleOpenTransfer' is assigned a value but never used      no-unused-vars      

src\components\RandomlyRead\Techniques\Technique4\Component.js
  Line 4:8:    'Box' is defined but never used     no-unused-vars
  Line 5:8:    'Link' is defined but never used    no-unused-vars
  Line 10:10:  'styled' is defined but never used  no-unused-vars

src\components\RandomlyRead\Timer.js
  Line 2:8:     'ReactDOM' is defined but never used       no-unused-vars
  Line 9:10:    'styled' is defined but never used         no-unused-vars
  Line 17:8:    'FormLabel' is defined but never used      no-unused-vars
  Line 117:9:   'elms' is already defined                  no-redeclare
  Line 118:13:  'i' is already defined                     no-redeclare
  Line 834:9:   'isXs' is assigned a value but never used  no-unused-vars

src\components\RandomlyRead\WordCard.js
  Line 4:10:   'styled' is defined but never used         no-unused-vars
  Line 83:31:  Expected '===' and instead saw '=='        eqeqeq
  Line 399:9:  'isXs' is assigned a value but never used  no-unused-vars

src\components\RoutineBuilder\RoutineBuilder.js
  Line 2:10:   'styled' is defined but never used  no-unused-vars
  Line 239:3:  Duplicate name 'componentDidMount'  no-dupe-class-members

src\components\RoutineBuilder\elements\ConsonantCheckboxes.js
  Line 2:10:  'styled' is defined but never used  no-unused-vars

src\components\RoutineBuilder\elements\DurationSlider.js
  Line 3:10:  'styled' is defined but never used  no-unused-vars

src\components\RoutineBuilder\elements\NewRoutineButton.js
  Line 41:7:  'StyledTextField' is assigned a value but never used  no-unused-vars

src\components\RoutineBuilder\elements\RepetitionSlider.js
  Line 3:10:  'styled' is defined but never used  no-unused-vars

src\components\RoutineBuilder\elements\RoutinePreview.js
  Line 2:10:  'styled' is defined but never used  no-unused-vars

src\components\RoutineBuilder\elements\UpdateButton.js
  Line 3:10:  'styled' is defined but never used  no-unused-vars

src\components\RoutineBuilder\elements\VowelSelect.js
  Line 11:7:  'StyledRoot' is assigned a value but never used         no-unused-vars
  Line 16:7:  'StyledFormControl' is assigned a value but never used  no-unused-vars
  Line 22:7:  'StyledChips' is assigned a value but never used        no-unused-vars
  Line 27:7:  'StyledChip' is assigned a value but never used         no-unused-vars

src\components\UserProfile\Component.js
  Line 3:10:  'styled' is defined but never used         no-unused-vars
  Line 9:10:  'useTheme' is defined but never used       no-unused-vars
  Line 10:8:  'useMediaQuery' is defined but never used  no-unused-vars
  Line 11:8:  'PropTypes' is defined but never used      no-unused-vars

src\components\ViewHistory\Component.js
  Line 1:17:  'useEffect' is defined but never used  no-unused-vars
  Line 2:10:  'styled' is defined but never used     no-unused-vars

src\components\WordHistoryList\Component.js
  Line 3:10:  'useTheme' is defined but never used       no-unused-vars
  Line 4:8:   'useMediaQuery' is defined but never used  no-unused-vars
  Line 5:8:   'PropTypes' is defined but never used      no-unused-vars
  Line 8:10:  'styled' is defined but never used         no-unused-vars

src\components\WordHistory\index.js
  Line 3:8:   'Grid' is defined but never used              no-unused-vars
  Line 6:8:   'PropTypes' is defined but never used         no-unused-vars
  Line 8:10:  'styled' is defined but never used            no-unused-vars
  Line 13:9:  'classes' is assigned a value but never used  no-unused-vars
  Line 16:9:  'isXs' is assigned a value but never used     no-unused-vars
  Line 57:1:  Block is redundant                            no-lone-blocks

src\middleware\auth.js
  Line 5:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\middleware\error.js
  Line 26:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\middleware\modeSelect.js
  Line 3:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\middleware\theme.js
  Line 3:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\administration.js
  Line 54:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\auth.js
  Line 20:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\error.js
  Line 14:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\exerciseHistory.js
  Line 31:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\formData.js
  Line 36:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\interaction.js
  Line 20:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\modeSelect.js
  Line 6:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\posts.js
  Line 35:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\routineBuilder.js
  Line 72:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\routineSelect.js
  Line 22:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\theme.js
  Line 6:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\viewHistory.js
  Line 18:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\word.js
  Line 31:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

ERROR in [eslint]
src\util\api.js
  Line 217:29:  React Hook "useQuery" is called in function "getGraphQL" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter. React Hook names must start with the word "use"  react-hooks/rules-of-hooks    

Search for the keywords to learn more about each error.

webpack compiled with 1 error and 1 warning
No issues found.
Terminate batch job (Y/N)? y

C:\Projects\randomly-read\client>yarn start
yarn run v1.22.22
$ set NODE_OPTIONS=--max_old_space_size=8192 && craco start
(node:23040) [DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE] DeprecationWarning: 'onAfterSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:23040) [DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE] DeprecationWarning: 'onBeforeSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
Starting the development server...
Compiled successfully!

You can now view asperitas in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://10.0.0.124:3000

Note that the development build is not optimized.
To create a production build, use yarn build.

webpack compiled successfully
Files successfully emitted, waiting for typecheck results...
Issues checking in progress...
No issues found.
^CTerminate batch job (Y/N)? Terminate batch job (Y/N)? Y

C:\Projects\randomly-read\client>yarn build
yarn run v1.22.22
$ set NODE_OPTIONS=--max_old_space_size=8192 && craco build
Creating an optimized production build...
Compiled with warnings.

[eslint] 
src\components\Administration\Component.js
  Line 3:10:  'styled' is defined but never used         no-unused-vars
  Line 8:10:  'useTheme' is defined but never used       no-unused-vars
  Line 9:8:   'useMediaQuery' is defined but never used  no-unused-vars
  Line 10:8:  'PropTypes' is defined but never used      no-unused-vars
  Line 60:3:  Duplicate name 'componentDidMount'         no-dupe-class-members

src\components\Administration\elements\CancelButton.js
  Line 3:10:  'styled' is defined but never used  no-unused-vars

src\components\Administration\elements\ChangePassword.js
  Line 3:10:  'styled' is defined but never used  no-unused-vars

src\components\Administration\elements\CreateButton.js
  Line 3:10:  'styled' is defined but never used  no-unused-vars

src\components\Administration\elements\SaveButton.js
  Line 3:10:  'styled' is defined but never used  no-unused-vars

src\components\Administration\elements\UserStatus.js
  Line 6:9:  'styled' is defined but never used  no-unused-vars

src\components\AppBar\Component.js
  Line 2:8:  'PropTypes' is defined but never used  no-unused-vars

src\components\App\Component.js
  Line 2:10:   'useState' is defined but never used                no-unused-vars
  Line 12:8:   'AppBarContainer' is defined but never used         no-unused-vars
  Line 25:8:   'SplashContainer' is defined but never used         no-unused-vars
  Line 42:21:  'exerciseUser' is assigned a value but never used   no-unused-vars
  Line 42:35:  'exerciseToken' is assigned a value but never used  no-unused-vars

src\components\Interactions\InteractionsHome.js
  Line 2:10:   'styled' is defined but never used                                                                                                        
                                                                                                                                                         
         no-unused-vars
  Line 20:10:  'state' is assigned a value but never used                                                                                                
                                                                                                                                                         
         no-unused-vars
  Line 20:17:  'setState' is assigned a value but never used                                                                                             
                                                                                                                                                         
         no-unused-vars
  Line 44:6:   React Hook useEffect has a missing dependency: 'prepareInteractionForm'. Either include it or remove the dependency array                 
                                                                                                                                                         
         react-hooks/exhaustive-deps
  Line 52:6:   React Hook useEffect has a missing dependency: 'props'. Either include it or remove the dependency array. However, 'props' will change when *any* prop changes, so the preferred fix is to destructure the 'props' object outside of the useEffect call and refer to those specific props inside useEffect  react-hooks/exhaustive-deps

src\components\PostList\PostTable.js
  Line 33:7:  'StyledUpvoteCell' is assigned a value but never used    no-unused-vars
  Line 37:7:  'StyledDownvoteCell' is assigned a value but never used  no-unused-vars
  Line 41:7:  'StyledVotingCell' is assigned a value but never used    no-unused-vars

src\components\Post\Vote\Component.js
  Line 6:10:  'makeStyles' is defined but never used  no-unused-vars

src\components\RRLayout\Intermission.js
  Line 4:10:  'styled' is defined but never used  no-unused-vars

src\components\RRLayout\ProgressIndicator.js
  Line 7:8:  'PropTypes' is defined but never used  no-unused-vars

src\components\RRLayout\RRHome.js
  Line 2:10:  'styled' is defined but never used         no-unused-vars
  Line 13:8:  'PropTypes' is defined but never used      no-unused-vars
  Line 29:9:  'isXs' is assigned a value but never used  no-unused-vars

src\components\RRLayout\RoutineDescription.js
  Line 4:10:  'styled' is defined but never used  no-unused-vars

src\components\RRLayout\RoutineSelect.js
  Line 7:10:   'styled' is defined but never used         no-unused-vars
  Line 8:8:    'ListSubheader' is defined but never used  no-unused-vars
  Line 135:5:  Duplicate name 'componentDidMount'         no-dupe-class-members

src\components\RRLayout\Timer.js
  Line 7:10:   'styled' is defined but never used         no-unused-vars
  Line 11:10:  'useTheme' is defined but never used       no-unused-vars
  Line 12:8:   'useMediaQuery' is defined but never used  no-unused-vars
  Line 13:8:   'PropTypes' is defined but never used      no-unused-vars

src\components\RRLayout\WordCard.js
  Line 4:10:  'styled' is defined but never used  no-unused-vars

src\components\RRLayout\elements\Sentence.js
  Line 4:10:  'styled' is defined but never used  no-unused-vars

src\components\RRLayout\elements\Word.js
  Line 5:10:  'styled' is defined but never used  no-unused-vars

src\components\RandomlyRead\Definitions\Component.js
  Line 2:10:   'styled' is defined but never used                no-unused-vars
  Line 10:10:  'faChevronCircleRight' is defined but never used  no-unused-vars
  Line 13:3:   Useless constructor                               no-useless-constructor
  Line 213:7:  Duplicate case label                              no-duplicate-case

src\components\RandomlyRead\Donate\Component.js
  Line 2:8:    'ListItem' is defined but never used                  no-unused-vars
  Line 3:8:    'ListItemText' is defined but never used              no-unused-vars
  Line 4:10:   'Typography' is defined but never used                no-unused-vars
  Line 6:10:   'styled' is defined but never used                    no-unused-vars
  Line 7:8:    'Paper' is defined but never used                     no-unused-vars
  Line 8:8:    'Grid' is defined but never used                      no-unused-vars
  Line 9:8:    'Box' is defined but never used                       no-unused-vars
  Line 10:8:   'ListItemIcon' is defined but never used              no-unused-vars
  Line 11:8:   'List' is defined but never used                      no-unused-vars
  Line 12:8:   'CheckboxOutlineBlankIcon' is defined but never used  no-unused-vars
  Line 13:8:   'CheckBoxIcon' is defined but never used              no-unused-vars
  Line 14:10:  'useTheme' is defined but never used                  no-unused-vars
  Line 15:8:   'useMediaQuery' is defined but never used             no-unused-vars
  Line 16:8:   'PropTypes' is defined but never used                 no-unused-vars

src\components\RandomlyRead\Exercises\Exercise1\HomeContainer.js
  Line 20:3:  Duplicate key 'isCompleted'  no-dupe-keys

src\components\RandomlyRead\Exercises\Exercise1\Introduction.js
  Line 3:8:    'List' is defined but never used                  no-unused-vars
  Line 4:8:    'ListItem' is defined but never used              no-unused-vars
  Line 5:8:    'ListItemText' is defined but never used          no-unused-vars
  Line 8:8:    'Link' is defined but never used                  no-unused-vars
  Line 9:8:    'Modal' is defined but never used                 no-unused-vars
  Line 10:10:  'styled' is defined but never used                no-unused-vars
  Line 12:10:  'FontAwesomeIcon' is defined but never used       no-unused-vars
  Line 13:10:  'faChevronCircleRight' is defined but never used  no-unused-vars
  Line 13:32:  'faInfoCircle' is defined but never used          no-unused-vars
  Line 15:8:   'Definitions' is defined but never used           no-unused-vars
  Line 31:13:  'classes' is assigned a value but never used      no-unused-vars

src\components\RandomlyRead\Exercises\Exercise1\Techniques.js
  Line 2:10:   'styled' is defined but never used                 no-unused-vars
  Line 4:8:    'Typography' is defined but never used             no-unused-vars
  Line 8:8:    'Accordion' is defined but never used              no-unused-vars
  Line 9:8:    'AccordionSummary' is defined but never used       no-unused-vars
  Line 10:8:   'AccordionDetails' is defined but never used       no-unused-vars
  Line 11:8:   'ExpandMoreIcon' is defined but never used         no-unused-vars
  Line 15:8:   'List' is defined but never used                   no-unused-vars
  Line 16:8:   'ListItem' is defined but never used               no-unused-vars
  Line 17:8:   'ListItemText' is defined but never used           no-unused-vars
  Line 18:8:   'Link' is defined but never used                   no-unused-vars
  Line 19:10:  'FontAwesomeIcon' is defined but never used        no-unused-vars
  Line 20:10:  'faChevronCircleRight' is defined but never used   no-unused-vars
  Line 20:32:  'faInfoCircle' is defined but never used           no-unused-vars
  Line 29:10:  'expanded' is assigned a value but never used      no-unused-vars
  Line 31:9:   'handleChange' is assigned a value but never used  no-unused-vars

src\components\RandomlyRead\Exercises\Exercise2\Introduction.js
  Line 3:8:    'List' is defined but never used                  no-unused-vars
  Line 4:8:    'ListItem' is defined but never used              no-unused-vars
  Line 5:8:    'ListItemText' is defined but never used          no-unused-vars
  Line 8:8:    'Link' is defined but never used                  no-unused-vars
  Line 9:10:   'styled' is defined but never used                no-unused-vars
  Line 11:10:  'FontAwesomeIcon' is defined but never used       no-unused-vars
  Line 12:10:  'faChevronCircleRight' is defined but never used  no-unused-vars
  Line 12:32:  'faInfoCircle' is defined but never used          no-unused-vars
  Line 21:13:  'classes' is assigned a value but never used      no-unused-vars

src\components\RandomlyRead\Exercises\Exercise2\Techniques.js
  Line 2:10:   'makeStyles' is defined but never used             no-unused-vars
  Line 3:10:   'styled' is defined but never used                 no-unused-vars
  Line 5:8:    'Typography' is defined but never used             no-unused-vars
  Line 9:8:    'Accordion' is defined but never used              no-unused-vars
  Line 10:8:   'AccordionSummary' is defined but never used       no-unused-vars
  Line 11:8:   'AccordionDetails' is defined but never used       no-unused-vars
  Line 12:8:   'ExpandMoreIcon' is defined but never used         no-unused-vars
  Line 16:8:   'List' is defined but never used                   no-unused-vars
  Line 17:8:   'ListItem' is defined but never used               no-unused-vars
  Line 18:8:   'ListItemText' is defined but never used           no-unused-vars
  Line 19:8:   'Link' is defined but never used                   no-unused-vars
  Line 20:10:  'FontAwesomeIcon' is defined but never used        no-unused-vars
  Line 21:10:  'faChevronCircleRight' is defined but never used   no-unused-vars
  Line 21:32:  'faInfoCircle' is defined but never used           no-unused-vars
  Line 32:10:  'expanded' is assigned a value but never used      no-unused-vars
  Line 34:9:   'handleChange' is assigned a value but never used  no-unused-vars

src\components\RandomlyRead\Exercises\Exercise3\Introduction.js
  Line 3:8:    'List' is defined but never used                  no-unused-vars
  Line 4:8:    'ListItem' is defined but never used              no-unused-vars
  Line 5:8:    'ListItemText' is defined but never used          no-unused-vars
  Line 8:8:    'Link' is defined but never used                  no-unused-vars
  Line 9:10:   'styled' is defined but never used                no-unused-vars
  Line 11:10:  'FontAwesomeIcon' is defined but never used       no-unused-vars
  Line 12:10:  'faChevronCircleRight' is defined but never used  no-unused-vars
  Line 12:32:  'faInfoCircle' is defined but never used          no-unused-vars
  Line 21:13:  'classes' is assigned a value but never used      no-unused-vars

src\components\RandomlyRead\Exercises\Exercise3\Techniques.js
  Line 2:10:   'styled' is defined but never used                 no-unused-vars
  Line 4:8:    'Typography' is defined but never used             no-unused-vars
  Line 8:8:    'Accordion' is defined but never used              no-unused-vars
  Line 9:8:    'AccordionSummary' is defined but never used       no-unused-vars
  Line 10:8:   'AccordionDetails' is defined but never used       no-unused-vars
  Line 11:8:   'ExpandMoreIcon' is defined but never used         no-unused-vars
  Line 15:8:   'List' is defined but never used                   no-unused-vars
  Line 16:8:   'ListItem' is defined but never used               no-unused-vars
  Line 17:8:   'ListItemText' is defined but never used           no-unused-vars
  Line 18:8:   'Link' is defined but never used                   no-unused-vars
  Line 19:10:  'FontAwesomeIcon' is defined but never used        no-unused-vars
  Line 20:10:  'faChevronCircleRight' is defined but never used   no-unused-vars
  Line 20:32:  'faInfoCircle' is defined but never used           no-unused-vars
  Line 29:10:  'expanded' is assigned a value but never used      no-unused-vars
  Line 31:9:   'handleChange' is assigned a value but never used  no-unused-vars

src\components\RandomlyRead\Exercises\SplashPage\Introduction.js
  Line 8:8:   'Link' is defined but never used    no-unused-vars
  Line 9:10:  'styled' is defined but never used  no-unused-vars

src\components\RandomlyRead\Exercises\SplashPage\Techniques.js
  Line 17:10:  'faChevronCircleRight' is defined but never used  no-unused-vars
  Line 81:9:   'theme' is assigned a value but never used        no-unused-vars

src\components\RandomlyRead\Footer\Component.js
  Line 2:8:    'ListItem' is defined but never used                  no-unused-vars
  Line 3:8:    'ListItemText' is defined but never used              no-unused-vars
  Line 5:10:   'styled' is defined but never used                    no-unused-vars
  Line 7:8:    'Grid' is defined but never used                      no-unused-vars
  Line 10:8:   'ListItemIcon' is defined but never used              no-unused-vars
  Line 11:8:   'List' is defined but never used                      no-unused-vars
  Line 12:8:   'CheckboxOutlineBlankIcon' is defined but never used  no-unused-vars
  Line 13:8:   'CheckBoxIcon' is defined but never used              no-unused-vars
  Line 14:10:  'useTheme' is defined but never used                  no-unused-vars
  Line 15:8:   'useMediaQuery' is defined but never used             no-unused-vars
  Line 16:8:   'PropTypes' is defined but never used                 no-unused-vars
  Line 18:10:  'styles' is defined but never used                    no-unused-vars
  Line 20:8:   'BuyMeACoffee' is defined but never used              no-unused-vars
  Line 29:7:   Duplicate key 'width'                                 no-dupe-keys

src\components\RandomlyRead\Home.js
  Line 3:10:    'styled' is defined but never used               no-unused-vars
  Line 17:8:    'Button' is defined but never used               no-unused-vars
  Line 35:32:   'faInfoCircle' is defined but never used         no-unused-vars
  Line 37:8:    'BuyMeACoffee' is defined but never used         no-unused-vars
  Line 90:107:  'auto' is assigned a value but never used        no-unused-vars
  Line 93:9:    'isXs' is assigned a value but never used        no-unused-vars
  Line 106:9:   'root' is assigned a value but never used        no-unused-vars
  Line 106:43:  'pathtitle' is assigned a value but never used   no-unused-vars
  Line 142:33:  'leveltitle' is assigned a value but never used  no-unused-vars
  Line 142:45:  'pathtitle' is assigned a value but never used   no-unused-vars
  Line 166:33:  'leveltitle' is assigned a value but never used  no-unused-vars
  Line 166:45:  'pathtitle' is assigned a value but never used   no-unused-vars
  Line 200:12:  'handleClick' is defined but never used          no-unused-vars

src\components\RandomlyRead\RoutineDescription.js
  Line 3:10:    'styled' is defined but never used               no-unused-vars
  Line 143:87:  'width' is assigned a value but never used       no-unused-vars
  Line 161:11:  'handleOpen' is assigned a value but never used  no-unused-vars
  Line 273:9:   'isXs' is assigned a value but never used        no-unused-vars

src\components\RandomlyRead\RoutineSelect.js
  Line 7:10:   'styled' is defined but never used         no-unused-vars
  Line 8:8:    'ListSubheader' is defined but never used  no-unused-vars
  Line 156:5:  Duplicate name 'componentDidMount'         no-dupe-class-members

src\components\RandomlyRead\SplashHome.js
  Line 5:10:   'styled' is defined but never used                                  no-unused-vars
  Line 11:8:   'Modal' is defined but never used                                   no-unused-vars
  Line 21:8:   'Hidden' is defined but never used                                  no-unused-vars
  Line 25:8:   'RoutineDescriptionContainer' is defined but never used             no-unused-vars
  Line 26:8:   'WordCardContainer' is defined but never used                       no-unused-vars
  Line 27:8:   'ExerciseHistoryContainer' is defined but never used                no-unused-vars
  Line 28:8:   'ProgressIndicator' is defined but never used                       no-unused-vars
  Line 31:8:   'WordHistoryList' is defined but never used                         no-unused-vars
  Line 33:8:   'List' is defined but never used                                    no-unused-vars
  Line 34:8:   'ListItem' is defined but never used                                no-unused-vars
  Line 35:8:   'ListItemText' is defined but never used                            no-unused-vars
  Line 38:10:  'FontAwesomeIcon' is defined but never used                         no-unused-vars
  Line 39:10:  'faCheckCircle' is defined but never used                           no-unused-vars
  Line 41:8:   'BuyMeACoffee' is defined but never used                            no-unused-vars
  Line 42:8:   'SiteFooter' is defined but never used                              no-unused-vars
  Line 95:11:  'TimerContainer' is assigned a value but never used                 no-unused-vars
  Line 95:27:  'RoutineSelectContainer' is assigned a value but never used         no-unused-vars
  Line 95:51:  'ExerciseIntroduction' is assigned a value but never used           no-unused-vars
  Line 95:73:  'ExerciseTechniques' is assigned a value but never used             no-unused-vars
  Line 95:93:  'ApolloClient' is assigned a value but never used                   no-unused-vars
  Line 97:10:  'open_1' is assigned a value but never used                         no-unused-vars
  Line 98:10:  'open_2' is assigned a value but never used                         no-unused-vars
  Line 101:9:  'isXs' is assigned a value but never used                           no-unused-vars
  Line 179:5:  'exerciseHistoryContainerWidth' is assigned a value but never used  no-unused-vars
  Line 180:5:  'timerContainerWidth' is assigned a value but never used            no-unused-vars
  Line 183:9:  'handleOpen_1' is assigned a value but never used                   no-unused-vars
  Line 187:9:  'handleClose_1' is assigned a value but never used                  no-unused-vars
  Line 191:9:  'handleOpen_2' is assigned a value but never used                   no-unused-vars
  Line 195:9:  'handleClose_2' is assigned a value but never used                  no-unused-vars

src\components\RandomlyRead\SplashTimer.js
  Line 8:10:   'styled' is defined but never used         no-unused-vars
  Line 11:10:  'useTheme' is defined but never used       no-unused-vars
  Line 12:8:   'useMediaQuery' is defined but never used  no-unused-vars
  Line 13:8:   'PropTypes' is defined but never used      no-unused-vars

src\components\RandomlyRead\Splash\Component.js
  Line 9:10:  'styled' is defined but never used     no-unused-vars
  Line 11:8:  'PropTypes' is defined but never used  no-unused-vars

src\components\RandomlyRead\Techniques\Technique1\Component.js
  Line 5:8:    'Link' is defined but never used                             no-unused-vars
  Line 10:10:  'styled' is defined but never used                           no-unused-vars
  Line 20:7:   'style' is assigned a value but never used                   no-unused-vars
  Line 84:11:  'handleOpenPhonate' is assigned a value but never used       no-unused-vars
  Line 87:11:  'handleOpenArticulation' is assigned a value but never used  no-unused-vars
  Line 90:11:  'handleOpenDiaphragm' is assigned a value but never used     no-unused-vars
  Line 93:11:  'handleOpenPelvicFloor' is assigned a value but never used   no-unused-vars

src\components\RandomlyRead\Techniques\Technique2\Component.js
  Line 5:8:    'Link' is defined but never used                             no-unused-vars
  Line 10:10:  'styled' is defined but never used                           no-unused-vars
  Line 71:11:  'handleOpenArticulation' is assigned a value but never used  no-unused-vars
  Line 74:11:  'handleOpenDiaphragm' is assigned a value but never used     no-unused-vars
  Line 77:11:  'handleOpenPelvicFloor' is assigned a value but never used   no-unused-vars
  Line 80:11:  'handleOpenTransfer' is assigned a value but never used      no-unused-vars
  Line 81:11:  'handleCloseTransfer' is assigned a value but never used     no-unused-vars

src\components\RandomlyRead\Techniques\Technique3\Component.js
  Line 5:8:    'Link' is defined but never used                             no-unused-vars
  Line 10:10:  'styled' is defined but never used                           no-unused-vars
  Line 71:11:  'handleOpenArticulation' is assigned a value but never used  no-unused-vars
  Line 74:11:  'handleOpenDiaphragm' is assigned a value but never used     no-unused-vars
  Line 77:11:  'handleOpenPelvicFloor' is assigned a value but never used   no-unused-vars
  Line 80:11:  'handleOpenTransfer' is assigned a value but never used      no-unused-vars

src\components\RandomlyRead\Techniques\Technique4\Component.js
  Line 4:8:    'Box' is defined but never used     no-unused-vars
  Line 5:8:    'Link' is defined but never used    no-unused-vars
  Line 10:10:  'styled' is defined but never used  no-unused-vars

src\components\RandomlyRead\Timer.js
  Line 2:8:     'ReactDOM' is defined but never used       no-unused-vars
  Line 9:10:    'styled' is defined but never used         no-unused-vars
  Line 17:8:    'FormLabel' is defined but never used      no-unused-vars
  Line 117:9:   'elms' is already defined                  no-redeclare
  Line 118:13:  'i' is already defined                     no-redeclare
  Line 834:9:   'isXs' is assigned a value but never used  no-unused-vars

src\components\RandomlyRead\WordCard.js
  Line 4:10:   'styled' is defined but never used         no-unused-vars
  Line 83:31:  Expected '===' and instead saw '=='        eqeqeq
  Line 399:9:  'isXs' is assigned a value but never used  no-unused-vars

src\components\RoutineBuilder\RoutineBuilder.js
  Line 2:10:   'styled' is defined but never used  no-unused-vars
  Line 239:3:  Duplicate name 'componentDidMount'  no-dupe-class-members

src\components\RoutineBuilder\elements\ConsonantCheckboxes.js
  Line 2:10:  'styled' is defined but never used  no-unused-vars

src\components\RoutineBuilder\elements\DurationSlider.js
  Line 3:10:  'styled' is defined but never used  no-unused-vars

src\components\RoutineBuilder\elements\NewRoutineButton.js
  Line 41:7:  'StyledTextField' is assigned a value but never used  no-unused-vars

src\components\RoutineBuilder\elements\RepetitionSlider.js
  Line 3:10:  'styled' is defined but never used  no-unused-vars

src\components\RoutineBuilder\elements\RoutinePreview.js
  Line 2:10:  'styled' is defined but never used  no-unused-vars

src\components\RoutineBuilder\elements\UpdateButton.js
  Line 3:10:  'styled' is defined but never used  no-unused-vars

src\components\RoutineBuilder\elements\VowelSelect.js
  Line 11:7:  'StyledRoot' is assigned a value but never used         no-unused-vars
  Line 16:7:  'StyledFormControl' is assigned a value but never used  no-unused-vars
  Line 22:7:  'StyledChips' is assigned a value but never used        no-unused-vars
  Line 27:7:  'StyledChip' is assigned a value but never used         no-unused-vars

src\components\UserProfile\Component.js
  Line 3:10:  'styled' is defined but never used         no-unused-vars
  Line 9:10:  'useTheme' is defined but never used       no-unused-vars
  Line 10:8:  'useMediaQuery' is defined but never used  no-unused-vars
  Line 11:8:  'PropTypes' is defined but never used      no-unused-vars

src\components\ViewHistory\Component.js
  Line 1:17:  'useEffect' is defined but never used  no-unused-vars
  Line 2:10:  'styled' is defined but never used     no-unused-vars

src\components\WordHistoryList\Component.js
  Line 3:10:  'useTheme' is defined but never used       no-unused-vars
  Line 4:8:   'useMediaQuery' is defined but never used  no-unused-vars
  Line 5:8:   'PropTypes' is defined but never used      no-unused-vars
  Line 8:10:  'styled' is defined but never used         no-unused-vars

src\components\WordHistory\index.js
  Line 3:8:   'Grid' is defined but never used              no-unused-vars
  Line 6:8:   'PropTypes' is defined but never used         no-unused-vars
  Line 8:10:  'styled' is defined but never used            no-unused-vars
  Line 13:9:  'classes' is assigned a value but never used  no-unused-vars
  Line 16:9:  'isXs' is assigned a value but never used     no-unused-vars
  Line 57:1:  Block is redundant                            no-lone-blocks

src\middleware\auth.js
  Line 5:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\middleware\error.js
  Line 26:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\middleware\modeSelect.js
  Line 3:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\middleware\theme.js
  Line 3:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\administration.js
  Line 54:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\auth.js
  Line 20:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\error.js
  Line 14:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\exerciseHistory.js
  Line 31:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\formData.js
  Line 36:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\interaction.js
  Line 20:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\modeSelect.js
  Line 6:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\posts.js
  Line 35:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\routineBuilder.js
  Line 72:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\routineSelect.js
  Line 22:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\theme.js
  Line 6:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\viewHistory.js
  Line 18:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export

src\reducers\word.js
  Line 31:1:  Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export