// Update with your config settings.
const databaseName = "identifyme";
const migrationsDir = __dirname + "/mock/migrations";
module.exports = {
  development: {
    client: "postgresql",
    connection: `postgres://postgres:abc123@localhost:5432/${databaseName}`,
    migrations: {
      directory: migrationsDir
    },
    seeds: {
      directory: __dirname + "/mock/seeds"
    },
  }

};
