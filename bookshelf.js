const knex = require('knex')({
  client: 'pg',
  connection: 'postgres://postgres:Trfnthbyf@localhost:5432/Dem',
});
const bookshelf = require('bookshelf')(knex);
const { products } = require('./yacht.json');

bookshelf.plugin('pagination');

const connectTable = tableName => bookshelf.Model.extend({ tableName });
const createUsersTable = (table) => {
  table.increments('id').primary();
  table.string('email', 20).unique();
  table.string('password');
};
const createYachtsTable = (table) => {
  table.increments('id').primary();
  table.string('name', 50);
  table.string('url');
  table.integer('year');
  table.integer('length');
  table.string('location', 30);
  table.string('material', 30);
  table.text('description');
  table.integer('cost');
};
let Users = connectTable('users');
let Yachts = connectTable('yachts');
knex.schema.hasTable('users').then((exists) => {
  if (!exists) {
    knex.schema.createTable('users', createUsersTable)
      .then(() => {
        Users = connectTable('users');
      });
  }
});
knex.schema.hasTable('yachts').then((exists) => {
  if (!exists) {
    knex.schema.createTable('yachts', createYachtsTable)
      .then(() => {
        Yachts = connectTable('yachts');
        products.forEach(({ id, ...yacht }) => {
          Yachts.forge(yacht).save();
        });
      });
  }
});

module.exports = { Users, Yachts };
