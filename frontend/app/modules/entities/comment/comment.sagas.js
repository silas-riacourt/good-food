import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import CommentActions from './comment.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getComment(api, action) {
  const { commentId } = action;
  // make the call to the api
  const apiCall = call(api.getComment, commentId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(CommentActions.commentSuccess(response.data));
  } else {
    yield put(CommentActions.commentFailure(response.data));
  }
}

function* getAllComments(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllComments, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CommentActions.commentAllSuccess(response.data, response.headers));
  } else {
    yield put(CommentActions.commentAllFailure(response.data));
  }
}

function* updateComment(api, action) {
  const { comment } = action;
  // make the call to the api
  const idIsNotNull = !(comment.id === null || comment.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateComment : api.createComment, comment);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(CommentActions.commentUpdateSuccess(response.data));
  } else {
    yield put(CommentActions.commentUpdateFailure(response.data));
  }
}

function* deleteComment(api, action) {
  const { commentId } = action;
  // make the call to the api
  const apiCall = call(api.deleteComment, commentId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CommentActions.commentDeleteSuccess());
  } else {
    yield put(CommentActions.commentDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.date = convertDateTimeFromServer(data.date);
  return data;
}

export default {
  getAllComments,
  getComment,
  deleteComment,
  updateComment,
};
