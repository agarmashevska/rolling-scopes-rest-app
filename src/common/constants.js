const USER_TABLE_NAME = 'Users';
const BOARDS_TABLE_NAME = 'Boards';
const TASKS_TABLE_NAME = 'Tasks';

const INTERNAL_SERVER_ERROR = 500;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

module.exports = {
  TABLES: {
    USER_TABLE_NAME,
    BOARDS_TABLE_NAME,
    TASKS_TABLE_NAME
  },
  ERRORS: {
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
    UNPROCESSABLE_ENTITY
  }
};
