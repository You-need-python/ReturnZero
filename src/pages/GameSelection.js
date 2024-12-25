import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import TypingGame from "./TypingGame";
import MathGame from "./MathGame";
import ColorGame from "./ColorGame"
import NumberGame from "./NumberGame"
import ColorWordGame from "./ColorWord"
import AimingGame from "./AimingGame"
import DifferentLetterGame from "./DifferentLetter"

function GameSelection() {
  const games = [
    { name: "Typing Game", path: "/typing-game", component: <TypingGame /> },
    { name: "Math Game", path: "/math-game", component: <MathGame /> },
    { name: "Color Game", path: "/color-game", component: <ColorGame/> },
    { name: "Number Game", path: "/number-game", component: <NumberGame/> },
    { name: "Color-Word Game", path: "/color-word-game", component: <ColorWordGame/> },
    { name: "Aiming Game", path: "/aiming-game", component: <AimingGame/> },
    { name: "Different Letter Game", path: "/different-letter-game", component: <DifferentLetterGame/> }
  ];

  return (
    <div>
      <h1>Select a Game</h1>
      <ul>
        {games.map((game, index) => (
          <li key={index}>
            <Link to={game.path} style={{color: 'blue'}}>{game.name}</Link>
          </li>
        ))}
      </ul>
      <Routes>
        {games.map((game, index) => (
          <Route path={game.path} element={game.component} />
        ))}
      </Routes>
    </div>
  );
}

export default GameSelection;
