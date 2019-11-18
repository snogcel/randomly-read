import React from 'react';
import Select from '@material-ui/core/Select';
// import Routines from './Routines.js';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from "@material-ui/core/FormControl";
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from "@material-ui/core/styles";

let Routines = [];

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
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
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);


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
                 <FormControl style={{minWidth: 150 }}>
                  <Select
                  classes={{select: theme === true ? classes.select : undefined}}
                  defaultValue={this.props.id}
                  value={this.props.id}
                  onChange={this.handleChange}
                  input={<BootstrapInput name="routine" id="routine-customized-select" />}
                  >
                    { this.props.availableRoutines.map((item, i) => ( <MenuItem value={item.attributes.id}>{item.attributes.name}</MenuItem> )) }

                  </Select>
                  </FormControl>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(RoutineSelect);
