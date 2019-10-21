import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import LoadingIndicatorBox from '../shared/LoadingIndicator/Box';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import store from "../../store";

import LoginFormContainer from '../LoginForm/Container';
import { styles } from '../../themeHandler';

class RoutineBuilder extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    if (typeof this.props.user !== "undefined") this.prepareRoutineBuilder();
  }

  prepareRoutineBuilder(){

  }

  componentDidMount() {

  }

  render() {

    const { user } = this.props;

    return (

      <Grid container>

        {user ? (
          <>



          </>
        ) : (
          <>
            <LoginFormContainer/>
          </>
        )}

      </Grid>

    )

  }
}

const RoutineBuilderWrapped = withStyles(styles)(RoutineBuilder);

export default RoutineBuilderWrapped;
