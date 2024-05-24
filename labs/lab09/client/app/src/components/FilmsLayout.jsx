import { Button, Col, Row } from "react-bootstrap";
import ListFilm from "./ListFilm";
import { useNavigate } from "react-router-dom";

export default function FilmsLayout() {
  const navigate = useNavigate();
  return (
    <Col>
      {/** Costruisco la colonna di destra che mostra i film corrispondenti al filtro selezionato */}
      <Row>
        <ListFilm></ListFilm>
      </Row>

      <Button
        onClick={() => navigate("/addfilm")}
        className="rounded-circle fixed-right-bottom"
      >
        <i className="bi bi-plus"></i>
      </Button>
    </Col>
  );
}
