import React from 'react';
import Select from '@material-ui/core/Select';
// import Routines from './Routines.js';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";

let Routines = [];

const styles = theme => ({
      routine: {
        "&:before": {
            borderColor: 'white'
      },
      '&:after': {
        borderColor: 'white',
        color: 'white'
      },
      '&:hover': {
            borderColor: 'white'
      },
    },
    icon: {
        fill: 'white',
    },
    select: {
        color: 'white'
    }


  });


class RoutineSelect extends React.Component {
    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);

      this.options = [];

      Routines = JSON.parse(localStorage.getItem('routines'));

      for (let i = 0; i < Routines.length; i++) {
        this.options.push({ value: Routines[i].name });
      }

      let selectedRoutine = Routines[0];

      this.state = {
        Routine: selectedRoutine.name
      };

      this.props.action(selectedRoutine); // pass mode update back to QueryManager

    }

    componentDidMount() {

    }

    insertRoutine(key, exercise) {
        console.log(key);

        for (let i = 0; i < Routines.length; i++) {
            if (key === Routines[i].name) {

                if (!Routines[i].subroutine || Routines[i].subroutine[0].consonants === null) {

                    console.log("Initializing: ", exercise);

                    Routines[i].subroutine[0] = exercise;

                } else {

                    console.log("Inserting: ", exercise);

                    Routines[i].subroutine.push(exercise);

                }

            }
        }

        let selectedRoutine = {};

        for (let i = 0; i < Routines.length; i++) {
            if (key === Routines[i].name) {
                selectedRoutine = Routines[i];
            }
        }

        this.props.action(selectedRoutine); // pass mode update back to QueryManager

    }

    handleChange(e) {
        this.setState({Routine: e.target.value})

        let selectedRoutine = {};

        if(e.target.value !== "") {
          for (let i = 0; i < Routines.length; i++) {
              if (e.target.value === Routines[i].name) {
                  selectedRoutine = Routines[i];
              }
          }
        }

        this.props.action(selectedRoutine); // pass mode update back to QueryManager
    }

    render() {
        const { classes } = this.props;
        const { theme } = this.props;

        return (
            <React.Fragment>
                 <FormControl style={{minWidth: 150}}>
                   
                  <Select
                  classes={{select: theme === true ? classes.select : undefined}}
                  value={this.state.Routine}
                  onChange={this.handleChange}
                  className={theme === true ? classes.routine : undefined}
                  >
                    { this.options.map((item, i) => ( <MenuItem value={item.value}>{item.value}</MenuItem> )) }

                  </Select>
                  </FormControl>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(RoutineSelect);
