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
    <div id="container">
      <h1 class="title">게임챌린지</h1>
      <p class="content">Return0 동아리에서 마련한 게임 챌린지에 참여하여 상품을 얻으세요!</p>
      <button class="start-btn">START!</button>
      <Routes>
        {games.map((game, index) => (
          <Route path={game.path} element={game.component} />
        ))}
      </Routes>
    </div>
  );
}

export default GameSelection;
