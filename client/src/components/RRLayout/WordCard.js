import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

function WordCard(props) {
  const styles = {
    card: {
      minWidth: 275
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)'
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  };
  console.log('HI');
  return (
    <Grid container justify='center'>
      <Card alignItems='center' style={{ width: 400 }}>
        <CardContent>
          <Typography color='textSecondary' align='center' gutterBottom>
            Word
          </Typography>
          <Query
            query={gql`
              {
                words(vowel: ["AO"], syllables: [1, 2, 3], limit: 1) {
                  lexeme
                  cmudict_id
                }
              }
            `}
          >
            {({ loading, error, data }) => {
              if (loading)
                return (
                  <Typography variant='h5' component='h2' align='center'>
                    Good things take time....
                  </Typography>
                );
              if (error)
                return (
                  <Typography variant='h5' component='h2' align='center'>
                    Something went wrong... {error.message}
                  </Typography>
                );
              return (
                <Typography variant='h5' component='h2' align='center'>
                  {data.words[0].lexeme}
                </Typography>
              );
            }}
            {/* <Typography variant='h5' component='h2' align='center'>
            be nev lent
          </Typography> */}
          </Query>
          <Typography color='textSecondary' align='center'>
            adjective
          </Typography>
          <Typography component='p' align='center'>
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' align='left'>
            Vote
          </Button>
          <Button size='small' align='right'>
            Comment
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default WordCard;
