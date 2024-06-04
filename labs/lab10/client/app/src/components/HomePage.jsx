import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../App.css";
import * as React from "react";
import SideBar from "./SideBar";

import { Outlet } from "react-router-dom";

function HomePage({ filters, setFilmsState }) {
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
