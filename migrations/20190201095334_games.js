
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', function (tbl) {
    // Primary key
    tbl
      .increments()
      .primary()
      .notNullable();

    tbl.string('title', 256).notNullable();
    tbl.string('genre', 256).notNullable();
    tbl.integer('releaseYear');
  });
  
};

exports.down = function(knex, Promise) {
  // rollback/undo the changes
  return knex.schema.dropTableIfExists('games');
  
};
