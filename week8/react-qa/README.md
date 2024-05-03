# Componenti principali e loro props

- Navbar -> num. domanda
- Descrizione domanda -> num.domanda, domanda, mail autore
- Risposte -> lista risposte
  - "Answers" (titolo)
  - Tabella
    - Riga
      - Dati
      - Azioni
- Footer

# Stati

Quali sonon le cose che vogliamo potenzialmente cambiare nella nostra app affinche venga effettuato un re-rendering?

1. La tabella delle risposte
2. Le domande

Vogliamo definire uno stato che contenga le risposte: dove lo piazzo?
Dato che abbiamo un link tre le domande e le risposte è bene mettere lo stato in App

# Implement the "vote up" function

Devo definire un funzione votUp che mi permetta di incrementare lo score di una risposta, cioè devo modificare lo stato di una risposta.
Lo stato della risposta è definito in App, dato che voteUp lo va a manipolare, anche voteUp deve essere definita in App. Ma d'altra parte la funzione è legato all'onClick del button che sta in buttonAction all'interno di Answers.jsx -> motivo per il quale voteUp deve essere si definita in App ma passata come props fino all'onClick dove viene effettivamente utilizzata
