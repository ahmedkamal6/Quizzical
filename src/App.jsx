import { useState } from "react";
import "./App.css";
import blob from "./assets/blob 5.png";
import Question from "./Question";
import categoriesData from "./CategoriesData";
import React from "react";
import { nanoid } from "nanoid";
import { useEffect } from "react";
function App() {
  const [start, setStart] = useState(false);
  const [category, setCategory] = useState("");
  const [title,setTitle] = useState("")
  const [difficulty, SetDifficulty] = useState("");

  function Start() {
    setStart(true);
  }

  React.useEffect(() => {
    console.log(category);
    console.log(difficulty);
  }, [category, difficulty]);

  function setCat(event) {
    setCategory(event.target.value);
  }
  useEffect(()=>{
    setTitle(()=>{
      for(let i=0;i<categoriesData.length;i++){
        if(categoriesData[i].id == category)
          return categoriesData[i].category;
      }
    })
  },[category])

  function setDif(event) {
    SetDifficulty(event.target.value);
  }
  const categoryOps = categoriesData.map(category =>{
    return(
      <option key={category.category} value={category.id}>{category.category}</option>
    )
  })
  return (
    <div>
      {!start && (
        <div className="App">
          <img src={blob} alt="blob" className="App--blob" />
          <h1>Quizzical</h1>
          <p>Test your {title} knowledge</p>

          <div className="App--catAndDif">
            <div>
              <label htmlFor="category">Category: </label>
              <select name="category" id="category" onChange={setCat}>
                <option value="">Any</option>
                {categoryOps}
              </select>
            </div>
            <div>
              <label htmlFor="category">Difficulty: </label> 
              <select name="difficulty" id="difficulty" onChange={setDif}>
                <option value="">Any</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          <button onClick={Start}>Start quiz</button>
        <small>all questions are from <a href="https://opentdb.com/">opentdb.com</a></small>
        </div>
      )}
      {start && <Question category={category} difficulty={difficulty} />}
    </div>
  );
}

export default App;
