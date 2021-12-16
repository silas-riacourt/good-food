import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import TicketSagas from '../../../../../app/modules/entities/ticket/ticket.sagas';
import TicketActions from '../../../../../app/modules/entities/ticket/ticket.reducer';

const { getTicket, getAllTickets, updateTicket, deleteTicket } = TicketSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getTicket(1);
  const step = stepper(getTicket(FixtureAPI, { ticketId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TicketActions.ticketSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getTicket(FixtureAPI, { ticketId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TicketActions.ticketFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllTickets();
  const step = stepper(getAllTickets(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TicketActions.ticketAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllTickets(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TicketActions.ticketAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateTicket({ id: 1 });
  const step = stepper(updateTicket(FixtureAPI, { ticket: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TicketActions.ticketUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateTicket(FixtureAPI, { ticket: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TicketActions.ticketUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteTicket({ id: 1 });
  const step = stepper(deleteTicket(FixtureAPI, { ticketId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TicketActions.ticketDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteTicket(FixtureAPI, { ticketId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TicketActions.ticketDeleteFailure()));
});
