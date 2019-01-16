const model = require('../models/users')

module.exports = {
  Registrate: user => model.insertNew(user),

  Login: ({ email, password }) =>
    model.find(email).then(
      data =>
        new Promise((resolve, reject) => {
          if (data.attributes.password === password) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
    )
}
