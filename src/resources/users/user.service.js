const usersRepo = require('./users.db.repository');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.get(id);

const save = user => usersRepo.save(user);

const remove = id => usersRepo.remove(id);

const update = (id, user) => usersRepo.update(id, user);

module.exports = { getAll, getById, save, remove, update };
