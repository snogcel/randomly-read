import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
}));

export default function DeleteButton(props) {
  return (
    <div>
      <StyledButton onClick={() => { props.action(); }} variant="outlined">
        Delete Exercise Step
      </StyledButton>
    </div>
  );
}
