/* eslint-disable no-underscore-dangle */
const express = require('express');
const createError = require('http-errors');

const router = express.Router();
const manager = require('../managers/productManager');

router.get('/products', (req, res, next) => {
  if (
    req.query._start && req.query._limit && req.query._start >= 0 && req.query._limit < 50
  ) {
    const start = parseInt(req.query._start, 10);
    const limit = parseInt(req.query._limit, 10);
    manager
      .FindMany(start, limit)
      .then((data) => {
        res.setHeader('X-Total-Count', parseInt(data[0], 10));
        res.json(data[1]);
      })
      .catch(err => next(err));
  } else {
    next();
  }
});

router.get('/products', (req, res, next) => {
  if (req.query.id && req.query.id > 0) {
    const id = parseInt(req.query.id, 10);
    manager
      .FindOne(id)
      .then((data) => {
        res.json([data]);
      })
      .catch(err => next(err));
  } else {
    next(createError(404));
  }
});

router.post('/products/add', (req, res, next) => {
  manager.InsertNew(req.body).catch(err => next(err));
});

router.patch('/products/update', (req, res, next) => {
  manager.Uppdate(req.body).catch(err => next(err));
});

// eslint-disable-next-line consistent-return
router.delete('/products/del', (req, res, next) => {
  if (req.query.id) {
    res.json(req.query);
    manager.Del(req.query.id).catch(err => next(err));
  } else {
    return next(createError(`Record with id=${req.query.id} doesn't delete`));
  }
});

module.exports = router;
