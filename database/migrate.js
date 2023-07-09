const fs = require('fs');
const path = require('path');
const { connection } = require('./connection');

/**
 * Get all `.sql` files (our migrations) and execute
 * them on by one.
 */
async function executeMigrations() {
  const migrationDir = path.join(__dirname, 'migrations');
  const migrationFiles = fs.readdirSync(migrationDir);
  for (const fileName of migrationFiles) {
    const filePath = path.join(migrationDir, fileName);
    const sql = fs.readFileSync(filePath, 'utf8');
    await connection.query(sql);
    console.log(`Migration ${fileName} executed successfully.`);
  }
}

executeMigrations()
  .catch(console.error)
  .finally(() => connection.end());
