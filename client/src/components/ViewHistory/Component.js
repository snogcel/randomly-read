import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import { styles } from '../../themeHandler';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A', pv: 2400,
  },
  {
    name: 'Page B', pv: 1398,
  },
  {
    name: 'Page C', pv: 9800,
  },
  {
    name: 'Page D', pv: 3908,
  },
  {
    name: 'Page E', pv: 4800,
  },
  {
    name: 'Page F', pv: 3800,
  },
  {
    name: 'Page G', pv: 4300,
  },
  {
    name: 'Page A', pv: 2400,
  },
  {
    name: 'Page B', pv: 1398,
  },
  {
    name: 'Page C', pv: 9800,
  },
  {
    name: 'Page D', pv: 3908,
  },
  {
    name: 'Page E', pv: 4800,
  },
  {
    name: 'Page F', pv: 3800,
  },
  {
    name: 'Page G', pv: 4300,
  },
  {
    name: 'Page A', pv: 2400,
  },
  {
    name: 'Page B', pv: 1398,
  },
  {
    name: 'Page C', pv: 9800,
  },
  {
    name: 'Page D', pv: 3908,
  },
  {
    name: 'Page E', pv: 4800,
  },
  {
    name: 'Page F', pv: 3800,
  },
  {
    name: 'Page G', pv: 4300,
  },
  {
    name: 'Page A', pv: 2400,
  },
  {
    name: 'Page B', pv: 1398,
  },
  {
    name: 'Page C', pv: 9800,
  },
  {
    name: 'Page D', pv: 3908,
  },
  {
    name: 'Page E', pv: 4800,
  },
  {
    name: 'Page F', pv: 3800,
  },
  {
    name: 'Page G', pv: 4300,
  },
];

class ViewHistory extends React.Component {
  constructor(props) {
    super(props);

  }

  loadHistory = () => {
    /*
    const { username, category } = this.props;
    if (username) return this.props.fetchProfile(username);
    return this.props.fetchPosts(category);
    */
  };

  componentDidMount() {
    // this.loadHistory();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  render() {

    return (
      <div>

        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="pv" fill="#2f8eed" />
          </BarChart>
        </ResponsiveContainer>

      </div>
    );

  }
}

const ViewHistoryWrapped = withStyles(styles)(ViewHistory);

export default ViewHistoryWrapped;
