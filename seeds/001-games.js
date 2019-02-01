
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {
          title: 'Dark Age of Camelot',
          genre: 'MMORPG',
          releaseYear: 2001,
        },
        {
          title: 'Warhammer Online',
          genre: 'MMORPG',
          releaseYear: 2008,
        },
        {
          title: 'Camelot Unchained',
          genre: 'MMORPG',          
        },
      ]);
    });
};
