import reduxApi from 'redux-api-immutablejs';
import adapterFetch from 'redux-api-immutablejs/lib/adapters/fetch';
import config from 'config';

const options = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export default reduxApi({
  gps: {
    url: '/gps',
    crud: true,
    reducerName: 'gps',
    helpers: {
      poll() {
        return [{ fn: 'poll' }, { method: 'get' }];
      },
    },
    options,
  },
}).use("fetch", adapterFetch(fetch))
  .use('rootUrl', config.apiEndpoint);
