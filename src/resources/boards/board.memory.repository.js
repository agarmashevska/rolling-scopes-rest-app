const {
  getAllEntities,
  getEntity,
  saveEntity,
  removeEntity,
  updateEntity
} = require('../../db');
const { TABLES } = require('../../common/constants');
const {
  createNotFoundError,
  createWriteError
} = require('../../common/errors');

const getAll = async () => await getAllEntities(TABLES.BOARDS_TABLE_NAME);

const get = async id => {
  const board = await getEntity(TABLES.BOARDS_TABLE_NAME, id);
  if (!board) throw createNotFoundError(`Board with id ${id} is NOT found`);

  return board;
};

const save = async board => {
  const createdBoard = await saveEntity(TABLES.BOARDS_TABLE_NAME, board);
  if (!createdBoard) throw createWriteError('Board was NOT created');

  return createdBoard;
};

const remove = async id => await removeEntity(TABLES.BOARDS_TABLE_NAME, id);

const update = async (id, board) =>
  await updateEntity(TABLES.BOARDS_TABLE_NAME, id, board);

module.exports = { getAll, get, save, remove, update };
