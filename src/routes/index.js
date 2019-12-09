// const statusServerRoute = require('./statusServer');
// const routeNotFound = require('./routeNotFound');

const immobileRouter = require('./immobile');

module.exports = (app) => {
  app.use(immobileRouter);
};
