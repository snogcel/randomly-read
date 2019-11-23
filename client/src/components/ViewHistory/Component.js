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

const data = [
  {
    name: 'Mon', fullDate: 'Nov 4th, 2019', words: 240,
  },
  {
    name: 'Tues', fullDate: 'Nov 5th, 2019', words: 139,
  },
  {
    name: 'Wed', fullDate: 'Nov 6th, 2019', words: 0,
  },
  {
    name: 'Thurs', fullDate: 'Nov 7th, 2019', words: 398,
  },
  {
    name: 'Fri', fullDate: 'Nov 8th, 2019', words: 480,
  },
  {
    name: 'Sat', fullDate: 'Nov 9th, 2019', words: 300,
  },
  {
    name: 'Sun', fullDate: 'Nov 10th, 2019', words: 400,
  }
];

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

    console.log(dataSet);

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

  }
}

const ViewHistoryWrapped = withStyles(styles)(ViewHistory);

export default ViewHistoryWrapped;
