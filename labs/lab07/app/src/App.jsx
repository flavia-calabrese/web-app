import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavHeader from "./components/NavHeader";
import HomePage from "./components/HomePage";
import { Film, FilmLibrary } from "./FilmLibrary";
import dayjs from "dayjs";

{
  /**

let stato = null
let chimate = []
function setState(callback) {
  chimate.push(callback)
}

function update() {
  chimate.forEach((c) => {
    stato = c(stato)
  })
  chiamate = []
}


*/
}

function App() {
  const idFilters = [
    "All",
    "Favorite",
    "Best Rated",
    "Seen Last Month",
    "Unseen",
  ];

  const library = new FilmLibrary();
  library.init();
  const films = library.getFilms();

  const [currentFilter, setCurrentFilter] = useState(idFilters[0]);
  const [filmsState, setFilmsState] = useState(films);
  const [mode, setMode] = useState("view");
  const [editableFilm, setEditableFilm] = useState();

  // Gestisce la checkbox del Favorite/non favorite
  function onFavoriteChange(idFilm, newFavorite) {
    setFilmsState((oldFilms) => {
      return oldFilms.map((film) => {
        if (film.id === idFilm) {
          return new Film(
            film.id,
            film.title,
            newFavorite,
            film.watchDate,
            film.rating,
            film.userId
          );
        }
        return film;
      });
    });
  }

  // Gestisce il rating dei film
  function onRatingChange(idFilm, newRating) {
    setFilmsState((oldFilms) => {
      return oldFilms.map((film) => {
        if (film.id === idFilm)
          return new Film(
            film.id,
            film.title,
            film.favorite,
            film.watchDate,
            newRating,
            film.userId
          );
        return film;
      });
    });
  }

  // Gestisce il filtro corrente, cambiandone lo stato
  function onClickFilter(newFilter) {
    setCurrentFilter(() => newFilter);
  }

  // dato un filtro, restituisce una lista di film filtrati a partire da filmsState
  function getFilterdFilms(filter) {
    switch (filter) {
      case "All":
        return filmsState;
      case "Favorite":
        return filmsState.filter((f) => f.favorite);
      case "Best Rated":
        return filmsState.filter((f) => f.rating === 5);
      case "Seen Last Month":
        return filmsState.filter((f) => {
          if (f.watchDate != null) {
            let now = dayjs();
            let duration = now.diff(f.watchDate, "day");
            if (duration < 30) {
              return true;
            }
          }
          return false;
        });
      case "Unseen":
        return filmsState.filter((f) => f.watchDate === null);

      default:
        break;
    }
  }

  function onClickAddNewFilm() {
    setMode("add");
  }
  function handleDelete(film) {
    setFilmsState((oldList) => {
      return oldList.filter((f) => f.id !== film.id);
    });
  }
  function addFilm(film) {
    setMode("view");
    setFilmsState((oldFilms) => {
      const newId = Math.max(...oldFilms.map((f) => f.id)) + 1;
      const newUserId = Math.max(...oldFilms.map((f) => f.userId)) + 1;
      const newFilm = new Film(
        newId,
        film.title,
        film.favorite,
        film.date,
        film.rate,
        newUserId
      );
      return [...oldFilms, newFilm];
    });
  }
  function updateFilm(film) {
    console.log("film:{}", film);
    setMode("view");
    setFilmsState((oldFilms) => {
      return oldFilms.map((f) => {
        if (f.id === film.id) {
          console.log("f {}", f);
          return new Film(
            f.id,
            film.title,
            film.favorite,
            film.date,
            film.rate,
            f.userId
          );
        } else return f;
      });
    });
  }

  function handleEdit(film) {
    console.log("handleEdit");
    setMode("edit");
    setEditableFilm(film);
  }
  return (
    <>
      <NavHeader></NavHeader>
      <HomePage
        filters={idFilters}
        currentFilter={currentFilter}
        onClickAddNewFilm={onClickAddNewFilm}
        onClickFilter={onClickFilter}
        films={getFilterdFilms(currentFilter)}
        onFavoriteChange={onFavoriteChange}
        onRatingChange={onRatingChange}
        mode={mode}
        setMode={setMode}
        addFilm={addFilm}
        handleEdit={handleEdit}
        editableFilm={editableFilm}
        updateFilm={updateFilm}
        handleDelete={handleDelete}
      ></HomePage>
    </>
  );
}

export default App;
