import React from "react";
import "./Single.css";
import { nanoid } from "nanoid";
export default function Single(props) {
  const questionChoices = props.choices.map((choice) => {
    let color;
    if(choice.selected) color ="#D6DBF5"
    if (choice.selected && props.useColor) color = choice.color;
    if (choice.answer == props.correct && props.useColor) color = "#94D7A2";

    let styles = { backgroundColor: color };
    return (
      <button
        className="quiz--choice"
        key={nanoid()}
        style={styles}
        onClick={() => props.handleClick(choice.id, props.id)}
      >
        {choice.answer}
      </button>
    );
  });
  return (
    <div className="quiz">
      <p className="quiz--question">{props.question}</p>
      <div className="quiz--choices">{questionChoices}</div>
    </div>
  );
}
