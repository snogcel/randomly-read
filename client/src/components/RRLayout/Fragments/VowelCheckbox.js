import React from 'react';
import { styles } from '../../../themeHandler';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class VowelCheckbox extends React.Component {

  constructor(props) {
    super(props);

    this.selected = false;

    this.name = null;
    this.selectedVowel = null;

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    this.name = JSON.stringify([this.props.value.name]);
    this.selectedVowel = JSON.stringify(this.props.value.selectedVowel);

    if (this.selectedVowel === this.name) {

      this.selected = true;

    } else {

      this.selected = false;

    }

  }

  render() {

    let color = "primary";

    if (this.selected) {
      color = "secondary";
    } else {
      color = "primary";
    }

    return (
      <React.Fragment>
        {
          <Button color={color} onClick={() => this.props.action(this.props.value.name)}>{this.props.value.name}</Button>
        }
      </React.Fragment>
    );
  }
}

export default VowelCheckbox;
