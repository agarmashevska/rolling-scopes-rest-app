const {
  initDB,
  getAllEntities,
  getEntity,
  saveEntity,
  removeEntity,
  updateEntity
} = require('./inMemoryDB');
const users = require('./mocks/users.json');
const boards = require('./mocks/boards.json');
const tasks = require('./mocks/tasks.json');

initDB(users, boards, tasks);

module.exports = {
  getAllEntities,
  getEntity,
  saveEntity,
  removeEntity,
  updateEntity
};
