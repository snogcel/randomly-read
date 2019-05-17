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
import Intermission from './Intermission';
import VowelCheckboxes from './VowelCheckboxes';

class WordCard extends React.Component  {

    constructor(props) {
    super(props)
    this.state = {
     
    }
  }
  
  handleChange = name => event => {

    if (event.target.checked) {

      this.props.addVowel([name])

    }
    else {
      
      this.props.removeVowel(name)
      this.props.removeWord()
   }
  };

  setWord(title) {
      this.props.addWord(title)
  }

  buildQuery() {

    let vowel = JSON.stringify(this.props.vowel);
    let consonant = JSON.stringify(this.props.consonant);
    let syllables= JSON.stringify(this.props.syllables);
    let limit = parseInt(this.props.limit);
    console.log("Vowel:", vowel);
    console.log("consonant:", consonant);
    console.log("syllables:", syllables);

    switch(this.props.mode) {
        case 'sentences':
            if (this.props.consonant.length > 0) {
                return gql`
                {
                    sentences(vowel: ${vowel}, consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}) {                    
                        result
                        formatted                   
                    }
                }
                `;
            } else {
                return gql`
                {
                    sentences(vowel: ${vowel}, syllables: ${syllables}, limit: ${limit}) {                    
                        result
                        formatted                  
                    }
                }
                `;
            }

        case 'Word':
            if (this.props.consonant.length > 0) {
                return gql`
                {
                    words(vowel: ${vowel}, consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}) {                    
                        cmudict_id
                        lexeme
                        wordsXsensesXsynsets {
                          wordid
                          pos
                          definition
                      }
                    }
                }
                `;
            } else {
                return gql`
                {
                    words(vowel: ${vowel}, syllables: ${syllables}, limit: ${limit}) {                    
                        cmudict_id
                        lexeme
                        wordsXsensesXsynsets {
                          wordid
                          pos
                          definition
                      }
                    }
                }
                `;
            }

        default:
            return null;
    }

}

  render() {
    const query = this.buildQuery();
  return (
    <Grid container justify='center' alignItems='center'>
      <Card style={{ width: 950, minHeight: '40vh', maxHeight: '40vh', overflow: 'hidden'}}>
        <Grid>
        <CardContent style={{ overflow: 'hidden'}}>
          {console.log(this.props.mode)}
           { (!this.props.vowel || !this.props.vowel.length && !this.props.mode)  ?
                '' 
            : (this.props.mode === 'Intermission') ?
            <Intermission /> :
            <Query
            query={query}
            onCompleted={data => this.setWord(data.words[0].lexeme)}
          >
            {({ loading, error, data, refetch }) => {
              if (loading)
                return (
                  <Typography variant='h5' component='h2' align='center'> 
                  </Typography>
                );
              if (error)
                return (
                  <Typography variant='h5' component='h2' align='center'>
                    Something went wrong... {error.message}
                  </Typography>
                );
              return (
                <>
                <Typography variant='h2' component='h2' align='center'>
                  { data.words[0].lexeme }
                </Typography>
                {data.words[0].wordsXsensesXsynsets.slice(0,2).map((word, i) => {
                  return (
                    <>
                    <Grid container direction='row' alignItems='center' justify = 'center'>
                  <Grid item xs={12} align='center'>
                  <Typography color='textSecondary' align='center'>
                    {(`(${word.pos}): `)}
                  </Typography>   
                  </Grid> 
                  <Grid item xs={12} align='center'>
                  <Typography component='p' align='center'>
                   { `${word.definition}` } 
                  </Typography> 
                  </Grid>
                  </Grid>
                  </>
                  );
                })}
                
                 <Button color="primary"  align='top' onClick={() => refetch()}> New Word! </Button> 
                </>
              );
            }}
             </Query>
           } 
        
        <Grid item align='bottom'>
        <CardActions style ={{overflow: 'hidden',  marginTop: 'auto'}}>
          <Button color="primary" variant="contained" size='small' align='bottom' style={{flex: 1}}>
            Vote
          </Button>
          <Button color="primary" variant="contained" size='small' align='bottom' style={{flex: 1 }}
          >
            Comment
          </Button>
        </CardActions>
        </Grid>
        <FormGroup row style={{ flex: '1', marginLeft: '25px', overflow: 'hidden'}} >
       { VowelCheckboxes.map((item, i) => (
       <>
          <FormControlLabel control={<Checkbox />}  label={item.label}  checked={this.props.vowel === null ? false : this.props.vowel.includes(item.name)} onChange={this.handleChange(item.name)}/>
       </>
      ))}
        </FormGroup> 
        </CardContent>
        </Grid>
      </Card>
    </Grid>
    
  );
}
}

export default WordCard;
