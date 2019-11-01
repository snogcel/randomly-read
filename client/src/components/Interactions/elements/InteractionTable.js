import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

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

export default function InteractionTable(props) {
  const classes = useStyles();

  function parseInteractions(interactions) {

    const rows = [];

    interactions.map((item) => (
      rows.push({ "word": item.word, "ease": item.ease, "createdAt": new Date(item.createdAt).toDateString(), "updatedAt": item.updatedAt })
    ));

    return rows;
  }

  let rows = parseInteractions(props.interactions);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Word Spoken</TableCell>
            <TableCell align="center">Ease of Speech</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.createdAt}>
              <TableCell align="center">{row.word}</TableCell>
              <TableCell align="center">{row.ease}</TableCell>
              <TableCell align="center"><Button onClick={(e) => { e.preventDefault(); props.action(row.id); }}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
