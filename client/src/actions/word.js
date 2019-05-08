export const ADD_VOWEL = 'ADD_VOWEL'
export const ADD_WORD = 'ADD_WORD'
export const REMOVE_VOWEL = 'REMOVE_VOWEL';
export const REMOVE_WORD = 'REMOVE_WORD';

export function addVowel(text) {
    return {
        type: ADD_VOWEL, text
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
