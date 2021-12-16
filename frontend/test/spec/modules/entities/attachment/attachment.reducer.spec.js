import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/attachment/attachment.reducer';

test('attempt retrieving a single attachment', () => {
  const state = reducer(INITIAL_STATE, Actions.attachmentRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.attachment).toEqual({ id: undefined });
});

test('attempt retrieving a list of attachment', () => {
  const state = reducer(INITIAL_STATE, Actions.attachmentAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.attachmentList).toEqual([]);
});

test('attempt updating a attachment', () => {
  const state = reducer(INITIAL_STATE, Actions.attachmentUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a attachment', () => {
  const state = reducer(INITIAL_STATE, Actions.attachmentDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a attachment', () => {
  const state = reducer(INITIAL_STATE, Actions.attachmentSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.attachment).toEqual({ id: 1 });
});

test('success retrieving a list of attachment', () => {
  const state = reducer(INITIAL_STATE, Actions.attachmentAllSuccess([{ id: 1 }, { id: 2 }]));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.attachmentList).toEqual([{ id: 1 }, { id: 2 }]);
});

test('success updating a attachment', () => {
  const state = reducer(INITIAL_STATE, Actions.attachmentUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.attachment).toEqual({ id: 1 });
});
test('success deleting a attachment', () => {
  const state = reducer(INITIAL_STATE, Actions.attachmentDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.attachment).toEqual({ id: undefined });
});

test('failure retrieving a attachment', () => {
  const state = reducer(INITIAL_STATE, Actions.attachmentFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.attachment).toEqual({ id: undefined });
});

test('failure retrieving a list of attachment', () => {
  const state = reducer(INITIAL_STATE, Actions.attachmentAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.attachmentList).toEqual([]);
});

test('failure updating a attachment', () => {
  const state = reducer(INITIAL_STATE, Actions.attachmentUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.attachment).toEqual(INITIAL_STATE.attachment);
});
test('failure deleting a attachment', () => {
  const state = reducer(INITIAL_STATE, Actions.attachmentDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.attachment).toEqual(INITIAL_STATE.attachment);
});

test('resetting state for attachment', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.attachmentReset());
  expect(state).toEqual(INITIAL_STATE);
});
