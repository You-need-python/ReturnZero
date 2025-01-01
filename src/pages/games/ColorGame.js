import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function ColorGame() {
  const [cards, setCards] = useState(generateCards());
  const [score, setScore] = useState(0);
  const [end, setEnd] = useState(false);
  const navigate = useNavigate();

  // 색상 생성 함수
  function generateColor(baseColor, offset = 10) {
    const adjustColor = (value) => Math.max(0, Math.min(255, value + offset));
    return `rgb(${adjustColor(baseColor[0])}, ${adjustColor(baseColor[1])}, ${adjustColor(baseColor[2])})`;
  }

  // 카드 데이터 생성
  function generateCards() {
    const baseColor = [
      Math.floor(Math.random() * 256), // R
      Math.floor(Math.random() * 256), // G
      Math.floor(Math.random() * 256), // B
    ];

    const differentColor = generateColor(baseColor, 40); // 다른 카드의 색상

    const cardsArray = Array(25).fill(`rgb(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]})`);
    const differentCardIndex = Math.floor(Math.random() * 25);

    cardsArray[differentCardIndex] = differentColor;

    return cardsArray.map((color, index) => ({
      id: index,
      color,
      isDifferent: index === differentCardIndex,
    }));
  }

  // 카드 클릭 핸들러
  const handleCardClick = (isDifferent) => {
    if (isDifferent) {
      setScore(score + 1);
      if (score === 4) {
        setEnd(true);
        const timer = setTimeout(() => {
          navigate('/number-game'); // 페이지 이동
        }, 1000);
        return () => clearTimeout(timer); // 타이머 클린업
      } else {
        setCards(generateCards()); // 새 게임 시작
      }
    } else {
      //다를 때 로직
    }
  };

  return (
    <div className={`column-align fadein ${end ? 'fadeout' : ''}`}>
      <h2 className="game-title">Color Game</h2>
      <h3 className="game-desc">다른 색깔의 사각형을 찾으세요! ({score+1 > 5 ? 5 : score+1}/5)</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '10px',
          maxWidth: '300px',
          margin: '0 auto',
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.isDifferent)}
            style={{
              backgroundColor: card.color,
              width: '50px',
              height: '50px',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorGame;