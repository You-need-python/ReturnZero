import React, { useState, useEffect } from 'react';

// 원 개수와 화면 크기 설정
const NUM_CIRCLES = 6;
const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

function AimingGame() {
  const [circles, setCircles] = useState(generateCircles());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // 원의 초기 위치 생성
  function generateCircles() {
    const newCircles = [];
    for (let i = 0; i < NUM_CIRCLES; i++) {
      newCircles.push({
        id: i,
        x: Math.random() * (SCREEN_WIDTH - 50), // 화면 크기 내 랜덤 x좌표
        y: Math.random() * (SCREEN_HEIGHT - 50), // 화면 크기 내 랜덤 y좌표
      });
    }
    return newCircles;
  }

  // 원 클릭 핸들러
  const handleCircleClick = (id) => {
    setCircles((prevCircles) => prevCircles.filter((circle) => circle.id !== id));
  };

  // 게임 종료 감지
  useEffect(() => {
    if (circles.length === 0 && startTime !== null) {
      setEndTime(Date.now()); // 종료 시간 기록
    }
  }, [circles, startTime]);

  // 게임 시작
  const startGame = () => {
    setCircles(generateCircles()); // 새 원 생성
    setStartTime(Date.now()); // 시작 시간 기록
    setEndTime(null); // 종료 시간 초기화
  };

  // 게임 시간 계산
  const elapsedTime = endTime && startTime ? ((endTime - startTime) / 1000).toFixed(2) : null;

  return (
    <div>
      <h2>Aiming Game</h2>
      <p>Click all the circles as fast as you can!</p>
      <button onClick={startGame} style={{ marginBottom: '20px', padding: '10px 20px' }}>
        Start Game
      </button>
      {elapsedTime && <p>Time: {elapsedTime} seconds</p>}
      <div
        style={{
          position: 'relative',
          width: `${SCREEN_WIDTH}px`,
          height: `${SCREEN_HEIGHT}px`,
          border: '1px solid black',
          margin: '0 auto',
        }}
      >
        {circles.map((circle) => (
          <div
            key={circle.id}
            onClick={() => handleCircleClick(circle.id)}
            style={{
              position: 'absolute',
              top: `${circle.y}px`,
              left: `${circle.x}px`,
              width: '50px',
              height: '50px',
              backgroundColor: 'red',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default AimingGame;