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

class FluencyReportHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isEditClicked: false,
          currentRow: 0
        };
      }

      
  componentDidUpdate() {
    localStorage.setItem(
      "Interactions",
      JSON.stringify(this.props.formData)
    );
  }



          handleChange = (i, setting) => e => {
                let obj = this.props.formData;
                obj[i][setting] = e.target.value;
                this.props.addInitialFormData(obj);
                this.setState({isEditClicked: false})
                
          }
    
render() {

    console.log("History", this.props.formData)
    console.log(!Array.isArray(  this.props.formData) || !  this.props.formData)
    const { classes } = this.props
return (
    (!Array.isArray(this.props.formData) || !this.props.formData.length) ? '' : 
    <Paper className={classes.formTable}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell align="right">Setting</TableCell>
          <TableCell align="right">Audience</TableCell>
          <TableCell align="right">Intention</TableCell>
          <TableCell align="right">Ease of Speech</TableCell>
          <TableCell align="right">Edit</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {this.props.formData.map((row,i) => (
          <TableRow key={i}>
            <TableCell component="th" scope="row">
              {row.date}
            </TableCell>
            <TableCell align="right"> {this.state.isEditClicked === true && this.state.currentRow === i ? 
                  <FormControl style={{width: '40px'}}>
                  <InputLabel>{row.setting}</InputLabel>
                  <Select
                    onChange={this.handleChange(i, "setting")}
                  >
                    <MenuItem value={row.setting}>
                      <em>{row.setting}</em>
                    </MenuItem>
                    <MenuItem value="1">1: Speaking at Work or School </MenuItem> 
                    <MenuItem value="2">2: Speaking on the Phone </MenuItem> 
                    <MenuItem value="3">3: Presenting a Topic </MenuItem>
                    <MenuItem value="4">4: Attending a Social Event</MenuItem> 
                     <MenuItem value="5">5: Relaxing with Friends</MenuItem> 
                 <MenuItem value="6">6: Relaxing at Home</MenuItem>
                  </Select>
                </FormControl>
              :  
            
            row.setting}
            
            </TableCell>
            <TableCell align="right">{this.state.isEditClicked === true && this.state.currentRow === i ? 
                  <FormControl style={{width: '40px'}}>
                  <InputLabel>{row.audience}</InputLabel>
                  <Select
                    onChange={this.handleChange(i, "audience")}
                  >
                    <MenuItem value={row.audience}>
                      <em>{row.audience}</em>
                    </MenuItem>
                    <MenuItem value="1">1: Parents</MenuItem>
          <MenuItem  value="2">2: Family</MenuItem>
          <MenuItem value="3">3: Significant Other</MenuItem> 
          <MenuItem value="4">4: Friend</MenuItem>
          <MenuItem value="5">5: Coworker / Classmate </MenuItem>
          <MenuItem value="6">6: Authority Figure</MenuItem>
          <MenuItem value="7">7: Service Worker</MenuItem>
          <MenuItem value="7">8: No Relationship</MenuItem>
                  </Select>
                </FormControl>
              :  
            
            row.audience}
            </TableCell>
            <TableCell align="right">{this.state.isEditClicked === true && this.state.currentRow === i ? 
                  <FormControl style={{width: '40px'}}>
                  <InputLabel>{row.intention}</InputLabel>
                  <Select
                    onChange={this.handleChange(i, "intention")}
                  >
                    <MenuItem value={row.intention}>
                      <em>{row.intention}</em>
                    </MenuItem>
                    <MenuItem value="1">1: I did not use or remember</MenuItem>
          <MenuItem value="5">5: I remembered but did not use</MenuItem>
          <MenuItem value="10">10: I remembered and used</MenuItem>
                  </Select>
                </FormControl>
              :  
            
            row.intention}
            </TableCell>
            <TableCell align="right">{this.state.isEditClicked === true && this.state.currentRow === i ? 
                  <FormControl style={{width: '40px'}}>
                  <InputLabel>{row.ease}</InputLabel>
                  <Select
                    onChange={this.handleChange(i, "ease")}
                  >
                    <MenuItem value={row.ease}>
                      <em>{row.ease}</em>
                    </MenuItem>
                     <MenuItem value="1">1: Speech is difficult</MenuItem>
          <MenuItem value="4">4: Speech was less difficult</MenuItem>
          <MenuItem value="7">7: Speech was easier</MenuItem>
          <MenuItem value="10">10: Speech was easy</MenuItem>
                  </Select>
                </FormControl>
              :  
            
            row.ease}
            </TableCell>
            <TableCell align="right">
                <Button key={i} style={{backgroundColor: '#1cd632'}} color="primary"variant="contained" size="small" onClick={() => this.setState({isEditClicked: true, currentRow: i})}><b>Edit</b></Button>
                {this.state.isEditClicked === true && this.state.currentRow === i ? <Button key={i} color="primary"variant="contained" size="small" onClick={() => this.setState({isEditClicked: false})}><b>Cancel</b></Button> : ''}
      </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

}

}

const FluencyReportHistoryWrapped = withStyles(styles)(FluencyReportHistory);
export default FluencyReportHistoryWrapped;