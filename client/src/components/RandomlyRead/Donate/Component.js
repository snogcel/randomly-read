import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from '@material-ui/core/List';
import CheckboxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import withWidth from '@material-ui/core/withWidth';
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

BuyMeACoffee.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

const BuyMeACoffeeWrapped = withStyles(styles)(BuyMeACoffee);

export default withWidth()(BuyMeACoffeeWrapped);