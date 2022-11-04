import React from "react";
import "./Question.css";
import Single from "./Single";
import { nanoid } from "nanoid";
import blob from "./assets/blob 5.png";
export default function Question() {
  const [questions, setQuestions] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [useColor, setUseColor] = React.useState(false);
  const [end, setEnd] = React.useState(false);
  const [loading,setLoading] = React.useState();
  function shuffleChoices(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  function unescapeHtml(unsafe) {
    return unsafe
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, ' " ')
      .replace(/&rsquo;/g, "'")
      .replace(/&#039;/g, "'");
  }

  async function getQuestions() {
    setLoading(true)
    const url =
      "https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple";
    const response = await fetch(url);
    const json = await response.json();
    setEnd(false);
    setScore(0);
    setUseColor(false);
    const results = json.results;
    let data = [];
    for (let i = 0; i < results.length; i++) {
      let allChoices = results[i].incorrect_answers.map((choice) => {
        return {
          answer: unescapeHtml(choice),
          selected: false,
          id: nanoid(),
          color: "#F8BCBC",
        };
      });
      allChoices.push({
        answer: unescapeHtml( results[i].correct_answer) ,
        selected: false,
        id: nanoid(),
        color: "#94D7A2;",
      });
      const shuffledChoices = shuffleChoices(allChoices);
      let current = {
        id: nanoid(),
        question: unescapeHtml(results[i].question),
        choices: shuffledChoices,
        correct: results[i].correct_answer,
      };
      data.push(current);
    }
    setQuestions(data);
    setLoading(false)
  }
  React.useEffect(() => {
    getQuestions();
  }, []);

  function toggle(choiceId, questionId) {
    setQuestions((prevQuestions) => {
      let newQuestions = [];
      for (let i = 0; i < prevQuestions.length; i++) {
        if (prevQuestions[i].id == questionId) {
          let newChoices = [];
          for (let j = 0; j < prevQuestions[i].choices.length; j++) {
            if (prevQuestions[i].choices[j].id == choiceId) {
              newChoices.push({
                ...prevQuestions[i].choices[j],
                selected: true,
              });
            } else
              newChoices.push({
                ...prevQuestions[i].choices[j],
                selected: false,
              });
          }
          newQuestions.push({ ...prevQuestions[i], choices: newChoices });
        } else newQuestions.push(prevQuestions[i]);
      }
      return newQuestions;
    });
  }

  const questionElements = questions.map((item) => {
    return (
      <Single
        key={nanoid()}
        question={item.question}
        choices={item.choices}
        id={item.id}
        correct={item.correct}
        handleClick={toggle}
        useColor={useColor}
      />
    );
  });
  function calculateScore() {
    setUseColor(true);
    setEnd(true);
    let selected = [];
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].choices.length; j++) {
        if (questions[i].choices[j].selected == true) {
          selected.push(questions[i].choices[j]);
          if (questions[i].choices[j].answer == questions[i].correct)
            setScore((prevScore) => prevScore + 1);
        }
      }
    }
  }
  function reset() {
    getQuestions();
    
  }
  return (
    <div id="quiz--wrapper">
      {loading && <div className="loading"></div>}
      <img src={blob} alt="blob" className="quiz--blob" />
      {!loading && questionElements}
      {(!end && !loading) && (
        <button className="submit" onClick={calculateScore}>
          Check Answers
        </button>
      )}
      {(end && !loading) && (
        <div className="result">
          {end && <p className="result--score">You Scored: {score}/5</p>}
          <button className="submit" onClick={reset}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
