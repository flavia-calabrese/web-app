import "bootstrap/dist/css/bootstrap.min.css";
import NavHeader from "./Components/NavHeader";
import { Container } from "react-bootstrap";
import QuestionDescription from "./Components/QuestionDescription";
import Answers from "./Components/Answers";
import { useState } from "react";
import { Answer, Question } from "./QAModels.mjs";
import "./App.css";

const fakeQuestion = new Question(
  1,
  "Is JavaScript better than Python?",
  "luigi.derussis@polito.it",
  "2024-02-07"
);
fakeQuestion.init();
const fakeAnswers = fakeQuestion.getAnswers();

function App() {
  const [question, setQuestion] = useState(fakeQuestion);
  const [answers, setAnswers] = useState(fakeAnswers);

  const voteUp = (answerId) => {
    setAnswers((oldAnswers) => {
      return oldAnswers.map((ans) => {
        if (ans.id === answerId) {
          // ritorno una nuova, aggiornata risposta
          return new Answer(
            ans.id,
            ans.text,
            ans.email,
            ans.data,
            ans.score + 1
          );
        } else {
          return ans;
        }
      });
    });
  };

  const addAnswer = (answer) => {
    setAnswers((oldAnswers) => {
      const newId = Math.max(...oldAnswers.map((ans) => ans.id)) + 1;

      const newAnswer = new Answer(
        newId,
        answer.text,
        answer.email,
        answer.date,
        0
      );

      return [...oldAnswers, newAnswer];
    });
  };

  function updateAnswer(answer) {
    setAnswers((oldAnswers) => {
      return oldAnswers.map((ans) => {
        if (ans.id === answer.id)
          return new Answer(
            answer.id,
            answer.text,
            answer.email,
            answer.data,
            ans.score
          );
        else return ans;
      });
    });
  }
  return (
    <>
      {/* NomeComponente nomeProp = {ValoreProp} */}
      <NavHeader questionNum={question.id} />

      {/* mt-3 indicato un margin top di 3 */}
      <Container fluid className="mt-3">
        <QuestionDescription question={question} />

        {/*<Answers answers={fakeQuestion.getAnswers()}></Answers>*/}
        <Answers
          answers={answers}
          voteUp={voteUp}
          addAnswer={addAnswer}
          updateAnswer={updateAnswer}
        ></Answers>
      </Container>
      <Container fluid className="footer">
        <footer>foteer</footer>
      </Container>
    </>
  );
}

export default App;
