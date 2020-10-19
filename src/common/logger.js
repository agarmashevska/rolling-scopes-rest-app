const winston = require('winston');
const path = require('path');

const { createLogger, format, transports } = winston;

const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({
      level: 'info',
      filename: path.resolve(__dirname, '../../logs/logs.log')
    }),
    new transports.File({
      level: 'error',
      filename: path.resolve(__dirname, '../../logs/errors.log')
    })
  ]
});

winston.clear().add(logger);
module.exports = logger;
