import React from 'react';
import Select from '@material-ui/core/Select';
import Routines from './Routines.js';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from "@material-ui/core/FormControl";

class RoutineSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Routine: ""
        };


        this.handleChange = this.handleChange.bind(this);

        this.options = [];
        for (let i = 0; i < Routines.length; i++) {
            this.options.push({ value: Routines[i].name });
        }

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

        /* let obj = {
            duration: 39,
            rangeVal: 13,
            map: 'randomly',
            mode: 'Word',
            limit: 1,
            vowels: ["EY"],
            consonants: [
                ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
                ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
                ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
            ],
            templates: [],
            syllables: ["2"],
            repetitions: 3
        };
 */
        this.props.action(selectedRoutine); // pass mode update back to QueryManager
    }

    render() {
        return (
            <React.Fragment>
                 <FormControl style={{minWidth: 150}}>
                 <InputLabel htmlFor="age-simple">Select Routine</InputLabel>
                  <Select
                  value={this.state.Routine}
                  onChange={this.handleChange}
                  >
                 <MenuItem value={""}>
                 <em>None</em>      
                 </MenuItem>
                {this.options.map((item, i) => (
                    
                <MenuItem value={item.value}>{item.value}</MenuItem>
                    
                ))}

                  </Select>
                  </FormControl>
            </React.Fragment>
        );
    }
}

export default RoutineSelect;