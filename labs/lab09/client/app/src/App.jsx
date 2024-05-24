import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavHeader from "./components/NavHeader";
import HomePage from "./components/HomePage";
import { Film } from "./FilmLibrary";
import { Route, Routes } from "react-router-dom";
import EditableFilm from "./components/EditableFilm";
import FilmsLayout from "./components/FilmsLayout";
import AddFilm from "./components/AddFilm";
import NotFound from "./components/NotFound";

function App() {
  const idFilters = [
    "All",
    "Favorite",
    "Best Rated",
    "Seen Last Month",
    "Unseen",
  ];

  function addFilm(film) {
    setFilmsState((oldFilms) => {
      const newId = Math.max(...oldFilms.map((f) => f.id)) + 1;
      const newUserId = Math.max(...oldFilms.map((f) => f.userId)) + 1;
      const newFilm = new Film({ ...film, id: newId, userId: newUserId });
      return [...oldFilms, newFilm];
    });
  }
  function updateFilm(film) {
    console.log("film:{}", film);

    setFilmsState((oldFilms) => {
      return oldFilms.map((f) => {
        if (f.id === film.id) {
          console.log("f {}", f);
          return new Film({ ...film, id: f.id, userId: f.userId });
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
        <Route index element={<FilmsLayout />} />
        <Route path="filters/:filter" element={<FilmsLayout />} />

        <Route path="addfilm" element={<AddFilm addFilm={addFilm} />} />
        <Route
          path="editfilm/:id"
          element={<EditableFilm updateFilm={updateFilm} />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
