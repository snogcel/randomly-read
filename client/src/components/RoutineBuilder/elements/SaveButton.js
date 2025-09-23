import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

export default function SaveButton(props) {
  return (
    <div>
      <StyledButton onClick={() => { props.action(); }} variant="contained">
        Save Settings
      </StyledButton>
    </div>
  );
}
