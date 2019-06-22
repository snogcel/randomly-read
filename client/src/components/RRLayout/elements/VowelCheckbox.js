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

    this.selected = (this.selectedVowel === this.name);

  }

  render() {

    return (
          <Button color={(this.selected) ? "primary" : "secondary"} centerRipple="true" onClick={() => this.props.action(this.props.value.name)}>
            {this.props.value.name}
          </Button>
    );
  }
}

export default VowelCheckbox;
