export const ADD_VOWEL = 'ADD_VOWEL'
export const ADD_WORD = 'ADD_WORD'

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
