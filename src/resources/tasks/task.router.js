const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const Task = require('./task.model');

router.route('/').get(async (req, res) => {
  try {
    const tasks = await taskService.getAll(req.params.boardId);
    res.status(200).json(tasks.map(Task.toResponse));
  } catch (err) {
    res.status(404).send(err);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const task = await taskService.getById(req.params.boardId, req.params.id);
    res.status(200).json(Task.toResponse(task));
  } catch (err) {
    res.status(404).send(err);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const task = await taskService.save(
      req.params.boardId,
      Task.fromRequest(req.body)
    );
    res.json(Task.toResponse(task));
  } catch (err) {
    res.status(422).send(err);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await taskService.remove(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const task = await taskService.update(
      req.params.id,
      Task.fromRequest(req.body)
    );
    res.status(200).json(Task.toResponse(task));
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
