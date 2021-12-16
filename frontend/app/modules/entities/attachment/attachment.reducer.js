import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  attachmentRequest: ['attachmentId'],
  attachmentAllRequest: ['options'],
  attachmentUpdateRequest: ['attachment'],
  attachmentDeleteRequest: ['attachmentId'],

  attachmentSuccess: ['attachment'],
  attachmentAllSuccess: ['attachmentList', 'headers'],
  attachmentUpdateSuccess: ['attachment'],
  attachmentDeleteSuccess: [],

  attachmentFailure: ['error'],
  attachmentAllFailure: ['error'],
  attachmentUpdateFailure: ['error'],
  attachmentDeleteFailure: ['error'],

  attachmentReset: [],
});

export const AttachmentTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  attachment: { id: undefined },
  attachmentList: [],
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
    attachment: INITIAL_STATE.attachment,
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
  const { attachment } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    attachment,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { attachmentList } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    attachmentList,
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { attachment } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    attachment,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    attachment: INITIAL_STATE.attachment,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    attachment: INITIAL_STATE.attachment,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    attachmentList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    attachment: state.attachment,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    attachment: state.attachment,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ATTACHMENT_REQUEST]: request,
  [Types.ATTACHMENT_ALL_REQUEST]: allRequest,
  [Types.ATTACHMENT_UPDATE_REQUEST]: updateRequest,
  [Types.ATTACHMENT_DELETE_REQUEST]: deleteRequest,

  [Types.ATTACHMENT_SUCCESS]: success,
  [Types.ATTACHMENT_ALL_SUCCESS]: allSuccess,
  [Types.ATTACHMENT_UPDATE_SUCCESS]: updateSuccess,
  [Types.ATTACHMENT_DELETE_SUCCESS]: deleteSuccess,

  [Types.ATTACHMENT_FAILURE]: failure,
  [Types.ATTACHMENT_ALL_FAILURE]: allFailure,
  [Types.ATTACHMENT_UPDATE_FAILURE]: updateFailure,
  [Types.ATTACHMENT_DELETE_FAILURE]: deleteFailure,
  [Types.ATTACHMENT_RESET]: reset,
});
