import dayjs from "dayjs";

function Film(
  id,
  title,
  isFavorite = false,
  watchDate = null,
  rating = 0,
  userId = 1
) {
  this.id = id;
  this.title = title;
  this.favorite = isFavorite;
  this.rating = rating;
  // saved as dayjs object only if watchDate is truthy
  this.watchDate = watchDate;
  this.userId = userId;
}

function FilmLibrary() {
  this.list = [];

  this.init = () => {
    this.list = [
      new Film(1, "Pulp Fiction", true, dayjs("2024-04-10"), 5),
      new Film(2, "21 Grams", true, dayjs("2024-03-17"), 4),
      new Film(3, "Star Wars", false),
      new Film(4, "Matrix", false),
      new Film(5, "Shrek", false, dayjs("2024-03-21"), 3),
    ];
  };

  this.getFilms = () => {
    return [...this.list];
  };
  this.getFavorite = () => {
    let favorites = [];
    this.list.forEach((film) => {
      if (film.favorite === true) {
        favorites.push(film);
      }
    });
    return favorites;
  };

  this.getBestRated = () => {
    let bestRated = [];
    this.list.forEach((film) => {
      if (film.rating === 5) {
        bestRated.push(film);
      }
    });
    return bestRated;
  };

  this.getSeenLastMonth = () => {
    let seenLastMonth = [];
    this.list.forEach((film) => {
      if (film.watchDate != null) {
        let now = dayjs();
        let duration = now.diff(film.watchDate, "day");
        // console.log(duration);
        if (duration < 30) {
          seenLastMonth.push(film);
        }
      }
    });
    return seenLastMonth;
  };

  this.getUnseen = () => {
    let unseen = [];
    this.list.forEach((film) => {
      if (film.watchDate == null) {
        unseen.push(film);
      }
    });
    return unseen;
  };
}

export { Film, FilmLibrary };
