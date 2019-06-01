import React from 'react'
import Typography from '@material-ui/core/Typography';


class Intermission extends React.Component {

    render() {
    return (
    <Typography style={{color: this.props.dark === true ? 'white' : 'black'}} variant='h2' component='h2' align='center'>{this.props.intermissionText}</Typography>
    )
    }

}


export default Intermission;