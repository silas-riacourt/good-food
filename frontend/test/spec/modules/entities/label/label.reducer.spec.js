import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/label/label.reducer';

test('attempt retrieving a single label', () => {
  const state = reducer(INITIAL_STATE, Actions.labelRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.label).toEqual({ id: undefined });
});

test('attempt retrieving a list of label', () => {
  const state = reducer(INITIAL_STATE, Actions.labelAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.labelList).toEqual([]);
});

test('attempt updating a label', () => {
  const state = reducer(INITIAL_STATE, Actions.labelUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a label', () => {
  const state = reducer(INITIAL_STATE, Actions.labelDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a label', () => {
  const state = reducer(INITIAL_STATE, Actions.labelSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.label).toEqual({ id: 1 });
});

test('success retrieving a list of label', () => {
  const state = reducer(INITIAL_STATE, Actions.labelAllSuccess([{ id: 1 }, { id: 2 }]));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.labelList).toEqual([{ id: 1 }, { id: 2 }]);
});

test('success updating a label', () => {
  const state = reducer(INITIAL_STATE, Actions.labelUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.label).toEqual({ id: 1 });
});
test('success deleting a label', () => {
  const state = reducer(INITIAL_STATE, Actions.labelDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.label).toEqual({ id: undefined });
});

test('failure retrieving a label', () => {
  const state = reducer(INITIAL_STATE, Actions.labelFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.label).toEqual({ id: undefined });
});

test('failure retrieving a list of label', () => {
  const state = reducer(INITIAL_STATE, Actions.labelAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.labelList).toEqual([]);
});

test('failure updating a label', () => {
  const state = reducer(INITIAL_STATE, Actions.labelUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.label).toEqual(INITIAL_STATE.label);
});
test('failure deleting a label', () => {
  const state = reducer(INITIAL_STATE, Actions.labelDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.label).toEqual(INITIAL_STATE.label);
});

test('resetting state for label', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.labelReset());
  expect(state).toEqual(INITIAL_STATE);
});
