import {ADD_SETTING_1_FORM_DATA} from '../actions/formData'
import {DELETE_SETTING_1_FORM_DATA} from '../actions/formData'
import {ADD_SETTING_2_FORM_DATA} from '../actions/formData'
import {DELETE_SETTING_2_FORM_DATA} from '../actions/formData'
import {ADD_SETTING_3_FORM_DATA} from '../actions/formData'
import {DELETE_SETTING_3_FORM_DATA} from '../actions/formData'
import {ADD_SETTING_4_FORM_DATA} from '../actions/formData'
import {DELETE_SETTING_4_FORM_DATA} from '../actions/formData'
import {ADD_SETTING_5_FORM_DATA} from '../actions/formData'
import {DELETE_SETTING_5_FORM_DATA} from '../actions/formData'
import {ADD_SETTING_6_FORM_DATA} from '../actions/formData'
import {DELETE_SETTING_6_FORM_DATA} from '../actions/formData'
import {RESET_FORM_DATA} from '../actions/formData'
import {LOAD_SETTING_1_FORM_DATA} from '../actions/formData'
import {LOAD_SETTING_2_FORM_DATA} from '../actions/formData'
import {LOAD_SETTING_3_FORM_DATA} from '../actions/formData'
import {LOAD_SETTING_4_FORM_DATA} from '../actions/formData'
import {LOAD_SETTING_5_FORM_DATA} from '../actions/formData'
import {LOAD_SETTING_6_FORM_DATA} from '../actions/formData'

const initialState = {

    setting1: [],
    setting2: [],
    setting3: [],
    setting4: [],
    setting5: [],
    setting6: []

}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SETTING_1_FORM_DATA:
        return {...state, setting1: action.text}
        case ADD_SETTING_1_FORM_DATA:
        return {...state, setting1: [...state.setting1, action.text]}//vowel: state.vowel.concat([action.text])}
        case DELETE_SETTING_1_FORM_DATA:
        return {...state, setting1: action.text} 
        case LOAD_SETTING_2_FORM_DATA:
        return {...state, setting2: action.text}
        case ADD_SETTING_2_FORM_DATA:
        return {...state, setting2: [...state.setting2, action.text]}//vowel: state.vowel.concat([action.text])}
        case DELETE_SETTING_2_FORM_DATA:
        return {...state, setting2: action.text} 
        case LOAD_SETTING_3_FORM_DATA:
        return {...state, setting3: action.text}
        case ADD_SETTING_3_FORM_DATA:
        return {...state, setting3: [...state.setting3, action.text]}//vowel: state.vowel.concat([action.text])}
        case DELETE_SETTING_3_FORM_DATA:
        return {...state, setting3: action.text} 
        case LOAD_SETTING_4_FORM_DATA:
        return {...state, setting4: action.text}
        case ADD_SETTING_4_FORM_DATA:
        return {...state, setting4: [...state.setting4, action.text]}//vowel: state.vowel.concat([action.text])}
        case DELETE_SETTING_4_FORM_DATA:
        return {...state, setting4: action.text} 
        case LOAD_SETTING_5_FORM_DATA:
        return {...state, setting5: action.text}
        case ADD_SETTING_5_FORM_DATA:
        return {...state, setting5: [...state.setting5, action.text]}//vowel: state.vowel.concat([action.text])}
        case DELETE_SETTING_5_FORM_DATA:
        return {...state, setting5: action.text} 
        case LOAD_SETTING_6_FORM_DATA:
        return {...state, setting6: action.text}
        case ADD_SETTING_6_FORM_DATA:
        return {...state, setting6: [...state.setting6, action.text]}//vowel: state.vowel.concat([action.text])}
        case DELETE_SETTING_6_FORM_DATA:
        return {...state, setting6: action.text} 
        case RESET_FORM_DATA:
        return {...state, setting1: [], setting2: [], setting3: [], setting4: [], setting5: [], setting6: []};
        default: 
        return state;
    }
}
