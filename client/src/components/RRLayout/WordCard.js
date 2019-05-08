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
    this.state = {text: null, vowel: [], isFirstRender: true}
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


  render() { 
    let vowel = JSON.stringify(this.state.vowel);
    console.log(this.state);
   
  return (
    <Grid container justify='center'>
      <Card alignItems='center' style={{ width: 925 }}>
        <CardContent>
          <Typography color='textSecondary' align='center' gutterBottom />
           { (!Array.isArray(this.state.vowel) || !this.state.vowel.length) ?
                ''      
            : <Query  
            query={gql`
              {
                words(vowel: ${vowel}, syllables: [1, 2, 3], limit: 1) {
                  lexeme
                  cmudict_id
                }
              }
            `}
            onCompleted={data => this.setWord(data.words[0].lexeme)}
          >
            {({ loading, error, data }) => {  
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
                <Typography variant='h2' component='h2' align='center'>

                  { data.words[0].lexeme === undefined ? 'Empty' : data.words[0].lexeme }
                </Typography>
              );
              
            }} 
            </Query>
           }
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
          <FormControlLabel control={<Checkbox value='a' />} label='ɑ' onChange={this.handleChange('AA')}/>
          <FormControlLabel control={<Checkbox value='æ' />} label='æ' onChange={this.handleChange('AE')}/>
          <FormControlLabel control={<Checkbox value='ʌ' />} label='ʌ' onChange={this.handleChange('AH')}/>
          <FormControlLabel control={<Checkbox value='ɔ' />} label='ɔ' onChange={this.handleChange('AO')}/>
          <FormControlLabel
            control={<Checkbox value='aʊ' />}
            label='aʊ'
            onChange={this.handleChange('AW')}
          />
          <FormControlLabel
            control={<Checkbox value='aɪ' />}
            label='aɪ'
            onChange={this.handleChange('AY')}
          />
          <FormControlLabel control={<Checkbox/>} label='ɛ'  onChange={this.handleChange('EH')}/>
          <FormControlLabel control={<Checkbox/>} label='ɝ' onChange={this.handleChange('ER')}/>
          <FormControlLabel control={<Checkbox  />} label='eɪ' onChange={this.handleChange('EY')}/>
          <FormControlLabel control={<Checkbox  />} label='ɪ' onChange={this.handleChange('IH')}/>
          <FormControlLabel control={<Checkbox />} label='i' onChange={this.handleChange('IY')}/>
          <FormControlLabel control={<Checkbox />} label='oʊ' onChange={this.handleChange('OW')}/>
          <FormControlLabel control={<Checkbox />} label='ɔɪ' onChange={this.handleChange('OY')}/>
          <FormControlLabel control={<Checkbox />} label='ʊ' onChange={this.handleChange('UH')}/>
          <FormControlLabel control={<Checkbox />} label='u' onChange={this.handleChange('UW')}/>
        </FormGroup>
      </Card>
    </Grid>
  );
}
}
export default WordCard;
