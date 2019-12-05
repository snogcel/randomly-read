import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import moment from 'moment-timezone';
import Hidden from '@material-ui/core/Hidden';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Button from '@material-ui/core/Button';

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  table: {
  },
}));

const useStyles2 = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  table: {
  },
  tableWrapper: {
    overflowX: 'auto',
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

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <Hidden xsDown><IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton></Hidden>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <Hidden xsDown><IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton></Hidden>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function InteractionTable(props) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
        "createdAt": moment(item.createdAt).tz("America/New_York").format('YYYY-MM-DD'),
        "updatedAt": item.updatedAt
      });
    });

    return rows;
  }

  let rows = parseInteractions(props.interactions);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <Hidden xsDown><TableCell align="center">Date</TableCell></Hidden>
                <TableCell align="center">Word</TableCell>
                <Hidden xsDown><TableCell align="center">Consonant</TableCell></Hidden>
                <Hidden xsDown><TableCell align="center">Vowel</TableCell></Hidden>
                <TableCell align="center">Ease</TableCell>
                <Hidden xsDown><TableCell align="center"></TableCell></Hidden>
              </TableRow>
            </TableHead>
            <TableBody>

              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                <TableRow key={row.word}>
                  <Hidden xsDown><TableCell align="center">{row.createdAt}</TableCell></Hidden>
                  <TableCell align="center">{row.word}</TableCell>
                  <Hidden xsDown><TableCell align="center">{row.consonant}</TableCell></Hidden>
                  <Hidden xsDown><TableCell align="center">{row.vowel}</TableCell></Hidden>
                  <TableCell align="center">{row.ease}</TableCell>
                  <Hidden xsDown><TableCell align="center"><Button onClick={(e) => { e.preventDefault(); props.action(row.id); }}>Delete</Button></TableCell></Hidden>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}

            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5]}
                  colSpan={6}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
  );
}
