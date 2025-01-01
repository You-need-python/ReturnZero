import React, { useState, useEffect } from 'react';

// 단계별 글자 데이터
const LEVELS = [
  { target: '카', options: '까' },
  { target: '탏', options: '탉' },
  { target: '쑜', options: '쏬' },
];

function DifferentLetterGame() {
  const [currentLevel, setCurrentLevel] = useState(1); // 현재 단계
  const gridSize = currentLevel+3;
  const [grid, setGrid] = useState([]); // 현재 단계의 글자 배열
  const [targetIndex, setTargetIndex] = useState(null); // 다른 글자의 위치
  const [message, setMessage] = useState('');

  // 새 레벨의 그리드 생성
  const generateGrid = () => {
    console.log(currentLevel);
    const { target, options } = LEVELS[0];
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
      setMessage('');
    } else {
      setMessage('축하합니다! 모든 단계를 완료했습니다. 🎉');
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
      setMessage('정답입니다! 🎉');
      setTimeout(() => startNextLevel(), 1000); // 1초 후 다음 레벨로 이동
    } else {
      setMessage('다시 시도해보세요! ❌');
    }
  };

  return (
    <div className="column-align">
      <h2 className="game-title">다른 글자 찾기 게임</h2>
      <p>다음 단계로 넘어가려면 다른 글자를 클릭하세요!</p>
      <p>
        단계: {currentLevel}/{LEVELS.length}
      </p>
      {message && <p>{message}</p>}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: '10px',
          maxWidth: '400px',
          margin: '20px auto',
        }}
      >
        {grid.map((char, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            style={{
              fontSize: '24px',
              padding: '10px',
              backgroundColor: '#f0f0f0',
              border: '1px solid #ccc',
              cursor: 'pointer',
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