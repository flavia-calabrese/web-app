import "bootstrap/dist/css/bootstrap.min.css";
import NavHeader from "./Components/NavHeader";
import { Container } from "react-bootstrap";
import QuestionDescription from "./Components/QuestionDescription";
import Answers from "./Components/Answers";
import { useState } from "react";
import { Answer, Question } from "./QAModels.mjs";

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

  return (
    <>
      {/* NomeComponente nomeProp = {ValoreProp} */}
      <NavHeader questionNum={question.id} />

      {/* mt-3 indicato un margin top di 3 */}
      <Container fluid className="mt-3">
        <QuestionDescription question={question} />

        {/*<Answers answers={fakeQuestion.getAnswers()}></Answers>*/}
        <Answers answers={answers} voteUp={voteUp}></Answers>
      </Container>
    </>
  );
}

export default App;
