import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import ProjectActions from './project.reducer';

function* getProject(api, action) {
  const { projectId } = action;
  // make the call to the api
  const apiCall = call(api.getProject, projectId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProjectActions.projectSuccess(response.data));
  } else {
    yield put(ProjectActions.projectFailure(response.data));
  }
}

function* getAllProjects(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllProjects, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProjectActions.projectAllSuccess(response.data, response.headers));
  } else {
    yield put(ProjectActions.projectAllFailure(response.data));
  }
}

function* updateProject(api, action) {
  const { project } = action;
  // make the call to the api
  const idIsNotNull = !(project.id === null || project.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateProject : api.createProject, project);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProjectActions.projectUpdateSuccess(response.data));
  } else {
    yield put(ProjectActions.projectUpdateFailure(response.data));
  }
}

function* deleteProject(api, action) {
  const { projectId } = action;
  // make the call to the api
  const apiCall = call(api.deleteProject, projectId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProjectActions.projectDeleteSuccess());
  } else {
    yield put(ProjectActions.projectDeleteFailure(response.data));
  }
}

export default {
  getAllProjects,
  getProject,
  deleteProject,
  updateProject,
};
