
const pgp = require('pg-promise')()
let db = false

const getConnection = () => {
  const connection = 'postgres://Dmitriy:Trfnthbyf@localhost:5432/Dmitriy'
  if (!db) {
    db = pgp(connection)
  }

  return db
}

module.exports = { getConnection }