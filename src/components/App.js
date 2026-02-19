import { useState } from "react";
import "./App.css";
const questions = [
  {
    id: 1,
    question: "Ce este React?",
    answers: [
      { id: "a", text: "Un framework backend", isCorrect: false },
      { id: "b", text: "O bibliotecă JavaScript pentru UI", isCorrect: true },
      { id: "c", text: "Un limbaj de programare", isCorrect: false },
      { id: "d", text: "Un browser", isCorrect: false },
    ],
  },
  {
    id: 2,
    question: "Ce hook se folosește pentru state?",
    answers: [
      { id: "a", text: "useEffect", isCorrect: false },
      { id: "b", text: "useContext", isCorrect: false },
      { id: "c", text: "useState", isCorrect: true },
      { id: "d", text: "useReducer", isCorrect: false },
    ],
  },
  {
    id: 3,
    question: "Ce returnează o componentă React?",
    answers: [
      { id: "a", text: "HTML pur", isCorrect: false },
      { id: "b", text: "JSX", isCorrect: true },
      { id: "c", text: "CSS", isCorrect: false },
      { id: "d", text: "JSON", isCorrect: false },
    ],
  },
  {
    id: 4,
    question: "Ce atribut este necesar când folosim map?",
    answers: [
      { id: "a", text: "id", isCorrect: false },
      { id: "b", text: "index", isCorrect: false },
      { id: "c", text: "key", isCorrect: true },
      { id: "d", text: "ref", isCorrect: false },
    ],
  },
];

function App() {
  return (
    <div className="mainCard">
      <QuestionsList />
    </div>
  );
}

function QuestionsList() {
  const [currentQ, setCurrentQ] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [submited, setSubmited] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(true);
  const [score, setScore] = useState(0);
  function handleNext() {
    const currentIndex = questions.findIndex((el) => el.id === currentQ);
    if (currentIndex < questions.length - 1) {
      setCurrentQ(questions[currentIndex + 1].id);
      setSubmited(false);
      setSelectedAnswer("");
    } else setActiveQuiz(false);
  }
  function handleReset() {
    setActiveQuiz(true);
    setCurrentQ(1);
    setSubmited(false);
    setSelectedAnswer("");
    setScore(0);
  }
  function handleSubmit() {
    setSubmited(true);
    const [questionObject] = questions.filter((el) => el.id === currentQ);
    const [correctAnswer] = questionObject.answers.filter((el) => el.isCorrect);
    const correct = selectedAnswer === correctAnswer.id ? true : false;
    if (correct) {
      setScore((score) => score + 1);
    }
  }
  return (
    <div className="questionListCard">
      {" "}
      {activeQuiz && (
        <div>
          <ul className="questionList">
            {questions.map(
              (q) =>
                q.id === currentQ && (
                  <Question
                    q={q}
                    key={q.id}
                    selectedAnswer={selectedAnswer}
                    setSelectedAnswer={setSelectedAnswer}
                    submited={submited}
                    onSubmit={handleSubmit}
                  />
                ),
            )}
          </ul>
          {!submited && (
            <button
              onClick={() => handleSubmit()}
              disabled={selectedAnswer === ""}
              className="btnSubmit"
            >
              Submit
            </button>
          )}
          {submited && <button onClick={() => handleNext()}>Next</button>}
          <p className="questionNumber">
            Question {questions.findIndex((el) => el.id === currentQ) + 1}/
            {questions.length}
          </p>
        </div>
      )}
      {!activeQuiz && <FinalScore onReset={handleReset} score={score} />}
    </div>
  );
}

function Question({ q, selectedAnswer, setSelectedAnswer, submited }) {
  return (
    <>
      <li>
        <h3 className="questionTitle">{q.question}</h3>
        <ul className={submited ? "inactiv" : ""}>
          {q.answers.map((a) => (
            <li
              key={a.id}
              className={
                submited
                  ? a.isCorrect
                    ? "greenBackground"
                    : !a.isCorrect && a.id === selectedAnswer
                      ? "redBackground"
                      : ""
                  : a.id === selectedAnswer
                    ? "selected"
                    : ""
              }
              onClick={() => !submited && setSelectedAnswer(a.id)}
            >
              <input
                type="radio"
                value={a.id}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                checked={true ? a.id === selectedAnswer : false}
                disabled={submited ? true : false}
              />
              {a.text}
            </li>
          ))}
        </ul>
      </li>
    </>
  );
}
function FinalScore({ onReset, score }) {
  return (
    <div>
      <p>You reached the end. Well done!</p>
      <button onClick={() => onReset()}>Reset</button>
      <p>The final score: {score}</p>
    </div>
  );
}
export default App;
