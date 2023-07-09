require('dotenv').config();
const mysql = require('mysql2/promise');

const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_PORT } = process.env;

console.log({ DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_PORT });

const pool = mysql.createPool({
  user: DATABASE_USER,
  host: DATABASE_HOST,
  database: DATABASE_NAME,
  password: DATABASE_PASSWORD,
  port: parseInt(DATABASE_PORT ?? '3306'),
});

module.exports = pool;
