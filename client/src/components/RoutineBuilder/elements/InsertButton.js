import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginTop: theme.spacing(1)
}));

export default function InsertButton(props) {
  return (
    <div>
      <StyledButton onClick={() => { props.action(); }} variant="contained" color="primary">
        Insert Exercise Step
      </StyledButton>
    </div>
  );
}
