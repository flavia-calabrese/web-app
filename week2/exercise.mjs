import dayjs from "dayjs";

function Answer(respons, respondentUsername, date, score = 0) {
  this.respons = respons;
  this.respondentUsername = respondentUsername;
  this.score = score;
  this.date = dayjs(date);

  this.toString = () => {
    return ` ${this.respondentUsername} replied '${
      this.respons
    }' on ${this.date.format("YYYY-MM-DD")} and got a score of ${this.score}`;
  };
}

function Question(question, questionerUsername, date) {
  this.question = question;
  this.questionerUsername = questionerUsername;
  this.date = dayjs(date);
  this.answers = [];

  this.add = (answer) => {
    this.answers.push(answer);
  };

  this.find = (username) => {
    let foundAnswers = [];
    for (let answer of this.answers) {
      if (answer.respondentUsername === username) {
        foundAnswers.push(answer);
      }
    }
    return foundAnswers;
  };

  // TO DO
  //   this.find = (username) => {
  //     return this.answers.filter(
  //       (answer) => answer.respondentUsername == username
  //     );
  //   };

  //   this.afterDate = (date) => {
  //     return this.answers.filter((answer) => answer.date.isAfter(date));
  //   };

  //   this.listByDate = () => {
  //     return this.answers.sort((a, b) => a.date.diff(b.date, "date"));
  //   };

  //   this.listByScore = () => {
  //     return this.answers.sort((a, b) => b.score - a.score);
  //   };
}

let question = new Question(
  "Is JS better than Python?",
  "Flavia",
  "2024-02-27"
);
let firstAnswer = new Answer("Yes", "Luca Mannella", "2024-02-28", -10);
let secondAnswer = new Answer(
  "Not in a million year",
  "Guido Van Rossum",
  "2024-03-01",
  5
);
let thirdAnswer = new Answer("No", "Albert Einstein", "2024-03-11");
let fourthAnswer = new Answer("I don't know", "Luca Mannella", "2024-03-10");
question.add(firstAnswer);
question.add(secondAnswer);
question.add(thirdAnswer);
question.add(fourthAnswer);

const answersByLuca = question.find("Luca Mannella");

console.log(question);

// vedo che ci sono due oggetti ma non ne vedo il contenuto --> fa la conversione a stringa perche sto
// concatendando gli oggetti ad una stringa :)
console.log("\nAnswers by Luca: " + answersByLuca);
