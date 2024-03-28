import sqltile from "sqlite3";
import dayjs from "dayjs";

// Apertura database e creazione oggetto
const db = new sqltile.Database("questions.sqlite", (err) => {
  if (err) throw err;
});

// Oggetto rappresentante le domande
function Question(id, text, email, date) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.date = dayjs(date);

  // metodo per prendere tutte le risposte della Question instanziata
  this.getAnswers = () => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT answer.id, text, user.email, date, score FROM answer, user WHERE answer.questionId=? AND answer.authorId=user.Id ";
      db.all(sql, [this.id], (err, rows) => {
        if (err) reject(err);
        else {
          const answers = rows.map(
            (ans) =>
              new Answer(ans.id, ans.text, ans.email, ans.date, ans.score)
          );
          resolve(answers);
        }
      });
    });
  };

  this.addAnswer = (answer) => {
    return new Promise((resolve, reject) => {
      let sql = "SELECT id FROM user WHERE email = ?";

      db.get(sql, [answer.email], (err, row) => {
        if (err) return reject(err);

        if (row !== undefined) {
          sql =
            "INSERT INTO answer(text, authorId, date, score, questionId) VALUES (?,?,?,?,?)";
          db.run(
            sql,
            [answer.text, row.id, answer.date, answer.score, this.id],
            function (err) {
              if (err) reject(err);
              else {
                resolve(this.lastID);
              }
            }
          );
        } else {
          resolve("Author not available, check the inserted email.");
        }
      });
    });
  };

  this.getTop = (num) => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT answer.id, text, user.email, date, score FROM answer, user WHERE answer.authorId= user.id AND answer.questionId = ? ORDER BY score DESC LIMIT ?";
      db.all(sql, [this.id, num], (err, rows) => {
        if (err) return reject(err);

        if (rows !== undefined) {
          const bestAnswers = rows.map(
            (ans) =>
              new Answer(ans.id, ans.text, ans.email, ans.date, ans.score)
          );
          resolve(bestAnswers);
        } else {
          reject("no found");
        }
      });
    });
  };
}

function Answer(id, text, email, date, score = 0) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.date = dayjs(date);
  this.score = score;
}

function QuestionList() {
  // metodo per recuperare una singola Question dato il suo ID
  this.getQuestion = (idQuestion) => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT question.*, user.email FROM question JOIN user ON question.authorId=user.id WHERE question.id=?";
      db.get(sql, [idQuestion], (err, row) => {
        if (err) {
          reject(err);
        } else if (row !== undefined) {
          resolve(new Question(row.id, row.text, row.email, row.date));
        } else {
          resolve("Question not available, check the inserted id");
        }
      });
    });
  };

  this.addQuestion = (newQuestion) => {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO question(text, authorId, date) VALUES (?,(SELECT id FROM user WHERE email = ?),DATE(?))";
      db.run(
        sql,
        [newQuestion.text, newQuestion.email, newQuestion.date.toISOString()],
        function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        }
      );
    });
  };

  this.afterDate = (date) => {
    return new Promise((resolve, reject) => {
      const d = dayjs(date);

      const sql =
        "SELECT question.*, user.email FROM question, user WHERE date > DATE(?) AND question.authorId = user.id";
      db.all(sql, [d.toISOString()], (err, rows) => {
        if (err) return reject(err);
        if (rows !== undefined) {
          const questionsAfterDate = rows.map(
            (q) => new Question(q.id, q.text, q.email, q.date)
          );
          resolve(questionsAfterDate);
        }
      });
    });
  };

  this.deleteQuestion = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM question WHERE id = ?";
      db.run(sql, [id], function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      });
    });
  };
}

async function main() {
  try {
    const qList = new QuestionList();
    const a1 = new Answer(
      2,
      "i don't know",
      "luca.mannella@polito.it",
      "2024-03-28",
      0
    );
    const q1 = await qList.getQuestion(1);
    // console.log(q1);
    // const res = await qList.addQuestion(
    //   new Question(
    //     7,
    //     "Come funzionano async/await?",
    //     "luigi.derussis@polito.it",
    //     "2024-03-28"
    //   )
    // );
    // console.log(res);
    const ans = await q1.getAnswers();
    // console.log(ans);

    // const result = await q1.addAnswer(a1);
    // console.log(result);

    const resultGetAns = await q1.getTop(3);
    // console.log("visualizzo le tre risposte migliori di q1");
    // console.log(resultGetAns);

    qList.deleteQuestion(7);

    const resultAfterDate = await qList.afterDate("2024-02-15");
    // console.log("result After Date");
    // console.log(resultAfterDate);
  } catch (e) {
    console.log(e);
  }
}

main();
