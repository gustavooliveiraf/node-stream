const registers = require('../mock/source-2.json');

const findAllDependencyInjection = require('./findAll');

const findAll = findAllDependencyInjection(registers);

module.exports = {
  // create,
  findAll,
  // update,
  // delete,
  // ...
  // ...
  // ...
};
