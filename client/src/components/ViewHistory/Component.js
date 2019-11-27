import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import { styles } from '../../themeHandler';
import StartDatePicker from './elements/StartDatePicker';
import EndDatePicker from './elements/EndDatePicker';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';

const CustomTooltip = props => {
  if (!props.active) {
    return null
  }

  const newPayload = [
    {
      value: props.payload[0].payload.fullDate,
    },
    ...props.payload,
  ];

  // we render the default, but with our overridden payload
  return <DefaultTooltipContent payload={newPayload} />;
};

class ViewHistory extends React.Component {
  constructor(props) {
    super(props);

    this.startDateHandler = this.startDateHandler.bind(this);
    this.endDateHandler = this.endDateHandler.bind(this);

  }

  loadHistory(userId, startDate, endDate) {
    this.props.fetchViewHistory(userId, startDate, endDate);
  };

  componentWillMount() {

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if (this.props.userId !== prevProps.userId) {
      if (this.props.userId && this.props.startDate && this.props.endDate) this.loadHistory(this.props.userId, this.props.startDate, this.props.endDate);
    }

  }

  startDateHandler(startDate) {
    this.props.updateStartDate(startDate);
  }

  endDateHandler(endDate) {
    this.props.updateEndDate(endDate);
  }

  render() {

    console.log(this.props);

    let dataSet = this.props.dataSet || [];

    let error = ""; // TODO - validate that startDate < endDate?

    return (
      <div>

        <StartDatePicker action={this.startDateHandler} startDate={this.props.startDate} error={error} />
        <EndDatePicker action={this.endDateHandler} endDate={this.props.endDate} error={error} />

        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={dataSet} margin={{top: 20, right: 20, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="1 1"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip content={<CustomTooltip />}/>
            <Bar dataKey="count" fill="#2f8eed" />
          </BarChart>
        </ResponsiveContainer>

      </div>
    );

  }
}

const ViewHistoryWrapped = withStyles(styles)(ViewHistory);

export default ViewHistoryWrapped;
