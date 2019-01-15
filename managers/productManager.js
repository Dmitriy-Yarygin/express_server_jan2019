const model = require('../models/products')

module.exports = {
  FindMany: (start, limit) =>
    Promise.all([model.count(), model.findMany(start, limit)]),

  FindOne: id => model.findOne(id),

  InsertNew: query => model.insertNew(query),

  Uppdate: (query) => model.Update(query),

  Del: (id) => model.Del(id)
}
