import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../exerciseThemeHandler';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import withWidth from '@material-ui/core/withWidth';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';

class RoutineDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      open: false
    };

    this.canIncrementRoutine = this.canIncrementRoutine.bind(this);
    this.incrementRoutine = this.incrementRoutine.bind(this);

    this.canDecrementRoutine = this.canDecrementRoutine.bind(this);
    this.decrementRoutine = this.decrementRoutine.bind(this);
  }

  componentDidUpdate(prevProps) {

    if (prevProps.description !== this.props.description) {

      let description = this.props.description;
      let trimmed = description.replace(/^"|"$/g, '');

      this.setState({text: trimmed });
    }

  }

  UNSAFE_componentWillMount() {

    if (typeof this.props.description !== 'undefined') {
    	let description = this.props.description;
	    let trimmed = description.replace(/^"|"$/g, '');

	    this.setState({text: trimmed });
    }

  }

  incrementRoutine(e) {
    const { routine, availableRoutines } = this.props;
    
    this.props.setExercisePause(true);
    this.props.updateTime(0);

    let position = 0;

    for (let i = 0; i < availableRoutines.length; i++) {
      if (routine.id === availableRoutines[i].id) position = i;
    }

    let newRoutine = availableRoutines[position+1].attributes;

    this.props.updateId(newRoutine.id);
    this.props.updateName(newRoutine.name);
    this.props.updateDescription(newRoutine.description);
    this.props.updateActiveRoutine(newRoutine);
    this.props.clearQueryResults();
    this.props.updateCompleted(0);
  }

  canIncrementRoutine() {

    const { routine, availableRoutines } = this.props;

    let trimmedRoutines = [];

    for (let i = 0; i < availableRoutines.length; i++) {
      if (typeof(availableRoutines[i].attributes.upvoted) === "undefined") trimmedRoutines.push(availableRoutines[i]);
    }

    let position = 0;
    let length = trimmedRoutines.length - 1;

    for (let i = 0; i < trimmedRoutines.length; i++) {
      if (routine.id === trimmedRoutines[i].id) position = i;
    }

    return (position < length);

  }

  canDecrementRoutine() {

    const { routine, availableRoutines } = this.props;

    let trimmedRoutines = [];

    for (let i = 0; i < availableRoutines.length; i++) {
      if (typeof(availableRoutines[i].id) !== "undefined") trimmedRoutines.push(availableRoutines[i]);
    }

    let position = 0;
    let length = trimmedRoutines.length - 1;

    for (let i = 0; i < trimmedRoutines.length; i++) {
      if (routine.id === trimmedRoutines[i].id) position = i;
    }

    return (position <= length && position > 0);

  }

  decrementRoutine() {
    const { routine, availableRoutines } = this.props;

    let position = 0;

    for (let i = 0; i < availableRoutines.length; i++) {
      if (routine.id === availableRoutines[i].id) position = i;
    }

    let newRoutine = availableRoutines[position-1].attributes;

    this.props.updateId(newRoutine.id);
    this.props.updateName(newRoutine.name);
    this.props.updateDescription(newRoutine.description);
    this.props.updateActiveRoutine(newRoutine);

  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  renderDescription(props) {
    const { isCompleted, inProgress, currentExercise, currentExerciseNumber, classes, width } = props;

    const formattedDuration = this.formatDuration(currentExercise);

    let canIncrement = this.canIncrementRoutine();

    /*
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    */

    /* removed help button 

    { (inProgress) && <Button className={classes.incrementButton} variant="outlined" color="primary" onClick={handleOpen}>Help</Button> }

    **/

    const handleOpen = () => this.handleOpen();
    const handleClose = () => this.handleClose();

    return (
      <React.Fragment key={'description'}>

        <Grid container>
          <Grid item xs={12} sm={12} md={12}>

            <Paper className={classes.exerciseDetails} elevation={0}>

              <Grid container>
                <Grid item>

                  <Typography variant="h5" component="h2" className={classes.routineDescriptionHeading}>{this.props.name}</Typography>

                  <Typography variant="body1" component="span" color="textSecondary" className={classes.definitionSecondaryText}>
                    {formattedDuration}
                  </Typography>

                </Grid>
                <Grid item xs>

                  <Grid container direction="row-reverse">
                    <Grid item>                      

                      <Modal
                        open={this.state.open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box className={classes.descriptionTextModal}>
                          <Typography id="modal-modal-title" variant="h6" component="h2" className={classes.descriptionTextHeader}>
                            {this.props.name}
                          </Typography>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {renderHTML(this.state.text)}
                          </Typography>
                        </Box>
                      </Modal>

                      { (isCompleted && canIncrement) && <Button className={classes.incrementButton} variant="contained" color="primary" onClick={e => this.incrementRoutine(e)}>Go To Next Exercise</Button> }

                    </Grid>
                  </Grid>

                </Grid>
              </Grid>

              <br />

              { (!inProgress && (currentExerciseNumber === 0 || currentExerciseNumber === null)) && <><Box className={classes.descriptionTextContainer}>{renderHTML(this.state.text)}</Box></> }

            </Paper>

          </Grid>
        </Grid>

      </React.Fragment>
    )
  }

  formatDuration(currentExercise) {
    let formattedDuration;

    let duration = 0;

    for (let i = 0; i < currentExercise.length; i++) {

      if (currentExercise[i].isIntermission) {
        duration += currentExercise[i].rangeVal;
      } else {
        duration += (currentExercise[i].rangeVal * currentExercise[i].repetitions);
      }
    }

    let minutes = Math.floor(duration / 60);

    let seconds = duration - (minutes * 60);

    if (minutes === 0) {
      formattedDuration = "Duration: " + seconds + " seconds";
    } else if (minutes === 1) {
      formattedDuration = "Duration: " + minutes + " minute and " + seconds + " seconds";
    } else {
      formattedDuration = "Duration: " + minutes + " minutes and " + seconds + " seconds";
    }

    return formattedDuration;
  }

  render() {
    if (typeof(this.props.currentExercise) !== 'undefined' && this.props.currentExercise.length > 0) {
      return this.renderDescription(this.props);
    } else {
      return null;
    }
  }
}


RoutineDescription.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

const RoutineDescriptionWrapped = withStyles(styles)(RoutineDescription);

export default withWidth()(RoutineDescriptionWrapped);
