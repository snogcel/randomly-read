import React from 'react';
import ReactGA from "react-ga4";


// import { withRouter } from 'react-router';
import { useNavigate } from 'react-router-dom';


import Identities from './Identities/Identities';
import { styles } from '../../exerciseThemeHandler';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';

class Subnavigation extends React.Component {

  onChange = e => {

    // Extract value of select like so. Use parseInt for
    // improved type safety
    const selectedMode = parseInt(e.target.value);

    this.props.selectSiteMode(selectedMode);
    
    // Update distance in state via setState()
    // this.setState({ appMode : selectedMode });

    let pathname = Identities[selectedMode].pathname[0];
    let routineId = Identities[selectedMode].user.routines[0];
    let alias = Identities[selectedMode].alias;


    console.log(selectedMode);
    console.log(pathname);
    console.log(routineId);
    console.log(alias);

    if (this.props.history.location.pathname !== pathname) {
      this.props.setInProgress(false);
      this.props.setExercisePause(false);
      this.props.updateTime(0);
      this.props.updateTimeLeft(0);
      this.props.resetRoutineSelect();
      this.props.clearQueryResults();
      this.props.resetWordCard();
      this.props.updateId(routineId);
      this.props.history.push({pathname});

      if (alias !== 'Home') {
        document.title = 'EasyOnset.com | ' + alias + ' Introduction';
      } else {
        document.title = 'EasyOnset.com';
      }

      const GA_ID = 'G-HZ4HM6M2GK'; // your google analytics id
      ReactGA.initialize(GA_ID);
      ReactGA.send({ hitType: "pageview", page: pathname });      
    }

  }

  componentDidMount() {
    this.props.updateId(0);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  handleClick(e, pathname, routineId, alias) {
    
    if (this.props.history.location.pathname !== pathname) {
      this.props.setInProgress(false);
      this.props.setExercisePause(false);
      this.props.updateTime(0);
      this.props.updateTimeLeft(0);
      this.props.resetRoutineSelect();
      this.props.clearQueryResults();
      this.props.resetWordCard();
      this.props.updateId(routineId);
      this.props.history.push({pathname});

      if (alias !== 'Home') {
        document.title = 'EasyOnset.com | ' + alias + ' Introduction';
      } else {
        document.title = 'EasyOnset.com';
      }

      const GA_ID = 'G-HZ4HM6M2GK'; // your google analytics id
      ReactGA.initialize(GA_ID);
      ReactGA.send({ hitType: "pageview", page: pathname });      
    }
  }

  render() {
    const { history, classes, mode } = this.props;

    let selectedMode = 0;

    // identify active mode
    for (let i = 0; i < Identities.length; i++) {
      if (Identities[i].pathname.indexOf(history.location.pathname) !== -1) {
        selectedMode = i;
      }
    }

    return (
      <React.Fragment>
        
        <Box className={classes.modeSelectContainer}>
          <FormHelperText className={classes.modeHelperText}>Select Training Mode</FormHelperText>

          <FormControl>
            <Select
              labelId="mode-simple-select-label"
              id="mode-simple-select"
              value={selectedMode}
              label="Difficulty"
              className={classes.modeSelect}
              onChange={this.onChange}
            >
              { Identities.filter(function(item) {
                if (item.navigation === false) {
                  return false; // skip
                }
                return true;
              }).map((item, i) => (
                <MenuItem key={i+"_text"} value={i} sx={{ justifyContent: 'flex-end' }}>{item.alias}</MenuItem>                
              )) }  
            </Select>            
          </FormControl>        
        </Box>
        
      </React.Fragment>
    );
    
  }
}

const SubnavigationWrapped = withRouter(withStyles(styles)(Subnavigation));
// const SubnavigationWrapped = withStyles(styles)(Subnavigation);

export default SubnavigationWrapped;
