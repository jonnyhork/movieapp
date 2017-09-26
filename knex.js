const enviroment = process.env.NODE_ENV || 'developmeont'
const knexConfig = require('./knexfile')[enviroment]
const knex = require('knex')(knexConfig)

module.exports = knex
