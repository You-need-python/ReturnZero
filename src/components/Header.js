import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  const games = [
    { name: "Typing Game", path: "/typing-game" },
    { name: "Math Game", path: "/math-game" },
    { name: "Color Game", path: "/color-game" },
    { name: "Number Game", path: "/number-game" },
    {
      name: "Color-Word Game",
      path: "/color-word-game"
    },
    { name: "Aiming Game", path: "/aiming-game" },
    {
      name: "Different Letter Game",
      path: "/different-letter-game"
    }
  ];
  return (
    <div className="header">
      <a href="/" className="homelink">
        <h1>Return 0</h1>
      </a>
      {games.map((game, index) => (
        <Link className="homelink" to={game.path}>{game.name}</Link>
      ))}
    </div>
  );
}

export default Header;