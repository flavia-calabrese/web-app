import { Button, Form, Container, Navbar } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

function NavHeader() {
  return (
    <Navbar className="bg-primary nav-bar">
      <Container fluid>
        <Navbar.Brand>
          <i className="bi bi-collection-play" style={{ margin: "5px" }}></i>
          Film Library
        </Navbar.Brand>

        <Form.Control
          type="search"
          placeholder="Search"
          className="me-5"
          aria-label="Search"
          style={{ maxWidth: "700px" }}
        />

        <i
          className="bi bi-person-circle"
          style={{
            color: "white",
            marginInlineEnd: "10px",
            fontSize: "25px",
          }}
        ></i>
      </Container>
    </Navbar>
  );
}

export default NavHeader;
