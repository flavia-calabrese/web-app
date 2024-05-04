import { Film } from "./film.mjs";
import { db } from "./db.mjs";

export function FilmLibrary() {
  this.films = [];

  this.addNewFilm = (film) => {
    // Check
    if (!this.films.some((f) => f.idFilm == film.idFilm)) {
      this.films.push(film);
    } else {
      throw new Error("Duplicated id");
    }
  };
  this.sortByData = () => {
    const newArray = [...this.films];
    newArray.sort((a, b) => {
      if (!a.watchDate) return 1; // null/empty watchDate is the lower value
      if (!b.watchDate) return -1;
      return a.watchDate.diff(b.watchDate, "day");
    });
    return newArray;
  };

  this.deleteFilm = (idFilm) => {
    this.films = this.films.filter((film) => film.idFilm !== idFilm);
  };

  this.resetWatchedFilms = () => {
    this.films = this.films.map((film) => {
      film.watchDate = null;
      return film;
    });
  };

  this.getRated = () => {
    const tmp = this.films.filter((film) => film.rate && film.rate !== 0);
    tmp.sort((a, b) => b.rate - a.rate);
    return tmp;
  };

  this.getStoredFilms = () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films";
      db.all(sql, (err, rows) => {
        if (err) return reject(err);
        if (rows !== undefined) {
          const films = rows.map(
            (f) =>
              new Film(
                f.id,
                f.idPerson,
                f.title,
                f.isFavorite,
                f.watchDate,
                f.rate
              )
          );
          resolve(films);
        } else {
          resolve("Not found");
        }
      });
    });
  };

  this.getFavoriteFilms = () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE isFavorite=true";
      db.all(sql, (err, rows) => {
        if (err) return reject(err);
        if (rows !== undefined) {
          const favoriteFilms = rows.map(
            (f) =>
              new Film(
                f.id,
                f.idPerson,
                f.title,
                f.isFavorite,
                f.watchDate,
                f.rate
              )
          );
          resolve(favoriteFilms);
        } else {
          resolve("data not found");
        }
      });
    });
  };

  this.filmsWatchedToday = () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE  watchDate = DATE('now')";
      db.all(sql, (err, rows) => {
        if (err) return reject(err);
        if (rows !== undefined) {
          const watchedFilms = rows.map(
            (f) =>
              new Film(
                f.id,
                f.idPerson,
                f.title,
                f.isFavorite,
                f.watchDate,
                f.rate
              )
          );
          resolve(watchedFilms);
        } else {
          resolve("data not found");
        }
      });
    });
  };

  this.filmsWatchedBeforeDate = (date) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE watchDate < DATE(?)";
      db.all(sql, [date], (err, rows) => {
        console.log(date);
        if (err) return reject(err);
        if (rows !== undefined) {
          const films = rows.map(
            (f) =>
              new Film(
                f.id,
                f.idPerson,
                f.title,
                f.isFavorite,
                f.watchDate,
                f.rate
              )
          );
          resolve(films);
        } else {
          resolve("data not found");
        }
      });
    });
  };

  this.higherRating = (rate) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE rating >= ?";
      db.all(sql, [rate], (err, rows) => {
        if (err) return reject(err);
        if (rows !== undefined) {
          const films = rows.map(
            (f) =>
              new Film(
                f.id,
                f.idPerson,
                f.title,
                f.isFavorite,
                f.watchDate,
                f.rate
              )
          );
          resolve(films);
        } else {
          resolve("data not found");
        }
      });
    });
  };

  this.filmsWithString = (str) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE title LIKE ?";
      db.all(sql, [`%${str}%`], (err, rows) => {
        if (err) return reject(err);
        if (rows !== undefined) {
          const films = rows.map(
            (f) =>
              new Film(
                f.id,
                f.idPerson,
                f.title,
                f.isFavorite,
                f.watchDate,
                f.rate
              )
          );
          resolve(films);
        } else {
          resolve("data not found");
        }
      });
    });
  };

  this.storeFilm = (film) => {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO films(title, isFavorite, rating, watchDate, userId) VALUES (?,?,?,DATE(?),?)";
      db.run(
        sql,
        [
          film.title,
          film.isFavorite,
          film.rate,
          film.watchDate?.toISOString(),
          film.idPerson,
        ],
        function (err) {
          if (err) {
            console.log("something went wrong");
            return reject(err);
          }
          console.log("film insert into db correctly");
          resolve(this.lastID);
        }
      );
    });
  };

  this.deleteFilmDB = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM films WHERE id=?";
      db.run(sql, [id], function (err) {
        if (err) {
          console.log("something went wrong");
          return reject(err);
        }
        console.log("film delete from db correctly");
        resolve(this.lastID);
      });
    });
  };

  this.deleteWatchData = () => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE films SET watchDate = null";
      db.run(sql, function (err) {
        if (err) {
          console.log("something went wrong");
          return reject(err);
        }
        console.log("watch date delete correctly");
        resolve(this.changes);
      });
    });
  };
}
