const Board = require('./board.model');
const router = require('express').Router();
const boardService = require('./board.service');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardService.getAll();
    res.status(200).json(boards.map(Board.toResponse));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardService.getById(req.params.id);
    res.status(200).json(Board.toResponse(board));
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const board = await boardService.save(Board.fromRequest(req.body));
    res.json(Board.toResponse(board));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await boardService.remove(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const board = await boardService.update(
      req.params.id,
      Board.fromRequest(req.body)
    );
    res.status(200).json(Board.toResponse(board));
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
