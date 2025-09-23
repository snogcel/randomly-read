import React from 'react';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function getModalStyle() {
  const top = 25;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const StyledPaper = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: 350,
  backgroundColor: theme.palette.background.paper,
  border: '1px solid #333',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 2, 2, 2),
  textAlign: 'center'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1)
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginLeft: theme.spacing(0),
  marginRight: theme.spacing(0),
    paddingLeft: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1, 1, 1, 4),
  },
  input: {
    display: 'none',
  },
}));

export default function NewRoutineButton(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({});

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {

    props.action(values.routineName);
    handleClose();

  };

  return (
    <div>
      <StyledIconButton onClick={handleOpen} disableFocusRipple style={{ backgroundColor: 'transparent' }} aria-label="add">
        <AddIcon />
      </StyledIconButton>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <StyledPaper style={modalStyle}>

          <Grid container>

            <Grid item>

              <form style={{display: 'flex', flexWrap: 'wrap'}} noValidate autoComplete="off">
                <TextField
                  id="outlined-full-width"
                  margin="normal"
                  label="New Routine Name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleChange('routineName')}
                />
              </form>

            </Grid>

            <Grid item>

              <br />

              <StyledButton onClick={() => { handleClick(); }}  variant="outlined" size="small" color="default">
                Create
              </StyledButton>

            </Grid>

          </Grid>

        </StyledPaper>
      </Modal>
    </div>
  );
}
