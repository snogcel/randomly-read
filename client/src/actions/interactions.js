import {createInteraction, getInteractions} from '../util/api';

export const FETCH_INTERACTIONS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_INTERACTIONS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_INTERACTIONS_ERROR = 'FETCH_POSTS_ERROR';


const fetchInteractionsRequest = { type: FETCH_INTERACTIONS_REQUEST };
const fetchInteractionsSuccess = posts => ({ type: FETCH_INTERACTIONS_SUCCESS, posts });
const fetchInteractionsError = error => ({ type: FETCH_INTERACTIONS_ERROR, error });

export const fetchInteractions = () => async dispatch => {
    dispatch(fetchInteractionsRequest);
    try {
      const interactions = await getInteractions();
      dispatch(fetchInteractionsSuccess(interactions));
    } catch (error) {
      dispatch(fetchInteractionsError(error));
    }
  };

export const CREATE_INTERACTION_REQUEST = 'CREATE_INTERACTION_REQUEST';
export const CREATE_INTERACTION_SUCCESS = 'CREATE_INTERACTION_SUCCESS';
export const CREATE_INTERACTION_ERROR = 'CREATE_INTERACTION_ERROR';

const createInteractionRequest = { type: CREATE_INTERACTION_REQUEST };
const createInteractionSuccess = interaction => ({ type: CREATE_INTERACTION_SUCCESS, interaction });
const createInteractionError = error => ({ type: CREATE_INTERACTION_ERROR, error });

export const attemptCreateInteraction = interaction => async (dispatch, getState) => {
    dispatch(createInteractionRequest);
    try {
      const { token } = getState().auth;
      const newInteraction = await createInteraction(interaction, token);
      dispatch(createInteractionSuccess(newInteraction));
    } catch (error) {
      dispatch(createInteractionError(error));
    }
  };




  





  