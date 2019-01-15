const { getConnection } = require('../bd')
const bd = getConnection()

const count = () => {
  const SQLquery = `SELECT COUNT(id) FROM yachts`
  return bd.one(SQLquery)
}

const findMany = (start, limit) => {
  const SQLquery = `SELECT * FROM yachts WHERE id>$1 AND id<=$2 ORDER BY id`
  return bd.any(SQLquery, [start, start + limit])
}

const findOne = id => {
  const SQLquery = `SELECT * FROM yachts WHERE id=$1`
  return bd.one(SQLquery, [id])
}

const insertNew = name => {
  const SQLquery = `INSERT INTO yachts (name) VALUES ($1);`
  console.log(SQLquery)
  return bd.none(SQLquery, [name])
}

module.exports = { count, findMany, findOne, insertNew }

// C R U D

/*

router.get('/products', function (req, res, next) {
  if (req.query._start && req.query._limit && req.query._start >= 0) {
    const start = parseInt(req.query._start)
    const limit = parseInt(req.query._limit)
    const SQLquery = `SELECT * FROM yachts WHERE id>${start} AND id<=${start +
      limit} ORDER BY id`
    bd.any(SQLquery, [true]).then(function (data) {
      res.setHeader('X-Total-Count', products.length)
      res.json(data)
    })
  } else if (req.query.id && req.query.id > 0) {
    const id = parseInt(req.query.id)
    const SQLquery = `SELECT * FROM yachts WHERE id=${id}`
    bd.one(SQLquery).then(function (data) {
      res.json([data])
    })
  } else {
    return next(createError(404))
  }
})

*/
