import { createInteraction, deleteInteraction, getInteractions } from "../util/api";

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


export const DELETE_INTERACTION_REQUEST = 'DELETE_INTERACTION_REQUEST';
export const DELETE_INTERACTION_SUCCESS = 'DELETE_INTERACTION_SUCCESS';
export const DELETE_INTERACTION_ERROR = 'DELETE_INTERACTION_ERROR';

const deleteInteractionRequest = { type: DELETE_INTERACTION_REQUEST };
const deleteInteractionSuccess = interaction => ({ type: DELETE_INTERACTION_SUCCESS, interaction });
const deleteInteractionError = error => ({ type: DELETE_INTERACTION_ERROR, error });

export const attemptDeleteInteraction = id => async (dispatch, getState) => {
  dispatch(deleteInteractionRequest);
  try {
    const { token } = getState().auth;
    await deleteInteraction(id, token);
    dispatch(deleteInteractionSuccess(id));
  } catch (error) {
    dispatch(deleteInteractionError(error));
  }
};


export const FETCH_INTERACTIONS_REQUEST = 'FETCH_INTERACTIONS_REQUEST';
export const FETCH_INTERACTIONS_SUCCESS = 'FETCH_INTERACTIONS_SUCCESS';
export const FETCH_INTERACTIONS_ERROR = 'FETCH_INTERACTIONS_ERROR';

const fetchInteractionsRequest = { type: FETCH_INTERACTIONS_REQUEST };
const fetchInteractionsSuccess = interactions => ({ type: FETCH_INTERACTIONS_SUCCESS, interactions });
const fetchInteractionsError = error => ({ type: FETCH_INTERACTIONS_ERROR, error });

export const fetchInteractions = () => async (dispatch, getState) => {
  dispatch(fetchInteractionsRequest);
  try {
    const { token } = getState().auth;
    const interactions = await getInteractions(token);
    dispatch(fetchInteractionsSuccess(interactions));
  } catch (error) {
    dispatch(fetchInteractionsError(error));
  }
};


export const FETCH_INTERACTION_SETTINGS_REQUEST = 'FETCH_INTERACTION_SETTINGS_REQUEST';
export const FETCH_INTERACTION_SETTINGS_SUCCESS = 'FETCH_INTERACTION_SETTINGS_SUCCESS';
export const FETCH_INTERACTION_SETTINGS_ERROR = 'FETCH_INTERACTION_SETTINGS_ERROR';

const fetchInteractionSettingsRequest = { type: FETCH_INTERACTION_SETTINGS_REQUEST };
const fetchInteractionSettingsSuccess = interactionSettings => ({ type: FETCH_INTERACTION_SETTINGS_SUCCESS, interactionSettings });
const fetchInteractionSettingsError = error => ({ type: FETCH_INTERACTION_SETTINGS_ERROR, error });

export const fetchInteractionSettings = () => async dispatch => {
  dispatch(fetchInteractionSettingsRequest);
  try {
    const interactionSettings = JSON.parse(localStorage.getItem('interactionSettings'));
    dispatch(fetchInteractionSettingsSuccess(interactionSettings));
  } catch (error) {
    console.log("-attempting settings fetch (fail)-");
    dispatch(fetchInteractionSettingsError(error));
  }
};
