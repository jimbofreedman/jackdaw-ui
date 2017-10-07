import {
  LOAD_GPS_DATA,
  LOAD_GPS_DATA_SUCCESS,
  LOAD_GPS_DATA_ERROR,
} from './constants';

export function loadGpsData() {
  return {
    type: LOAD_GPS_DATA,
  };
}


export function gpsDataLoaded(data) {
  return {
    type: LOAD_GPS_DATA_SUCCESS,
    data,
  };
}

export function gpsDataLoadingError(error) {
  return {
    type: LOAD_GPS_DATA_ERROR,
    error,
  };
}
