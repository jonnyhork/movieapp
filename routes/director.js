var express = require('express');
var router = express.Router();
const knex = require('../knex')

// C
router.post('/', (req, res, next) => {
  res.send('post');
})
// R
router.get('/', (_req, res, next) => {
  res.send('get all');
})

router.get('/:id', (req, res, next) => {
  res.send('get one');
})
// U
router.patch('/:id', (req, res, next) => {
  res.send('patch');
})
// D
router.delete('/:id', (req, res, next) => {
  res.send('delete');
})


module.exports = router;
