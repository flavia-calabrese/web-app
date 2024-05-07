import { Form, Row, Col, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./../App.css";
import * as React from "react";
import Rating from "@mui/material/Rating";

function HomePage(props) {
  return (
    <>
      <Row>
        <Col
          style={{ height: "100vh" }}
          className="collapse col-md-3 bg-light d-md-block"
        >
          {/** Costruisco la colonna di sinistra con i vari filtri*/}
          <SideBar
            filters={props.filters}
            currentFilter={props.currentFilter}
            onClickFilter={props.onClickFilter}
          ></SideBar>
        </Col>
        <Col>
          {/** Costruisco la colonna di distra che mostra i film corrispondenti al filtro selezionato */}
          <ListFilm
            films={props.films}
            currentFilter={props.currentFilter}
            onFavoriteChange={props.onFavoriteChange}
            onRatingChange={props.onRatingChange}
          ></ListFilm>
        </Col>
      </Row>
      <Button className="btn btn-primary fixed-right-bottom rounded-circle">
        <i className="bi bi-plus"></i>
      </Button>
    </>
  );
}

function SideBar({ filters, currentFilter, onClickFilter }) {
  return (
    <Col className="ms-3 mt-4">
      <h5>Filters</h5>
      <Nav variant="pills" className="flex-column">
        {filters.map((f) => (
          <Nav.Item key={f} className="nav-item">
            <Nav.Link
              onClick={() => onClickFilter(f)}
              active={f === currentFilter}
              className={`nav-link ${
                f === currentFilter
                  ? "nav-link-selected"
                  : "nav-link-unselected"
              }`}
            >
              {f}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  );
}

function ListFilm({ films, currentFilter, onFavoriteChange, onRatingChange }) {
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
          ></FilmItem>
        </Row>
      ))}
    </Col>
  );
}

function FilmItem({ film, onFavoriteChange, onRatingChange }) {
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
          <i className="bi bi-pen me-4"></i>
          <i className="bi bi-trash3"></i>
        </Col>
      </Row>
      <hr />
    </>
  );
}

export default HomePage;
