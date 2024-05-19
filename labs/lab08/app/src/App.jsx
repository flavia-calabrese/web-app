import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavHeader from "./components/NavHeader";
import HomePage from "./components/HomePage";
import { Film, FilmLibrary } from "./FilmLibrary";
import dayjs from "dayjs";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import SideBar from "./components/SideBar";
import ListFilm from "./components/ListFilm";
import { Button, Col, Row } from "react-bootstrap";
import FilmForm from "./components/FilmForm";
import EditableFilm from "./components/EditableFilm";
import FilmsLayout from "./components/FilmsLayout";
import AddFilm from "./components/AddFilm";
import NotFound from "./components/NotFound";

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

  const [filmsState, setFilmsState] = useState(library.getFilms());

  // Gestisce la checkbox del Favorite/non favorite
  function onFavoriteChange(idFilm, newFavorite) {
    console.log("i am here :))");
    console.log(`idFilm: ${idFilm}, newFavorite: ${newFavorite} `);
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

  function handleDelete(film) {
    setFilmsState((oldList) => {
      return oldList.filter((f) => f.id !== film.id);
    });
  }
  function addFilm(film) {
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

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavHeader></NavHeader>
            <HomePage filters={idFilters} />
          </>
        }
      >
        <Route
          index
          element={
            <FilmsLayout
              filmsState={filmsState}
              onFavoriteChange={onFavoriteChange}
              onRatingChange={onRatingChange}
              handleDelete={handleDelete}
            />
          }
        />
        <Route
          path="filters/:filter"
          element={
            <FilmsLayout
              filmsState={filmsState}
              onFavoriteChange={onFavoriteChange}
              onRatingChange={onRatingChange}
              handleDelete={handleDelete}
            />
          }
        />

        <Route path="addfilm" element={<AddFilm addFilm={addFilm} />} />
        <Route
          path="editfilm/:id"
          element={<EditableFilm films={filmsState} updateFilm={updateFilm} />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
