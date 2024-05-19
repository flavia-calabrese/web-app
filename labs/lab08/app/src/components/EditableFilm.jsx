import { Col } from "react-bootstrap";
import FilmForm from "./FilmForm";
import { useNavigate, useParams } from "react-router-dom";

export default function EditableFilm({ films, updateFilm }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const film = films.filter((f) => f.id === Number(id))[0];

  function handleOnSubmit(newFilm) {
    updateFilm({ id: film.id, userId: film.userId, ...newFilm });
    navigate(-1);
  }

  return (
    <Col>
      <FilmForm film={film} handleOnSubmit={handleOnSubmit} />
    </Col>
  );
}
