import { Col } from "react-bootstrap";
import FilmForm from "./FilmForm";
import { useNavigate } from "react-router-dom";

export default function AddFilm({ addFilm }) {
  const navigate = useNavigate();
  function handleOnSubmit(newFilm) {
    addFilm(newFilm);
    navigate(-1);
  }
  return (
    <Col>
      <FilmForm film={""} handleOnSubmit={handleOnSubmit} />
    </Col>
  );
}
