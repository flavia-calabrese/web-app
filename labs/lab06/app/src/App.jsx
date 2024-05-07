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

  {
    /** Stato del filtro corrente */
  }
  const [currentFilter, setCurrentFilter] = useState(idFilters[0]);

  {
    /**
      Provo a mettere questi stati un po' più in dentro perchè qui non so bene come gestili
      -> qui metto uno stato a library così che quando si ha la variazione dello stato di un film
         cambia anche quello della libraria in modo che sia tutto coerente e che la pagina 
         venga re-indirizzata

      Stati del FilmItem: 
          - stato per il checkbox (isFavorite), [FATTO]
          - stato per il checkbox (rating)     [FATTO]
          - stato per il delete botton (trash)  
  */
  }

  const [filmsState, setFilmsState] = useState(films);

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
  {
    /** CHIEDERE A BRE SE è GIUSTO  */
  }
  function onClickFilter(newFilter) {
    setCurrentFilter(() => newFilter);
  }

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
  return (
    <>
      <NavHeader></NavHeader>
      <HomePage
        filters={idFilters}
        currentFilter={currentFilter}
        onClickFilter={onClickFilter}
        films={getFilterdFilms(currentFilter)}
        onFavoriteChange={onFavoriteChange}
        onRatingChange={onRatingChange}
      ></HomePage>
    </>
  );
}

export default App;
