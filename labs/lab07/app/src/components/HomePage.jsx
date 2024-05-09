import { Form, Row, Col, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./../App.css";
import * as React from "react";
import Rating from "@mui/material/Rating";
import FilmItem from "./FilmItem";
import SideBar from "./SideBar";
import ListFilm from "./ListFilm";
import FilmForm from "./FilmForm";

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
          {/** Costruisco la colonna di destra che mostra i film corrispondenti al filtro selezionato */}
          <Row>
            <ListFilm
              films={props.films}
              currentFilter={props.currentFilter}
              onFavoriteChange={props.onFavoriteChange}
              onRatingChange={props.onRatingChange}
              handleEdit={props.handleEdit}
            ></ListFilm>
          </Row>
          <Row>
            {props.mode === "view" && (
              <Button onClick={() => props.onClickAddNewFilm()}>
                <i className="bi bi-plus"></i>
              </Button>
            )}
            {props.mode === "add" && <FilmForm addFilm={props.addFilm} />}

            {props.mode === "edit" && (
              <FilmForm
                film={props.editableFilm}
                updateFilm={props.updateFilm}
                mode={props.mode}
              />
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default HomePage;
