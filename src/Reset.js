import React from "react";


export function Reset() {
    
    const resetGame = () => {

        document.getElementById("inputBox").value = "";

        setPoint(0);
        setFault(0);
        setTime(defaultTime);
        setGameState(false);
        setPressedKey("");

    }

    return (
        <>
            <button id="resetButton" onClick={resetGame}> Reset </button>
        </>
    );

}