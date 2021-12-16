import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/ticket/ticket.reducer';

test('attempt retrieving a single ticket', () => {
  const state = reducer(INITIAL_STATE, Actions.ticketRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.ticket).toEqual({ id: undefined });
});

test('attempt retrieving a list of ticket', () => {
  const state = reducer(INITIAL_STATE, Actions.ticketAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.ticketList).toEqual([]);
});

test('attempt updating a ticket', () => {
  const state = reducer(INITIAL_STATE, Actions.ticketUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a ticket', () => {
  const state = reducer(INITIAL_STATE, Actions.ticketDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a ticket', () => {
  const state = reducer(INITIAL_STATE, Actions.ticketSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.ticket).toEqual({ id: 1 });
});

test('success retrieving a list of ticket', () => {
  const state = reducer(INITIAL_STATE, Actions.ticketAllSuccess([{ id: 1 }, { id: 2 }]));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.ticketList).toEqual([{ id: 1 }, { id: 2 }]);
});

test('success updating a ticket', () => {
  const state = reducer(INITIAL_STATE, Actions.ticketUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.ticket).toEqual({ id: 1 });
});
test('success deleting a ticket', () => {
  const state = reducer(INITIAL_STATE, Actions.ticketDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.ticket).toEqual({ id: undefined });
});

test('failure retrieving a ticket', () => {
  const state = reducer(INITIAL_STATE, Actions.ticketFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.ticket).toEqual({ id: undefined });
});

test('failure retrieving a list of ticket', () => {
  const state = reducer(INITIAL_STATE, Actions.ticketAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.ticketList).toEqual([]);
});

test('failure updating a ticket', () => {
  const state = reducer(INITIAL_STATE, Actions.ticketUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.ticket).toEqual(INITIAL_STATE.ticket);
});
test('failure deleting a ticket', () => {
  const state = reducer(INITIAL_STATE, Actions.ticketDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.ticket).toEqual(INITIAL_STATE.ticket);
});

test('resetting state for ticket', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.ticketReset());
  expect(state).toEqual(INITIAL_STATE);
});
