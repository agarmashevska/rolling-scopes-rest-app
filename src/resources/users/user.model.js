const uuid = require('uuid');
const pick = require('lodash/fp/pick');
const compose = require('lodash/fp/compose');
const isNil = require('lodash/fp/isNil');
const omitBy = require('lodash/fp/omitBy');

class User {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  static fromRequest(requestData) {
    return compose(
      omitBy(isNil),
      pick(['login', 'name', 'password'])
    )(requestData);
  }
}

module.exports = User;
