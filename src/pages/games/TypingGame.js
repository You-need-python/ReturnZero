import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TypingGame() {
  const texts = [
    "As a result of retribution, the singer was finally punished.",
    "He was trembling with fear while waiting for the exam results.",
    "Never teach a child anything of which you are not yourself.",
    "The archer won consecutive victories with irresistible force.",
    "Your attitude reminds me of the saying betrayal after usefulness.",
    "I am indecisive and cannot make decisions at crucial moments."
  ];
  const [input, setInput] = useState("");
  const text = useState(texts[Math.floor(Math.random() * texts.length)])[0];
  const [end, setEnd] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value === text) {
      setEnd(true);
      setTimeout(() => {
        navigate("/ReturnZero/math-game");
      }, 1000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 동작 방지
  };

  return (
    <div className={`column-align fadein ${end ? "fadeout" : ""}`}>
      <h2 className="game-title">Typing Game</h2>
      <h3 className="game-desc">다음 문장을 옮겨 쓰세요!</h3>
      <p id="text">{text}</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="text"
          autoFocus
          value={input}
          onChange={handleChange}
          disabled={end}
          id="text-input"
          autoComplete="off"
        />
      </form>
    </div>
  );
}

export default TypingGame;
