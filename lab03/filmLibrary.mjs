import { Film } from "./film.mjs";
import { db } from "./db.mjs";
import dayjs from "dayjs";

export function FilmLibrary() {
  /**
   *
   * @returns {Promise<Film[]>}
   */
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

  /**
   *
   * @returns {Promise<Film[]>}
   */
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
          reject("data not found");
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

  this.watchedLastMonth = () => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT * FROM films WHERE watchDate < Date(?) AND watchDate > Date(?)";
      const now = dayjs();
      const lastMonth = now.subtract(30, "day");
      db.all(sql, [now.toISOString(), lastMonth.toISOString()], (err, rows) => {
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
          reject("data not found");
        }
      });
    });
  };

  /**
   *
   * @param {string} date
   * @returns {Promise<Film[]>}
   */
  this.filmsWatchedBeforeDate = (date) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE watchDate < DATE(?)";
      db.all(sql, [date], (err, rows) => {
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

  /**
   *
   * @param {number} rate
   * @returns {Promise<Film[]>}
   */
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
          reject("data not found");
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

  this.unseen = () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE watchDate IS NULL";
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
          resolve("data not found");
        }
      });
    });
  };
  /**
   *
   * @param {Film} film
   * @returns {Promise<number>}
   */
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
        if (this.changes === 0) return resolve({ error: "id not found" });
        console.log("film delete from db correctly");
        resolve({ ok: this.lastID });
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

  /**
   *
   * @param {number} id
   * @returns {Promise<{error:string} | {ok:Film}>}
   */
  this.getById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE id=?";
      db.get(sql, [id], (err, row) => {
        if (err) reject(err);
        if (row == undefined)
          resolve({ error: "Film not available, check the inserted id." });
        else if (row !== undefined) {
          const film = new Film(
            row.id,
            row.idPerson,
            row.title,
            row.isFavorite,
            row.watchDate,
            row.rating
          );
          resolve({ ok: film });
        }
      });
    });
  };

  /**
   *
   * @param {Film} film
   * @returns {Promise<{error:string} | {}>}
   */
  this.updateFilm = (film) => {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE films SET title=?, isFavorite=?, rating=?, watchDate=DATE(?), userId=? WHERE id=?";
      db.run(
        sql,
        [
          film.title,
          film.isFavorite,
          film.rate,
          film.watchDate?.toISOString(),
          film.idPerson,
          film.idFilm,
        ],
        function (err) {
          if (err) return reject(err);
          if (this.changes === 0)
            return resolve({ error: "film id not found" });
          return resolve({});
        }
      );
    });
  };
}
