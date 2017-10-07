import { delay } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import config from '../../config';
import { gpsDataLoaded, gpsDataLoadingError } from './actions';

/**
 * Root saga manages watcher lifecycle
 */
export function* gpsData() {
  while (true) {
    yield call(delay, 100);
    const requestURL = `${config.apiEndpoint}/gps`;
    try {
      // Call our request helper (see 'utils/request')
      const data = yield call(request, requestURL);
      yield put(gpsDataLoaded(data));
    } catch (err) {
      yield put(gpsDataLoadingError(err));
    }
  }
}

// All sagas to be loaded
export default [
  gpsData,
];
