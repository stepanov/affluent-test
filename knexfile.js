require('dotenv').config()

module.exports = {
  dev: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST, 
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'db/migrations'
    }
  },
}
