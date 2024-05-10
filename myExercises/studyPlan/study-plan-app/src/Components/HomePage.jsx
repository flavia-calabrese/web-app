import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "react-bootstrap";
import CalendarComponent from "./CalendarComponent";
import "./component.css";
import zIndex from "@mui/material/styles/zIndex";
import CoursesComponent from "./CoursesComponent";
import { AlignHorizontalCenter, Margin } from "@mui/icons-material";

export default function HomePage() {
  return (
    <Container fluid style={{ paddingTop: "4rem" }}>
      <Row style={{ zIndex: -2 }}>
        <Col style={{ display: "flex", justifyContent: "center" }}>
          <CalendarComponent />
        </Col>
        <Col style={{ display: "flex", justifyContent: "center" }}>
          <CoursesComponent />
        </Col>
      </Row>
    </Container>
  );
}
