import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles/MathGame.css";

function MathGame() {
  const [num1, setNum1] = useState(generateRandomNumber());
  const [num2, setNum2] = useState(generateRandomNumber());
  const [score, setScore] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(num1 + num2); // 정답 상태
  const [end, setEnd] = useState(false);
  const navigate = useNavigate();

  // 랜덤 숫자 생성 함수
  function generateRandomNumber() {
    return Math.floor(Math.random() * 20) + 1; // 1~20 범위
  }

  // 새로운 문제와 정답 설정
  const setNewProblem = () => {
    const newNum1 = generateRandomNumber();
    const newNum2 = generateRandomNumber();
    if (score === 0) {
      setCorrectAnswer(newNum1 - newNum2); // 뺄셈
    } else if (score === 1) {
      setCorrectAnswer(newNum1 * newNum2); // 곱셈
    } else if (score === 2) {
      setEnd(true);
      const timer = setTimeout(() => {
        navigate('/color-game'); // 페이지 이동
      }, 1000);
      return () => clearTimeout(timer); // 타이머 클린업
    }

    setNum1(newNum1);
    setNum2(newNum2);
  };

  // 정답과 오답 버튼 생성
  const generateButtonValues = () => {
    const values = new Set([correctAnswer]);
    while (values.size < 3) {
      const randomValue = Math.floor(correctAnswer * Math.random() * 1.5);
      if (randomValue !== correctAnswer) {
        values.add(randomValue);
      }
    }
    return Array.from(values).sort(() => Math.random() - 0.5); // 무작위 정렬
  };

  const buttonValues = correctAnswer !== null && score <= 2 ? generateButtonValues() : [];

  // 버튼 클릭 핸들러
  const handleClick = (value) => {
    if (value === correctAnswer) {
      setScore(score + 1);
    }

    // 새로운 문제 설정
    setNewProblem();
  };

  return (
    <div className={`column-align fadein ${end ? 'fadeout' : ''}`}>
      <h2 className="game-title">Math Game</h2>
      <h3>
        {num1} {score === 0 ? '+' : score === 1 ? '-' : '*'} {num2} = ?
      </h3>

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
