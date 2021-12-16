import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import AttachmentActions from './attachment.reducer';

function* getAttachment(api, action) {
  const { attachmentId } = action;
  // make the call to the api
  const apiCall = call(api.getAttachment, attachmentId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(AttachmentActions.attachmentSuccess(response.data));
  } else {
    yield put(AttachmentActions.attachmentFailure(response.data));
  }
}

function* getAllAttachments(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllAttachments, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(AttachmentActions.attachmentAllSuccess(response.data, response.headers));
  } else {
    yield put(AttachmentActions.attachmentAllFailure(response.data));
  }
}

function* updateAttachment(api, action) {
  const { attachment } = action;
  // make the call to the api
  const idIsNotNull = !(attachment.id === null || attachment.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateAttachment : api.createAttachment, attachment);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(AttachmentActions.attachmentUpdateSuccess(response.data));
  } else {
    yield put(AttachmentActions.attachmentUpdateFailure(response.data));
  }
}

function* deleteAttachment(api, action) {
  const { attachmentId } = action;
  // make the call to the api
  const apiCall = call(api.deleteAttachment, attachmentId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(AttachmentActions.attachmentDeleteSuccess());
  } else {
    yield put(AttachmentActions.attachmentDeleteFailure(response.data));
  }
}

export default {
  getAllAttachments,
  getAttachment,
  deleteAttachment,
  updateAttachment,
};
