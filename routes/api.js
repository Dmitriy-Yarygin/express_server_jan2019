var express = require('express')
const createError = require('http-errors')
var router = express.Router()
const manager = require('../managers/productManager')

router.get('/products', function (req, res, next) {
  if (
    req.query._start &&
    req.query._limit &&
    req.query._start >= 0 &&
    req.query._limit < 50
  ) {
    const start = parseInt(req.query._start)
    const limit = parseInt(req.query._limit)
    manager
      .FindMany(start, limit)
      .then(function (data) {
        res.setHeader('X-Total-Count', parseInt(data[0]))
        res.json(data[1])
      })
      .catch(err => next(err))
  } else {
    next()
  }
})

router.get('/products', function (req, res, next) {
  if (req.query.id && req.query.id > 0) {
    const id = parseInt(req.query.id)
    manager
      .FindOne(id)
      .then(function (data) {
        res.json([data])
      })
      .catch(err => next(err))
  } else {
    next(createError(404))
  }
})

router.post('/products/add', function (req, res, next) {
  manager.InsertNew(req.body).catch(err => next(err))
})

router.patch('/products/update', function (req, res, next) {
  manager.Uppdate(req.body).catch(err => next(err))
})

router.delete('/products/del', function (req, res, next) {
  if (req.query.id) {
    res.json(req.query)
    manager.Del(req.query.id).catch(err => next(err))
  } else {
    return next(createError(`Record with id=${req.query.id} doesn't delete`))
  }
})

module.exports = router
