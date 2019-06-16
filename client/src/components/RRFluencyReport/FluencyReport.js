import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import FluencyReportForm from './FluencyReportFormContainer';
import FluencyReportHistory from './FluencyReportHistoryContainer'

const styles = theme => ({
    root: {
      flexGrow: 1,
      padding: 25
    },
    column: {
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    sideColumn: {
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    sideTitle: {
      fontSize: 18
    },
    exerciseHeadline: {
      margin: "0.25em"
    },
  });

const FluencyReport = props => {

    const {classes} = props;

    return (
        <div className={classes.root}>
              <Card elevation="1" className={classes.column}>
                <CardContent>
                    <FluencyReportForm/>
                    <FluencyReportHistory/>
                </CardContent>
              </Card>
        </div>

    )

}

const FluencyReportWrapped = withStyles(styles)(FluencyReport);

export default FluencyReportWrapped;
