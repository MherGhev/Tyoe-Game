import './App.css';
import { useState, useEffect } from "react";
import { GenerateRandomLetter } from './LetterGenerator';
import { Points } from "./Components/Points";
import { Faults } from './Components/Faults';
import { RemainingTime } from "./Components/RemainingTime";
import { Reset } from "./Components/Reset";



function App() {

  const defaultTime = 10;

  let [pressedKey, setPressedKey] = useState("");
  let [randomLetter, setRandomLetter] = useState(GenerateRandomLetter());
  let [point, setPoint] = useState(0);
  let [fault, setFault] = useState(0);
  let [time, setTime] = useState(defaultTime);
  let [isGameStarted, setGameState] = useState(false);
  let [intervalID, setIntervalID] = useState(0);


  const timeRemaining = () => {
    setIntervalID(setInterval(() => {
      if (time > 0) {
        setTime(--time);
      } else {
        setGameState(false);
      }

    }, 1000));

  }

  const startGame = () => {

    setTime(defaultTime);

    timeRemaining();

    setGameState(true);

    document.getElementById("inputBox").focus();


  }

  const resetGame = () => {

    document.getElementById("inputBox").value = "";

    setPoint(0);
    setFault(0);
    setTime(defaultTime);
    setGameState(false);
    setPressedKey("");

    clearInterval(intervalID);


  }

  const handleKeyPress = (event) => {

    if (event.key === randomLetter) {
      setPoint(++point);
    } else {
      setFault(++fault);
    }


    setPressedKey(event.key);
    setRandomLetter(GenerateRandomLetter);


  }


  return (
    <>
      <button id="startButton" onClick={startGame}>Start the Game</button>

      <h1> You pressed: {pressedKey} </h1>

      <input type="text" id="inputBox" onKeyDown={isGameStarted ? handleKeyPress : console.log("the game is not started")} />


      <h1> Random letter: {randomLetter}</h1>

      <Points points={point} />

      <Faults faults={fault} />

      <RemainingTime time={time} />

      <Reset resetGame={resetGame} />


    </>

  );
}

export default App;