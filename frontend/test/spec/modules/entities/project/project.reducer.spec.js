import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/project/project.reducer';

test('attempt retrieving a single project', () => {
  const state = reducer(INITIAL_STATE, Actions.projectRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.project).toEqual({ id: undefined });
});

test('attempt retrieving a list of project', () => {
  const state = reducer(INITIAL_STATE, Actions.projectAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.projectList).toEqual([]);
});

test('attempt updating a project', () => {
  const state = reducer(INITIAL_STATE, Actions.projectUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a project', () => {
  const state = reducer(INITIAL_STATE, Actions.projectDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a project', () => {
  const state = reducer(INITIAL_STATE, Actions.projectSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.project).toEqual({ id: 1 });
});

test('success retrieving a list of project', () => {
  const state = reducer(INITIAL_STATE, Actions.projectAllSuccess([{ id: 1 }, { id: 2 }]));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.projectList).toEqual([{ id: 1 }, { id: 2 }]);
});

test('success updating a project', () => {
  const state = reducer(INITIAL_STATE, Actions.projectUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.project).toEqual({ id: 1 });
});
test('success deleting a project', () => {
  const state = reducer(INITIAL_STATE, Actions.projectDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.project).toEqual({ id: undefined });
});

test('failure retrieving a project', () => {
  const state = reducer(INITIAL_STATE, Actions.projectFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.project).toEqual({ id: undefined });
});

test('failure retrieving a list of project', () => {
  const state = reducer(INITIAL_STATE, Actions.projectAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.projectList).toEqual([]);
});

test('failure updating a project', () => {
  const state = reducer(INITIAL_STATE, Actions.projectUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.project).toEqual(INITIAL_STATE.project);
});
test('failure deleting a project', () => {
  const state = reducer(INITIAL_STATE, Actions.projectDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.project).toEqual(INITIAL_STATE.project);
});

test('resetting state for project', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.projectReset());
  expect(state).toEqual(INITIAL_STATE);
});
