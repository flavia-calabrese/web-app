import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, Outlet } from "react-router-dom";

import { Answer, Question } from "./QAModels.mjs";
import NavHeader from "./components/NavHeader";
import NotFound from "./components/NotFoundComponent";
import {
  QuestionLayout,
  AddEditQuestionLayout,
} from "./components/QuestionComponent";
import Answers from "./components/AnswerComponents";

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
        if (ans.id === answerId)
          // ritorno una nuova, aggiornata, risposta
          return new Answer(
            ans.id,
            ans.text,
            ans.email,
            ans.date,
            ans.score + 1
          );
        else return ans;
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

  const updateAnswer = (answer) => {
    setAnswers((oldAnswers) => {
      return oldAnswers.map((ans) => {
        if (ans.id === answer.id) {
          return new Answer(
            answer.id,
            answer.text,
            answer.email,
            answer.date,
            ans.score
          );
        } else return ans;
      });
    });
  };

  return (
    <Routes>
      <Route
        element={
          <>
            <NavHeader questionNum={question.id} />
            <Container fluid className="mt-3">
              <Outlet />
            </Container>
          </>
        }
      >
        <Route
          path="/"
          element={<p className="lead">ToDo: implement here question list</p>}
        ></Route>
        <Route
          path="/questions/:questionId"
          element={
            <QuestionLayout
              question={question}
              answers={answers}
              voteUp={voteUp}
              addAnswer={addAnswer}
              updateAnswer={updateAnswer}
            />
          }
        />

        <Route
          path="/questions/:questionId/add"
          element={
            <AddEditQuestionLayout
              question={question}
              mode={"add"}
              addAnswer={addAnswer}
            />
          }
        />

        <Route
          path="/questions/:questionId/edit"
          element={
            <AddEditQuestionLayout
              question={question}
              mode={"edit"}
              updateAnswer={updateAnswer}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );

  /**
   * AnswerPage: ./questions/:questionId
   * AddAnswer: ./questions/:questionId/add
   * EditAnswer: ./questions/:questionId/answers/edit
   *             ./answers/:answerId/edit
   * AddQuestion: ./questions/add
   * Questions: ./questions
   * [ EditQuestion: ./questions/questionId/edit (???) ]
   * 404 not found: .*
   */
}

export default App;
