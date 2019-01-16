const knex = require('knex')({
  client: 'pg',
  connection: 'postgres://postgres:Trfnthbyf@localhost:5432/Dmitriy'
})
const bookshelf = require('bookshelf')(knex)

bookshelf.plugin('pagination')

const Users = bookshelf.Model.extend({
  tableName: 'users'
})

const Yachts = bookshelf.Model.extend({
  tableName: 'yachts'
})

module.exports = {Users, Yachts}
