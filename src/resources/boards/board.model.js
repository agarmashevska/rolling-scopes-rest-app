const uuid = require('uuid');
const Column = require('./columns/column.model');
const pick = require('lodash/fp/pick');
const compose = require('lodash/fp/compose');
const isNil = require('lodash/fp/isNil');
const omitBy = require('lodash/fp/omitBy');

class Board {
  constructor({ id = uuid(), title = 'Board1', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.length
      ? columns.map(column => new Column(Column.fromRequest(column)))
      : columns;
  }

  static toResponse(board) {
    return board;
  }

  static fromRequest(requestData) {
    return compose(omitBy(isNil), pick(['title', 'columns']))(requestData);
  }
}

module.exports = Board;
