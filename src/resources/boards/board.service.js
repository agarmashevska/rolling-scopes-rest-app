const boardRepo = require('./board.memory.repository');
const Board = require('./board.model');

const getAll = () => boardRepo.getAll();

const getById = id => boardRepo.get(id);

const save = board => boardRepo.save(new Board(board));

const remove = id => boardRepo.remove(id);

const update = (id, board) => boardRepo.update(id, board);

module.exports = { getAll, getById, save, remove, update };
