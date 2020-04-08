// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : '...',
      user : '...',
      password : '...',
      database : '...'
    },
  },

  staging: {
    client: 'mysql',
    connection: {
      database: '...',
      user:     '...',
      password: '...'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
