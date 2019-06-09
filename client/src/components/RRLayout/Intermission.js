import React from 'react'
import Typography from '@material-ui/core/Typography';


const Intermission = props => (
    <Typography style={{color: props.dark === true ? 'white' : 'black'}} variant='h2' component='h2' align='center'>{props.intermissionText}</Typography>
     );
    
export default Intermission;