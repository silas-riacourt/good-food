import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import CommentSagas from '../../../../../app/modules/entities/comment/comment.sagas';
import CommentActions from '../../../../../app/modules/entities/comment/comment.reducer';

const { getComment, getAllComments, updateComment, deleteComment } = CommentSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getComment(1);
  const step = stepper(getComment(FixtureAPI, { commentId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CommentActions.commentSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getComment(FixtureAPI, { commentId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CommentActions.commentFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllComments();
  const step = stepper(getAllComments(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CommentActions.commentAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllComments(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CommentActions.commentAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateComment({ id: 1 });
  const step = stepper(updateComment(FixtureAPI, { comment: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CommentActions.commentUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateComment(FixtureAPI, { comment: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CommentActions.commentUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteComment({ id: 1 });
  const step = stepper(deleteComment(FixtureAPI, { commentId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CommentActions.commentDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteComment(FixtureAPI, { commentId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CommentActions.commentDeleteFailure()));
});
