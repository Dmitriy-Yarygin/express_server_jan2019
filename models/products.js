const { getConnection } = require('../bd')
const bd = getConnection()
const yachtsHeader = [
  'name',
  'url',
  'year',
  'length',
  'location',
  'material',
  'description',
  'cost'
]

module.exports = {
  count: () => {
    const SQLquery = `SELECT COUNT(id) FROM yachts`
    return bd.one(SQLquery)
  },

  findMany: (start, limit) => {
    // const SQLquery = `SELECT * FROM yachts WHERE id>$1 AND id<=$2 ORDER BY id`
    const SQLquery = `SELECT * FROM yachts ORDER BY id OFFSET $1  LIMIT $2`
    return bd.any(SQLquery, [start, limit])

  },

  findOne: id => {
    const SQLquery = `SELECT * FROM yachts WHERE id=$1`
    return bd.one(SQLquery, [id])
  },

  insertNew: query => {
    const fields = yachtsHeader.join('","')
    const values = yachtsHeader.map(fieldName => query[fieldName])
    const SQLquery = `INSERT INTO yachts ("${fields}") VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`
    return bd.none(SQLquery, values)
  },

  Update: ({ id, ...params }) => {
    const columnValues = yachtsHeader.reduce((previousValue, fieldName) => {
      if (params[fieldName]) {
        if (previousValue === '') {
          return `${fieldName} = '${params[fieldName]}'`
        } else {
          return `${previousValue}, ${fieldName} = ${params[fieldName]}`
        }
      } else {
        return previousValue
      }
    }, '')
    const SQLquery = `UPDATE yachts SET ${columnValues} WHERE id=${id};`
    return bd.none(SQLquery)
  },

  Del: (id) => {
    const SQLquery = `DELETE FROM yachts WHERE id=${id};`
    return bd.none(SQLquery)
  }
}
