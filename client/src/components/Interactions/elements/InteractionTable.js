import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from "./InteractionForm";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

/*
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
*/

export default function InteractionTable(props) {
  const classes = useStyles();

  function parseInteractions(interactions) {

    const rows = [];

    interactions.map((item) => (
      rows.push({ "setting": item.setting, "audience": item.audience, "intention": (item.intention ? "Yes" : "No"), "applied": (item.applied ? "Yes" : "No"), "ease": item.ease, "createdAt": item.createdAt, "updatedAt": item.updatedAt })
    ));

    return rows;
  }

  let rows = parseInteractions(props.interactions);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Setting</TableCell>
            <TableCell align="center">Audience</TableCell>
            <TableCell align="center">Remembered your Intention</TableCell>
            <TableCell align="center">Spoke with Intention</TableCell>
            <TableCell align="center">Ease of Speech</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.createdAt}>
              <TableCell component="th" scope="row">
                {row.setting}
              </TableCell>
              <TableCell align="center">{row.audience}</TableCell>
              <TableCell align="center">{row.intention}</TableCell>
              <TableCell align="center">{row.applied}</TableCell>
              <TableCell align="center">{row.ease}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
