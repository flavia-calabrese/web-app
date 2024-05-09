import { Col, Nav } from "react-bootstrap";

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

export default SideBar;
