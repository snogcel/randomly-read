import 'date-fns';
import moment from 'moment-timezone';
import React from 'react';
import Grid from '@mui/material/Grid';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container justifyContent="space-around">
        <DatePicker
          label="End Date"
          value={selectedDate}
          onChange={handleDateChange}
          slotProps={{
            textField: {
              margin: "normal",
              id: "end-date-picker-dialog",
              error: props.error.length !== 0,
              helperText: props.error,
            }
          }}
        />
      </Grid>
    </LocalizationProvider>
  );
}
