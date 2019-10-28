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

    }

    componentWillMount() {
      if (typeof this.props.user !== "undefined") this.prepareRoutineSelect();
    }

    prepareRoutineSelect(){
      this.props.fetchAssignedRoutines();
    }

    componentDidMount() {

    }

    handleChange(e) {
        this.setState({Routine: e.target.value});

        let selectedRoutine = {};

        if(e.target.value !== "") {
          for (let i = 0; i < this.props.availableRoutines.length; i++) {
              if (e.target.value === this.props.availableRoutines[i].attributes.id) {
                  selectedRoutine = this.props.availableRoutines[i].attributes;
              }
          }
        }

        this.props.updateId(selectedRoutine.id);
        this.props.updateName(selectedRoutine.name);
        this.props.updateActiveRoutine(selectedRoutine);
        this.props.action(selectedRoutine); // pass mode update back to QueryManager
    }

    render() {
        const { classes } = this.props;
        const { theme } = this.props;

        // set default select option
        if (typeof this.props.availableRoutines[0] !== "undefined" && this.props.id === 0) {
          this.props.updateId(this.props.availableRoutines[0].attributes.id);
          this.props.updateName(this.props.availableRoutines[0].attributes.name);
          this.props.updateActiveRoutine(this.props.availableRoutines[0].attributes);
          this.props.action(this.props.availableRoutines[0].attributes); // pass mode update back to QueryManager
        }

        return (
            <React.Fragment>
                 <FormControl style={{minWidth: 150}}>

                  <Select
                  classes={{select: theme === true ? classes.select : undefined}}
                  defaultValue={this.props.id}
                  value={this.props.id}
                  onChange={this.handleChange}
                  className={theme === true ? classes.routine : undefined}
                  >
                    { this.props.availableRoutines.map((item, i) => ( <MenuItem value={item.attributes.id}>{item.attributes.name}</MenuItem> )) }

                  </Select>
                  </FormControl>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(RoutineSelect);
