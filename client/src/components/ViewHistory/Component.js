import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import { styles } from '../../themeHandler';

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
  return <DefaultTooltipContent {...props} payload={newPayload} />;
};

class ViewHistory extends React.Component {
  constructor(props) {
    super(props);

  }

  loadHistory(userId) {
    this.props.fetchViewHistory(userId);
  };

  componentWillMount() {

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if (this.props.userId !== prevProps.userId) {
      if (this.props.userId) this.loadHistory(this.props.userId);
    }

  }

  render() {

    let dataSet = this.props.dataSet || [];

    if (dataSet.length > 0) {

      return (
        <div>

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

    } else { return null }

  }
}

const ViewHistoryWrapped = withStyles(styles)(ViewHistory);

export default ViewHistoryWrapped;
