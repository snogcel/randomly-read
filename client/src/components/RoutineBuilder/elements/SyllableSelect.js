import React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import InputBase from '@mui/material/InputBase';

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
  maxWidth: 240,
}));

const StyledChips = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: 2,
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 175,
    },
  },
};

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
  '&.Mui-focused .MuiInputBase-input': {
    borderRadius: 4,
    borderColor: '#80bdff',
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
  },
}));

// TODO - import

const syllables = [
  { id: "1", name: "1"},
  { id: "2", name: "2"},
  { id: "3", name: "3"},
  { id: "4", name: "4"},
  { id: "5", name: "5"}
];

export default function SyllableSelect(props) {
  const [selectedSyllables, setSyllable] = React.useState(props.syllables);

  const handleChange = event => {
    setSyllable(selectedSyllables); // record to internal state
    props.action(event.target.value); // pass to redux
  };

  return (
    <StyledRoot>
      <StyledFormControl>
        <InputLabel shrink={true} id="select-multiple-chip-syllables">Syllables</InputLabel>
        <Select
          id="syllable-customized-select"
          labelId="select-multiple-chip-syllables"
          multiple
          value={props.syllables}
          onChange={handleChange}
          input={<BootstrapInput id="syllable-customized-select" />}
          renderValue={selected => (
            <StyledChips>
              {selected.map(value => (
                <StyledChip key={value} value={value} label={value} />
              ))}
            </StyledChips>
          )}
          MenuProps={MenuProps}
        >
          {syllables.map(syllable => (
            <MenuItem key={syllable.id} value={syllable.name}>
              {syllable.name}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </StyledRoot>
  );
}
