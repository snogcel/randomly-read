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

class WordCard extends React.Component  {

    constructor(props) {
    super(props)
    this.state = {
      text: null,
      vowel: [],
      consonant: ["F"],
      syllables: [1,2,3],
      limit: 1,
      mode: 'words',
      isFirstRender: true}

     // this.setMode = this.setMode.bind(this);
      this.refreshQuery = this.refreshQuery.bind(this);
  }

  refreshQuery() {
    if (this.refresh) this.refresh();
}

  handleChange = name => event => {
    console.log(event.target.checked)
    if (event.target.checked){
      //append to array
      this.setState({
        vowel: this.state.vowel.concat([name])
      })
      this.props.addVowel(name)
    } else {
      //remove from array
      this.setState({
        vowel: this.state.vowel.filter(val => {return val !== name}),
        text: null

      })
      this.props.removeVowel(name)
      this.props.removeWord()
   }
  };

  setWord(title) {
      this.setState({text: title, isFirstRender: false})
      this.props.addWord(this.state.text)
  }

  buildQuery() {
    let vowel = JSON.stringify(this.state.vowel);
    let consonant = JSON.stringify(this.state.consonant);
    let syllables=JSON.stringify(this.state.syllables.map(Number));
    let limit = parseInt(this.state.limit);

    switch(this.state.mode) {
        case 'sentences':
            if (this.state.consonant.length > 0) {
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

        case 'words':
            if (this.state.consonant.length > 0) {
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
    <Grid container justify='center'>
      <Card style={{ width: 925 }}>
        <CardContent>
          <Typography color='textSecondary' align='center' gutterBottom />
           { (!Array.isArray(this.state.vowel) || !this.state.vowel.length) ?
                ''
            : <Query
            query={query}
            onCompleted={data => this.setWord(data.words[0].lexeme)}
          >
            {({ loading, error, data, refetch }) => {
              if (loading)
                return (
                  <Typography variant='h5' component='h2' align='center'>
                    Loading....
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
                <Typography color='textSecondary' align='center'>
                {/* Parts of Speech */}
                { data.words[0].wordsXsensesXsynsets[0].pos }
                </Typography>
                <Typography component='p' align='center'>
                { data.words[0].wordsXsensesXsynsets[0].definition }
                </Typography>
                <Button align='center' onClick={() => refetch()}> New Word! </Button>
                </>
              );

            }}

            </Query>
           }
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
          <FormControlLabel control={<Checkbox/>} label='ɑ' onChange={this.handleChange('AA')}/>
          <FormControlLabel control={<Checkbox/>} label='æ' onChange={this.handleChange('AE')}/>
          <FormControlLabel control={<Checkbox/>} label='ʌ' onChange={this.handleChange('AH')}/>
          <FormControlLabel control={<Checkbox/>} label='ɔ' onChange={this.handleChange('AO')}/>
          <FormControlLabel control={<Checkbox/>} label='aʊ'onChange={this.handleChange('AW')}/>
          <FormControlLabel control={<Checkbox/>} label='aɪ'onChange={this.handleChange('AY')}/>
          <FormControlLabel control={<Checkbox/>} label='ɛ' onChange={this.handleChange('EH')}/>
          <FormControlLabel control={<Checkbox/>} label='ɝ' onChange={this.handleChange('ER')}/>
          <FormControlLabel control={<Checkbox/>} label='eɪ'onChange={this.handleChange('EY')}/>
          <FormControlLabel control={<Checkbox/>} label='ɪ' onChange={this.handleChange('IH')}/>
          <FormControlLabel control={<Checkbox/>} label='i' onChange={this.handleChange('IY')}/>
          <FormControlLabel control={<Checkbox/>} label='oʊ'onChange={this.handleChange('OW')}/>
          <FormControlLabel control={<Checkbox/>} label='ɔɪ'onChange={this.handleChange('OY')}/>
          <FormControlLabel control={<Checkbox/>} label='ʊ' onChange={this.handleChange('UH')}/>
          <FormControlLabel control={<Checkbox/>} label='u' onChange={this.handleChange('UW')}/>
        </FormGroup>
      </Card>
    </Grid>
  );
}
}
export default WordCard;
