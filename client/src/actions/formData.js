export const LOAD_SETTING_1_FORM_DATA = 'LOAD_SETTING_1_FORM_DATA';
export const ADD_SETTING_1_FORM_DATA = 'ADD_SETTING_1_FORM_DATA';
export const DELETE_SETTING_1_FORM_DATA = 'DELETE_SETTING_1_FORM_DATA';

export const LOAD_SETTING_2_FORM_DATA = 'LOAD_SETTING_2_FORM_DATA';
export const ADD_SETTING_2_FORM_DATA = 'ADD_SETTING_2_FORM_DATA';
export const DELETE_SETTING_2_FORM_DATA = 'DELETE_SETTING_2_FORM_DATA';

export const LOAD_SETTING_3_FORM_DATA = 'LOAD_SETTING_3_FORM_DATA';
export const ADD_SETTING_3_FORM_DATA = 'ADD_SETTING_3_FORM_DATA';
export const DELETE_SETTING_3_FORM_DATA = 'DELETE_SETTING_3_FORM_DATA';

export const LOAD_SETTING_4_FORM_DATA = 'LOAD_SETTING_4_FORM_DATA';
export const ADD_SETTING_4_FORM_DATA = 'ADD_SETTING_4_FORM_DATA';
export const DELETE_SETTING_4_FORM_DATA = 'DELETE_SETTING_4_FORM_DATA';

export const LOAD_SETTING_5_FORM_DATA = 'LOAD_SETTING_5_FORM_DATA';
export const ADD_SETTING_5_FORM_DATA = 'ADD_SETTING_5_FORM_DATA';
export const DELETE_SETTING_5_FORM_DATA = 'DELETE_SETTING_5_FORM_DATA';

export const LOAD_SETTING_6_FORM_DATA = 'LOAD_SETTING_6_FORM_DATA';
export const ADD_SETTING_6_FORM_DATA = 'ADD_SETTING_6_FORM_DATA';
export const DELETE_SETTING_6_FORM_DATA = 'DELETE_SETTING_6_FORM_DATA';

export const LOAD_COMBINED_FORM_DATA = 'LOAD_COMBINED_FORM_DATA'
export const MUTATE_COMBINED_FORM_DATA = 'MUTATE_COMBINED_FORM_DATA'
export const SET_CHANGED = 'SET_CHANGED'

export const RESET_FORM_DATA = 'RESET_FORM_DATA';


export function setChanged(text) {
    return {
        type: SET_CHANGED, text
    }
}

export function loadSetting1FormData(text) {
    return {
        type: LOAD_SETTING_1_FORM_DATA, text
    }
}

export function addSetting1FormData(text) {
    return {
        type: ADD_SETTING_1_FORM_DATA, text
    }
}

export function deleteSetting1FormData(text) {
    return {
        type: DELETE_SETTING_1_FORM_DATA, text
    }
}

export function loadSetting2FormData(text) {
    return {
        type: LOAD_SETTING_2_FORM_DATA, text
    }
}


export function addSetting2FormData(text) {
    return {
        type: ADD_SETTING_2_FORM_DATA, text
    }
}

export function deleteSetting2FormData(text) {
    return {
        type: DELETE_SETTING_2_FORM_DATA, text
    }
}

export function loadSetting3FormData(text) {
    return {
        type: LOAD_SETTING_3_FORM_DATA, text
    }
}

export function addSetting3FormData(text) {
    return {
        type: ADD_SETTING_3_FORM_DATA, text
    }
}

export function deleteSetting3FormData(text) {
    return {
        type: DELETE_SETTING_3_FORM_DATA, text
    }
}

export function loadSetting4FormData(text) {
    return {
        type: LOAD_SETTING_4_FORM_DATA, text
    }
}

export function addSetting4FormData(text) {
    return {
        type: ADD_SETTING_4_FORM_DATA, text
    }
}

export function deleteSetting4FormData(text) {
    return {
        type: DELETE_SETTING_4_FORM_DATA, text
    }
}

export function loadSetting5FormData(text) {
    return {
        type: LOAD_SETTING_5_FORM_DATA, text
    }
}

export function addSetting5FormData(text) {
    return {
        type: ADD_SETTING_5_FORM_DATA, text
    }
}

export function deleteSetting5FormData(text) {
    return {
        type: DELETE_SETTING_5_FORM_DATA, text
    }
}

export function loadSetting6FormData(text) {
    return {
        type: LOAD_SETTING_6_FORM_DATA, text
    }
}

export function addSetting6FormData(text) {
    return {
        type: ADD_SETTING_6_FORM_DATA, text
    }
}

export function deleteSetting6FormData(text) {
    return {
        type: DELETE_SETTING_6_FORM_DATA, text
    }
}

export function loadCombinedData(text) {
    return {
        type: LOAD_COMBINED_FORM_DATA, text
    }
}

export function mutateCombinedData(text) {
    return {
        type: MUTATE_COMBINED_FORM_DATA, text
    }
}

export function resetFormData() {
    return {
        type: RESET_FORM_DATA
    }
}

