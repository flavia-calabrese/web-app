import { Rating } from "@mui/material";
import { Button, Col, Form, Row } from "react-bootstrap";

function FilmItem({ film, onFavoriteChange, onRatingChange, handleEdit }) {
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
          <Button variant="outline-info" onClick={() => handleEdit(film)}>
            <i className="bi bi-pen me-4"></i>
          </Button>
          <i className="bi bi-trash3"></i>
        </Col>
      </Row>
      <hr />
    </>
  );
}

export default FilmItem;
