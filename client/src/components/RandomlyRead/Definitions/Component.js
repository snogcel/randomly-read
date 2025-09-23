import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { styles } from '../../../exerciseThemeHandler';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

class Definitions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    switch(this.props.word){
      case 'FluencyShaping': return <React.Fragment>
        <ListItem alignItems="flex-start" disableGutters>
          <ListItemText
            primary={
              <React.Fragment>
                <FontAwesomeIcon icon={faInfoCircle} size="2x" pull="left" className={classes.definitionIcon} />
                <Typography variant="body1" component="span" className={classes.definitionHeading} color="textPrimary">
                  Fluency Shaping
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography variant="body1" component="span" color="textSecondary" className={classes.definitionSecondaryText}>
                  The main focus of fluency shaping intervention is to increase fluent speech through teaching one or more of the following: easy onsets, loose contacts, changing breathing, prolonging sounds or words, pausing, as well as other methods that reduce speaking rate.
                  <br /><br />
                  Learn More:
                  <Link href="https://www.mnsu.edu/comdis/isad7/papers/ramig7.html" className={classes.textLink} color="textSecondary" variant="body1" target="_blank">
                    Fluency Shaping Intervention: Helpful, But Why It Is Important to Know More
                  </Link>
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </React.Fragment>;
      case 'Phonate': return <React.Fragment>
        <ListItem alignItems="flex-start" disableGutters>
          <ListItemText
            primary={
              <React.Fragment>
                <FontAwesomeIcon icon={faInfoCircle} size="2x" pull="left" className={classes.definitionIcon} />
                <Typography variant="body1" component="span" className={classes.definitionHeading} color="textPrimary">
                  Phonation
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography variant="body1" component="span" color="textSecondary" className={classes.definitionSecondaryText}>
                  Phonation is the act of producing sound through the vibration of the vocal folds in the larynx. Phonation can be viewed as a sort of "droning" or "humming" sound and is used to drive the production of the vowel sounds which allows for the production of speech.
                  <br /><br />
                  Learn More:
                  <Link href="https://www.valsalva.org/phonation-blocks.htm" className={classes.textLink} color="textSecondary" variant="body1" target="_blank">
                    Phonation and Valsalva-Stuttering Blocks
                  </Link>
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </React.Fragment>;
      case 'Diaphragm': return <React.Fragment>
        <ListItem alignItems="flex-start" disableGutters>
          <ListItemText
            primary={
              <React.Fragment>
                <FontAwesomeIcon icon={faInfoCircle} size="2x" pull="left" className={classes.definitionIcon} />
                <Typography variant="body1" component="span" className={classes.definitionHeading} color="textPrimary">
                  Diaphragmatic Breathing
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography variant="body1" component="span" color="textSecondary" className={classes.definitionSecondaryText}>
                  This technique is commonly used in meditation and focuses on driving the breath using your Diaphragm rather than your chest. The most basic type of diaphragmatic breathing is done by inhaling through your nose and breathing out through your mouth.
                  <br /><br />
                  Learn More:
                  <Link href="https://www.healthline.com/health/diaphragmatic-breathing" className={classes.textLink} color="textSecondary" variant="body1" target="_blank">
                    What Is Diaphragmatic Breathing?
                  </Link>
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </React.Fragment>;
      case 'PelvicFloor': return <React.Fragment>
        <ListItem alignItems="flex-start" disableGutters>
          <ListItemText
            primary={
              <React.Fragment>
                <FontAwesomeIcon icon={faInfoCircle} size="2x" pull="left" className={classes.definitionIcon} />
                <Typography variant="body1" component="span" className={classes.definitionHeading} color="textPrimary">
                  Pelvic Floor
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography variant="body1" component="span" color="textSecondary" className={classes.definitionSecondaryText}>
                  The Pelvic Floor is a group of muscles located in the pelvic region which provide support for internal organs such as the bladder, rectum and uterus/prostate. In the context of this program, the relaxation of these muscles allow the speaker to short-circuit an Effort Closure.
                  <br /><br />
                  Learn More:
                  <Link href="https://drtarasalay.com/what-is-the-pelvic-floor/" className={classes.textLink} color="textSecondary" variant="body1" target="_blank">
                    What is the Pelvic Floor?
                  </Link> and
                  <Link href="https://www.wikihow.com/Relax-Your-Pelvic-Floor" className={classes.textLink} color="textSecondary" variant="body1" target="_blank">
                    How to Relax Your Pelvic Floor
                  </Link>
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </React.Fragment>;
      case 'Articulation': return <React.Fragment>
        <ListItem alignItems="flex-start" disableGutters>
          <ListItemText
            primary={
              <React.Fragment>
                <FontAwesomeIcon icon={faInfoCircle} size="2x" pull="left" className={classes.definitionIcon} />
                <Typography variant="body1" component="span" className={classes.definitionHeading} color="textPrimary">
                  Articulation
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography variant="body1" component="span" color="textSecondary" className={classes.definitionSecondaryText}>
                  Articulation is the act of speaking words through the movement of speech organs including lips, teeth and tongue. In other words, it is the process which allows us to produce words by shaping the "humming" sound produced through the act of Phonation.
                  <br /><br />
                  Learn More:
                  <Link href="https://www.differencebetween.com/difference-between-articulation-and-vs-pronunciation/" className={classes.textLink} color="textSecondary" variant="body1" target="_blank">
                    Difference Between Articulation and Pronunciation
                  </Link>
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </React.Fragment>;
      case 'Larynx': return <React.Fragment>
        <ListItem alignItems="flex-start" disableGutters>
          <ListItemText
            primary={
              <React.Fragment>
                <FontAwesomeIcon icon={faInfoCircle} size="2x" pull="left" className={classes.definitionIcon} />
                <Typography variant="body1" component="span" className={classes.definitionHeading} color="textPrimary">
                  Larynx
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography variant="body1" component="span" color="textSecondary" className={classes.definitionSecondaryText}>
                  The Layrnx or "voice box" is a fundamental component in speech production and is located in the throat. When air is pushed through the Layrnx it causes vocal folds to vibrate which in turn generates sound.
                  <br /><br />
                  Learn More:
                  <Link href="https://www.nidcd.nih.gov/health/what-is-voice-speech-language" className={classes.textLink} color="textSecondary" variant="body1" target="_blank">
                    What Is Voice? What Is Speech? What Is Language?
                  </Link> and
                  <Link href="https://www.atosmedical.us/wp-content/uploads/2018/01/mc0824_caretip_09_artificial_larynx_basic_training_201801web-1.pdf" className={classes.textLink} color="textSecondary" variant="body1" target="_blank">
                    Artificial Larynx Basic Training
                  </Link>
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </React.Fragment>;
      case 'Transfer': return <React.Fragment>
        <ListItem alignItems="flex-start" disableGutters>
          <ListItemText
            primary={
              <React.Fragment>
                <FontAwesomeIcon icon={faInfoCircle} size="2x" pull="left" className={classes.definitionIcon} />
                <Typography variant="body1" component="span" className={classes.definitionHeading} color="textPrimary">
                  Transfer
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography variant="body1" component="span" color="textSecondary" className={classes.definitionSecondaryText}>
                  Transfer is the process of routing the "robotic" speech generated in the nasal passages into normal sounding speech which is centered in the mouth. Transfer can be verified by gently placing an index finger against the nose to see if you feel vibration (you should not feel any at completion of Transfer).
                  <br /><br />
                  Learn More:
                  <Link href="https://thevoicelady.com/nasal-voice/" className={classes.textLink} color="textSecondary" variant="body1" target="_blank">
                    Take This Test to See If Your Voice Is Nasal or Not
                  </Link>
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </React.Fragment>;
      case 'Resonance': return <React.Fragment>

      </React.Fragment>;
      case 'FluencyShaping': return <React.Fragment>

      </React.Fragment>;
      case 'EffortClosure': return <React.Fragment>

      </React.Fragment>;
      default: return null;
    }
  }
}

const DefinitionsWrapped = withStyles(styles)(Definitions);

export default DefinitionsWrapped;
