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

const getAll = async () => await getAllEntities(TABLES.USER_TABLE_NAME);

const get = async id => {
  const user = await getEntity(TABLES.USER_TABLE_NAME, id);
  if (!user) throw createNotFoundError(`User with id ${id} is NOT found`);

  return user;
};

const save = async user => {
  const createdUser = await saveEntity(TABLES.USER_TABLE_NAME, user);
  if (!createdUser) throw createWriteError('User was NOT created');

  return createdUser;
};

const remove = async id => await removeEntity(TABLES.USER_TABLE_NAME, id);

const update = async (id, entity) =>
  await updateEntity(TABLES.USER_TABLE_NAME, id, entity);

module.exports = { getAll, get, save, remove, update };
