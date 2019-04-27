const films = require("./data/Film.js");
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("film")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("film").insert(films);
    });
};
