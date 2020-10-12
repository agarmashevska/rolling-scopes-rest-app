const User = require('./user.model');
const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.get(id);

const save = user => usersRepo.save(new User(user));

const remove = id => usersRepo.remove(id);

const update = (id, user) => usersRepo.update(id, user);

module.exports = { getAll, getById, save, remove, update };
