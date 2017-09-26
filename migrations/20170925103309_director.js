exports.up = function(knex, Promise) {
  return knex.schema.createTable('director', (table) => {
    table.increments()
    table.string('name')
    table.string('nationality')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('director')
};
