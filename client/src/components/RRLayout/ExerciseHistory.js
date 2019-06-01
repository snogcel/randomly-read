import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from '@material-ui/core/List';
import CheckboxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
    sideTitle: {
        fontSize: 18
      },
      exerciseHeadline: {
        fontSize: 20,
        margin: "0.35em"
      },
      listItem: {
        paddingLeft: '2px',
        paddingRight: '2px',
        paddingTop: '2px',
        paddingBottom: '2px',
        fontSize: '1rem'
      },
      vowel: {
        fontSize: 20
      },
      repetitions: {
        fontSize: 20
      }
    });

class ExerciseHistory extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isChecked: false,
      }
      this.handleChange = this.handleChange.bind(this);  
  }

  handleChange(number) {
    
    
    this.setState({isChecked: !this.state.isChecked})
    this.props.addExerciseNumber(number);
    console.log(this.state.isChecked)


  }

   /* componentDidUpdate() {
    if(this.state.isChecked === false) {
      this.props.addExerciseNumber(null);
    }

  }   */

  componentWillReceiveProps() {
  
  }

  render() {
    let count = 0;
    const {classes} = this.props;
    console.log(this.state.isChecked)
    console.log("HOW MANY TIMES IS THIS OUTPUTTING", this.props.currentExercise[this.props.currentExerciseNumber])

    return(

        <List>
          {(this.props.currentExercise) ? this.props.currentExercise.map((item, i) => (
           this.props.currentExercise[i].mode === 'Word' || this.props.currentExercise[i].mode === 'Sentence' ? (
          <ListItem dense className = {classes.listItem}>
          <ListItemIcon> 
            <Checkbox style ={{color: "#33a0ff"}} checked={i === this.props.currentExerciseNumber} onClick={() => this.handleChange(i)}/>
             </ListItemIcon>
            <ListItemText
              primary={[
                <Typography style={{color: this.props.dark === true ? 'white' : 'black'}} component={'span'} inline variant="body1" color="textPrimary" className={classes.repetitions}>
                <b>{item.repetitions}</b>
                </Typography>,
                <Typography
                component={'span'}
                  className={classes.exerciseHeadline}
                  inline
                  color="textPrimary"
                  variant="body1"
                  style={{color: this.props.dark === true ? 'white' : 'black'}}
                >
                  {this.props.currentExercise[i].mode === 'Word' ? 'words with' : 'sentences with'}
                </Typography>,
                <Typography style={{color: this.props.dark === true ? 'white' : 'black'}} inline variant="h6" color="textSecondary" className={classes.vowel}>
                  {item.vowels.toString()}
                </Typography>
              ]}
              secondary= {
              <Typography style={{color: this.props.dark === true ? 'white' : 'black'}} component={'span'}>
              "bet, dress, net, head..."
            </Typography>
            }
            />
            </ListItem> 
           ) :
           null
          ))
          : 
          null
            }
        </List>
 
    )

  }

}

const EHWrapped = withStyles(styles)(ExerciseHistory);

export default EHWrapped;