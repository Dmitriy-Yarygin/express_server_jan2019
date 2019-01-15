var express = require('express')
const createError = require('http-errors')
var router = express.Router()
const { products } = require('../yacht.json')

/* GET data. */
router.get('/products', function (req, res, next) {
  let productsArraySlice
  if (
    req.query._start &&
    req.query._limit &&
    req.query._start >= 0 &&
    req.query._start <= products.length
  ) {
    productsArraySlice = products.slice(
      req.query._start,
      req.query._start + req.query._limit
    )
  } else if (
    req.query.id &&
    req.query.id > 0 &&
    req.query.id <= products.length
  ) {
    productsArraySlice = [products[req.query.id - 1]]
  } else {
    return next(createError(404))
  }
  res.setHeader('X-Total-Count', products.length)
  res.json(productsArraySlice)
})

module.exports = router
