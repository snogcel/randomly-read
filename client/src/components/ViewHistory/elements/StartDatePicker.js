import 'date-fns';
import moment from 'moment-timezone';
import React from 'react';
import Grid from '@mui/material/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function StartDatePicker(props) {

  // Default to today's date (using EST)
  let startDate = moment();

  // go back 7 days (default)
  startDate.subtract(7, 'd');

  if (!props.startDate) props.action(startDate.startOf("day").unix()); // pass to redux in unix format

  const [selectedDate, setSelectedDate] = React.useState(startDate.format());

  const handleDateChange = date => {
    setSelectedDate(date);
    props.action(moment(date).tz("America/New_York").startOf("day").unix()); // pass to redux in unix format
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="start-date-picker-dialog"
          label="Start Date"
          format="MM/dd/yy"
          value={selectedDate}
          onChange={handleDateChange}
          error={props.error.length === 0 ? false : true }
          helperText={props.error}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
