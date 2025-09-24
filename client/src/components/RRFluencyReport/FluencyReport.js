import React from 'react';
import { withStyles } from '@mui/styles';
import { styled } from "@mui/material/styles";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import FluencyReportForm from './FluencyReportForm';
import FluencyReportHistory from './FluencyReportHistoryContainer'
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
      flexGrow: 1,
      padding: 25
    },
    column: {
      marginTop: theme.spacing(4),
      position: 'center',
      bottomPadding: 50,
      width: 1150,
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    sideColumn: {
      padding: theme.spacing(2),
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
    console.log("PROPS", props)
    return (
            <div className={classes.root}>
            <Grid container spacing={0} direction="row" alignItems="center" justify="center">
              <Grid item>
              <Card elevation="1" className={classes.column}>
              <Typography className={classes.title} variant="h4" align="center">Speaking at Work or School</Typography>
                <CardContent>
                    <FluencyReportForm form={"Setting1Form"} initialValues={{"setting": "1",}} setting={"1"}/>
                </CardContent>
              </Card>
              </Grid>

            <Grid item>
              <Card elevation="1" className={classes.column}>
              <Typography className={classes.title} variant="h4" align="center">Speaking on the Phone</Typography>
                <CardContent>
                    <FluencyReportForm form={"Setting2Form"} initialValues={{"setting": "2",}}/>
                </CardContent>
              </Card>
              </Grid>
              <Grid item>
              <Card elevation="1" className={classes.column}>
              <Typography className={classes.title} variant="h4" align="center">Presenting a Topic</Typography>
                <CardContent>
                    <FluencyReportForm form={"Setting3Form"} initialValues={{"setting": "3",}}/>
                </CardContent>
              </Card>
              </Grid>
              <Grid item>
              <Card elevation="1" className={classes.column}>
              <Typography className={classes.title} variant="h4" align="center">Attending a Social Event</Typography>
                <CardContent>
                    <FluencyReportForm form={"Setting4Form"} initialValues={{"setting": "4",}} setting={"4"}/>
                </CardContent>
              </Card>
              </Grid>
              <Grid item>
              <Card elevation="1" className={classes.column}>
              <Typography className={classes.title} variant="h4" align="center">Relaxing with Friends</Typography>
                <CardContent>
                    <FluencyReportForm form={"Setting5Form"} initialValues={{"setting": "5",}} setting={"5"}/>
                </CardContent>
              </Card>
              </Grid>
              <Grid item>
              <Card elevation="1" className={classes.column}>
              <Typography className={classes.title} variant="h4" align="center">Relaxing at Home</Typography>
                <CardContent>
                    <FluencyReportForm form={"Setting6Form"} initialValues={{"setting": "6","intention": 0}} setting={"6"}/>
                </CardContent>
              </Card>
              </Grid>
              {props.combinedData.length !== 0 ?
              <Grid item>
              <Card elevation="1" className={classes.column}>
              <Typography className={classes.title} variant="h4" align="center">History</Typography>
                <CardContent>
                <FluencyReportHistory/>
                </CardContent>
              </Card>
              </Grid> : null }
              </Grid>
            </div>

    )

}

const FluencyReportWrapped = withStyles(styles)(FluencyReport);

const mapStateToProps = state => ({
 combinedData: state.formData.combinedData
});

const mapDispatchToProps = { };

const FluencyReportContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FluencyReportWrapped);

export default FluencyReportContainer;
