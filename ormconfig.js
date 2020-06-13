require('dotenv').config();
module.exports = {
  "type": "postgres",
  "host": process.env.DOCKERHOST,
  "port": 5432,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_DATABASE,
  "entities": [__dirname + '/../**/*.entity.{js,ts}'],
  "migrations": [
    "src/migration/*.{js,ts}"
  ]
}