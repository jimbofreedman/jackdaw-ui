import { delay } from 'redux-saga'
import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import config from '../../config';
import { loadGpsData, gpsDataLoaded, gpsDataLoadingError } from './actions';
import {
  LOAD_GPS_DATA,
  LOAD_GPS_DATA_SUCCESS,
} from './constants';
import { LOCATION_CHANGE } from 'react-router-redux';

const wait = ms => {
  new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })
};

export function* getGpsData() {
  const requestURL = `${config.apiEndpoint}/gps`;
  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);
    yield put(gpsDataLoaded(data));
  } catch (err) {
    yield put(gpsDataLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* gpsData() {
  while (true) {
    yield call(delay, 100);
    yield call(getGpsData);
  }
  //   // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // // By using `takeLatest` only the result of the latest API call is applied.
  // // It returns task descriptor (just like fork) so we can continue execution
  //
  //
  // // Suspend execution until location changes
  // //yield take(LOCATION_CHANGE);
  // //yield cancel(watcher);
  // yield put(loadGpsData());
}

// All sagas to be loaded
export default [
  gpsData,
];
