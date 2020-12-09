
const tableName = 'users'

exports.up = async function(knex) {
  await knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary()
    table.integer('external_id')
    table.string('email')
    table.string('first_name')
    table.string('last_name')
    table.string('avatar')
    table.timestamps()
  }) 
}

exports.down = async function(knex) {
  await knex.schema.dropTable(tableName)
}
