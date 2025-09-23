import React, { useEffect } from 'react';
import { styled } from "@mui/material/styles";
import { styles } from '../../themeHandler';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import StartDatePicker from './elements/StartDatePicker';
import EndDatePicker from './elements/EndDatePicker';
import WordViewFilter from './elements/WordViewFilter';

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';
import PostListContainer from '../PostList/Container';

const CustomTooltip = props => {
  if (!props.active) {
    return null
  }

  if (!props.payload) {
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

const options = [
  { "id": "all", name: "Viewed Words" },
  { "id": "upvoted", name: "All Upvoted Words" },
  { "id": "downvoted", name: "All Downvoted Words" }
];

class ViewHistory extends React.Component {
  constructor(props) {
    super(props);

    this.startDateHandler = this.startDateHandler.bind(this);
    this.endDateHandler = this.endDateHandler.bind(this);
    this.filterHandler = this.filterHandler.bind(this);

  }

  loadHistory(userId, startDate, endDate) {
    this.props.fetchViewHistory(userId, startDate, endDate);
  };

  componentDidMount() {
    if (this.props.userId && this.props.startDate && this.props.endDate) {
      this.loadHistory(this.props.userId, this.props.startDate, this.props.endDate);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if (this.props.userId !== prevProps.userId || this.props.startDate !== prevProps.startDate || this.props.endDate !== prevProps.endDate) {

      if (this.props.userId && this.props.startDate && this.props.endDate) this.loadHistory(this.props.userId, this.props.startDate, this.props.endDate);

    }

  }

  startDateHandler(startDate) {
    if (this.props.userId && startDate && this.props.endDate) {
      this.loadHistory(this.props.userId, startDate, this.props.endDate)
    } else {
      this.props.updateStartDate(startDate);
    }
  }

  endDateHandler(endDate) {
    if (this.props.userId && this.props.startDate && endDate) {
      this.loadHistory(this.props.userId, this.props.startDate, endDate)
    } else {
      this.props.updateEndDate(endDate);
    }
  }

  filterHandler(filter) {
    this.props.updateFilter(filter);
  }

  parseSelectedFilter(id) {
    let selectedFilterObj = { "filter": '' };

    let obj = options.find(o => o.id === id);
    if (obj) selectedFilterObj.filter = obj.id;

    return selectedFilterObj;
  }

  render() {

    let selectedFilterObj = this.parseSelectedFilter(this.props.filter);
    let dataSet = this.props.dataSet || [];

    const { width, theme } = this.props;
    const classes = styles(theme || {});

    console.log(width);

    let graphHeight = 300;
    let graphMargins = {
      top: 20,
      right: 20,
      left: 0,
      bottom: 20
    };

    if (width === "xs") {
      graphHeight = 150;
      graphMargins.top = 40;
      graphMargins.left = 0;
      graphMargins.right = 0;
      graphMargins.bottom = 0;
    }

    let error = ""; // TODO - validate that startDate < endDate?

    return (
      <div>

        <Grid container spacing={2}>

          <Grid item xs={12} md={6}>

            <Typography gutterBottom variant="h5" component="h2" className={classes.heading}>
              User Profile
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              The following information outlines site usage and viewed words.
            </Typography>

            <br />

            <Grid container spacing={2} justify="center">

              <Grid item xs={6} sm={5}>
                <StartDatePicker action={this.startDateHandler} startDate={this.props.startDate} error={error} />
              </Grid>

              <Grid item xs={6} sm={5}>
                <EndDatePicker action={this.endDateHandler} endDate={this.props.endDate} error={error} />
              </Grid>

            </Grid>

            <ResponsiveContainer width='100%' height={graphHeight}>
              <BarChart data={dataSet} margin={{top: graphMargins.top, right: graphMargins.right, left: graphMargins.left, bottom: graphMargins.bottom}}>
                <CartesianGrid strokeDasharray="1 1"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip content={<CustomTooltip />}/>
                <Bar dataKey="count" fill="#2f8eed" />
              </BarChart>
            </ResponsiveContainer>

          </Grid>

          <Grid item xs={12} md={6}>

            <Grid container alignItems="flex-start" justify="flex-end" direction="row" spacing={2}>

              <Grid item>

                <WordViewFilter options={options} filter={selectedFilterObj} action={this.filterHandler} />

              </Grid>

            </Grid>

            <PostListContainer username={this.props.username} startDate={this.props.startDate} endDate={this.props.endDate} category={this.props.filter} />

          </Grid>

        </Grid>


      </div>
    );

  }
}

ViewHistory.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

// Wrapper component to provide theme and width
function ViewHistoryWrapper(props) {
  const theme = useTheme();
  
  // Use useMediaQuery to replace withWidth
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isXl = useMediaQuery(theme.breakpoints.only('xl'));
  
  let width;
  if (isXs) width = 'xs';
  else if (isSm) width = 'sm';
  else if (isMd) width = 'md';
  else if (isLg) width = 'lg';
  else if (isXl) width = 'xl';
  
  return <ViewHistory {...props} theme={theme} width={width} />;
}

export default ViewHistoryWrapper;
