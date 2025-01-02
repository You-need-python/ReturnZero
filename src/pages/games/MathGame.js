import React, { useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles/MathGame.css";

function MathGame() {
  const [num1, setNum1] = useState(generateRandomNumber());
  const [num2, setNum2] = useState(generateRandomNumber());
  const [score, setScore] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(num1 + num2);
  const [end, setEnd] = useState(false);
  const navigate = useNavigate();

  // 랜덤 숫자 생성 함수
  function generateRandomNumber() {
    return Math.floor(Math.random() * 20) + 1;
  }

  // 정답과 오답 버튼 생성
  const buttonValues = useMemo(() => {
    const values = new Set([correctAnswer]);
    while (values.size < 3) {
      const randomValue = Math.floor(correctAnswer * Math.random() * 1.5);
      if (randomValue !== correctAnswer) {
        values.add(randomValue);
      }
    }
    return Array.from(values).sort(() => Math.random() - 0.5);
  }, [correctAnswer]);

  // 새로운 문제 설정
  const setNewProblem = () => {
    const newNum1 = generateRandomNumber();
    const newNum2 = generateRandomNumber();
    setNum1(newNum1);
    setNum2(newNum2);
    setCorrectAnswer(newNum1 + newNum2);
  };

  // 버튼 클릭 핸들러
  const handleClick = (value) => {
    if (value === correctAnswer) {
      setScore(score + 1);
      if (score === 2) {
        setEnd(true);
        const timer = setTimeout(() => {
          navigate('/ReturnZero/color-game');
        }, 1000);
        return () => clearTimeout(timer);
      }
    } else {
      setScore(0);
    }
    setNewProblem();
  };

  return (
    <div className={`column-align fadein ${end ? 'fadeout' : ''}`}>
      <h2 className="game-title">Math Game</h2>
      <h3>
        {num1} + {num2} = ?
      </h3>
      <h3 className="game-desc">({score + 1 > 3 ? 3 : score + 1}/3)</h3>

      <div className="button-container">
        {buttonValues.map((value, index) => (
          <button key={index} onClick={() => handleClick(value)}>
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MathGame;
