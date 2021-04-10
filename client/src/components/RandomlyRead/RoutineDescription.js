import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../exerciseThemeHandler';
import { Typography } from '@material-ui/core';
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

  render() {

    return (
      <div className='exerciseDescriptionContainer'>
        {renderHTML(this.state.text)}
      </div>
    )

  }
}

const RoutineDescriptionWrapped = withStyles(styles)(RoutineDescription);

export default RoutineDescriptionWrapped;
