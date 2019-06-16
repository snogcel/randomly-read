import {ADD_FORM_DATA} from '../actions/formData'
import {RESET_FORM_DATA} from '../actions/formData'
import {ADD_INITIAL_FORM_DATA} from '../actions/formData'

const initialState = {
   formData: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_INITIAL_FORM_DATA:
        return {...state, formData: action.text}
        case ADD_FORM_DATA:
        return {...state, formData: state.formData.concat([action.text])}//vowel: state.vowel.concat([action.text])}
        case RESET_FORM_DATA:
        return {...state, formData: []};
        default: 
        return state;
    }
}
