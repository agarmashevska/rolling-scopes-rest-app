const mongoose = require('mongoose');

const uuid = require('uuid');
const pick = require('lodash/fp/pick');
const compose = require('lodash/fp/compose');
const isNil = require('lodash/fp/isNil');
const omitBy = require('lodash/fp/omitBy');

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { id: false, versionKey: false }
);

userSchema.virtual('id').get(function() {
  return this._id;
});

userSchema.set('toObject', { virtuals: true });

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

userSchema.statics.fromRequest = compose(
  omitBy(isNil),
  pick(['login', 'name', 'password'])
);

const User = mongoose.model('User', userSchema);

module.exports = User;
