import React from 'react';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Hidden from '@mui/material/Hidden';

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

// if (item.consonant !== null) consonant = availableCharacters.find(o => o.id === item.consonant);
// if (item.vowel !== null) vowel = availableCharacters.find(o => o.id === item.vowel);

// let parsedConsonant;

const PostContent = ({
  url,
  title,
  type,
  text,
  position,
  consonant,
  vowel,
  commentCount,
  showFullPost,
  ...details
}) => (
  <React.Fragment>
    <TableCell>
      <Typography
        color="textSecondary"
        variant="h5">
        {title}
      </Typography>
    </TableCell>
    <Hidden xsDown>
      <TableCell align="center">
        <Typography
          color="textSecondary">
          {position}
        </Typography>
      </TableCell>
    </Hidden>
    <Hidden xsDown>
      <TableCell align="center">
        <Typography
          color="textSecondary">
          {availableCharacters.find(o => o.id === consonant).name}
        </Typography>
      </TableCell>
    </Hidden>
    <Hidden xsDown>
      <TableCell align="center">
        <Typography
          color="textSecondary">
          {availableCharacters.find(o => o.id === vowel).name}
        </Typography>
      </TableCell>
    </Hidden>
  </React.Fragment>
);

export default PostContent;
