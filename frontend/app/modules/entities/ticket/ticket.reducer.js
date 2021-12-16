import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  ticketRequest: ['ticketId'],
  ticketAllRequest: ['options'],
  ticketUpdateRequest: ['ticket'],
  ticketDeleteRequest: ['ticketId'],

  ticketSuccess: ['ticket'],
  ticketAllSuccess: ['ticketList', 'headers'],
  ticketUpdateSuccess: ['ticket'],
  ticketDeleteSuccess: [],

  ticketFailure: ['error'],
  ticketAllFailure: ['error'],
  ticketUpdateFailure: ['error'],
  ticketDeleteFailure: ['error'],

  ticketReset: [],
});

export const TicketTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  ticket: { id: undefined },
  ticketList: [],
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
    ticket: INITIAL_STATE.ticket,
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
  const { ticket } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    ticket,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { ticketList } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    ticketList,
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { ticket } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    ticket,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    ticket: INITIAL_STATE.ticket,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    ticket: INITIAL_STATE.ticket,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    ticketList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    ticket: state.ticket,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    ticket: state.ticket,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TICKET_REQUEST]: request,
  [Types.TICKET_ALL_REQUEST]: allRequest,
  [Types.TICKET_UPDATE_REQUEST]: updateRequest,
  [Types.TICKET_DELETE_REQUEST]: deleteRequest,

  [Types.TICKET_SUCCESS]: success,
  [Types.TICKET_ALL_SUCCESS]: allSuccess,
  [Types.TICKET_UPDATE_SUCCESS]: updateSuccess,
  [Types.TICKET_DELETE_SUCCESS]: deleteSuccess,

  [Types.TICKET_FAILURE]: failure,
  [Types.TICKET_ALL_FAILURE]: allFailure,
  [Types.TICKET_UPDATE_FAILURE]: updateFailure,
  [Types.TICKET_DELETE_FAILURE]: deleteFailure,
  [Types.TICKET_RESET]: reset,
});
