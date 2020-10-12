const uuid = require('uuid');

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
}

module.exports = Task;
