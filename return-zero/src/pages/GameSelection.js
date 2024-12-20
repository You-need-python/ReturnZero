import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import TypingGame from "./TypingGame";
import MathGame from "./MathGame";

function GameSelection() {
  const games = [
    { name: "Typing Game", path: "/typing-game", component: <TypingGame /> },
    { name: "Math Game", path: "/math-game", component: <MathGame /> }
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
