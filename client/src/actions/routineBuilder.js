export const UPDATE_INDEX = 'UPDATE_INDEX';

export const INSERT_STEP = 'INSERT_STEP';
export const REMOVE_STEP = 'REMOVE_STEP';
export const UPDATE_STEP = 'UPDATE_STEP';

export const UPDATE_VOWELS = 'UPDATE_VOWELS';
export const UPDATE_CONSONANTS = 'UPDATE_CONSONANTS';
export const ADD_CONSONANT = 'ADD_CONSONANT';
export const REMOVE_CONSONANT = 'REMOVE_CONSONANT';
export const UPDATE_MODE = 'UPDATE_MODE';
export const UPDATE_RANGEVAL = 'UPDATE_RANGEVAL';
export const UPDATE_REPETITIONS = 'UPDATE_REPETITIONS';
export const UPDATE_SYLLABLES = 'UPDATE_SYLLABLES';
export const UPDATE_POSITION = 'UPDATE_POSITION';
export const UPDATE_INTERMISSION_TEXT = 'UPDATE_INTERMISSION_TEXT';
export const UPDATE_IS_INTERMISSION = 'UPDATE_IS_INTERMISSION';

export function updateIndex(index) {
  return {
    type: UPDATE_INDEX, index
  }
}

export function insertStep(step) {
  return {
    type: INSERT_STEP, step
  }
}

export function removeStep(index) {
  return {
    type: REMOVE_STEP, index
  }
}

export function updateStep(routineArr) {
  return {
    type: UPDATE_STEP, routineArr
  }
}

export function updateVowels(vowelArr) {
  return {
    type: UPDATE_VOWELS, vowelArr
  }
}

export function updateConsonants(consonantArr) {
  return {
    type: UPDATE_CONSONANTS, consonantArr
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

export function updateIntermissionText(intermissionText) {
  return {
    type: UPDATE_INTERMISSION_TEXT, intermissionText
  }
}

export function updateIsIntermission(isIntermission) {
  return {
    type: UPDATE_IS_INTERMISSION, isIntermission
  }
}
