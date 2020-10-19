const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const logger = require('./common/logger');
const { errorHandler } = require('./middleware');
const exit = process.exit;

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use((req, res, next) => {
  logger.info(
    JSON.stringify({
      url: req.url,
      query: req.query,
      body: req.body
    })
  );

  next();
});

// TODO: remove after TASK 3 will be complete and evaluated
// setTimeout(() => {
//   throw new Error('Opps! Something went wrong!');
// }, 5000);

// setTimeout(() => {
//   Promise.reject(new Error('Promise reject!'));
// }, 4000);

app.use('/users', userRouter);
boardRouter.use('/:boardId/tasks', taskRouter);
app.use('/boards', boardRouter);

app.use(errorHandler);

process.on('uncaughtException', error => {
  logger.error(`Uncaught exception: ${error.message}`);
  logger.on('finish', () => exit(1));
  logger.end();
});

process.on('unhandledRejection', reason => {
  logger.error(`Uncaught rejection: ${reason.message}`);
  logger.on('finish', () => exit(1));
  logger.end();
});
module.exports = app;
