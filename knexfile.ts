// Update with your config settings.
const databaseName = "d2dojd8lvl96qu";
const migrationsDir = __dirname + "/mock/migrations";
module.exports = {
  development: {
    client: "postgresql",
    database: databaseName,
    connection: {
      host: 'ec2-52-7-39-178.compute-1.amazonaws.com',
      user: 'gnfreuplsykcfv',
      password: 'b17f5f45010b99b5fa278622de55e1b395a69de0a4a272d43de4c0bb3d56207a',
      port: 5432,
      database: 'd2dojd8lvl96qu',
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      directory: migrationsDir
    },
    seeds: {
      directory: __dirname + "/mock/seeds"
    },
  }

};

//`postgres://gnfreuplsykcfv:b17f5f45010b99b5fa278622de55e1b395a69de0a4a272d43de4c0bb3d56207a@ec2-52-7-39-178.compute-1.amazonaws.com:5432/${databaseName}`