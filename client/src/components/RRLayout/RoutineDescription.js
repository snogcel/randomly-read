import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import { styled } from '@mui/material/styles';
import { styles } from '../../themeHandler';

class RoutineDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    }
  }

  componentDidMount() {
    if (typeof this.props.description !== 'undefined') {
      let description = this.props.description;
      let trimmed = description.replace(/^"|"$/g, '');

      this.setState({text: trimmed });
    }
  }

  componentDidUpdate(prevProps) {

    if (prevProps.description !== this.props.description) {

      let description = this.props.description;
      let trimmed = description.replace(/^"|"$/g, '');

      this.setState({text: trimmed });
    }

  }

  render() {

    return (
      <div className='routineDescriptionContainer'>
        {renderHTML(this.state.text)}
      </div>
    )

  }
}

const RoutineDescriptionWrapped = withStyles(styles)(RoutineDescription);

export default RoutineDescriptionWrapped;
