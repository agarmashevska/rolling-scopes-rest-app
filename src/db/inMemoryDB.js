const filter = require('lodash/fp/filter');
const identity = require('lodash/fp/identity');
const compose = require('lodash/fp/compose');
const matchesProperty = require('lodash/fp/matchesProperty');
const remove = require('lodash/fp/remove');
const findIndex = require('lodash/fp/findIndex');
const find = require('lodash/fp/find');
const isNil = require('lodash/fp/isNil');
const map = require('lodash/fp/map');

const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const db = {
  Users: [],
  Boards: [],
  Tasks: [],
  normalizeAfterBoardsDeletion(boardId) {
    this.Tasks = map(
      task => (task.boardId === boardId ? { ...task, boardId: null } : task),
      this.Tasks
    );
  },
  normalizeAfterUsersDeletion(userId) {
    this.Tasks = map(
      task => (task.userId === userId ? { ...task, userId: null } : task),
      this.Tasks
    );
  }
};

const getAllEntities = table => Promise.resolve(filter(identity, db[table]));

const getEntity = (table, id) =>
  Promise.resolve(compose(find(['id', id]), filter(identity))(db[table]));

const saveEntity = (table, entity) => {
  db[table].push(entity);

  return Promise.resolve(entity);
};

const removeEntity = (table, id) => {
  const entities = db[table];
  const entityToRemoveIndex = findIndex(['id', id], entities);

  if (isNil(entityToRemoveIndex)) {
    return Promise.reject(`Entity to remove with id ${id} was NOT found`);
  }

  db[table] = remove(matchesProperty('id', id), db[table]);
  const fn = db[`normalizeAfter${table}Deletion`];

  if (fn) db[`normalizeAfter${table}Deletion`](id);

  return Promise.resolve(true);
};

const updateEntity = (table, id, entity) => {
  const entities = db[table];
  const entityToUpdateIndex = findIndex(matchesProperty('id', id), entities);
  if (!entityToUpdateIndex) {
    return Promise.reject(`Entity to update with id ${id} was NOT found`);
  }

  const oldEntity = { ...entities[entityToUpdateIndex] };
  entities[entityToUpdateIndex] = { ...oldEntity, ...entity };
  return getEntity(table, id);
};

const initEntityDB = (entities = [], Model) => {
  if (entities.length) {
    return entities.map(el => new Model(el));
  }

  return [new Model()];
};

const initDB = (users = [], boards = [], tasks = []) => {
  const usersCreated = initEntityDB(users, User);
  const boardsCreated = initEntityDB(boards, Board);
  const tasksCreated = initEntityDB(tasks, Task);

  const tasksUpdated = (tasksCreated || []).map(task => {
    const randomBoard =
      boardsCreated[Math.floor(Math.random() * boardsCreated.length)];
    const randomColumnOfBoard =
      randomBoard.columns[
        Math.floor(Math.random() * randomBoard.columns.length)
      ];
    task.boardId = randomBoard.id;
    task.columnId = randomColumnOfBoard.id;
    task.userId =
      usersCreated[Math.floor(Math.random() * usersCreated.length)].id;
    return task;
  });

  usersCreated.forEach(user => db.Users.push(user));
  tasksUpdated.forEach(task => db.Tasks.push(task));
  boardsCreated.forEach(board => db.Boards.push(board));
};

module.exports = {
  initDB,
  getAllEntities,
  getEntity,
  saveEntity,
  removeEntity,
  updateEntity
};
