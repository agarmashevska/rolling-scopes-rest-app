const uuid = require('uuid');
const pick = require('lodash/fp/pick');
const compose = require('lodash/fp/compose');
const isNil = require('lodash/fp/isNil');
const omitBy = require('lodash/fp/omitBy');

class Column {
  constructor({ id = uuid(), title = 'Column', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(column) {
    return column;
  }

  static fromRequest(requestData) {
    return compose(omitBy(isNil), pick(['title', 'order']))(requestData);
  }
}

module.exports = Column;
