import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { Field } from 'redux-form';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid';
import { styles } from '../../themeHandler';
import { withStyles } from "@material-ui/core/styles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
      return
    } else {
      return <FormHelperText>{touched && error}</FormHelperText>
    }
  }


  const settingradioButton = ({ label, input,children, ...rest }) => (
    
    <FormControl style={{padding: 50}}>
       <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup 
      {...input} 
      {...rest}
      >
          <FormControlLabel value={"1"} control={<Radio />} label="1: Speaking at Work or School"/>
          <FormControlLabel value={"2"} control={<Radio />} label="2: Speaking on the Phone"/> 
          <FormControlLabel value={"3"} control={<Radio />} label="3: Presenting a Topic"/>   
          <FormControlLabel value={"4"} control={<Radio />} label="4: Attending a Social Event"/> 
          <FormControlLabel value={"5"} control={<Radio />} label="5: Relaxing with Friends"/>    
          <FormControlLabel value={"6"} control={<Radio />} label="6: Relaxing at Home"/>     
    </RadioGroup>
    </FormControl>

  ) 

  const audienceradioButton = ({ label, input, ...rest }) => (
    
    <FormControl style={{padding: 50}}>
       <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup 
      {...input} 
      {...rest}
      >
      <FormControlLabel value={"1"} control={<Radio />} label="1: Parents"/>
      <FormControlLabel value={"2"} control={<Radio />} label="2: Family"/> 
      <FormControlLabel value={"3"} control={<Radio />} label="3: Significant Other"/>   
      <FormControlLabel value={"4"} control={<Radio />} label="4: Friend"/> 
      <FormControlLabel value={"5"} control={<Radio />} label="5: Coworker / Classmate"/>    
      <FormControlLabel value={"6"} control={<Radio />} label="6: Authority Figure"/> 
      <FormControlLabel value={"7"} control={<Radio />} label="7: Service Workere"/>    
      <FormControlLabel value={"8"} control={<Radio />} label="8: No Relationship"/>
    </RadioGroup>
    </FormControl>

  ) 

  const intentionradioButton = ({ label, input, ...rest }) => (
    
    <FormControl style={{padding: 50}}>
       <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup 
      {...input} 
      {...rest}
      >
      <FormControlLabel value={"1"}  control={<Radio />}   label="1: I did not remember or use"/>
      <FormControlLabel value={"5"}  control={<Radio />}   label="5: I remembered but did not use"/> 
      <FormControlLabel value={"10"} control={<Radio />}   label="10: I remembered and used"/>   
    </RadioGroup>
    </FormControl>

  ) 

  const easeradioButton = ({ label, input, ...rest }) => (
    
    <FormControl style={{padding: 50}}>
       <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup 
      {...input} 
      {...rest}
      >
      <FormControlLabel value={"1"} control={<Radio />}   label="1: Speech is difficult"/>
      <FormControlLabel value={"4"} control={<Radio />}   label="4: Speech was less difficult"/> 
      <FormControlLabel value={"7"} control={<Radio />}   label="7: Speech was easier"/>   
      <FormControlLabel value={"10"} control={<Radio />}  label="10: Speech was easy"/> 
    </RadioGroup>
    </FormControl>

  )


class MyFluencyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interactions: []
    };
  }

  componentDidMount() {
    localStorage.getItem("Interactions") &&
      this.setState({
        interactions: JSON.parse(localStorage.getItem("Interactions"))
      });
      console.log("local storange", JSON.parse(localStorage.getItem("Interactions")))

      this.props.addInitialFormData(JSON.parse(localStorage.getItem("Interactions")))
    }


  componentDidUpdate() {
    localStorage.setItem(
      "Interactions",
      JSON.stringify(this.state.interactions)
    );
  }


  onSubmit = interactions => {
    this.props.attemptCreateInteraction(interactions);
    let date = {date: new Date().toLocaleString()};

    let obj = {...date, ...interactions};

    this.setState({interactions: [...this.state.interactions, obj]})
    this.props.addFormData(obj)

    console.log(obj)
    this.props.reset();
  }

  handleChange = () => {
    this.setState({interactions: []})
    this.props.resetFormData()

  }

  render() {

  const { handleSubmit, pristine, reset, submitting, classes } = this.props
  console.log(this.state.interactions)
  return (
    <>
    <form onSubmit={handleSubmit(this.onSubmit)}>

         <Grid container spacing={8}>

         <Grid item>
        <Field
          classes={classes.FormControl}
          name="setting"
          component={settingradioButton}
          label="Setting"
        >
        </Field>
      </Grid>


      <Grid item >
        <Field
          classes={classes.FormControl}
          name="audience"
          component={audienceradioButton}
          label="Audience"
        >
        </Field>
        </Grid>

        <Grid item >
        <Field
          classes={classes.FormControl}
          name="intention"
          component={intentionradioButton}
          label="Intention"
        >
        </Field>
        </Grid>
        
        <Grid item >
        <Field
          classes={classes.FormControl}
          name="ease"
          component={easeradioButton}
          label="Ease of Speech"
        >
        </Field>
        </Grid>
        
        <Grid item>
        <Button type="submit" className={classes.submitButton} variant="contained" color = "primary" size ="large" disabled={pristine || submitting}><b>Submit</b></Button>
        <Button type="button" align="left" type="button" variant="contained" disabled={pristine || submitting} color = "primary" size = "small" onClick={reset}><b>Clear</b></Button>
        </Grid>
        </Grid>
    </form>
    
      <Button align="right" type="button" variant="contained" color = "primary" size="small" onClick={this.handleChange}><b>Clear History</b></Button>
    </>
  )
}
}


const MyFluencyFormyWrapped = withStyles(styles)(MyFluencyForm);
export default MyFluencyFormyWrapped;