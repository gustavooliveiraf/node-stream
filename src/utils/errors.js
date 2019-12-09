const HttpStatus = require('http-status-codes');

// Logstash?!!!

const responseError = (res, statusCode) => res.status(statusCode)
  .json({
    error: HttpStatus.getStatusText(statusCode),
  });

const unprocessableEntity = (res) => responseError(res, HttpStatus.UNPROCESSABLE_ENTITY);

const internalServerError = (res) => responseError(res, HttpStatus.INTERNAL_SERVER_ERROR);

module.exports = {
  unprocessableEntity,
  internalServerError,
};
