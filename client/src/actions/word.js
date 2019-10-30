export const RESET_WORD_CARD = 'RESET_WORD_CARD';
export const ADD_VOWEL = 'ADD_VOWEL';
export const ADD_WORD = 'ADD_WORD';
export const REMOVE_VOWEL = 'REMOVE_VOWEL';
export const REMOVE_WORD = 'REMOVE_WORD';
export const ADD_CONSONANT = 'ADD_CONSONANT';
export const REMOVE_CONSONANT = 'REMOVE_CONSONANT';
export const ADD_SYLLABLES = 'ADD_SYLLABLES';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_MODE = 'SET_MODE';
export const ADD_ROUTINE_VOWEL = 'ADD_ROUTINE_VOWEL';
export const ADD_INTERMISSION_TEXT = 'ADD_INTERMISSION_TEXT';

export function resetWordCard() {
  return {
    type: RESET_WORD_CARD
  }
}

export function addVowel(text) {
    return {
        type: ADD_VOWEL, text
    }
}

export function addRoutineVowel(text) {
    return {
        type: ADD_ROUTINE_VOWEL, text
    }
}

export function addWord(text) {
    return {
        type: ADD_WORD, text
    }
}

export function removeVowel(text) {
    return {
        type: REMOVE_VOWEL, text
    }
}

export function removeWord() {
    return {
        type: REMOVE_WORD
    }
}

export function addConsonant(text) {
    return {
        type: ADD_CONSONANT, text
    }
}

export function removeConsonant() {
    return {
        type: REMOVE_CONSONANT
    }
}

export function addSyllables(text) {
    return {
        type: ADD_SYLLABLES, text
    }
}

export function setLimit(text) {
    return {
        type: SET_LIMIT, text
    }
}

export function setMode(text) {
    return {
        type: SET_MODE, text
    }
}

export function setIntermissionText(text) {
    return {
        type: ADD_INTERMISSION_TEXT, text
    }
}



