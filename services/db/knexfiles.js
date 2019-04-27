module.exports = {
  client: "pg",
  connection: {
    host: "127.0.0.1",
    database: "api_project",
  },
  port: 5432,
  pool: {
    min: 2,
    max: 10,
  },
  seeds: {
    directory: "seeds",
},
  migrations: {
    tableName: "knex_migrations"
  }
};
