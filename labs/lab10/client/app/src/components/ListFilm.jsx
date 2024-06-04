import { Col, Row } from "react-bootstrap";
import FilmItem from "./FilmItem";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import API from "./../API.mjs";

function ListFilm() {
  const { filter = "All" } = useParams();

  const [filmsState, setFilmsState] = useState([]);

  useEffect(() => {
    const getFilteredFilms = async () => {
      const films = await API.getFilteredFilms(filter);
      console.log("API in sidebar", films);
      setFilmsState(films);
    };
    getFilteredFilms();
  }, [filter]);

  return (
    <Col>
      {/** All andrà in qualche modo sostituito con lo stato perchè voglio che venga mostrato il filtro corrente */}
      <Row className="ms-3 mt-3" as="h1">
        {filter}
      </Row>
      {/* {getFilterdFilms(films, filter).map((film) => ( */}
      {filmsState.map((film) => (
        <Row key={film.id}>
          <FilmItem film={film} setFilmsState={setFilmsState}></FilmItem>
        </Row>
      ))}
    </Col>
  );
}

export default ListFilm;
