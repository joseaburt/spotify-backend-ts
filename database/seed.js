const fs = require('fs');
const path = require('path');
const { connection } = require('./connection');

const seed = async () => {
  try {
    const seedersDir = path.join(__dirname, 'seeders');
    const seederFiles = fs.readdirSync(seedersDir);

    for (const file of seederFiles) {
      if (file.endsWith('.js')) {
        const seeder = require(path.join(seedersDir, file));
        await seeder(connection);
        console.log(`Seeder ${file} executed successfully.`);
      }
    }

    console.log('All seeders executed successfully.');
  } catch (error) {
    console.error('Error executing seeders:', error);
  } finally {
    connection.end();
  }
};

seed();
