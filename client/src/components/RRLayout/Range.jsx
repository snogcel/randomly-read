import React from 'react';

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
    return (
      <div>
        <input id="range" type="range"
               value={range}
               min="3"
               max="15"
               step="1"
               onChange={this.updateRange}
        />
        <span id="output">{range} Seconds</span>
      </div>
    )
  }
}

export default Range;
