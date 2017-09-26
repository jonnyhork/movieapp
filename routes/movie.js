var express = require('express');
var router = express.Router();
const knex = require('../knex')

// C
router.post('/', (req, res, next) => {
  console.log('req.body is:', req.body);
  console.log(req.body.year);

  knex('movie')
    .insert({
      title: req.body.title,
      year: req.body.year,
      director_id: req.body.director_id
    }) // add a returning '*' statement
    .then((movie) => {
      console.log('movie= ', movie);
      let newMovie = {
        title: movie[0].title,
        year: movie[0].year,
        director_id: movie[0].director_id
      }

      res.setHeader('Content-Type', 'application/json')
      res.send(newMovie)

    }).catch((err) => next(err))

  // res.send('post');
})
// R
router.get('/', (_req, res, next) => {
  knex('movie')
    .select('id', 'title', 'year')
    .then((movies) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(movies)
    }).catch((err) => next(err))

  // res.send('get all');
})

router.get('/:id', (req, res, next) => {

  let id = Number(req.params.id)

  knex('movie')
    .select('id', 'title', 'year')
    .where('id', id)
    .then((movie) => {
      // err handle if id doesnt exist
      res.setHeader('Content-Type', 'application/json')
      res.send(movie)
    }).catch((err) => next(err))


  // res.send('get one');
})
// U
router.patch('/:id', (req, res, next) => {
  console.log('req.body= ', req.body);
  let id = Number(req.params.id)

  // if (req.body === {}) {
  //   return res.status(404).send('Can not update movie without info')
  // }

  knex('movie')

    .update({
      title: req.body.title,
      year: req.body.year,
      director_id: req.body.director_id
    })
    .where('id', id)
    .then((movie) => {
      console.log('movie', movie);

      if (movie !== 1) {
        return res.status(404).send('No movie was updated')
      }

      let updatedMovie = {
        id: id,
        title: req.body.title,
        year: req.body.year,
        director_id: req.body.director_id
      }

      res.setHeader('Content-Type', 'application/json')
      res.send(updatedMovie)

    })
    .catch((err) => next(err))


  // res.send('patch');
})
// D
router.delete('/:id', (req, res, next) => {

  let id = Number(req.params.id)

  knex('movie')
    .del()
    .where('id', id)
    .then((delMovie) => {

      if (delMovie !== 1) {
        return res.status(404).send('No movie was deleted')
      }

      res.status(200).send(`movie with the id: ${id} was deleted`)
    })

  // res.send('delete');
})


module.exports = router;



module.exports = router;
