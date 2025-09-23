import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function getModalStyle() {
  const top = 25;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 350,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #333',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2, 2),
    textAlign: 'center'
  },
  margin: {
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
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
  const classes = useStyles();
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
      <IconButton onClick={handleOpen} disableFocusRipple style={{ backgroundColor: 'transparent' }} aria-label="add" className={classes.margin}>
        <AddIcon />
      </IconButton>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>

          <Grid container>

            <Grid item>

              <form className={classes.container} noValidate autoComplete="off">
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

              <Button onClick={() => { handleClick(); }}  variant="outlined" size="small" color="default" className={classes.button}>
                Create
              </Button>

            </Grid>

          </Grid>

        </div>
      </Modal>
    </div>
  );
}
