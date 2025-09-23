import React from 'react';
import PostVoteContainer from './Vote/Container';
import Grid from '@material-ui/core/Grid';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';

import { withStyles } from "@material-ui/core/styles";
import { styles } from '../../themeHandler';

const WordHistory = function({ wordid, id, votes, score, comments, full, title, type, ...content }) {

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


const WordHistoryWrapped = withStyles(styles)(WordHistory);

export default withWidth()(WordHistoryWrapped);


{/* <Grid container spacing={1} justify="center">
        {sentence}
      </Grid> */}