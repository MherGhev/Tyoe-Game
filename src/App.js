import './App.css';
import { useState, useEffect } from "react";
import { GenerateRandomLetter } from './LetterGenerator';
import Popup from 'reactjs-popup';
import { Points } from "./Points";
import { Faults } from './Faults';
import { RemainingTime } from "./RemainingTime";
import { Reset } from "./Reset";


/*
reset button not working properly, cannot start the game after reset


*/

function App() {

  useEffect(() => {

    if (time === 0) {
      return () => {
        clearInterval(intervalID);
      }
    }

  }, []);



  const defaultTime = 10;
  let intervalID = 0;

  let [pressedKey, setPressedKey] = useState("");
  let [randomLetter, setRandomLetter] = useState(GenerateRandomLetter());
  let [point, setPoint] = useState(0);
  let [fault, setFault] = useState(0);
  let [time, setTime] = useState(defaultTime);
  let [isGameStarted, setGameState] = useState(false);



  const timeRemaining = () => {
    const intervalID = setInterval(() => {
      if (time > 0) {
        setTime(--time);
      } else {
        setGameState(false);
      }

    }, 1000);

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

      <button id="resetButton" onClick={resetGame}> Reset </button>

    </>

  );
}

export default App;