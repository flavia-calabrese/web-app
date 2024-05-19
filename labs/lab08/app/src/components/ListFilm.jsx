import { Col, Row } from "react-bootstrap";
import FilmItem from "./FilmItem";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

// dato un filtro, restituisce una lista di film filtrati a partire da filmsState
function getFilterdFilms(films, filter) {
  switch (filter) {
    case "All":
      return films;
    case "Favorite":
      return films.filter((f) => f.favorite);
    case "Best Rated":
      return films.filter((f) => f.rating === 5);
    case "Seen Last Month":
      return films.filter((f) => {
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
      return films.filter((f) => f.watchDate === null);

    default:
      return films;
  }
}

function ListFilm({
  films,
  onFavoriteChange,
  onRatingChange,
  handleEdit,
  handleDelete,
}) {
  const { filter } = useParams();

  console.log(filter);
  return (
    <Col>
      {/** All andrà in qualche modo sostituito con lo stato perchè voglio che venga mostrato il filtro corrente */}
      <Row className="ms-3 mt-3" as="h1">
        {filter}
      </Row>
      {getFilterdFilms(films, filter).map((film) => (
        <Row key={film.id}>
          <FilmItem
            film={film}
            onFavoriteChange={onFavoriteChange}
            onRatingChange={onRatingChange}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          ></FilmItem>
        </Row>
      ))}
    </Col>
  );
}

export default ListFilm;
