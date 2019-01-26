const { Users } = require('../bookshelf');

module.exports = {
  insertNew: user => Users.forge(user).save(),

  find: email => Users.where('email', email).fetch().then(data => data.attributes.password),
};
