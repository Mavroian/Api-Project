exports.up = function(knex, Promise) {
  return knex.schema.createTable("film", (table) => {
    table.increments("film_id").primary();
    table.string("Title", 100).notNullable();
    table.string("Year").notNullable();
    table.string("Rated", 5).notNullable();
    table.string("Released", 20).notNullable();
    table.string("Runtime").notNullable();
    table.string("Genre", 250).notNullable();
    table.string("Director").notNullable();
    table.string("Writer").notNullable();
    table.string("Actors").notNullable();
    table.string("Plot").notNullable();
    table.string("Language").notNullable();
    table.string("Country").notNullable();
    table.string("Awards", 250);
    table.string("Poster", 250);
    table.string("Metascore");
    table.string("imdbRating");
    table.string("imdbVotes");
    table.string("imdbID").notNullable();
    table.string("Type");
    table.specificType('Images', 'text ARRAY')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("film");
};
