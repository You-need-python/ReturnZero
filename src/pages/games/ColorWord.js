import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles/TypingGame.css";

// 색상 목록 및 해당 이름
const COLORS = [
  { name: '빨강', color: 'red' },
  { name: '주황', color: 'orange' },
  { name: '노랑', color: 'yellow' },
  { name: '초록', color: 'green' },
  { name: '파랑', color: 'blue' },
  { name: '보라', color: 'purple' },
];

function ColorWordGame() {
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion());
  const [score, setScore] = useState(0);
  const [end, setEnd] = useState(false);
  const navigate = useNavigate();

  // 문제 생성 함수
  function generateQuestion() {
    const word = COLORS[Math.floor(Math.random() * COLORS.length)]; // 글자 내용
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]; // 글자의 색상
    return { word: word.name, textColor: color.color, correctColor: color.name };
  }

  // 정답 확인 함수
  const handleAnswer = (selectedColor) => {
    if (selectedColor === currentQuestion.correctColor) {
      setScore(score + 1);
      if (score >= 4) {
        setEnd(true);
        setTimeout(() => {
          navigate('/aiming-game');
        }, 1000);
      }
    } else {
      setScore(0);
    }
    if (score < 4) {setCurrentQuestion(generateQuestion())}; // 새로운 문제 생성
  };

  return (
    <div className={`column-align fadein ${end ? 'fadeout' : ''}`} >
      <h2 className="game-title">Color-Word Game</h2>
      <h3 className="game-desc">다음 글자의 색상을 맞추세요! ({score+1 > 5 ? 5 : score+1}/5)</h3>
      <div
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: currentQuestion.textColor,
          marginBottom: '25px'
        }}
      >
        {currentQuestion.word}
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {COLORS.map((color) => (
          <button
            key={color.name}
            onClick={() => handleAnswer(color.name)}
            style={{
              backgroundColor: color.color,
              color: color.color === 'yellow' ? 'black' : 'white',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              fontSize: '16px',
              fontFamily: 'EliceDigitalBaeum_Bold'
            }}
          >
            {color.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ColorWordGame;