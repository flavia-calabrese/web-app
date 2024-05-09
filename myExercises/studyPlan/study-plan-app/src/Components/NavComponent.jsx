import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./component.css";

function NavComponent() {
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="nsvj">
          <Container fluid>
            <Col xs={1}>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
                className="menu"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Menu
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="#action1" className="shape">
                      Study planner
                    </Nav.Link>
                    <Nav.Link href="#action2" className="shape">
                      My courses
                    </Nav.Link>
                    <Nav.Link href="#action3" className="shape">
                      To do list
                    </Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Col>
            <Col xs={11} className="navbar-title">
              <Navbar.Text>Study Planner</Navbar.Text>
            </Col>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavComponent;
