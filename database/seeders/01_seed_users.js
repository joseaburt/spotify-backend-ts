// 01_seed_users.js

const usersData = [
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@example.com',
    password: 'password1',
    image: 'path/to/image',
    type: 'normal',
    is_active: true,
  },
  {
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'janesmith@example.com',
    password: 'password2',
    image: 'path/to/image',
    type: 'artist',
    is_active: true,
  },
  // Add more user objects as needed
];

const seedUsers = async (connection) => {
  try {
    for (const userData of usersData) {
      await connection.query('INSERT INTO users SET ?', userData);
    }
    console.log('Users seeded successfully.');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

module.exports = seedUsers;
