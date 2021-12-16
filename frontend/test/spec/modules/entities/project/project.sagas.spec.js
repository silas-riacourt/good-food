import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import ProjectSagas from '../../../../../app/modules/entities/project/project.sagas';
import ProjectActions from '../../../../../app/modules/entities/project/project.reducer';

const { getProject, getAllProjects, updateProject, deleteProject } = ProjectSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getProject(1);
  const step = stepper(getProject(FixtureAPI, { projectId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProjectActions.projectSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getProject(FixtureAPI, { projectId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProjectActions.projectFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllProjects();
  const step = stepper(getAllProjects(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProjectActions.projectAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllProjects(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProjectActions.projectAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateProject({ id: 1 });
  const step = stepper(updateProject(FixtureAPI, { project: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProjectActions.projectUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateProject(FixtureAPI, { project: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProjectActions.projectUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteProject({ id: 1 });
  const step = stepper(deleteProject(FixtureAPI, { projectId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProjectActions.projectDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteProject(FixtureAPI, { projectId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProjectActions.projectDeleteFailure()));
});
