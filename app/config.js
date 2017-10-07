const config = {
  development: {
    apiEndpoint: 'http://localhost:5000',
    tileEndpoint: 'http://localhost:8091',
    mopidyEndpoint: 'ws://localhost:6680',
  },
  staging: {
    apiEndpoint: 'http://localhost:5000',
    tileEndpoint: 'http://localhost:80',
    mopidyEndpoint: 'ws://localhost:6680',
  },
  production: {
    apiEndpoint: 'http://localhost:5000',
    tileEndpoint: 'http://localhost:80',
    mopidyEndpoint: 'ws://localhost:6680',
  },
};

export default config[process.env.NODE_ENV];
