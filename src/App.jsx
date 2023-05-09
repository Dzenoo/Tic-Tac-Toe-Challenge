import React, { useState } from "react";
import "../src/App.css";

const Block = ({ currentObj, onClick, isDisabled }) => {
  return (
    <button disabled={isDisabled} className="block" onClick={onClick}>
      {currentObj}
    </button>
  );
};

const App = () => {
  const [currentPlayer, setcurrentPlayer] = useState("X");
  const [disabledBtn, setdisabledBtn] = useState(false);
  const [winMessage, setwinMessage] = useState("");
  const [board, setBoard] = useState(new Array(9).fill(""));
  const [score] = useState({
    x: 0 || JSON.parse(localStorage.getItem("x skor")),
    o: 0 || JSON.parse(localStorage.getItem("o skor")),
  });

  const handleClick = (index) => {
    if (board[index] === "") {
      board[index] = currentPlayer;
      setcurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));

      const winner = checkWin();
      if (winner === "X") {
        score.x++;
        localStorage.setItem("x skor", score.x);
        setwinMessage(`Winner is ${winner}`);
        setdisabledBtn(true);
      } else if (winner === "O") {
        score.o++;
        localStorage.setItem("o skor", score.o);
        setwinMessage(`Winner is ${winner}`);
        setdisabledBtn(true);
      }
    }
  };

  const renderBox = (index) => {
    return (
      <Block
        isDisabled={disabledBtn}
        currentObj={board[index]}
        onClick={() => handleClick(index)}
      />
    );
  };

  const winners = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWin = () => {
    for (let i = 0; i < winners.length; i++) {
      const [a, b, c] = winners[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const restartGame = () => {
    setBoard(new Array(9).fill(""));
    setdisabledBtn(false);
    setcurrentPlayer("X");
    setwinMessage("");
  };

  return (
    <>
      <h1>Current Player is {currentPlayer}</h1>
      <b>{winMessage}</b>
      {winMessage && (
        <>
          <br />
          <button className="button" onClick={restartGame}>
            Restart
          </button>
          <br />
        </>
      )}
      <div className="score">
        <h2>Score</h2>
        <span>X: {score.x}</span>
        <span>O: {score.o}</span>
      </div>
      <div className="main">
        <div className="row">
          {renderBox(0)}
          {renderBox(1)}
          {renderBox(2)}
        </div>
        <div className="row">
          {renderBox(3)}
          {renderBox(4)}
          {renderBox(5)}
        </div>
        <div className="row">
          {renderBox(6)}
          {renderBox(7)}
          {renderBox(8)}
        </div>
      </div>
    </>
  );
};

export default App;
