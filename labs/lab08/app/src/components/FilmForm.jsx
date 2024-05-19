import { Rating } from "@mui/material";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./component.css";
import { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

function FilmForm({ film, handleOnSubmit }) {
  const [title, setTitle] = useState(film ? film.title : "");
  const [date, setDate] = useState(
    film ? film.watchDate?.format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD")
  );
  console.log();
  const [favorite, setFavorite] = useState(film ? film.favorite : false);
  const [rate, setRate] = useState(film ? film.rating : 0);

  const handleSubmitNewFilm = (event) => {
    event.preventDefault();

    const newFilm = { title, favorite, rate, date: date ? dayjs(date) : null };

    handleOnSubmit(newFilm);
    // if (mode === "edit") {
    //   updateFilm({ id: film.id, userId: film.userId, ...newFilm });
    // } else {
    //   addFilm(newFilm);
    // }
  };

  return (
    <Form onSubmit={handleSubmitNewFilm}>
      <Row className="mb-3">
        <Col sx={4}>
          <Form.Group controlId="formGridTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required={true}
              type="text"
              placeholder="Film title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Group>
        </Col>
        <Col sx={4}>
          <Form.Group controlId="formGridDate">
            <Form.Label>Watch Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Watch date"
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          </Form.Group>
        </Col>

        <Col sx={4} style={{ textAlign: "center" }}>
          <Form.Check
            inline
            label="Favorite"
            style={{ marginTop: "2.5rem" }}
            value={favorite}
            checked={favorite}
            onChange={(event) => {
              setFavorite((oldFavorite) => !oldFavorite);
            }}
          />
        </Col>
        <Col sx={4} style={{ textAlign: "center" }}>
          <Rating
            style={{ marginTop: "2.5rem" }}
            name="simple-controlled"
            value={rate}
            onChange={(event, newValue) => {
              setRate(newValue);
            }}
          />
        </Col>
      </Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default FilmForm;
