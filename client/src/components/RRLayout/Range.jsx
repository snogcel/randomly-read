import React from 'react';
import Typography from '@mui/material/Typography';

class Range extends React.Component {
  constructor(props) {
    super(props);
    this.updateRange = this.updateRange.bind(this);
  }

  updateRange(e) {
    this.props.updateRange(e.target.value);
  }

  render() {
    // console.log(this.props);
    const { range } = this.props;
    const { theme } = this.props;
    return (
      <div>
        <input id="range" type="range"
               value={range}
               min="3"
               max="15"
               step="1"
               onChange={this.updateRange}
        />
        <div id="output">
        <Typography style={{color: theme === true ? 'white' : 'black' , paddingLeft: 5}}>{range} Seconds</Typography>
        </div>
      </div>
    )
  }
}

export default Range;
