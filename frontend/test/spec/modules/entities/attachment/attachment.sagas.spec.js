import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import AttachmentSagas from '../../../../../app/modules/entities/attachment/attachment.sagas';
import AttachmentActions from '../../../../../app/modules/entities/attachment/attachment.reducer';

const { getAttachment, getAllAttachments, updateAttachment, deleteAttachment } = AttachmentSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getAttachment(1);
  const step = stepper(getAttachment(FixtureAPI, { attachmentId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AttachmentActions.attachmentSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getAttachment(FixtureAPI, { attachmentId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AttachmentActions.attachmentFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllAttachments();
  const step = stepper(getAllAttachments(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AttachmentActions.attachmentAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllAttachments(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AttachmentActions.attachmentAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateAttachment({ id: 1 });
  const step = stepper(updateAttachment(FixtureAPI, { attachment: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AttachmentActions.attachmentUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateAttachment(FixtureAPI, { attachment: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AttachmentActions.attachmentUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteAttachment({ id: 1 });
  const step = stepper(deleteAttachment(FixtureAPI, { attachmentId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AttachmentActions.attachmentDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteAttachment(FixtureAPI, { attachmentId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AttachmentActions.attachmentDeleteFailure()));
});
