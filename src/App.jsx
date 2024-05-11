import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [correctness, setCorrectness] = useState(undefined);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("./src/assets/questions.json")
      .then((response) => {
        return response.json();
      })
      .then((entries) => {
        setQuestions(entries.map((entry) => entry.q));
        setAnswers(entries.map((entry) => entry.a));
        setIsLoading(false);
        console.log(questions);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleClick(answer) {
    console.clear();
    if (answers[currentQuestion] === answer) {
      console.log("Correct!");
      setScore(score + 1);
    } else {
      console.log("Incorrect!");
      setScore(0);
    }

    setCurrentQuestion(Math.floor(Math.random() * questions.length));
  }

  if (isLoading) {
    return <>Loading</>;
  } else {
    return (
      <div className="main">
        <div className="container">
          <h3>{questions[currentQuestion]}</h3>
          <button className="true" onClick={() => handleClick(1)}>
            Veritate
          </button>
          <button className="false" onClick={() => handleClick(0)}>
            False
          </button>
          <div className="score">Puntaje: {score}</div>
        </div>
      </div>
    );
  }
}

export default App;
