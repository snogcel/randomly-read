import React from 'react';
import { styled, useTheme } from "@mui/material/styles";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { useQuery, gql } from '@apollo/client';

import RoutinePreviewBuilder from '../../RRLayout/RoutineBuilder';

import Word from '../../RRLayout/elements/Word';

import { styles } from '../../../themeHandler';

const RoutinePreview = (props) => {
  const [query, setQuery] = React.useState(null);
  const routinePreviewBuilder = React.useRef(new RoutinePreviewBuilder());
  const resultRef = React.useRef("");
  const fetchingRef = React.useRef(true);

  const refreshQuery = React.useCallback(() => {
    let newQuery = buildQuery();
    setQuery(newQuery);
  }, [props.routineStep]);

  React.useEffect(() => {
    refreshQuery();
  }, [refreshQuery]);

  const buildQuery = React.useCallback(() => {
    let routine = props.routineStep;

    let routineStep = {};
    // routine.repetitions = 1; // hard code to one repetition (for preview purposes);

    // Stub out exerciseConfig
    let duration = (parseInt(routine.repetitions) * parseInt(routine.rangeVal));

    routine.duration = duration; // calculation exercise duration
    routine.templates = []; // for future functionality
    routine.limit = 1; // for future functionality
    (routine.mode === "Word") ? routine.map = "randomly" : routine.map = "default";

    switch (routine.map) {
      case 'default':
        routineStep = routinePreviewBuilder.current.build(routine);
        console.log("Exercise Map", routineStep);
        break;
      case 'randomly':
        routineStep = routinePreviewBuilder.current.buildRandomly(routine);
        console.log("Exercise Map", routineStep);
        break;
      case 'intermission':
        routineStep = routinePreviewBuilder.current.buildIntermission(routine);
        console.log("Exercise Map (Intermission)", routineStep);
        break;
      default:
        break;
    }

    let routineConfig = routineStep.values().next().value || {};

    let vowel = JSON.stringify(routineConfig.vowel);
    let consonant = JSON.stringify(routineConfig.consonant);
    let syllables = JSON.stringify(routineConfig.syllables);
    let limit = parseInt(routineConfig.limit);
    let position = JSON.stringify(routineConfig.position);

    switch(routineConfig.mode) {
      case 'Sentence':
        if (routineConfig.consonant.length > 0 && routineConfig.vowel.length > 0) {
          return gql`
                {
                    sentences(vowel: ${vowel}, consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}, position: ${position}) {                    
                        words {
                          id
                          votes {
                            user
                            vote
                          }
                          score
                          cmudict_id
                          lexeme
                        }                       
                    }
                }
                `;
        } else if (routineConfig.consonant.length > 0 && !routineConfig.vowel.length > 0) {
          return gql`
                {
                    sentences(consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}, position: ${position}) {                    
                        words {
                          id
                          votes {
                            user
                            vote
                          }
                          score
                          cmudict_id
                          lexeme
                        }                       
                    }
                }
                `;
        } else if (!routineConfig.consonant.length > 0 && routineConfig.vowel.length > 0) {
          return gql`
                {
                    sentences(vowel: ${vowel}, syllables: ${syllables}, limit: ${limit}, position: ${position}) {                    
                        words {
                          id
                          votes {
                            user
                            vote
                          }
                          score
                          cmudict_id
                          lexeme
                        }                       
                    }
                }
                `;
        } else {
          return gql`
                {
                    sentences(syllables: ${syllables}, limit: ${limit}, position: ${position}) {                    
                        words {
                          id
                          votes {
                            user
                            vote
                          }
                          score
                          cmudict_id
                          lexeme
                        }
                    }
                }
                `;
        }

      case 'Word':
        if (routineConfig.consonant.length > 0 && routineConfig.vowel.length > 0) {
          return gql`
                {
                    words(vowel: ${vowel}, consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}, position: ${position}) {                    
                        id
                        votes {
                          user
                          vote
                        }
                        score
                        cmudict_id
                        lexeme                        
                    }
                }
                `;
        } else if (routineConfig.consonant.length > 0 && !routineConfig.vowel.length > 0) {
          return gql`
                {
                    words(consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}, position: ${position}) {                    
                        id
                        votes {
                          user
                          vote
                        }
                        score
                        cmudict_id
                        lexeme                        
                    }
                }
                `;
        } else if (!routineConfig.consonant.length > 0 && routineConfig.vowel.length > 0) {
          return gql`
                {
                    words(vowel: ${vowel}, syllables: ${syllables}, limit: ${limit}, position: ${position}) {                    
                        id
                        votes {
                          user
                          vote
                        }
                        score
                        cmudict_id
                        lexeme                        
                    }
                }
                `;
        } else {
          return gql`
                {
                    words(syllables: ${syllables}, limit: ${limit}, position: ${position}) {                    
                        id
                        votes {
                          user
                          vote
                        }
                        score
                        cmudict_id
                        lexeme                        
                    }
                }
                `;
        }

      default:
        console.log("No Query...");
        return null;
    }
  }, [props.routineStep]);

  const { classes } = props;
  
  // Use useQuery hook
  const { loading, error, data, refetch } = useQuery(query, {
    skip: !query,
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
    variables: { v: Math.random() },
    onCompleted: () => {
      // Handle completion if needed
    }
  });

  fetchingRef.current = true;

  // Process data when available
  React.useEffect(() => {
    if (data) {
      // check if data object is empty
      if (Object.keys(data).length === 0 && data.constructor === Object) {
        resultRef.current = null;
        refetch();
        return;
      }

      // check if word is a repeat...
      if (props.routineStep.mode === 'Word' && data.words) {
        if (resultRef.current === data.words.lexeme && fetchingRef.current) { // if repeat word, refetch
          refetch();
        }

        if (resultRef.current !== data.words.lexeme && fetchingRef.current) { // if new result, store and display
          resultRef.current = data.words.lexeme; // assign word to result
          fetchingRef.current = false;
        }

      } else if (props.routineStep.mode === 'Sentence' && (typeof data.sentences !== "undefined") && data.sentences.words.length > 0) { // if we are fetching sentences

        // build result
        let result = "";

        for (let i = 0; i < data.sentences.words.length; i++) {
          result += data.sentences.words[i].lexeme;
          if (i < (data.sentences.words.length - 1)) result += " ";
        }

        if (resultRef.current !== result) { // if new result, store and display
          resultRef.current = result; // assign newly generated sentence to result
          fetchingRef.current = false;
        }
      }
    }
  }, [data, props.routineStep.mode, refetch]);

  console.log("loading: ", loading);

  // Handle error state
  if (error) {
    resultRef.current = null;
    fetchingRef.current = false;

    const errorContent = (
      <div>
        <Word value={{name: "No Result Found", selectedVowel: props.routineStep.vowel}} />
      </div>
    );

    return (
      <div>
        <Card elevation="0" className={classes.previewCard}>
          <CardContent>
            {errorContent}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show loading state
  if (loading) return null;

  // Render content
  const content = query ? (
    <div>
      <Word value={{name: resultRef.current, selectedVowel: props.routineStep.vowel}} />
    </div>
  ) : '';

  return (
    <div>
      <Card elevation="0" className={classes.previewCard}>
        <CardContent>
          {content}
        </CardContent>
      </Card>
    </div>
  );
};

// Wrapper component to provide theme and styles
function RoutinePreviewWrapper(props) {
  const theme = useTheme();
  const classes = styles(theme);
  
  return <RoutinePreview {...props} classes={classes} theme={theme} />;
}

export default RoutinePreviewWrapper;
