import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from "@mui/material/FormControl";
import InputBase from '@mui/material/InputBase';
import { styled } from "@mui/material/styles";
import ListSubheader from '@mui/material/ListSubheader';

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
      'Gudea',
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
    },
    mdSelect: {

    },
    smSelect: {

    },
    xsSelect: {

    }
  });


class RoutineSelect extends React.Component {
    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
      if (typeof(this.props.exerciseUser) !== "undefined") {
        this.prepareRoutineSelect();
      } else if (typeof(this.props.user) !== "undefined") {
        this.prepareRoutineSelect();
      }
    }

    prepareRoutineSelect(){
      if (typeof(this.props.exerciseToken) !== "undefined") {
        //console.log("- exercise token -");
        this.props.fetchAssignedRoutines(this.props.exerciseToken);
      } else if (typeof(this.props.token) !== "undefined") {
        //console.log("- login token -");
        this.props.fetchAssignedRoutines(this.props.token);
      }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

      // check if routine has changed
      if ((prevProps.routine !== this.props.routine)) {
        //console.log(this.state);
        //console.log(this.props);
        this.props.updateTimeLeft(1); // avoid accidental word update                
        this.props.action(this.props.routine); // pass mode update back to QueryManager
      }

      if (typeof this.props.isVoting !== "undefined") {
        if ((prevProps.isVoting !== this.props.isVoting) && !this.props.isVoting) { // fetch updated routines

          //console.log("-fetching updated routines-");

          this.props.fetchAssignedRoutines();
          this.props.updateId(prevProps.id);
          this.props.updateName(prevProps.name);
          this.props.updateDescription(prevProps.description);
        }
      }

      if (typeof this.props.isInteractionVoting !== "undefined") {
        if ((prevProps.isInteractionVoting !== this.props.isInteractionVoting) && !this.props.isInteractionVoting) { // fetch updated routines

          //console.log("-fetching updated routines-");

          this.props.fetchAssignedRoutines();
          this.props.updateId(prevProps.id);
          this.props.updateName(prevProps.name);
          this.props.updateDescription(prevProps.description);
        }
      }


      // reset routine if one was previously selected
      if (this.props.id === 0 && typeof this.props.routine.subroutine !== "undefined") {
        this.props.updateId(this.props.routine.id);
        this.props.updateName(this.props.routine.name);
        this.props.updateActiveRoutine(this.props.routine);
        this.props.updateDescription(this.props.description);
        this.props.action(this.props.routine); // pass mode update back to QueryManager
      } else if (this.props.id === 0 && typeof this.props.availableRoutines[0] !== "undefined") {
        this.props.updateId(this.props.availableRoutines[0].attributes.id);
        this.props.updateName(this.props.availableRoutines[0].attributes.name);
        this.props.updateDescription(this.props.availableRoutines[0].attributes.description);
        this.props.updateActiveRoutine(this.props.availableRoutines[0].attributes);
        this.props.action(this.props.availableRoutines[0].attributes); // pass mode update back to QueryManager
      }

    }

    componentDidMount() {

    }

    handleChange(e) {
        this.setState({Routine: e.target.value});
        this.props.setInProgress(false);

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
        this.props.updateDescription(selectedRoutine.description);
        this.props.updateActiveRoutine(selectedRoutine);
        // this.props.action(selectedRoutine); // pass mode update back to QueryManager
    }

    render() {
        const { classes } = this.props;
        const { theme } = this.props;

        // split into assigned / system generated routines
        let upvotedRoutines = [];
        let routines = [];

        for (let i = 0; i < this.props.availableRoutines.length; i++) {
          if (this.props.availableRoutines[i].attributes.upvoted) {
            upvotedRoutines.push(this.props.availableRoutines[i]);
          } else {
            routines.push(this.props.availableRoutines[i]);
          }
        }

        let selectValue = this.props.id;

        // clean routine id for Material UI
        if (typeof(selectValue) === "undefined" || selectValue === 0) {
          selectValue = "";
        }



        return (
            <React.Fragment>
                 <FormControl fullWidth margin="dense">
                    <Select
                    classes={{select: theme === true ? classes.select : undefined}}
                    value={selectValue}
                    onChange={this.handleChange}
                    disabled={(routines.length === 0)}
                    input={<BootstrapInput name="routine" id="routine-customized-select" />}
                    >

                      { routines.map((item, i) => ( <MenuItem key={item.attributes.id} value={item.attributes.id}>{item.attributes.name}</MenuItem> )) }
                      {/* { ((upvotedRoutines.length > 0) && <ListSubheader>System Generated</ListSubheader> ) }
                      { upvotedRoutines.map((item, i) => ( <MenuItem key={item.attributes.id} value={item.attributes.id}>{item.attributes.name}</MenuItem> )) } */}
                    </Select>
                  </FormControl>

            </React.Fragment>
        );
    }
}

export default withStyles(styles)(RoutineSelect);
