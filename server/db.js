const path = require('path')
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

const con = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: dbPath,
    },
    useNullAsDefault: true
})

con.schema
    .hasTable('sequences')
        .then((exists) => {
            if (!exists) {
                return con.schema.createTable('sequences', (table) => {
                    table.increments('sequence_id').primary()
                    table.string('sequence')
                })
                .then(() => {
                    console.log('Table \'sequences\' created')
                })
                .catch((err) => {
                    console.error(`Error creating table: ${err}`)
                })
            }
        })

con.schema
    .hasTable('sortingSteps')
        .then((exists) => {
            if (!exists) {
                return con.schema.createTable('sortingSteps', (table) => {
                    table.increments('step_id').primary()
                    table.integer('step')
                    table.string('sequence')
                    table.integer('sequence_id')
                })
                .then(() => {
                    console.log('Table \'sortingSteps\' created')
                })
                .catch((err) => {
                    console.error(`Error creating table: ${err}`)
                })
            }
        })
    .then(() => {
            console.log('Database setup finished')
    })
    .catch((err) => {
        console.error(`Error setting up database: ${err}`)
    })

module.exports = con