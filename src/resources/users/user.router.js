const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.status(200).json(users.map(User.toResponse));
  } catch (err) {
    res.status(404).send(err);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.getById(req.params.id);
    res.status(200).json(User.toResponse(user));
  } catch (err) {
    res.status(404).send(err);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const user = await usersService.save(User.fromRequest(req.body));
    res.json(User.toResponse(user));
  } catch (err) {
    res.status(422).send(err);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await usersService.remove(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const user = await usersService.update(
      req.params.id,
      User.fromRequest(req.body)
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
