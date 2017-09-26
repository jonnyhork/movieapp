exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('director').del()
    .then(function() {
      // Inserts seed entries
      return knex('director').insert([{
          id: 1,
          name: 'Adam',
          nationality: 'American'
        },
        {
          id: 2,
          name: 'BB',
          nationality: 'France'
        },
        {
          id: 3,
          name: 'Atom',
          nationality: 'New Zealand'
        },
        {
          id: 4,
          name: 'Cat',
          nationality: 'venus'
        }
      ]).then(() => {
        return knex.raw("SELECT setval('director_id_seq', (SELECT MAX(id) FROM director));")
      })
    })
};
