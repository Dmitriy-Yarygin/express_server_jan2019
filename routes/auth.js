const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const manager = require('../managers/userManager')

router.post('/register', function (req, res, next) {
  manager
    .Registrate(req.body)
    .then(function (data) {
      res.json(data)
    })
    .catch(err => next(err))
})

router.get('/login', function (req, res, next) {
  if (req.query && req.query.email && req.query.password) {
    manager
      .Login(req.query)
      .then(function (data) {
        req.session.isLogin = data
        if (data) {
          res.end('SUCCESS')
        } else {
          res.end('TRY AGAIN')
        }
      })
      .catch(err => next(err))
  } else res.end('You must enter both: email and password')
})

router.get('/logout', function (req, res, next) {
  req.session.isLogin = false
  res.end('Good bye!')
})

router.get('/secretpage', function (req, res, next) {
  if (req.session.isLogin) {
    res.end('Hellow secret user!')
  } else {
    next(createError(401))
  }
})

module.exports = router
