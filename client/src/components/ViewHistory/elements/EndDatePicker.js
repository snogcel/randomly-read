import 'date-fns';
import moment from 'moment-timezone';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function EndDatePicker(props) {

  // Default to today's date (using EST)
  let endDate = moment().tz("America/New_York").endOf("day");

  if (!props.endDate) props.action(endDate.unix()); // pass to redux in unix format

  const [selectedDate, setSelectedDate] = React.useState(endDate.format());

  const handleDateChange = date => {
    setSelectedDate(date);
    props.action(moment(date).tz("America/New_York").endOf("day").unix()); // pass to redux in unix format
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="end-date-picker-dialog"
          label="End Date"
          format="MM/dd/yyyy"
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
