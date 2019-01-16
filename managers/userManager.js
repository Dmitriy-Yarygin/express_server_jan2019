const model = require('../models/users')

module.exports = {
  Registrate: user => model.insertNew(user),

  Login: ({ email, password }) =>
    model.find(email).then(
      data => (data.attributes.password === password)
    )
}
