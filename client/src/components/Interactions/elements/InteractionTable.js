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

const availableCharacters = [
  { id: "AA", name: "ɑ"},
  { id: "AE", name: "æ"},
  { id: "AH", name: "ʌ"},
  { id: "AO", name: "ɔ"},
  { id: "AW", name: "aʊ"},
  { id: "AY", name: "aɪ"},
  { id: "EH", name: "ɛ"},
  { id: "ER", name: "ɝ"},
  { id: "EY", name: "eɪ"},
  { id: "IH", name: "ɪ"},
  { id: "IY", name: "i"},
  { id: "OW", name: "oʊ"},
  { id: "OY", name: "ɔɪ"},
  { id: "UH", name: "ʊ"},
  { id: "UW", name: "u"},
  { id: "B", name: "b"},
  { id: "CH", name: "tʃ"},
  { id: "D", name: "d"},
  { id: "DH", name: "ð"},
  { id: "F", name: "f"},
  { id: "G", name: "g"},
  { id: "HH", name: "h"},
  { id: "JH", name: "dʒ"},
  { id: "K", name: "k"},
  { id: "L", name: "l"},
  { id: "M", name: "m"},
  { id: "N", name: "n"},
  { id: "P", name: "p"},
  { id: "R", name: "ɹ"},
  { id: "S", name: "s"},
  { id: "SH", name: "ʃ"},
  { id: "T", name: "t"},
  { id: "TH", name: "θ"},
  { id: "V", name: "v"},
  { id: "W", name: "w"},
  { id: "Y", name: "j"},
  { id: "Z", name: "Z"},
  { id: "ZH", name: "ʒ"}
];

export default function InteractionTable(props) {
  const classes = useStyles();

  function parseInteractions(interactions) {
    
    const rows = [];

    interactions.map(function(item) {

      console.log(item.consonant);

      let consonant = "N/A";
      let vowel = "N/A";

      if (item.consonant !== null) consonant = availableCharacters.find(o => o.id === item.consonant);
      if (item.vowel !== null) vowel = availableCharacters.find(o => o.id === item.vowel);

      rows.push({
        "id": item.id,
        "word": item.word,
        "vowel": vowel.name,
        "consonant": consonant.name,
        "ease": item.ease,
        "createdAt": new Date(item.createdAt).toDateString(),
        "updatedAt": item.updatedAt
      });
    });

    return rows;
  }

  let rows = parseInteractions(props.interactions);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Word</TableCell>
            <TableCell align="center">Consonant</TableCell>
            <TableCell align="center">Vowel</TableCell>
            <TableCell align="center">Ease of Speech</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.createdAt}>
              <TableCell align="center">{row.word}</TableCell>
              <TableCell align="center">{row.consonant}</TableCell>
              <TableCell align="center">{row.vowel}</TableCell>
              <TableCell align="center">{row.ease}</TableCell>
              <TableCell align="center"><Button onClick={(e) => { e.preventDefault(); props.action(row.id); }}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
