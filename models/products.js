const yachts = require('../bookshelf')

module.exports = {
  count: () => yachts.count('id'),

  findMany: (offset, limit) =>
    yachts.query('orderBy', 'id').fetchPage({ limit, offset }),

  findOne: id => yachts.where('id', id).fetch(),

  insertNew: product => yachts.forge(product).save(),

  Update: product =>
    yachts.where('id', product.id).save(product, { method: 'update' }),

  Del: id => yachts.where('id', id).destroy()
}
