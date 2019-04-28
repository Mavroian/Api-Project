const express = require("express");
const router = express.Router();
const config = require("../config.js");
const knex = require("knex")(config.db);

router.get("/", (req, res) => {
  return Promise.resolve(res.render("index"));
});

router.get("/api/All", (req, res) => {
  return Promise.resolve(
    knex("film")
      .select()
      .then((films) => {
        res.render("all", { films: films });
      })
  );
});

router.get("/api/Films/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  return Promise.resolve(
    knex("film")
      .select()
      .where({ film_id: id })
      .then((film) => {
        res.render("single", { film: film });
      })
      .catch((err) => {
        console.log(err);
      })
  );
});

router.get("/api/modify", (req, res) => {
  return Promise.resolve(res.render("modify"));
});

router.post("/api/modify/edit", (req, res) => {
  const obj = {};
  for (const key in req.body) {
    if (!(!req.body[key] || /^\s*$/.test(req.body[key]))) {
      if (key !== "film_id") {
        obj[key] = req.body[key];
      }
    }
  }
  if (Object.keys(obj).length === 0) {
    return Promise.resolve(res.render("err"));
  }
  return Promise.resolve(
    knex("film")
      .where({ film_id: req.body.film_id })
      .update(obj)
      .select()
      .then((film) => {
        res.redirect("/api/all");
      })
      .catch((err) => {
        console.log(err);
        res.render("err");
      })
  );
});

router.get("/api/delete", (req, res) => {
  return Promise.resolve(res.render("delete"));
});
router.post("/api/delete/film", (req, res) => {
  const obj = {};
  for (const key in req.body) {
    if (!(!req.body[key] || /^\s*$/.test(req.body[key]))) {
      if (key === "film_id") {
        obj[key] = req.body[key];
      }
    }
  }
  if (Object.keys(obj).length === 0) {
    return Promise.resolve(res.render("err"));
  }
  return Promise.resolve(
    knex("film")
      .where({ film_id: req.body.film_id })
      .del()
      .then(() => {
        res.redirect("/api/all");
      })
      .catch((err) => {
        console.log(err);
        res.render("err");
      })
  );
});

router.get("/api/films", (req, res) => {
  return Promise.resolve(res.render("addFilm"));
});

router.patch("/api/Films", (req, res) => {
  const film = {
    Title: req.body.Title,
    Year: req.body.Year,
    Rated: req.body.Rated,
    Released: req.body.Released,
    Runtime: req.body.Runtime,
    Genre: req.body.Genre,
    Director: req.body.Director,
    Writer: req.body.Writer,
    Actors: req.body.Actors,
    Plot: req.body.Plot,
    Language: req.body.Langauge,
    Country: req.body.Country,
    Awards: req.body.Awards,
    Poster: req.body.Poster,
    Metascore: req.body.Metascore,
    imdbRating: req.body.imdbRating,
    imdbVotes: req.body.imdbVotes,
    imdbID: req.body.imdbID,
    Type: req.body.Type,
  };
  return Promise.resolve(
    knex("film")
      .insert(film, "film_id")
      .then((ids) => {
        const id = ids[0];
        res.redirect(`/api/Films/${id}`);
      })
  );
});

module.exports = router;
