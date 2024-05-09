import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "react-bootstrap";
import CalendarComponent from "./CalendarComponent";
import "./component.css";
import zIndex from "@mui/material/styles/zIndex";
import CoursesComponent from "./CoursesComponent";

export default function HomePage() {
  return (
    <Container fluid>
      <Row sx={{ zIndex: -2 }}>
        <Col sx={6}>
          <CalendarComponent />
        </Col>
        <Col sx={6}>
          <CoursesComponent />
        </Col>
      </Row>
    </Container>
  );
}
