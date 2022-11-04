import { useState } from "react";
import "./App.css";
import blob from "./assets/blob 5.png";
import Question from "./Question";
function App() {
  const [start, setStart] = useState(false);

  function Start() {
    setStart(true);
  }
  return (
    <div>
      {!start && (
        <div className="App">
          <img src={blob} alt="blob" className="App--blob" />
          <h1>Quizzical</h1>
          <p>Test your animal knowledge</p>
          <button onClick={Start}>Start quiz</button>
        </div>
      )}
      {
        start && <Question />
      }
    </div>
  );
}

export default App;
