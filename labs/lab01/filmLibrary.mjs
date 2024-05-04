import { Film } from "./film.mjs";

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
}
