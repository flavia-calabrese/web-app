import { Film } from "./FilmLibrary";
import dayjs from "dayjs";

const SERVER_URL = "http://localhost:3001";

const getFilteredFilms = async (filter) => {
  const response = await fetch(`${SERVER_URL}/api/films/filter/${filter}`);
  if (response.ok) {
    const filmsJson = await response.json();
    return filmsJson.map(
      (f) =>
        new Film({
          id: f.idFilm,
          title: f.title,
          favorite: f.isFavorite,
          watchDate: f.watchDate && dayjs(f.watchDate),
          rating: f.rate,
          userId: f.idPerson,
        })
    );
  } else throw new Error("Internal server error");
};

const API = { getFilteredFilms };

export default API;
