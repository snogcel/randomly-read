import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
}));

export default function PreviewButton(props) {
  return (
    <div>
      <StyledButton onClick={() => { props.action(); }} variant="outlined">
        Preview Exercise Step
      </StyledButton>
    </div>
  );
}
