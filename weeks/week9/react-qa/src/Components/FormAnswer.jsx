import dayjs from "dayjs";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function FormAnswer(props) {
  const [text, setText] = useState(props.answer ? props.answer.text : "");
  const [email, setEmail] = useState(props.answer ? props.answer.email : "");
  const [date, setDate] = useState(
    props.answer
      ? props.answer.date.format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD")
  );

  const handleSubmit = (event) => {
    {
      /** Tale metodo serve per prevenire che venga eseguito il comportamento di default */
    }
    event.preventDefault();
    {
      /** Gestisce l'operazione di submit 
        --> abbiamo i dati posti dall'utente nel form
        Quindi:
          - devo creare una nuova risposta (oggetto)
              ATTENZIONE: non creo un oggetto risposta, 
                          creo un oggetto contenente solo gli elementi di cui il form è a conoscenza (testo, mail, data)
                          l'oggetto risposta verrà creato in App così:
                          1. non devo importare nulla
                          2. (IMPORTANTE) qui non conosco l'id della risposta (app può calcolarlo perchè conosce tutte le risposte :) )
          - aggiungere la risposta allo stato 
              (aggiungo l'oggetto appena creato allo stato che contiene tutte le risposte)
      */
    }
    // 1. creo la nuova risposta
    const answer = { text, email, date };

    // TODO: aggiungere validazioni

    if (props.mode === "edit") {
      props.updateAnswer({ id: props.answer.id, ...answer });
    } else {
      // 2. aggiungere la risposta allo stato
      props.addAnswer(answer);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
          onChange={(event) => {
            console.log(event.target.value);
            setDate(event.target.value);
          }}
        ></Form.Control>
      </Form.Group>
      {/** Per far funzionare il bottone di Add bisogna attivare l'onSubmit (sopra nel form) */}
      {props.mode === "add" && (
        <Button
          variant="success"
          type="submit"
          style={{ marginRight: 3, marginBottom: 5 }}
        >
          Add
        </Button>
      )}
      {props.mode === "edit" && (
        <Button
          variant="success"
          type="submit"
          style={{ marginRight: 3, marginBottom: 5 }}
        >
          Update
        </Button>
      )}

      <Button
        variant="danger"
        style={{ marginBottom: 5 }}
        onClick={props.cancel}
      >
        Cancel
      </Button>
    </Form>
  );
}

export default FormAnswer;
