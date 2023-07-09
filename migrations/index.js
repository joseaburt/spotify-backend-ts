require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

const pool = mysql.createPool({
  port: 3306,
  password: '',
  user: 'root',
  host: 'localhost',
  database: 'spotify_clone',
});

const migrationFiles = fs.readdirSync(__dirname).filter((it) => it.endsWith('.sql'));

migrationFiles.forEach((fileName) => {
  const filePath = path.join(__dirname, fileName);
  const sql = fs.readFileSync(filePath, 'utf8');

  pool.query(sql, (error) => {
    if (error) throw error;
    console.log(`Migration ${fileName} executed successfully.`);
  });
});

pool.end();
