import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import { fade, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
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
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

export default function EditFirstName(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState(props.firstname);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    props.action(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <FormControl className={classes.margin} error={props.error.length === 0 ? false : true }>
        <InputLabel shrink htmlFor="admin-edit-firstname-input">
          First Name
        </InputLabel>
        <BootstrapInput
          id="firstname-text"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={props.firstname.firstname}
          value={props.firstname.firstname}
          onChange={handleChange('firstname')}
        />
        <FormHelperText id="component-error-text">{props.error}</FormHelperText>
      </FormControl>
    </form>
  );
}
