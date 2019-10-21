export const UPDATE_VOWELS = 'UPDATE_VOWELS';
export const ADD_CONSONANT = 'ADD_CONSONANT';
export const REMOVE_CONSONANT = 'REMOVE_CONSONANT';
export const UPDATE_MODE = 'UPDATE_MODE';
export const UPDATE_RANGEVAL = 'UPDATE_RANGEVAL';
export const UPDATE_REPETITIONS = 'UPDATE_REPETITIONS';
export const UPDATE_SYLLABLES = 'UPDATE_SYLLABLES';
export const UPDATE_POSITION = 'UPDATE_POSITION';

export function updateVowels(vowelArr) {
  return {
    type: UPDATE_VOWELS, vowelArr
  }
}

export function addConsonant(consonant) {
  return {
    type: ADD_CONSONANT, consonant
  }
}

export function removeConsonant(consonant) {
  return {
    type: REMOVE_CONSONANT, consonant
  }
}

export function updateMode(mode) {
  return {
    type: UPDATE_MODE, mode
  }
}

export function updateRangeVal(rangeVal) {
  return {
    type: UPDATE_RANGEVAL, rangeVal
  }
}

export function updateRepetitions(repetitions) {
  return {
    type: UPDATE_REPETITIONS, repetitions
  }
}

export function updateSyllables(syllables) {
  return {
    type: UPDATE_SYLLABLES, syllables
  }
}

export function updatePosition(position) {
  return {
    type: UPDATE_POSITION, position
  }
}
