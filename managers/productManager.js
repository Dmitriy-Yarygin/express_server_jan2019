const { count, findMany, findOne, insertNew } = require('../models/products')

// Promise.all([count(), findMany()]).then(([bdLength, data]) => )

const managerFindMany = (start, limit) => {
  return Promise.all([count(), findMany(start, limit)])
}

const managerFindOne = id => findOne(id)

const managerInsertNew = name => insertNew(name)

module.exports = {
  managerFindMany,
  managerFindOne,
  managerInsertNew
}

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
