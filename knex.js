const env = process.env.NODE_ENV || 'dev'
const config = require('./knexfile')[env]

module.exports = require('knex')(config)
