const User = require('./user.model');

const getAll = async () => await User.find({});

const get = async id => await User.findOne({ _id: id });

const save = async user => await User.create(user);

const remove = async id => await User.deleteOne({ _id: id }).ok;

const update = async (id, entity) => await User.update({ _id: id }, entity);

module.exports = { getAll, get, save, update, remove };
