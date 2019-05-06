import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

function WordCard(props) {
  return (
    <Grid container justify='center'>
      <Card alignItems='center' style={{ width: 925 }}>
        <CardContent>
          <Typography color='textSecondary' align='center' gutterBottom />
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
                <Typography variant='h2' component='h2' align='center'>
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
          <Button
            size='small'
            align='right'
            style={{ flex: 1, marginLeft: '750px' }}
          >
            Comment
          </Button>
        </CardActions>
        <FormGroup row style={{ flex: '1', marginLeft: '25px' }}>
          <FormControlLabel control={<Checkbox value='checkedA' />} label='ɑ' />
          <FormControlLabel control={<Checkbox value='checkedB' />} label='æ' />
          <FormControlLabel control={<Checkbox value='checkedC' />} label='ʌ' />
          <FormControlLabel control={<Checkbox value='checkedD' />} label='ɔ' />
          <FormControlLabel
            control={<Checkbox value='checkedE' />}
            label='aʊ'
          />
          <FormControlLabel
            control={<Checkbox value='checkedF' />}
            label='aɪ'
          />
          <FormControlLabel control={<Checkbox value='checkedG' />} label='ɛ' />
          <FormControlLabel control={<Checkbox value='checkedH' />} label='ɝ' />
          <FormControlLabel control={<Checkbox value='Vowel' />} label='eɪ' />
          <FormControlLabel control={<Checkbox value='Vowel' />} label='ɪ' />
          <FormControlLabel control={<Checkbox value='Vowel' />} label='i' />
          <FormControlLabel control={<Checkbox value='Vowel' />} label='oʊ' />
          <FormControlLabel control={<Checkbox value='Vowel' />} label='ɔɪ' />
          <FormControlLabel control={<Checkbox value='Vowel' />} label='ʊ' />
          <FormControlLabel control={<Checkbox value='Vowel' />} label='u' />
        </FormGroup>
      </Card>
    </Grid>
  );
}

export default WordCard;
