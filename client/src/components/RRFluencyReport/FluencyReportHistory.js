import React from 'react';
import { styles } from '../../themeHandler';
import { withStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { settingLabelLoader, audienceLabelLoader, intentionLabelLoader, easeLabelLoader } from './LabelLoaders';



class FluencyReportHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isEditClicked: false,
          currentRow: 0,
        };
        this.settingLoader = this.settingLoader.bind(this)
        this.deleteLoader  = this.deleteLoader.bind(this)
      }

     componentDidUpdate() {
      if(this.props.formData !== null) {
         localStorage.setItem(
          "Interactions",
          JSON.stringify(this.props.formData)
         );  
        }
      }

     handleChange = (i, propVal) => e => {
      let newVal;
      newVal = this.props.combinedData;
      newVal[i][propVal] = e.target.value;
      this.setState({isEditClicked: false})
      return this.props.mutateCombinedData(newVal)
    }
       
    

     settingLoader() {
      switch (this.props.setting) {
        case "1":
        return this.props.setting1
        case "2":
        return this.props.setting2
        case "3":
        return this.props.setting3
        case "4":
        return this.props.setting4
        case "5":
        return this.props.setting5
        case "6":
        return this.props.setting6
        default: 
        return this.props.formData;
      }
     }
     

     deleteLoader(value, settingVal) {
      let temp;
      let temp2;
      if(Array.isArray(value)) {
        this.props.resetFormData();
      }
      switch (settingVal) {
        case "1": 
        if(Array.isArray(value)) { 
          return this.props.deleteSetting1FormData(value)
        }
        else { 
          temp = this.props.setting1;
          temp.splice(value,1);
          temp2 = this.props.combinedData;
          temp2.splice(value,1);

          return this.props.mutateCombinedData(temp2)

        }
        case "2": 
        if(Array.isArray(value)) { 
          return this.props.deleteSetting2FormData(value)
        }
        else { 
          temp2 = this.props.combinedData;
          temp2.splice(value,1);
          return this.props.mutateCombinedData(temp2)
        }
        case "3": 
        if(Array.isArray(value)) { 
          return this.props.deleteSetting3FormData(value)
        }
        else { 
          temp2 = this.props.combinedData;
          temp2.splice(value,1);
          return this.props.mutateCombinedData(temp2)
        }
        case "4": 
        if(Array.isArray(value)) { 
          return this.props.deleteSetting4FormData(value)
        }
        else { 
          temp2 = this.props.combinedData;
          temp2.splice(value,1);
          return this.props.mutateCombinedData(temp2)
        }
        case "5": 
        if(Array.isArray(value)) { 
          return this.props.deleteSetting5FormData(value)
        }
        else { 
          temp2 = this.props.combinedData;
          temp2.splice(value,1);
          return this.props.mutateCombinedData(temp2)
        }
        case "6": 
        if(Array.isArray(value)) { 
          return this.props.deleteSetting6FormData(value)
        }
        else { 
          temp2 = this.props.combinedData;
          temp2.splice(value,1);
          return this.props.mutateCombinedData(temp2)
        }
        default: 
        return this.props.formData;
      }
     }     

    
  render() {
    const { classes } = this.props
  //  this.combineData();
return (
      this.props.combinedData.length !== 0 ?
    (!Array.isArray(this.props.combinedData) || this.props.combinedData.length === 0) ? '' : 
    <Paper className={classes.formTable}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="center">Date</TableCell>
          <TableCell align="center">Setting</TableCell>
          <TableCell align="center">Audience</TableCell>
          <TableCell align="center">Intention</TableCell>
          <TableCell align="center">Ease of Speech</TableCell>
          <TableCell align="center">Edit</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
         {this.props.combinedData.map((row,i) =>  (
          <TableRow key={i}>
              {console.log("is it reaching here")}
            <TableCell align="center" component="th" scope="row">
              {row.date}
            
            </TableCell>
            <TableCell align="center">

             { settingLabelLoader(row.setting) }
            
            </TableCell>
            <TableCell align="center">{this.state.isEditClicked === true && this.state.currentRow === i ? 
                  <FormControl>
                  <InputLabel>{audienceLabelLoader(row.audience)}</InputLabel>
                  <Select
                    style={{width: '80px', height: '40px'}}
                    onChange={this.handleChange(i, "audience")}
                  >
                    <MenuItem disabled="true" value={row.audience}>
                      <em>{audienceLabelLoader(row.audience)}</em>
                    </MenuItem>
                  { row.audience !== "1" ? <MenuItem value="1">Parents</MenuItem> : null}
                  { row.audience !== "2" ? <MenuItem value="2">Family</MenuItem> : null}
                  { row.audience !== "3" ? <MenuItem value="3">Significant Other</MenuItem> : null}
                  { row.audience !== "4" ? <MenuItem value="4">Friend</MenuItem> : null}
                  { row.audience !== "5" ? <MenuItem value="5">Coworker / Classmate</MenuItem> : null} 
                  { row.audience !== "6" ? <MenuItem value="6">Authority Figure</MenuItem> : null}
                  { row.audience !== "7" ? <MenuItem value="7">Service Worker</MenuItem> : null}
                  { row.audience !== "8" ? <MenuItem value="8">No Relationship</MenuItem> : null}
                   </Select>
                  </FormControl>
              :  
              audienceLabelLoader(row.audience)}
            </TableCell>
            <TableCell align="center">{this.state.isEditClicked === true && this.state.currentRow === i ? 
                  <FormControl>
                  <InputLabel>{ intentionLabelLoader(row.intention)}</InputLabel>
                  <Select 
                    style={{width: '100px', height: '80px'}}
                    onChange={this.handleChange(i, "intention")}
                  >
                    <MenuItem disabled="true" value={row.intention}>
                      <em>{ intentionLabelLoader(row.intention)}</em>
                    </MenuItem>
                    { row.intention !== "1" ? <MenuItem value="1">I did not use or remember</MenuItem> : null}
                    { row.intention !== "5" ? <MenuItem value="5">I remembered but did not use</MenuItem> : null} 
                    { row.intention !== "10" ? <MenuItem value="10">I remembered and used</MenuItem> : null}
                   </Select>
                  </FormControl>
              :  
              intentionLabelLoader(row.intention)}
            </TableCell>
            <TableCell align="center">{this.state.isEditClicked === true && this.state.currentRow === i ? 
                  <FormControl>
                  <InputLabel>{easeLabelLoader(row.ease)}</InputLabel>
                  <Select
                    style={{width: '90px', height: '60px'}}
                    onChange={this.handleChange(i, "ease")}
                  >
                    <MenuItem disabled="true" value={row.ease}>
                      <em>{easeLabelLoader(row.ease)}</em>
                    </MenuItem>
                    { row.ease !== "1" ? <MenuItem value="1">Speech was difficult</MenuItem> : null} 
                    { row.ease !== "4" ? <MenuItem value="4">Speech was less difficult</MenuItem> : null}
                    { row.ease !== "7" ? <MenuItem value="7">Speech was easier</MenuItem> : null}
                    { row.ease !== "10" ? <MenuItem value="10">Speech was easy</MenuItem> : null}
                  </Select>
                </FormControl>
              :  
              easeLabelLoader(row.ease)}
            </TableCell>
            <TableCell align="center">
                <Button key={i} style={{backgroundColor: '#1cd632'}} color="primary"variant="contained" size="small" onClick={() => this.setState({isEditClicked: true, currentRow: i})}><b>Edit</b></Button>
                {this.state.isEditClicked === true && this.state.currentRow === i ? <Button style={{backgroundColor: 'grey'}} key={i} color="primary"variant="contained" size="small" onClick={() => this.setState({isEditClicked: false})}><b>Cancel</b></Button> : ''}
                <Button color="primary"variant="contained" size="small" onClick={() => this.deleteLoader(i, row.setting)}><b>Delete</b></Button>
          </TableCell>
          </TableRow> 
        ))} 
      </TableBody>
    </Table>
    <Button style={{marginTop: 15}}align="right" type="button" variant="contained" color = "primary" size="small" onClick={() => this.deleteLoader([])}><b>Clear History</b></Button>
  </Paper> : null
);
}
}

const FluencyReportHistoryWrapped = withStyles(styles)(FluencyReportHistory);
export default FluencyReportHistoryWrapped;