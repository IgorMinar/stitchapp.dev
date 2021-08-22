const LOCAL_PROXY_PORT = 5999;
const LOCAL_PROXY_URL = `http://localhost:${LOCAL_PROXY_PORT}`;
const PROD_PROXY_URL = `https://fragments.tomas.dev`;
// TODO: make configurable so that in prod we use PROD_PROXY_URL
const PROXY_URL = LOCAL_PROXY_URL;

export const stichAppWorkers = {
  index: {
    scriptPath: 'dist/workers/stitch.js',
    localPort: 5000,
  },
  proxy: {
    scriptPath: 'dist/workers/stitch-fragment-proxy.js',
    localPort: LOCAL_PROXY_PORT,
  },
  header: {
    scriptPath: 'dist/workers/stitch-header.js',
    localPort: 5001,
    localEndpointUrl: `http://localhost:${5001}`,
    endpointUrl: `${PROXY_URL}/header`,
  },
  'todo-add': {
    scriptPath: 'dist/workers/stitch-todo-add.js',
    localPort: 5002,
    localEndpointUrl: `http://localhost:${5002}`,
    endpointUrl: `${PROXY_URL}/todo-add`,
  },
  'todo-list': {
    scriptPath: 'dist/workers/stitch-todo-list.js',
    localPort: 5003,
    localEndpointUrl: `http://localhost:${5003}`,
    endpointUrl: `${PROXY_URL}/todo-list`,
  },
  footer: {
    scriptPath: 'dist/workers/stitch-footer.js',
    localPort: 5004,
    localEndpointUrl: `http://localhost:${5004}`,
    endpointUrl: `${PROXY_URL}/footer`,
  },
};
