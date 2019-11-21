import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import { styles } from '../../themeHandler';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';

const CustomTooltip = props => {
  // we don't need to check payload[0] as there's a better prop for this purpose
  if (!props.active) {
    // I think returning null works based on this: http://recharts.org/en-US/examples/CustomContentOfTooltip
    return null
  }
  // mutating props directly is against react's conventions
  // so we create a new payload with the name and value fields set to what we want
  const newPayload = [
    {
      // all your data which created the tooltip is located in the .payload property
      value: props.payload[0].payload.fullDate,
      // you can also add "unit" here if you need it
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
  },
  {
    name: 'Mon', fullDate: 'Nov 11th, 2019', words: 200,
  },
  {
    name: 'Tues', fullDate: 'Nov 12th, 2019', words: 198,
  },
  {
    name: 'Wed', fullDate: 'Nov 13th, 2019', words: 0,
  },
  {
    name: 'Thurs', fullDate: 'Nov 14th, 2019', words: 390,
  },
  {
    name: 'Fri', fullDate: 'Nov 15th, 2019', words: 400,
  },
  {
    name: 'Sat', fullDate: 'Nov 16th, 2019', words: 380,
  },
  {
    name: 'Sun', fullDate: 'Nov 17th, 2019', words: 430,
  },
  {
    name: 'Mon', fullDate: 'Nov 18th, 2019', words: 240,
  },
  {
    name: 'Tues', fullDate: 'Nov 19th, 2019', words: 198,
  },
  {
    name: 'Wed', fullDate: 'Nov 20th, 2019', words: 0,
  },
  {
    name: 'Thurs', fullDate: 'Nov 21st, 2019', words: 308,
  },
  {
    name: 'Fri', fullDate: 'Nov 22nd, 2019', words: 480,
  },
  {
    name: 'Sat', fullDate: 'Nov 23rd, 2019', words: 380,
  },
  {
    name: 'Sun', fullDate: 'Nov 24th, 2019', words: 430,
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
            <Tooltip content={<CustomTooltip />}/>
            <Bar dataKey="words" fill="#2f8eed" />
          </BarChart>
        </ResponsiveContainer>

      </div>
    );

  }
}

const ViewHistoryWrapped = withStyles(styles)(ViewHistory);

export default ViewHistoryWrapped;
