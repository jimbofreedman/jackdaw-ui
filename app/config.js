const config = {
  development: {
    apiEndpoint: 'http://localhost:8090',
    tileEndpoint: 'http://localhost:8091',
    mopidyEndpoint: 'http://localhost:6680',
  },
  staging: {
    apiEndpoint: 'http://localhost:8000',
    tileEndpoint: 'http://localhost:80',
    mopidyEndpoint: 'http://localhost:6680',
  },
  production: {
    apiEndpoint: 'http://localhost:8000',
    tileEndpoint: 'http://localhost:80',
    mopidyEndpoint: 'http://localhost:6680',
  },
};

export default config[process.env.NODE_ENV];
