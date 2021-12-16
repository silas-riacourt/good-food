import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import TicketActions from './ticket.reducer';
import { convertDateTimeFromServer, convertLocalDateFromServer } from '../../../shared/util/date-transforms';

function* getTicket(api, action) {
  const { ticketId } = action;
  // make the call to the api
  const apiCall = call(api.getTicket, ticketId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(TicketActions.ticketSuccess(response.data));
  } else {
    yield put(TicketActions.ticketFailure(response.data));
  }
}

function* getAllTickets(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllTickets, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(TicketActions.ticketAllSuccess(response.data, response.headers));
  } else {
    yield put(TicketActions.ticketAllFailure(response.data));
  }
}

function* updateTicket(api, action) {
  const { ticket } = action;
  // make the call to the api
  const idIsNotNull = !(ticket.id === null || ticket.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateTicket : api.createTicket, ticket);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(TicketActions.ticketUpdateSuccess(response.data));
  } else {
    yield put(TicketActions.ticketUpdateFailure(response.data));
  }
}

function* deleteTicket(api, action) {
  const { ticketId } = action;
  // make the call to the api
  const apiCall = call(api.deleteTicket, ticketId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(TicketActions.ticketDeleteSuccess());
  } else {
    yield put(TicketActions.ticketDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.dueDate = convertLocalDateFromServer(data.dueDate);
  data.date = convertDateTimeFromServer(data.date);
  return data;
}

export default {
  getAllTickets,
  getTicket,
  deleteTicket,
  updateTicket,
};
