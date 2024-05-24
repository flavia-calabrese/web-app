import { Rating } from "@mui/material";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Film } from "../FilmLibrary";

function FilmItem({ film, setFilmsState }) {
  const navigate = useNavigate();

  // Gestisce il rating dei film
  function onRatingChange(idFilm, newRating) {
    setFilmsState((oldFilms) => {
      return oldFilms.map((film) => {
        if (film.id === idFilm) return new Film({ ...film, rating: newRating });
        return film;
      });
    });
  }

  function onFavoriteChange(idFilm, newFavorite) {
    console.log("i am here :))");
    console.log(`idFilm: ${idFilm}, newFavorite: ${newFavorite} `);
    setFilmsState((oldFilms) => {
      return oldFilms.map((film) => {
        if (film.id === idFilm) {
          return new Film({ ...film, favorite: newFavorite });
        }
        return film;
      });
    });
  }

  function handleDelete(film) {
    setFilmsState((oldList) => {
      return oldList.filter((f) => f.id !== film.id);
    });
  }

  return (
    <>
      <Row className="film-item">
        <Col>{film.title}</Col>
        <Col>
          <Form.Check
            inline
            checked={film.favorite}
            label="Favorite"
            value={film.favorite}
            onChange={(event) => {
              onFavoriteChange(film.id, event.target.value !== "true");
            }}
          />
        </Col>
        <Col>{film.watchDate?.format("MMMM DD, YYYY")}</Col>
        <Col>
          <Rating
            name="simple-controlled"
            value={film.rating}
            onChange={(event, newValue) => {
              onRatingChange(film.id, newValue);
            }}
          />
        </Col>
        <Col>
          <i
            className="bi bi-pen me-4"
            onClick={() => {
              navigate(`/editfilm/${film.id}`);
            }}
          ></i>
          <i className="bi bi-trash3" onClick={() => handleDelete(film)}></i>
        </Col>
      </Row>
      <hr />
    </>
  );
}

export default FilmItem;
