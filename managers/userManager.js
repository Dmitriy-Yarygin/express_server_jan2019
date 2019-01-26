const bcrypt = require('bcrypt');
const model = require('../models/users');

const saltRounds = 10;

module.exports = {
  Registrate: (email, password) => bcrypt.hash(password, saltRounds)
    .then(hash => model.insertNew({ email, password: hash })),

  Login: ({ email, password }) => model.find(email)
    .then(hash => bcrypt.compare(password, hash)),
};
