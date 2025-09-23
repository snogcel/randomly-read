import React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import InputBase from '@mui/material/InputBase';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

  display: 'flex',
  flexWrap: 'wrap',
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 200,
}));

export default function UserSelect(props) {
  const [values, setValues] = React.useState({});

  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: values,
    }));

    props.action(event.target.value); // pass to redux
  };

  // split users list into active / inactive
  let activeUserRoutines = [];
  let inactiveUserRoutines = [];

  for (let i = 0; i < props.options.length; i++) {
    if (props.options[i].isActive) {
      activeUserRoutines.push(props.options[i]);
    } else {
      inactiveUserRoutines.push(props.options[i]);
    }
  }

  return (
    <StyledRoot component="form" autoComplete="off">
      <StyledFormControl>
        <InputLabel htmlFor="routine-user-input">Users</InputLabel>
        <Select
          defaultValue={props.options[0]}
          value={props.user.user}
          onChange={handleChange}
          input={<BootstrapInput name="user" id="user-customized-select" />}
          inputProps={{
            name: 'user',
            id: 'user-input',
          }}
        >

          <ListSubheader>Active Users</ListSubheader>
          {activeUserRoutines.map(user => (
            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
          ))}

          <ListSubheader>Inactive Users</ListSubheader>
          {inactiveUserRoutines.map(user => (
            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
          ))}

        </Select>
      </StyledFormControl>
    </StyledRoot>
  );
}
