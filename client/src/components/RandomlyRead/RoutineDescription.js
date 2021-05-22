import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../exerciseThemeHandler';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {stateFromHTML} from "draft-js-import-html";
import {EditorState} from "draft-js";

class RoutineDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    }
  }

  componentDidUpdate(prevProps) {

    if (prevProps.description !== this.props.description) {

      let description = this.props.description;
      let trimmed = description.replace(/^"|"$/g, '');

      this.setState({text: trimmed });
    }

  }

  componentWillMount() {

    if (typeof this.props.description !== 'undefined') {
    	let description = this.props.description;
	    let trimmed = description.replace(/^"|"$/g, '');

	    this.setState({text: trimmed });
    }

  }

  renderDescription(props) {
    const { currentExercise, classes, description } = props;

    const formattedDuration = this.formatDuration(currentExercise);

    return (
      <React.Fragment key={'description'}>

        <Grid container>
          <Grid item xs={10} sm={12} md={11}>

            <Paper className={classes.exerciseDetails} elevation={0}>

              <Typography variant="h5" component="h2" className={classes.heading}>{this.props.name}</Typography>

              <Typography gutterBottom variant="body2" color="textSecondary" component="p">{formattedDuration}</Typography>

              <br />

              {renderHTML(this.state.text)}

            </Paper>

          </Grid>
        </Grid>

        <br />

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

const RoutineDescriptionWrapped = withStyles(styles)(RoutineDescription);

export default RoutineDescriptionWrapped;
