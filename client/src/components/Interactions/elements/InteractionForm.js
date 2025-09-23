import React from 'react';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';

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

const StyledRoot = styled('div')(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  justifyItems: "center",
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 100,
}));

const StyledSubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  marginTop: theme.spacing(4)
}));

const StyledWordEntryGrid = styled(Grid)(({ theme }) => ({
  fontSize:"12px"
}));

// Stubbed Out Interaction Settings
/*
const ease = [
  { label: "Difficult", value: 0 },
  { label: "Easy", value: 100 }
];
*/

export default function InteractionForm(props) {

  const [state, setState] = React.useState({
    position: "initial",
    word: "",
    ease: 0
  });

  const handleSubmit = event => {

    props.action(state);  // pass form submission back to InteractionsHome

    let defaultState = {
      position: "initial",
      word: "",
      ease: 0
    };

    // reset form state
    setState( defaultState );

  };

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  return (
    <StyledRoot>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); } }>

            <Grid container justifyContent="center">

              <StyledWordEntryGrid item xs={12} sm={6} md={6} lg={12}>
                <StyledFormControl>
                  <InputLabel shrink htmlFor="admin-user-input">Word Search</InputLabel>
                  <BootstrapInput
                    id="outlined-word-name"
                    margin="dense"
                    inputlabelprops={{
                      shrink: true,
                    }}
                    variant="outlined"
                    value={state.word}
                    onChange={handleChange('word')}
                  />
                </StyledFormControl>

              </StyledWordEntryGrid>

              <Grid item xs={12} sm={6} md={6} lg={12}>

                <StyledFormControl>
                  <InputLabel htmlFor="admin-user-input">Position</InputLabel>
                  <Select
                    value={state.position}
                    onChange={handleChange('position')}
                    input={<BootstrapInput name="user" id="position-customized-select" />}
                    inputProps={{
                      name: 'position',
                      id: 'position-input',
                    }}
                  >
                    <MenuItem key={"initial"} value={"initial"}>Initial</MenuItem>
                    <MenuItem key={"final"} value={"final"}>Final</MenuItem>
                  </Select>
                </StyledFormControl>

                <StyledSubmitButton type="submit" variant="outlined">Find</StyledSubmitButton>

              </Grid>

            </Grid>

      </form>
    </StyledRoot>
  );
}
