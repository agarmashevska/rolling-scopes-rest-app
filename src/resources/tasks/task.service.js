const taskRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getAll = boardId => taskRepo.getAll(boardId);

const getById = (boardId, id) => taskRepo.get(boardId, id);

const save = (boardId, task) => taskRepo.save(new Task({ ...task, boardId }));

const remove = id => taskRepo.remove(id);

const update = (id, task) => taskRepo.update(id, task);

module.exports = { getAll, getById, save, remove, update };
