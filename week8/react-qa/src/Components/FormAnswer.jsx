import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function FormAnswer() {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    // farà qualcosa :)
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Testo</Form.Label>
        {/* Specifico che il campo è obbligatorio, la lunghezza minima è pari a 2 
            Con value={nomeDelloStato} linko lo stato al componente
            mi serve poi l'onChange per vedere le modifiche apportate
        */}
        <Form.Control
          type="text"
          required={true}
          minLength={2}
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          required={true}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Data</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        ></Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        Add
      </Button>
      <Button variant="danger">Cancel</Button>
    </Form>
  );
}

export default FormAnswer;
