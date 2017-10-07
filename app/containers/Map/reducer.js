/*
 *
 * MusicControl reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_GPS_DATA,
  LOAD_GPS_DATA_SUCCESS,
  LOAD_GPS_DATA_ERROR,
} from './constants';


// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
});

function mapReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_GPS_DATA:
      return state
        .set('loading', true);
    case LOAD_GPS_DATA_SUCCESS:
      return state
        .set('loading', false)
        .set('data', action.data);
    case LOAD_GPS_DATA_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default mapReducer;
