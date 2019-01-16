const { Yachts } = require('../bookshelf')

module.exports = {
  count: () => Yachts.count('id'),

  findMany: (offset, limit) =>
    Yachts.query('orderBy', 'id').fetchPage({ limit, offset }),

  findOne: id => Yachts.where('id', id).fetch(),

  insertNew: product => Yachts.forge(product).save(),

  Update: product =>
    Yachts.where('id', product.id).save(product, { method: 'update' }),

  Del: id => Yachts.where('id', id).destroy()
}
