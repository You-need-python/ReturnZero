import React, { useState } from 'react';

function MathGame() {
  // 상태 관리
  const [num1, setNum1] = useState(generateRandomNumber());
  const [num2, setNum2] = useState(generateRandomNumber());
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  // 랜덤 숫자 생성 함수
  function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1; // 1~10 범위
  }

  // 정답 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 입력값을 정수로 변환
    const userAnswer = parseInt(answer, 10);

    if (userAnswer === num1 + num2) {
      setScore(score + 1);
      setFeedback('Correct! 🎉');
    } else {
        setScore(score - 1);
      setFeedback('Wrong! 😢');
    }

    // 문제 갱신
    setNum1(generateRandomNumber());
    setNum2(generateRandomNumber());
    setAnswer(''); // 입력창 초기화
  };

  return (
    <div>
      <h2>Math Game</h2>
      <p>Solve the problem below:</p>
      <h3>{num1} + {num2} = ?</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Your answer"
          required
        />
        <button type="submit">Submit</button>
      </form>

      <p>Score: {score}</p>
      <p>{feedback}</p>
    </div>
  );
}

export default MathGame;