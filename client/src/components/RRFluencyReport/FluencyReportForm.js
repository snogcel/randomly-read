import React from 'react';
import { Field } from 'redux-form';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styles } from '../../themeHandler';
import { withStyles } from '@mui/styles';
import { styled } from "@mui/material/styles";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// import Slider from "@mui/lab/Slider";
import Typography from "@mui/material/Typography";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import withAuth from '../../util/withAuth';
import validate from './validate'
import { attemptCreateInteraction } from '../../actions/interactions';
import { addSetting1FormData, addSetting2FormData, addSetting3FormData, addSetting4FormData, addSetting5FormData, addSetting6FormData}  from '../../actions/formData';
import { resetFormData } from '../../actions/formData';
import { loadSetting1FormData,loadSetting2FormData, loadSetting3FormData, loadSetting4FormData, loadSetting5FormData, loadSetting6FormData} from '../../actions/formData';
import { loadCombinedData, setChanged, mutateCombinedData } from '../../actions/formData';


const intentionMarks = [
  {
    value: 0,
    label: "Did not remember"
  },
  {
    value: 50,
    label: "Remembered"
  },
  {
    value: 100,
    label: "Remembered and used"
  },
];

const easeMarks = [
  {
    value: 0,
    label: "Difficult"
  },
  {
    value: 35,
    label: "Less Difficult"
  },
  {
    value: 70,
    label: "Easier"
  },
  {
    value: 100,
    label: "Easy"
  }
];

const audienceradioButton = ({ label, input, ...rest }) => (

    <FormControl style={{padding: 50}}>
       <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
      {...input}
      {...rest}
      >
      <FormControlLabel value={"1"} control={<Radio />} label="Family or Friend"/>
      <FormControlLabel value={"2"} control={<Radio />} label="Classmate or Colleague"/>
      <FormControlLabel value={"3"} control={<Radio />} label="Authority Figure"/>
      <FormControlLabel value={"4"} control={<Radio />} label="Service Worker"/>
      <FormControlLabel value={"5"} control={<Radio />} label="No Relationship"/>
    </RadioGroup>
    </FormControl>

  )

/*  const intentionSlider = ({ label, input, ...rest }) => (
    <>
    <Typography id="discrete-slider" gutterBottom>
      {label}
      </Typography>
        <Slider
        style={{width: 500, margin: 50}}
        aria-labelledby="discrete-slider"
        marks={marks}
        {...input}
        {...rest}
        step={35}
        valueLabelDisplay="auto"
      />
      </>
  )  */


class MyFluencyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intentionVal: 0,
      easeVal: 0
    };

    this.insertInteraction = this.insertInteraction.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleIntentionSliderChange =  this.handleIntentionSliderChange.bind(this)
    this.handleIntentionEaseChange = this.handleIntentionEaseChange.bind(this)
  }

  componentDidMount() {

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
        if(JSON.parse(localStorage.getItem("Interactions")).combinedData.length !== 0) {
          (this.props.mutateCombinedData(JSON.parse(localStorage.getItem("Interactions")).combinedData))
        }
      }
    }

  }


  handleIntentionSliderChange = (event, newValue) => {
      if(this.state.intentionVal !== newValue) {
        this.setState({intentionVal: newValue});
        console.log("Intention Val", newValue)
      }
    };


  handleIntentionEaseChange = (event, newValue) => {
    if(this.state.easeVal !== newValue) {
      this.setState({easeVal: newValue});
      console.log("Ease Val", newValue)
    }
   };

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
    let intention = {intention: this.state.intentionVal}
    let ease = {ease: this.state.easeVal}
    let obj = {...date, ...interactions, ...intention, ...ease};
    console.log(obj)
    console.log(interactions.setting)
    this.props.loadCombinedData(obj)
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
    this.setState({intentionVal: 0})
    this.setState({easeVal: 0})
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
        <div>
        <Typography id="input-slider-intention" gutterBottom>
        Intention
      </Typography>
        <Slider
            style={{width: 300, margin: 50, paddingLeft: 6, paddingRight: 6}}
            value={typeof this.state.intentionVal === 'number' ? this.state.intentionVal : 0}
            onChange={this.handleIntentionSliderChange}
            aria-labelledby="input-slider-intention"
            step={50}
            marks={intentionMarks}
            valueLabelDisplay="auto"
          />
          </div>


     {/*    <Field
          classes={classes.FormControl}
          name="intention"
          label="Intention"
          component={intentionSlider}
        >

        </Field> */}
        </Grid>

        <Grid item >
       {/*  <Field
          classes={classes.FormControl}
          name="ease"
          component={easeradioButton}
          label="Ease of Speech"
        >
        </Field> */}
         <div>
      <Typography id="input-slider-ease" gutterBottom>
        Ease of Speech
      </Typography>
        <Slider
            style={{width: 300, margin: 50, paddingLeft: 6, paddingRight: 6}}
            value={typeof this.state.easeVal === 'number' ? this.state.easeVal : 0}
            onChange={this.handleIntentionEaseChange}
            aria-labelledby="input-slider-ease"
            step={35}
            marks={easeMarks}
            valueLabelDisplay="auto"
          />
          </div>
        </Grid>

        <Grid item>
        <Button type="submit" className={classes.submitButton} variant="contained" color = "primary" size ="large" disabled={invalid || pristine || submitting}><b>Submit</b></Button>
        <Button type="button" align="left" variant="contained" disabled={pristine || submitting} color="primary" size = "small" onClick={reset}><b>Clear</b></Button>
        </Grid>
        </Grid>
    </form>

    </>
  )
}
}


const MyFluencyFormyWrapped = withStyles(styles)(MyFluencyForm);

const mapStateToProps = state => ({
  formData: state.formData,
  isChanged: state.formData.isChanged
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
  addSetting6FormData,
  loadCombinedData,
  setChanged,
  mutateCombinedData,
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
