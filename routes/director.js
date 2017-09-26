var express = require('express');
var router = express.Router();
const knex = require('../knex')

// C
router.post('/', (req, res, next) => {

  console.log('req.body is:', req.body);

  // if (req.body === {}) {
  //   return res.status(400).send('need post data')
  // }

  knex('director')

    .insert({
      name: req.body.name,
      nationality: req.body.nationality
    })
    .then((director) => {
      // console.log('director= ', director);

      let newDirector = {
        name: req.body.name,
        nationality: req.body.nationality
      }

      res.setHeader('Content-Type', 'application/json')
      res.send(newDirector)
      // res.send('post');
    }).catch((err) => next(err))
})
// R
router.get('/', (_req, res, next) => {
  knex('director')
    .select('name', 'nationality')
    .then((directors) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(directors)
    }).catch((err) => next(err))


  // res.send('get all');
})

router.get('/:id', (req, res, next) => {

  let id = Number(req.params.id)

  if (Number.isNaN(id)) {
    return res.status(404).send('id is not a number')
  }

  knex('director')
    .select('name', 'nationality')
    .where('id', id)
    .then((directors) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(directors)
    }).catch((err) => next(err))

  // res.send('get one');
})
// U
router.patch('/:id', (req, res, next) => {

  let id = Number(req.params.id)

  if (Number.isNaN(id)) {
    return res.status(404).send('id is not a number')
  }

  knex('director')
    .update({
      name: req.body.name,
      nationality: req.body.nationality
    })
    .where('id', id)
    .then((director) => {
      if (director !== 1) {
        return res.status(404).send('No director was updated')
      }

      let updatedDirector = {
        id: id,
        name: req.body.name,
        nationality: req.body.nationality
      }

      res.setHeader('Content-Type', 'application/json')
      res.send(updatedDirector)
    })

  // res.send('patch');
})
// D
router.delete('/:id', (req, res, next) => {

  let id = Number(req.params.id)

  if (Number.isNaN(id)) {
    return res.status(404).send('id is not a number')
  }

  knex('director')
    .del()
    .where('id', id)
    .then((delDirector) => {
      if (delDirector !== 1) {
        return res.status(404).send('No movie was deleted')
      }
      res.status(200).send(`Director with the id: ${id} was deleted`)
    }).catch((err) => next(err))

  //res.send('delete');
})


module.exports = router;
