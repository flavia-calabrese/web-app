import { useEffect } from "react";
import { Col, Nav } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function SideBar({ filters }) {
  const { filter } = useParams();
  const navigate = useNavigate();

  return (
    <Col className="ms-3 mt-4">
      <h5>Filters</h5>
      <Nav variant="pills" className="flex-column">
        {filters.map((f) => (
          <Nav.Item key={f} className="nav-item">
            <Nav.Link
              onClick={() => navigate(`/filters/${f}`)}
              active={f === filter}
              className={`nav-link ${
                f === filter ? "nav-link-selected" : "nav-link-unselected"
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

export default SideBar;
