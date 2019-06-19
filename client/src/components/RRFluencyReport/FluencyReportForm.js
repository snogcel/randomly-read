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
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import withAuth from '../../util/withAuth';
import validate from './validate'
import { attemptCreateInteraction } from '../../actions/interactions';
import { addSetting1FormData } from '../../actions/formData';
import { addSetting2FormData } from '../../actions/formData';
import { addSetting3FormData } from '../../actions/formData';
import { addSetting4FormData } from '../../actions/formData';
import { addSetting5FormData } from '../../actions/formData';
import { addSetting6FormData } from '../../actions/formData';
import { resetFormData } from '../../actions/formData';
import { loadSetting1FormData } from '../../actions/formData';
import { loadSetting2FormData } from '../../actions/formData';
import { loadSetting3FormData } from '../../actions/formData';
import { loadSetting4FormData } from '../../actions/formData';
import { loadSetting5FormData } from '../../actions/formData';
import { loadSetting6FormData } from '../../actions/formData';


  const audienceradioButton = ({ label, input, ...rest }) => (
    
    <FormControl style={{padding: 50}}>
       <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup 
      {...input} 
      {...rest}
      >
      <FormControlLabel value={"1"} control={<Radio />} label="Parents"/>
      <FormControlLabel value={"2"} control={<Radio />} label="Family"/> 
      <FormControlLabel value={"3"} control={<Radio />} label="Significant Other"/>   
      <FormControlLabel value={"4"} control={<Radio />} label="Friend"/> 
      <FormControlLabel value={"5"} control={<Radio />} label="Coworker / Classmate"/>    
      <FormControlLabel value={"6"} control={<Radio />} label="Authority Figure"/> 
      <FormControlLabel value={"7"} control={<Radio />} label="Service Workere"/>    
      <FormControlLabel value={"8"} control={<Radio />} label="No Relationship"/>
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
      <FormControlLabel value={"1"}  control={<Radio />}   label="I did not remember or use"/>
      <FormControlLabel value={"5"}  control={<Radio />}   label="I remembered but did not use"/> 
      <FormControlLabel value={"10"} control={<Radio />}   label="I remembered and used"/>   
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
      <FormControlLabel value={"1"} control={<Radio />}   label="Speech was difficult"/>
      <FormControlLabel value={"4"} control={<Radio />}   label="Speech was less difficult"/> 
      <FormControlLabel value={"7"} control={<Radio />}   label="Speech was easier"/>   
      <FormControlLabel value={"10"} control={<Radio />}  label="Speech was easy"/> 
    </RadioGroup>
    </FormControl>

  )


class MyFluencyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interactions: []
    };

    this.insertInteraction = this.insertInteraction.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {

    localStorage.getItem("Interactions") &&
    this.setState({
      interactions: JSON.parse(localStorage.getItem("Interactions"))
    });
    if(typeof(Storage) !== "undefined") {
      if(localStorage.getItem("Interactions") !== null) {
        if(JSON.parse(localStorage.getItem("Interactions")).setting1.length !== 0) { 
          (this.props.loadSetting1FormData(JSON.parse(localStorage.getItem("Interactions")).setting1)) 
        }
        if(JSON.parse(localStorage.getItem("Interactions")).setting2.length !== 0) {  
          (this.props.loadSetting2FormData(JSON.parse(localStorage.getItem("Interactions")).setting2))
        }
        if(JSON.parse(localStorage.getItem("Interactions")).setting3.length !== 0) {
          (this.props.loadSetting3FormData(JSON.parse(localStorage.getItem("Interactions")).setting3)) 
        }
        if(JSON.parse(localStorage.getItem("Interactions")).setting4.length !== 0) {
          (this.props.loadSetting4FormData(JSON.parse(localStorage.getItem("Interactions")).setting4))
        }
        if(JSON.parse(localStorage.getItem("Interactions")).setting5.length !== 0) {
          (this.props.loadSetting5FormData(JSON.parse(localStorage.getItem("Interactions")).setting5))
        }
        if(JSON.parse(localStorage.getItem("Interactions")).setting6.length !== 0) { 
          (this.props.loadSetting6FormData(JSON.parse(localStorage.getItem("Interactions")).setting6))
        }
      }
    }
  }


  componentDidUpdate() {
  
    if(this.props.formData !== null) {
    localStorage.setItem(
      "Interactions",
      JSON.stringify(this.props.formData)
    );  
    }
  }

  insertInteraction(interactions) {
    let date = {date: new Date().toLocaleString()};
    let obj = {...date, ...interactions};
    console.log(obj)
    console.log(interactions.setting)
    switch (interactions.setting) {
      case "1":
      return this.props.addSetting1FormData(obj)
      case "2":
      return this.props.addSetting2FormData(obj)
      case "3":
      return this.props.addSetting3FormData(obj)
      case "4":
      return this.props.addSetting4FormData(obj)
      case "5":
      return this.props.addSetting5FormData(obj)
      case "6":
      return this.props.addSetting6FormData(obj)
      default: 
      return this.props.formData;
    }
  }

  onSubmit = interactions => {
   // this.props.attemptCreateInteraction(interactions);
    this.insertInteraction(interactions);
    this.props.reset();
  }

  render() {

  const { handleSubmit, invalid, pristine, reset, submitting, classes } = this.props
  return (
    <>
    <form onSubmit={handleSubmit(this.onSubmit)}>

         <Grid container spacing={8}>

         <Grid item>
        <Field
          classes={classes.FormControl}
          name="setting"
          component='hidden'
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
        <Button type="submit" className={classes.submitButton} variant="contained" color = "primary" size ="large" disabled={invalid || pristine || submitting}><b>Submit</b></Button>
        <Button type="button" align="left" type="button" variant="contained" disabled={pristine || submitting} color="primary" size = "small" onClick={reset}><b>Clear</b></Button>
        </Grid>
        </Grid>
    </form>
    
    </>
  )
}
}


const MyFluencyFormyWrapped = withStyles(styles)(MyFluencyForm);

const mapStateToProps = state => ({
  formData: state.formData
   
});

const mapDispatchToProps = 
{ attemptCreateInteraction, 
  loadSetting1FormData,
  loadSetting2FormData,
  loadSetting3FormData,
  loadSetting4FormData,
  loadSetting5FormData,
  loadSetting6FormData, 
  addSetting1FormData, 
  addSetting2FormData, 
  addSetting3FormData, 
  addSetting4FormData, 
  addSetting5FormData, 
  addSetting6FormData ,
  resetFormData
};

const enhance = compose(
reduxForm({ form: "test",//this.props.form,
validate }),
withAuth,
connect(
  mapStateToProps,
  mapDispatchToProps
)
);

const MyFluencyFormContainer = enhance(MyFluencyFormyWrapped);

export default MyFluencyFormContainer;