const cluster = require('cluster');
const app = require('./app');
const { port } = require('./config');

if (cluster.isMaster) {
  // eslint-disable-next-line global-require
  const numCPUs = require('os').cpus().length;
  for (let i = 0; i < numCPUs; i += 1) cluster.fork();

  cluster.on('exit', () => cluster.fork());
} else {
  app.listen(port);
}
