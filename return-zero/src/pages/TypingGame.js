import React, { useState } from 'react';

function TypingGame() {
  const [input, setInput] = useState('');
  const [text, setText] = useState('React is fun!');
  const [score, setScore] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value === text) {
      setScore(score + 1);
      setText('Keep typing!'); // 새로운 텍스트로 변경 가능
      setInput('');
    }
  };

  return (
    <div>
      <h2>Typing Game</h2>
      <p>{text}</p>
      <input type="text" value={input} onChange={handleChange} />
      <p>Score: {score}</p>
    </div>
  );
}

export default TypingGame;