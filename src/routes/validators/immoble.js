const { constant: { portals }, errors } = require('../../utils');

const findAll = async (req, res, next) => {
  // no need to validate with joi (@hapi/joi). Array.includes is enough
  if (portals.includes(req.params.portalOrigin)) {
    req.payload = {};
    req.payload.portalOrigin = req.params.portalOrigin === 'viva-real'
      ? 'vivaReal'
      : req.params.portalOrigin;

    return next();
  }

  return errors.unprocessableEntity(res);
};

module.exports = {
  // create,
  findAll,
  // update,
  // delete,
  // ...
  // ...
  // ...
};
