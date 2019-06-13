import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { Field } from 'redux-form';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid';
import { styles } from '../../themeHandler';
import { withStyles } from "@material-ui/core/styles";


const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
      return
    } else {
      return <FormHelperText>{touched && error}</FormHelperText>
    }
  }

const renderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
  }) => (
    <FormControl style={{minWidth: 150}}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...input}
        {...custom}
      >
      {children}
      {renderFromHelper({ touched, error })}
      </Select>
    </FormControl>
  )

class MyFluencyForm extends React.Component {


  onSubmit = interactions => this.props.attemptCreateInteraction(interactions);

  render() {

  const { handleSubmit, pristine, reset, submitting, classes } = this.props
  return (
    <form onSubmit={handleSubmit(this.onSubmit)}>

         <Grid className={classes.column} container spacing={8}>

         <Grid item xs={12}>
        <Field
          classes={classes}
          name="setting"
          component={renderSelectField}
          label="Setting"
        >
          <MenuItem value={""}></MenuItem>
          <MenuItem value={1}>1: Speaking at Work or School </MenuItem> 
          <MenuItem value={2}>2: Speaking on the Phone </MenuItem> 
          <MenuItem value={3}>3: Presenting a Topic </MenuItem>
          <MenuItem value={4}>4: Attending a Social Event</MenuItem> 
          <MenuItem value={5}>5: Relaxing with Friends</MenuItem> 
          <MenuItem value={6}>6: Relaxing at Home</MenuItem>
      
        </Field>
      </Grid>


      <Grid item xs={12}>
        <Field
          classes={classes}
          name="audience"
          component={renderSelectField}
          label="Audience"
        >
          <MenuItem value={""}></MenuItem>
           <MenuItem value={1}>1: Parents</MenuItem>
          <MenuItem value={2}>2: Family</MenuItem>
          <MenuItem value={3}>3: Significant Other</MenuItem> 
          <MenuItem value={4}>4: Friend</MenuItem>
          <MenuItem value={5}>5: Coworker / Classmate </MenuItem>
          <MenuItem value={6}>6: Authority Figure</MenuItem>
          <MenuItem value={7}>7: Service Worker</MenuItem>
          <MenuItem value={8}>8: No Relationship</MenuItem>
        </Field>
        </Grid>

        <Grid item xs={12}>
        <Field
          classes={classes}
          name="intention"
          component={renderSelectField}
          label="Intention"
        >
           <MenuItem value={""}></MenuItem>
          <MenuItem value={1}>1: I did not use or remember</MenuItem>
          <MenuItem value={4}>4: I remembered but did not use</MenuItem>
          <MenuItem value={7}>7: I remembered and tried to use"</MenuItem>
          <MenuItem value={10}>10: I remembered and used"</MenuItem>
        </Field>
        </Grid>
        
        <Grid item xs={12}>
        <Field
          classes={classes}
          name="ease"
          component={renderSelectField}
          label="Ease of Speech"
        >
           <MenuItem value={""}></MenuItem>
          <MenuItem value={1}>1: Speech is difficult</MenuItem>
          <MenuItem value={4}>4: Speech was less difficult</MenuItem>
          <MenuItem value={7}>7: Speech was easier</MenuItem>
          <MenuItem value={10}>10: Speech was easy</MenuItem>
        </Field>
        </Grid>
        
        <Grid item xs={12}>
        <Button type="button" align="left" type="button" variant="contained" disabled={pristine || submitting} color = "primary" size = "small" onClick={reset}><b>Clear Values</b></Button>
        <Button type="submit" className={classes.submitButton} variant="contained" color = "primary" size ="large" disabled={pristine || submitting}><b>Submit</b></Button>
        </Grid>

        </Grid>
    </form>
  )
}
}


const MyFluencyFormyWrapped = withStyles(styles)(MyFluencyForm);
export default MyFluencyFormyWrapped;