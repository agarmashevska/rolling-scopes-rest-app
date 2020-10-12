const filter = require('lodash/fp/filter');
const find = require('lodash/fp/find');
const matchesProperty = require('lodash/fp/matchesProperty');

const {
  getAllEntities,
  saveEntity,
  removeEntity,
  updateEntity
} = require('../../db');
const { TABLES } = require('../../common/constants');
const {
  createNotFoundError,
  createWriteError
} = require('../../common/errors');

const getAll = async boardId => {
  const tasks = await getAllEntities(TABLES.TASKS_TABLE_NAME);
  const filteredTaskByBoardId = filter(
    matchesProperty('boardId', boardId),
    tasks
  );
  if (!filteredTaskByBoardId.length) {
    throw createNotFoundError(`There are no tasks belong to board ${boardId}`);
  }

  return filteredTaskByBoardId;
};

const get = async (boardId, id) => {
  const tasks = await getAll(boardId);
  if (!tasks || !tasks.length) {
    throw createNotFoundError(`Tasks with boardId ${boardId} are NOT found`);
  }

  const task = find(matchesProperty('id', id), tasks);
  if (!task) throw createNotFoundError(`Task with id ${id} is NOT found`);

  return task;
};

const save = async task => {
  const createdTask = await saveEntity(TABLES.TASKS_TABLE_NAME, task);
  if (!createdTask) throw createWriteError('Task was NOT created');

  return createdTask;
};

const remove = async id => await removeEntity(TABLES.TASKS_TABLE_NAME, id);

const update = async (id, task) =>
  await updateEntity(TABLES.TASKS_TABLE_NAME, id, task);

module.exports = { getAll, get, save, remove, update };
