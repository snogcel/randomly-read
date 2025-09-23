import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from "@material-ui/core/FormControl";
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from "@material-ui/core/styles";
import ListSubheader from '@material-ui/core/ListSubheader';

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
    maxWidth: 150,
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
      if (typeof this.props.user !== "undefined") this.prepareRoutineSelect();
    }

    prepareRoutineSelect(){
      this.props.fetchAssignedRoutines(this.props.token);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

      if (typeof this.props.isVoting !== "undefined") {
        if ((prevProps.isVoting !== this.props.isVoting) && !this.props.isVoting) { // fetch updated routines

          this.props.fetchAssignedRoutines();
          this.props.updateId(prevProps.id);
          this.props.updateName(prevProps.name);
          this.props.updateDescription(prevProps.description);

        }
      }

      if (typeof this.props.isInteractionVoting !== "undefined") {
        if ((prevProps.isInteractionVoting !== this.props.isInteractionVoting) && !this.props.isInteractionVoting) { // fetch updated routines

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
        this.props.action(selectedRoutine); // pass mode update back to QueryManager
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

        return (
            <React.Fragment>

                 <FormControl style={{minWidth: 125 }}>
                    <Select
                    classes={{select: theme === true ? classes.select : undefined}}
                    value={this.props.id}
                    onChange={this.handleChange}
                    displayEmpty
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
