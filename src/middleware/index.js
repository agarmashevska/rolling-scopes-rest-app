const { NotFoundError, WriteError } = require('../common/errors');
const logger = require('../common/logger');
const { ERRORS } = require('../common/constants');

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  if (error instanceof NotFoundError) {
    logger.error(`Client error: ${error.message}`);
    return res.status(ERRORS.NOT_FOUND).send(error);
  }

  if (error instanceof WriteError) {
    logger.error(`Client error: ${error.message}`);
    return res.status(ERRORS.UNPROCESSABLE_ENTITY).send(error);
  }

  const internalError = new Error('Internal Server Error');
  internalError.stack = error.stack;

  logger.error(`${internalError.message}`);

  return res.status(ERRORS.INTERNAL_SERVER_ERROR).json(internalError);
};

module.exports = { errorHandler };
