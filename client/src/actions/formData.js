export const ADD_FORM_DATA = 'ADD_FORM_DATA';
export const RESET_FORM_DATA = 'RESET_FORM_DATA';
export const ADD_INITIAL_FORM_DATA = 'ADD_INITIAL_FORM_DATA';

export function addFormData(text) {
    return {
        type: ADD_FORM_DATA, text
    }
}

export function addInitialFormData(text) {
    return {
        type: ADD_INITIAL_FORM_DATA, text
    }
}

export function resetFormData() {
    return {
        type: RESET_FORM_DATA
    }
}

