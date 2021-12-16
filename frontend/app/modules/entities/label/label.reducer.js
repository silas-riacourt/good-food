import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  labelRequest: ['labelId'],
  labelAllRequest: ['options'],
  labelUpdateRequest: ['label'],
  labelDeleteRequest: ['labelId'],

  labelSuccess: ['label'],
  labelAllSuccess: ['labelList', 'headers'],
  labelUpdateSuccess: ['label'],
  labelDeleteSuccess: [],

  labelFailure: ['error'],
  labelAllFailure: ['error'],
  labelUpdateFailure: ['error'],
  labelDeleteFailure: ['error'],

  labelReset: [],
});

export const LabelTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  label: { id: undefined },
  labelList: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    label: INITIAL_STATE.label,
  });

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    errorAll: false,
  });

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updateSuccess: false,
    updating: true,
  });
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true,
  });

// successful api lookup for single entity
export const success = (state, action) => {
  const { label } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    label,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { labelList } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    labelList,
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { label } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    label,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    label: INITIAL_STATE.label,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    label: INITIAL_STATE.label,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    labelList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    label: state.label,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    label: state.label,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LABEL_REQUEST]: request,
  [Types.LABEL_ALL_REQUEST]: allRequest,
  [Types.LABEL_UPDATE_REQUEST]: updateRequest,
  [Types.LABEL_DELETE_REQUEST]: deleteRequest,

  [Types.LABEL_SUCCESS]: success,
  [Types.LABEL_ALL_SUCCESS]: allSuccess,
  [Types.LABEL_UPDATE_SUCCESS]: updateSuccess,
  [Types.LABEL_DELETE_SUCCESS]: deleteSuccess,

  [Types.LABEL_FAILURE]: failure,
  [Types.LABEL_ALL_FAILURE]: allFailure,
  [Types.LABEL_UPDATE_FAILURE]: updateFailure,
  [Types.LABEL_DELETE_FAILURE]: deleteFailure,
  [Types.LABEL_RESET]: reset,
});
