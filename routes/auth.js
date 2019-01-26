const express = require('express');

const router = express.Router();
const createError = require('http-errors');
const manager = require('../managers/userManager');

router.post('/register', (req, res, next) => {
  const { email, password } = req.body;
  if (email === undefined || password === undefined) {
    next(createError(400));
  } else {
    manager
      .Registrate(email, password)
      .then((data) => {
        res.json(data);
      })
      .catch(err => next(err));
  }
});

router.get('/login', (req, res, next) => {
  if (req.query && req.query.email && req.query.password) {
    manager
      .Login(req.query)
      .then((data) => {
        req.session.isLogin = data;
        if (data) {
          res.end('SUCCESS');
        } else {
          res.end('TRY AGAIN');
        }
      })
      .catch(err => next(err));
  } else res.end('You must enter both: email and password');
});

router.get('/logout', (req, res) => {
  req.session.isLogin = false;
  res.end('Good bye!');
});

router.get('/secretpage', (req, res, next) => {
  if (req.session.isLogin) {
    res.end('Hellow secret user!');
  } else {
    next(createError(401));
  }
});

module.exports = router;
