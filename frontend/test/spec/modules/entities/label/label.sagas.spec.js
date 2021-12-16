import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import LabelSagas from '../../../../../app/modules/entities/label/label.sagas';
import LabelActions from '../../../../../app/modules/entities/label/label.reducer';

const { getLabel, getAllLabels, updateLabel, deleteLabel } = LabelSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getLabel(1);
  const step = stepper(getLabel(FixtureAPI, { labelId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(LabelActions.labelSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getLabel(FixtureAPI, { labelId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(LabelActions.labelFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllLabels();
  const step = stepper(getAllLabels(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(LabelActions.labelAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllLabels(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(LabelActions.labelAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateLabel({ id: 1 });
  const step = stepper(updateLabel(FixtureAPI, { label: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(LabelActions.labelUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateLabel(FixtureAPI, { label: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(LabelActions.labelUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteLabel({ id: 1 });
  const step = stepper(deleteLabel(FixtureAPI, { labelId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(LabelActions.labelDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteLabel(FixtureAPI, { labelId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(LabelActions.labelDeleteFailure()));
});
