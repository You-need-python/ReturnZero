import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 단계별 글자 데이터
const LEVELS = [
  { target: "카", options: "까" },
  { target: "탏", options: "탉" },
  { target: "쑜", options: "쏬" }
];

function DifferentLetterGame( { stopTimer, elapsedTime } ) {
  const [currentLevel, setCurrentLevel] = useState(1); // 현재 단계
  const gridSize = currentLevel + 3;
  const [grid, setGrid] = useState([]); // 현재 단계의 글자 배열
  const [targetIndex, setTargetIndex] = useState(null); // 다른 글자의 위치
  const [end, setEnd] = useState(false);
  const navigate = useNavigate();

  // 새 레벨의 그리드 생성
  const generateGrid = () => {
    console.log(currentLevel);
    const { target, options } = LEVELS[currentLevel-1];
    const totalCards = gridSize * gridSize;
    const targetIdx = Math.floor(Math.random() * totalCards); // 다른 글자의 위치
    const newGrid = Array.from({ length: totalCards }, (_, i) =>
      i === targetIdx ? target : options
    );

    setGrid(newGrid);
    setTargetIndex(targetIdx);
  };

  // 게임 초기화 및 다음 단계로 진행
  const startNextLevel = () => {
    if (currentLevel < LEVELS.length) {
      
      setCurrentLevel((prev) => prev + 1);
    } else { // currentLevel이 최대이면 result라우터로 이동
      setEnd(true);
      setTimeout(() => {
        stopTimer();
        navigate("/result", { state: { time: elapsedTime } });
      }, 1000);
    }
  };

  // currentLevel이 변경될 때 실행되는 코드 generateGrid()
  useEffect(() => {
    if (currentLevel <= LEVELS.length) {
      generateGrid();
    }
  }, [currentLevel]);

  // 카드 클릭 핸들러
  const handleCardClick = (index) => {
    if (index === targetIndex) {
      startNextLevel(); // 다음 레벨로 이동
    } else {
    }
  };

  return (
    <div className={`column-align fadein ${end ? "fadeout" : ""}`}>
      <h2 className="game-title">다른 글자 찾기 게임</h2>
      <p className="game-desc">다음 단계로 넘어가려면 다른 글자를 클릭하세요! ({currentLevel}/{LEVELS.length})</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: "10px",
          width: "350px",
          height: "350px",
          maxWidth: "400px",
          margin: "20px auto"
        }}
      >
        {grid.map((char, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            style={{
              fontSize: "20px",
              padding: "10px",
              backgroundColor: "#9eebcb",
              border: "none",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Noto Sans KR",
              fontWeight: "500",
              color: "#161616"
            }}
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DifferentLetterGame;
