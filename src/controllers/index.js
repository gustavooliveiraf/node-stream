const businessRules = require('../businessRules');

const findAllDependencyInjection = require('./findAll');

const findAll = findAllDependencyInjection(businessRules);

module.exports = {
  // create,
  findAll,
  // update,
  // delete,
  // ...
  // ...
  // ...
};
