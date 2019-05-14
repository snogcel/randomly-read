import React from 'react';
import Timer from './Timer';
import styled from 'styled-components/macro';
import SelectWrapper from '../shared/form/SelectWrapper';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 10vw;
  
  @media (max-width: 1024px) {
    margin: 0 5vw;
  }

  @media (max-width: 768px) {
    display: block;
    margin: 0;
  }
`;

class RandomlyRead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'Word',
      vowel: [],
      consonant: [],
      templates: [],
      syllables: [],
      location: 'initial',
      limit: 1,
      time: 0
    };

    this.timer = React.createRef();

    this.timerHandler = this.timerHandler.bind(this);
  }

  timerHandler(options) {
    let mode = this.state.mode;
    let vowel = this.state.vowel;
    let consonant = this.state.consonant;
    let templates = this.state.templates;
    let syllables = this.state.syllables;

    let refresh = false;

    function difference(lastProps, newProps) {
      let newSet = new Set(newProps);
      return lastProps.filter(function(x) { return !newSet.has(x); });
    }


    // Handle Consonants
    let newConsonants = options.consonant;
    let removedConsonants = difference(consonant, newConsonants);
    if (removedConsonants.length === 0) refresh = true;
    // this.consonantCheckboxes.current.unsetMany(removedConsonants);
    // this.consonantCheckboxes.current.setMany(newConsonants);

    // Handle Vowels
    let newVowels = options.vowel;
    let removedVowels = difference(vowel, newVowels);
    // this.vowelCheckboxes.current.unsetMany(removedVowels);
    // this.vowelCheckboxes.current.setMany(newVowels);

    // Handle Syllables
    // this.syllablesSelect.current.removeAll();
    // this.syllablesSelect.current.setMany(options.syllables);

    let limitText = this.state.limit;

    if(!options.intermissionText) {

      // Handle Word / Sentence Mode
      // this.modeSelect.current.set(options.mode);

    } else {

      // Handle Intermission
      // this.queryWindow.current.setMode('intermission', options.intermissionText);

    }

    mode = options.mode;
    vowel = options.vowel;
    consonant = options.consonant;
    templates = options.templates;
    syllables = options.syllables;
    this.props.addVowel(options.vowel);
    this.props.addConsonant(options.consonant);
    this.props.addSyllables(options.syllables);
    this.props.setLimit(limitText);
    this.props.setMode(mode);
  

    if (this.state.mode === "Intermission") refresh = false;

    this.setState({
      mode: mode,
      vowel: vowel,
      consonant: consonant,
      templates: templates,
      syllables: syllables,
      limit: limitText,
      time: Math.round((new Date()).getTime() / 1000)
    });

    if (refresh) {
      console.log("Refetching...");
      console.log(options);
      // this.queryWindow.current.refreshQuery();
    } else {
      console.log("Fetching...");
      console.log(options);
    }

  }

  render() {

    const timer = (
        <div>
          <Timer ref={this.timer} action={this.timerHandler} />
        </div>
    );



    return timer;

  }
}

// const CategoryMenu = props => (


export default RandomlyRead;
