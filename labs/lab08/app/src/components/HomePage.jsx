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
import { Outlet } from "react-router-dom";

function HomePage({ filters }) {
  return (
    <>
      <Row>
        <Col
          style={{ height: "100vh" }}
          className="collapse col-md-3 bg-light d-md-block"
        >
          {/** Costruisco la colonna di sinistra con i vari filtri*/}
          <SideBar filters={filters}></SideBar>
        </Col>
        <Outlet />
      </Row>
    </>
  );
}

export default HomePage;
