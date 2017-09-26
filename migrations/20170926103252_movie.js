exports.up = function(knex, Promise) {
  return knex.schema.createTable('movie', (table) => {
    table.increments()
    table.string('title').notNullable().defaultTo('working title')
    table.integer('year').notNullable()
    table.integer('director_id')
      .notNullable()
      .references('id')
      .inTable('director')
      .onDelete('CASCADE')
      .index()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('movie')
};
