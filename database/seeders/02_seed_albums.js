const albumsData = [
  {
    title: 'Album 1',
    image: 'path/to/image',
    creator_id: 1,
    description: 'Sample description for album 1',
    status: 'published',
  },
  {
    title: 'Album 2',
    image: 'path/to/image',
    creator_id: 2,
    description: 'Sample description for album 2',
    status: 'draft',
  },
];

const seedAlbums = async (connection) => {
  try {
    for (const albumData of albumsData) {
      await connection.query('INSERT INTO albums SET ?', albumData);
    }
    console.log('Albums seeded successfully.');
  } catch (error) {
    console.error('Error seeding albums:', error);
  }
};

module.exports = seedAlbums;
