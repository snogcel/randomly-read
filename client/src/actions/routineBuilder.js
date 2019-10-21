export const UPDATE_VOWELS = 'UPDATE_VOWELS';
export const ADD_CONSONANT = 'ADD_CONSONANT';
export const REMOVE_CONSONANT = 'REMOVE_CONSONANT';

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
