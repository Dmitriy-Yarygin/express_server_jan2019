const model = require('../models/products');

module.exports = {
  FindMany: (start, limit) => Promise.all([model.count(), model.findMany(start, limit)]),

  FindOne: id => model.findOne(id),

  InsertNew: product => model.insertNew(product),

  Uppdate: product => model.Update(product),

  Del: id => model.Del(id),
};
