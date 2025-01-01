import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 원 개수와 화면 크기 설정
const NUM_CIRCLES = 6;
const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 300;
const CIRCLE_WIDTH = 20;

function AimingGame() {
  const [circles, setCircles] = useState(generateCircles());
  const [end, setEnd] = useState(false);
  const navigate = useNavigate();


  // 원의 초기 위치 생성
  function generateCircles() {
    const newCircles = [];
    for (let i = 0; i < NUM_CIRCLES; i++) {
      newCircles.push({
        id: i,
        x: Math.random() * (SCREEN_WIDTH - 50), // 화면 크기 내 랜덤 x좌표
        y: Math.random() * (SCREEN_HEIGHT - 50) // 화면 크기 내 랜덤 y좌표
      });
    }
    return newCircles;
  }

  useEffect(() => {
    if (circles.length === 0) {
      setEnd(true);
      setTimeout(() => {
        navigate('/different-letter-game');
      }, 1000);
    }
  },[circles, navigate])

  // 원 클릭 핸들러
  const handleCircleClick = (id) => {
    setCircles((prevCircles) =>
      prevCircles.filter((circle) => circle.id !== id)
    );
  };

  return (
    <div className={`column-align fadein ${end ? 'fadeout' : ''}`}>
      <h2 className="game-title">Aiming Game</h2>
      <p className="game-desc">
        최대한 빠르게 모든 원을 클릭하세요! 다른 곳을 클릭하면 초기화됩니다!
      </p>
      <div
        onClick={() => setCircles(generateCircles())}
        style={{
          position: "relative",
          width: `${SCREEN_WIDTH}px`,
          height: `${SCREEN_HEIGHT}px`,
          margin: "0 auto",
          background: "#9431E2",
          borderRadius: "30px"
        }}
      >
        {circles.map((circle) => (
          <div
            key={circle.id}
            onClick={(e) => {
              e.stopPropagation(); // 이벤트 전파 방지
              handleCircleClick(circle.id);
            }}
            style={{
              position: "absolute",
              top: `${circle.y}px`,
              left: `${circle.x}px`,
              width: `${CIRCLE_WIDTH}px`,
              height: `${CIRCLE_WIDTH}px`,
              backgroundColor: "#f0323c",
              borderRadius: "50%",
              cursor: "pointer"
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default AimingGame;
