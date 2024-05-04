import dayjs from "dayjs";

export function Film(
  idFilm,
  idPerson = 1,
  title,
  isFavorite = false,
  watchDate = null,
  rate = 0
) {
  this.idFilm = idFilm;
  this.idPerson = idPerson;
  this.title = title;
  this.isFavorite = isFavorite;
  // saved as dayjs object only if watchDate is truthy
  this.watchDate = watchDate && dayjs(watchDate);
  this.rate = rate;

  this.toString = () => {
    return (
      `ID Film: ${this.idFilm}, Title: ${this.title} ` +
      `Favorite: ${this.isFavorite}, Watch Date: ${this.watchDate}, Score: ${this.rate} ` +
      `ID Person: ${this.idPerson} `
    );
  };
}

export function fromObj({
  idFilm,
  idPerson,
  title,
  isFavorite,
  watchDate,
  rate,
}) {
  return new Film(idFilm, idPerson, title, isFavorite, watchDate, rate);
}
