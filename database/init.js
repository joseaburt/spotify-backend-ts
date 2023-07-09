require('dotenv').config();
const { makeConnection } = require('./connection');

const connection = makeConnection();
const { DATABASE_NAME } = process.env;

connection
  .query(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME};`)
  .then(() => console.log(`${DATABASE_NAME} was created!`))
  .catch(() => console.log(`${DATABASE_NAME} could be created!`))
  .finally(() => connection.end());
