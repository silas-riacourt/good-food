import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  commentRequest: ['commentId'],
  commentAllRequest: ['options'],
  commentUpdateRequest: ['comment'],
  commentDeleteRequest: ['commentId'],

  commentSuccess: ['comment'],
  commentAllSuccess: ['commentList', 'headers'],
  commentUpdateSuccess: ['comment'],
  commentDeleteSuccess: [],

  commentFailure: ['error'],
  commentAllFailure: ['error'],
  commentUpdateFailure: ['error'],
  commentDeleteFailure: ['error'],

  commentReset: [],
});

export const CommentTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  comment: { id: undefined },
  commentList: [],
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
    comment: INITIAL_STATE.comment,
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
  const { comment } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    comment,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { commentList } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    commentList,
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { comment } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    comment,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    comment: INITIAL_STATE.comment,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    comment: INITIAL_STATE.comment,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    commentList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    comment: state.comment,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    comment: state.comment,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.COMMENT_REQUEST]: request,
  [Types.COMMENT_ALL_REQUEST]: allRequest,
  [Types.COMMENT_UPDATE_REQUEST]: updateRequest,
  [Types.COMMENT_DELETE_REQUEST]: deleteRequest,

  [Types.COMMENT_SUCCESS]: success,
  [Types.COMMENT_ALL_SUCCESS]: allSuccess,
  [Types.COMMENT_UPDATE_SUCCESS]: updateSuccess,
  [Types.COMMENT_DELETE_SUCCESS]: deleteSuccess,

  [Types.COMMENT_FAILURE]: failure,
  [Types.COMMENT_ALL_FAILURE]: allFailure,
  [Types.COMMENT_UPDATE_FAILURE]: updateFailure,
  [Types.COMMENT_DELETE_FAILURE]: deleteFailure,
  [Types.COMMENT_RESET]: reset,
});
