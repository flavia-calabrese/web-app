import { Col, Row } from "react-bootstrap";
import FilmItem from "./FilmItem";

function ListFilm({
  films,
  currentFilter,
  onFavoriteChange,
  onRatingChange,
  handleEdit,
}) {
  return (
    <Col>
      {/** All andrà in qualche modo sostituito con lo stato perchè voglio che venga mostrato il filtro corrente */}
      <Row className="ms-3 mt-3" as="h1">
        {currentFilter}
      </Row>
      {films.map((film) => (
        <Row key={film.id}>
          <FilmItem
            film={film}
            onFavoriteChange={onFavoriteChange}
            onRatingChange={onRatingChange}
            handleEdit={handleEdit}
          ></FilmItem>
        </Row>
      ))}
    </Col>
  );
}

export default ListFilm;
