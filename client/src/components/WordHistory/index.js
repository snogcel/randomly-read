import React from 'react';
import PostVoteContainer from './Vote/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';

import { styled } from "@mui/material/styles";
import { styles } from '../../themeHandler';

const WordHistory = function({ wordid, id, votes, score, comments, full, title, type, width, ...content }) {
  const theme = useTheme();
  const classes = styles(theme);
  
  // Use useMediaQuery to replace withWidth if width is not provided
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isXl = useMediaQuery(theme.breakpoints.only('xl'));
  
  if (!width) {
    if (isXl) width = 'xl';
    else if (isLg) width = 'lg';
    else if (isMd) width = 'md';
    else if (isSm) width = 'sm';
    else width = 'xs';
  }

  if (type === "sentence") {

    let sentence = [];
    let fullSentence = " ";

    for (let i = 0; i < title.length; i++) {
      sentence.push(<PostVoteContainer className={styles.wordHistoryContainer} key={title[i].id} wordid={title[i].wordid} id={title[i].id} votes={title[i].votes} score={title[i].score} title={title[i].title}/>);
      fullSentence += title[i].title + " "
    }

    return (
      <PostVoteContainer key={id} wordid={wordid} id={id} votes={votes} score={score} title={fullSentence} className={styles.wordHistoryContainer}/>
    )

  } else {

    return (
      <PostVoteContainer key={id} wordid={wordid} id={id} votes={votes} score={score} title={title} className={styles.wordHistoryContainer}/>
    )

  }
};


export default WordHistory;


{/* <Grid container spacing={1} justify="center">
        {sentence}
      </Grid> */}