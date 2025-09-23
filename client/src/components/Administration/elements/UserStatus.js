import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {styled} from "@mui/material/styles";

const useStyles = makeStyles(theme => ({
  switch: {
    margin: theme.spacing(2)
  }
}));

export default function UserStatus(props) {
  const [state, setState] = React.useState(props.active);

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
    props.action(event.target.checked);
  };

  const classes = useStyles();

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={props.active.active}
            onChange={handleChange('active')}
            value="active"
            color="primary"
            className={classes.switch}
          />
        }
        label="Active"
        labelPlacement="left"
        shrink
      />
    </FormGroup>
  );
}
