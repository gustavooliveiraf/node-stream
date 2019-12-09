const { errors } = require('../utils');

const findAll = (businessRules) => (userRepository) => (req, res) => {
  try {
    const businessRulesPortalOrigin = businessRules[req.payload.portalOrigin];
    const registers = userRepository.findAll(businessRulesPortalOrigin.main);

    return res.status(200).json(registers);
  } catch (err) {
    return errors.internalServerError(res);
  }
};

module.exports = findAll;
