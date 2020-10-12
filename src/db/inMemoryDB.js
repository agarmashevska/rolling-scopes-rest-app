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

const initEntityDB = (entities = [], entityDB, Model) => {
  if (entities.length) {
    return entities.forEach(users => entityDB.push(new Model(users)));
  }

  const model = new Model();
  entityDB.push(model);
  return model;
};

const initDB = (users = []) => {
  initEntityDB(users, db.Users, User);

  const toDoColumn = { title: 'To Do' };
  const inDevelopmentColumn = { title: 'In Development', order: 1 };
  const inTestColumn = { title: 'In Test', order: 2 };

  const board1 = new Board({
    title: 'Project 1',
    columns: [toDoColumn, inDevelopmentColumn, inTestColumn]
  });

  const board2 = new Board({
    title: 'Project 2',
    columns: [toDoColumn, inDevelopmentColumn, inTestColumn]
  });

  const task1 = new Task({ title: 'task 1', boardId: board1.id });
  const task2 = new Task({ title: 'task 2', boardId: board1.id });
  const task3 = new Task({ title: 'task 3', boardId: board2.id });

  db.Boards.push(board1, board2);
  db.Tasks.push(task1, task2, task3);
};

module.exports = {
  initDB,
  getAllEntities,
  getEntity,
  saveEntity,
  removeEntity,
  updateEntity
};
