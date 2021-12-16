import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/comment/comment.reducer';

test('attempt retrieving a single comment', () => {
  const state = reducer(INITIAL_STATE, Actions.commentRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.comment).toEqual({ id: undefined });
});

test('attempt retrieving a list of comment', () => {
  const state = reducer(INITIAL_STATE, Actions.commentAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.commentList).toEqual([]);
});

test('attempt updating a comment', () => {
  const state = reducer(INITIAL_STATE, Actions.commentUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a comment', () => {
  const state = reducer(INITIAL_STATE, Actions.commentDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a comment', () => {
  const state = reducer(INITIAL_STATE, Actions.commentSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.comment).toEqual({ id: 1 });
});

test('success retrieving a list of comment', () => {
  const state = reducer(INITIAL_STATE, Actions.commentAllSuccess([{ id: 1 }, { id: 2 }]));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.commentList).toEqual([{ id: 1 }, { id: 2 }]);
});

test('success updating a comment', () => {
  const state = reducer(INITIAL_STATE, Actions.commentUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.comment).toEqual({ id: 1 });
});
test('success deleting a comment', () => {
  const state = reducer(INITIAL_STATE, Actions.commentDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.comment).toEqual({ id: undefined });
});

test('failure retrieving a comment', () => {
  const state = reducer(INITIAL_STATE, Actions.commentFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.comment).toEqual({ id: undefined });
});

test('failure retrieving a list of comment', () => {
  const state = reducer(INITIAL_STATE, Actions.commentAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.commentList).toEqual([]);
});

test('failure updating a comment', () => {
  const state = reducer(INITIAL_STATE, Actions.commentUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.comment).toEqual(INITIAL_STATE.comment);
});
test('failure deleting a comment', () => {
  const state = reducer(INITIAL_STATE, Actions.commentDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.comment).toEqual(INITIAL_STATE.comment);
});

test('resetting state for comment', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.commentReset());
  expect(state).toEqual(INITIAL_STATE);
});
