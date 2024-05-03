import { Button, Col, Row, Table } from "react-bootstrap";

function Answers(props) {
  return (
    <>
      <Row>
        <Col as="h2"> Aswers:</Col>
      </Row>
      <Row>
        {/* colonna di larghezza 10, mx-auto centra automaticamente la colonna nella pagina */}
        <Col lg={10} className="mx-auto">
          <AnswerTable answers={props.answers}></AnswerTable>
        </Col>
      </Row>
    </>
  );
}

function AnswerTable(props) {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Taxt</th>
          <th>Author</th>
          <th>Score</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/** La parentesi graffa ci va perchè questa è un'espressione JS */}
        {props.answers.map((ans) => (
          <AnswerRow answer={ans} key={ans.id} />
        ))}
      </tbody>
    </Table>
  );
}

function AnswerRow(props) {
  return (
    <tr>
      <AnswerData answer={props.answer} />
      <AnswerAction />
    </tr>
  );
}

function AnswerData(props) {
  return (
    <>
      <td>{props.answer.date.format("YYYY-MM-DD")}</td>
      <td>{props.answer.text}</td>
      <td>{props.answer.email}</td>
      <td>{props.answer.score}</td>
    </>
  );
}

function AnswerAction() {
  return (
    <td>
      <Button variant="warning">vote up</Button>
      <Button variant="primary">edit</Button>
      <Button variant="danger">delite</Button>
    </td>
  );
}

export default Answers;
