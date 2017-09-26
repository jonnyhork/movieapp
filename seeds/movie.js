exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('movie').del()
    .then(function() {
      // Inserts seed entries
      return knex('movie').insert([

        {
          id: 1,
          title: 'coding',
          year: 2012,
          director_id: 1
        },
        {
          id: 2,
          title: 'crazy \'bout you',
          year: 2015,
          director_id: 2
        },
        {
          id: 3,
          title: 'big movie',
          year: 2019,
          director_id: 3
        },
        {
          id: 4,
          title: 'Big Bang',
          year: 2014,
          director_id: 4
        }
      ]).then(() => {
        return knex.raw("SELECT setval('movie_id_seq', (SELECT MAX(id) FROM movie));")
      })
    })
};
