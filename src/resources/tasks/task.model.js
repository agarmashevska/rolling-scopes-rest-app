const uuid = require('uuid');
const pick = require('lodash/fp/pick');
const compose = require('lodash/fp/compose');
const isNil = require('lodash/fp/isNil');
const omitBy = require('lodash/fp/omitBy');

class Task {
  constructor({
    id = uuid(),
    title = 'Task1',
    order = 0,
    description = 'new Task',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    return task;
  }

  static fromRequest(requestData) {
    return compose(
      omitBy(isNil),
      pick(['title', 'order', 'description', 'userId', 'boardId', 'columnId'])
    )(requestData);
  }
}

module.exports = Task;
