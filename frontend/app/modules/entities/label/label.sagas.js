import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import LabelActions from './label.reducer';

function* getLabel(api, action) {
  const { labelId } = action;
  // make the call to the api
  const apiCall = call(api.getLabel, labelId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(LabelActions.labelSuccess(response.data));
  } else {
    yield put(LabelActions.labelFailure(response.data));
  }
}

function* getAllLabels(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllLabels, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(LabelActions.labelAllSuccess(response.data, response.headers));
  } else {
    yield put(LabelActions.labelAllFailure(response.data));
  }
}

function* updateLabel(api, action) {
  const { label } = action;
  // make the call to the api
  const idIsNotNull = !(label.id === null || label.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateLabel : api.createLabel, label);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(LabelActions.labelUpdateSuccess(response.data));
  } else {
    yield put(LabelActions.labelUpdateFailure(response.data));
  }
}

function* deleteLabel(api, action) {
  const { labelId } = action;
  // make the call to the api
  const apiCall = call(api.deleteLabel, labelId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(LabelActions.labelDeleteSuccess());
  } else {
    yield put(LabelActions.labelDeleteFailure(response.data));
  }
}

export default {
  getAllLabels,
  getLabel,
  deleteLabel,
  updateLabel,
};
