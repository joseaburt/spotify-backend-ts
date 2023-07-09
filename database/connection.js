require('dotenv').config();
const mysql = require('mysql2/promise');

const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_PORT } = process.env;

function makeConnection(options = {}) {
  return mysql.createPool({
    user: DATABASE_USER,
    host: DATABASE_HOST,
    password: DATABASE_PASSWORD,
    port: parseInt(DATABASE_PORT ?? '3306'),
    ...options,
  });
}

module.exports.makeConnection = makeConnection;
module.exports.connection = makeConnection({ database: DATABASE_NAME });
