const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');

const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const users = require('./mocks/users.json');
const boards = require('./mocks/boards.json');
const tasks = require('./mocks/tasks.json');

const init = () => {
  User.insertMany([...users]);
};

const connectMongoDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('DB connected successfully');
    db.dropDatabase();
    User.insertMany([...users]);
    cb();
  });
};

module.exports = { connectMongoDB };
