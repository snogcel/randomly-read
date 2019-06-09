import React from 'react'
import Typography from '@material-ui/core/Typography';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import themes from '../../themes';

class Intermission extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {

      return (
        <Typography style={{color: this.props.dark === true ? 'white' : '#dba987'}} variant='h1' component='h1' align='center'>{this.props.intermissionText}</Typography>
      )
    }

}


export default Intermission;
