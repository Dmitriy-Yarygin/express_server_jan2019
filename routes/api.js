var express = require('express')
const createError = require('http-errors')
var router = express.Router()
// const { getConnection } = require('../bd')
// const bd = getConnection()
// const { products } = require('../yacht.json')
const {
  managerFindMany,
  managerFindOne,
  managerInsertNew
} = require('../managers/productManager')

router.get('/products', function (req, res, next) {
  if (req.query._start && req.query._limit && req.query._start >= 0) {
    const start = parseInt(req.query._start)
    const limit = parseInt(req.query._limit)
    managerFindMany(start, limit)
      .then(function (data) {
        res.setHeader('X-Total-Count', parseInt(data[0].count))
        res.json(data[1])
      })
      .catch(err => next(err))
  } else if (req.query.id && req.query.id > 0) {
    const id = parseInt(req.query.id)
    managerFindOne(id)
      .then(function (data) {
        res.json([data])
      })
      .catch(err => next(err))
  } else {
    return next(createError(404))
  }
})

router.get('/products/add', function (req, res, next) {
  if (req.query) {
    console.log(req.query.name)
    res.json(req.query.name)

    managerInsertNew(req.query.name).catch(err => next(err))
  } else {
    return next(createError(404))
  }
})

module.exports = router

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
