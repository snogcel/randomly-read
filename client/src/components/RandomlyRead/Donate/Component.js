import React from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import { styled } from "@mui/material/styles";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ListItemIcon from "@mui/material/ListItemIcon";
import List from '@mui/material/List';
import CheckboxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';

import { styles } from '../../../exerciseThemeHandler';

class BuyMeACoffee extends React.Component {
    constructor(props){
        super(props)
        let script = document.createElement("script");
        script.setAttribute('data-name','BMC-Widget')
        script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        script.setAttribute('data-id', 'easyonset');
        script.setAttribute('data-description', 'Thank you for your support!');
        script.setAttribute('data-message', 'Easy Onset is free to use, please help support the site.');
        script.setAttribute('data-color',"#FF5F5F")
        script.setAttribute('data-position','right')
        script.setAttribute('data-x_margin','24')
        script.setAttribute('data-y-margin','24')
        script.async = true
        //Call window on load to show the image
        script.onload=function(){
            var evt = document.createEvent('Event');  
            evt.initEvent('DOMContentLoaded', false, false);  
            window.dispatchEvent(evt);
        }
        this.script=script
    }

    componentDidMount () {    
        document.head.appendChild(this.script)
    }

    componentWillUnmount(){
        document.head.removeChild(this.script);
        document.body.removeChild(document.getElementById("bmc-wbtn"))
     }

    render(){
        return(null)
    }
}

// BuyMeACoffee.propTypes removed - no longer using withWidth

const BuyMeACoffeeWrapped = withStyles(styles)(BuyMeACoffee);

export default BuyMeACoffeeWrapped;