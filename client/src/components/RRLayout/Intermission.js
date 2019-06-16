import React from 'react'
import Typography from '@material-ui/core/Typography';

const Intermission = props => {



      return (
        <Typography style={{color: props.dark === true ? 'white' : '#dba987'}} variant='h1' component='h1' align='center'>{props.intermissionText}</Typography>
      )
}


export default Intermission;
