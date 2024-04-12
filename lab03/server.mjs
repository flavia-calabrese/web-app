import express from "express";
import morgan from "morgan";
import { check, validationResult } from "express-validator";
import { FilmLibrary } from "./filmLibrary.mjs";
import { Film, fromObj } from "./film.mjs";
import { Users } from "./users.mjs";

const app = express();
const port = 3001;

app.use(express.json());
app.use(morgan("dev"));

// list of all avaible films
app.get("/api/films", (request, response) => {
  try {
    const myLibrary = new FilmLibrary();
    myLibrary
      .getStoredFilms()
      .then((films) => response.json(films))
      .catch(() => response.status(500).end());
  } catch {
    console.log(e);
    response.status(500).end();
  }
});

// filter films
app.get("/api/films/filter/:filter", async (req, res) => {
  try {
    const myLibrary = new FilmLibrary();
    switch (req.params.filter) {
      case "isFavorite": {
        const favorite = await myLibrary.getFavoriteFilms();
        res.json(favorite);
        break;
      }
      case "best": {
        const best = await myLibrary.higherRating(5);
        res.json(best);
        break;
      }
      case "lastMonth": {
        const lastMonth = await myLibrary.watchedLastMonth();
        res.json(lastMonth);
        break;
      }
      case "unseen": {
        const unseen = await myLibrary.unseen();
        res.json(unseen);
        break;
      }
      default:
        res.status(400).end(`parameter not compatible ${req.params.filter}`);
    }
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
});

// film with a specific id
app.get("/api/films/:id", async (req, res) => {
  try {
    const myLibrary = new FilmLibrary();
    const film = await myLibrary.getById(req.params.id);
    if (film.error) {
      res.status(404).json(film.error);
    } else res.json(film.ok);
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
});

//create a new film
app.post(
  "/api/films",
  [
    check("idPerson").isNumeric(),
    check("title").notEmpty(),
    check("isFavorite").isBoolean(),
    check("watchDate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
    check("rate").isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array });
    }

    try {
      const newFilm = fromObj(req.body);

      const users = new Users();
      const userID = await users.getById(newFilm.idPerson);

      if (userID.error) return res.status(404).json(userID);

      const myLibrary = new FilmLibrary();
      const newId = await myLibrary.storeFilm(newFilm);
      res.status(201).location(`/api/films/${newId}`).end();
    } catch (e) {
      console.log(e);
      res.status(500).end();
    }
  }
);

app.put(
  "/api/films/:idFilm",
  [
    check("idPerson").isNumeric(),
    check("title").notEmpty(),
    check("isFavorite").isBoolean(),
    check("watchDate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
    check("rate").isNumeric(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const myLibrary = new FilmLibrary();
      const filmToUpdate = fromObj({ idFilm: req.params.idFilm, ...req.body });
      const result = await myLibrary.updateFilm(filmToUpdate);
      if (result.error) return res.status(404).json(result);
      return res.status(200).end();
    } catch (e) {
      console.log(e);
      res.status(500).end();
    }
  }
);

app.put(
  "/api/films/:idFilm/rate",
  [check("rate").isNumeric()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ error: errors.array() });

      const myLibrary = new FilmLibrary();
      const result = await myLibrary.getById(req.params.idFilm);
      if (result.error) return res.status(404).json(result);
      const film = result.ok;
      film.rate = req.body.rate;

      const update = await myLibrary.updateFilm(film);
      if (update.error) return res.status(404).json(update);
      res.status(200).end();
    } catch (e) {
      console.log(e);
      res.status(500).end();
    }
  }
);

app.put(
  "/api/films/:idFilm/favorite",
  [check("isFavorite").isBoolean()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ error: errors.array() });

      const myLibrary = new FilmLibrary();
      const result = await myLibrary.getById(req.params.idFilm);
      if (result.error) return res.status(404).json(result);
      const film = result.ok;
      film.isFavorite = req.body.isFavorite;
      console.log(film);
      const update = await myLibrary.updateFilm(film);

      if (update.error) return res.status(404).json(update);
      res.status(200).end();
    } catch (e) {
      console.log(e);
      res.status(500).end();
    }
  }
);

app.delete("/api/films/:idFilm", async (req, res) => {
  try {
    const myLibrary = new FilmLibrary();
    const result = await myLibrary.getById(req.params.idFilm);
    if (result.error) return res.status(404).json(result);
    const idFilm = result.ok.idFilm;
    const deleteResult = await myLibrary.deleteFilmDB(idFilm);

    if (deleteResult.error) return res.status(404).json(deleteResult);
    return res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
});

app.listen(port, () => {
  console.log(`API server started at http://localhost:${port}`);
});
