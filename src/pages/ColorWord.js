import React, { useState } from 'react';

// 색상 목록 및 해당 이름
const COLORS = [
  { name: '빨강', color: 'red' },
  { name: '파랑', color: 'blue' },
  { name: '초록', color: 'green' },
  { name: '노랑', color: 'yellow' },
  { name: '보라', color: 'purple' },
  { name: '검정', color: 'black' },
];

function ColorWordGame() {
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion());
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);

  // 문제 생성 함수
  function generateQuestion() {
    const word = COLORS[Math.floor(Math.random() * COLORS.length)]; // 글자 내용
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]; // 글자의 색상
    return { word: word.name, textColor: color.color, correctColor: color.name };
  }

  // 정답 확인 함수
  const handleAnswer = (selectedColor) => {
    if (selectedColor === currentQuestion.correctColor) {
      setMessage('정답입니다! 🎉');
      setScore(score + 1);
    } else {
      setMessage('오답입니다! 😢');
    }
    setCurrentQuestion(generateQuestion()); // 새로운 문제 생성
  };

  return (
    <div>
      <h2>색깔-글자 게임</h2>
      <p>다음 글자의 <b>색상을</b> 맞추세요!</p>
      <div
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          margin: '20px 0',
          color: currentQuestion.textColor,
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
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            {color.name}
          </button>
        ))}
      </div>
      <p>현재 점수: {score}</p>
      <p>{message}</p>
    </div>
  );
}

export default ColorWordGame;