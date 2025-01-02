import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import TypingGame from "./games/TypingGame";
import MathGame from "./games/MathGame";
import ColorGame from "./games/ColorGame";
import NumberGame from "./games/NumberGame";
import ColorWordGame from "./games/ColorWord";
import AimingGame from "./games/AimingGame";
import DifferentLetterGame from "./games/DifferentLetter";
import "./games/gamestyle.css";

function GameSelection() {
  const games = [
    { name: "Typing Game", path: "/typing-game", component: <TypingGame /> },
    { name: "Math Game", path: "/math-game", component: <MathGame /> },
    { name: "Color Game", path: "/color-game", component: <ColorGame /> },
    { name: "Number Game", path: "/number-game", component: <NumberGame /> },
    { name: "Color-Word Game", path: "/color-word-game", component: <ColorWordGame /> },
    { name: "Aiming Game", path: "/aiming-game", component: <AimingGame /> },
    { name: "Different Letter Game", path: "/different-letter-game", component: <DifferentLetterGame /> },
  ];

  const [ani, setAni] = useState(true);
  const [showGame, setShowGame] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const TIME_SPACE = 100;

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + TIME_SPACE);
    }, TIME_SPACE);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  const handleAni = () => {
    setAni(false);
    setTimeout(() => {
      setShowGame(false);
      startTimer();
      navigate("/typing-game");
    }, 1000);
  };

  useEffect(() => {
    return () => stopTimer(); // Cleanup timer on unmount
  }, []);

  return (
    <div id="container">
      {showGame ? (
        <div id="game-selection" className={`column-align ${ani ? "" : "fadeout"}`}>
          <h1 className="title">게임챌린지</h1>
          <p className="content">
            Return0 동아리에서 마련한 게임 챌린지에 도전하세요!<br />
            게임은 7개가 준비되어 있으며, 가장 빠르게 7개의 게임을 완료한 학생에게 특별한 상품을 드립니다!
          </p>
          <button className="start-btn" onClick={handleAni}>START!</button>
        </div>
      ) : (
        <div id="game-content">
          <div className="timer">Elapsed Time: {elapsedTime/1000}s</div>
          <Routes>
            {games.map((game, index) => (
              <Route
                key={index}
                path={game.path}
                element={React.cloneElement(game.component, { stopTimer, elapsedTime, navigate })}
              />
            ))}
          </Routes>
        </div>
      )}
    </div>
  );
}

export default GameSelection;