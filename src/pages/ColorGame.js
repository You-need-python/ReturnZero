import React, { useState } from 'react';

function ColorGame() {
  const [cards, setCards] = useState(generateCards());
  const [message, setMessage] = useState('');

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
      setMessage('Correct! 🎉');
      setCards(generateCards()); // 새 게임 시작
    } else {
      setMessage('Try Again! 😢');
    }
  };

  return (
    <div>
      <h2>Color Game</h2>
      <p>Find the card with a different color!</p>
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
      <p>{message}</p>
    </div>
  );
}

export default ColorGame;