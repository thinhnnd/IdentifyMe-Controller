require('dotenv').config();
module.exports = {
  "type": "postgres",
  "host": process.env.DB_HOST,
  "port": process.env.DB_PORT,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_DATABASE,
  "entities": [__dirname + '/../**/*.entity.js'],
  "migrations": [
    "src/migration/*.{js,ts}"
  ],
  "ssl": { rejectUnauthorized: false }
}