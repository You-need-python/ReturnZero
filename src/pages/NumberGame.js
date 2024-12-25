import React, { useState } from 'react';

function NumberGame() {
  const [numbers, setNumbers] = useState(generateNumbers());
  const [nextNumber, setNextNumber] = useState(1);
  const [message, setMessage] = useState('');

  // 1부터 25까지의 숫자를 랜덤하게 섞는 함수
  function generateNumbers() {
    const nums = Array.from({ length: 25 }, (_, i) => i + 1); // 1부터 25까지 배열 생성
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // 랜덤 인덱스
      [nums[i], nums[j]] = [nums[j], nums[i]]; // 숫자 섞기
    }
    return nums;
  }

  // 숫자 클릭 핸들러
  const handleNumberClick = (number) => {
    if (number === nextNumber) {
      if (number === 25) {
        setMessage('Congratulations! 🎉 You finished the game!');
        setNumbers(generateNumbers()); // 게임 리셋
        setNextNumber(1); // 다음 숫자 초기화
      } else {
        setNextNumber(nextNumber + 1);
      }
    } else {
      setMessage('Wrong number! 😢 Try again.');
    }
  };

  return (
    <div>
      <h2>Number Game</h2>
      <p>Click the numbers in order from 1 to 25!</p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '10px',
          maxWidth: '300px',
          margin: '0 auto',
        }}
      >
        {numbers.map((number) => (
          <div // 이거 나중에 따로 컴포넌트로 분리해서 styled-components적용 필요한데 지금은 귀찮아서 안함
            key={number}
            onClick={() => handleNumberClick(number)}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '50px',
              height: '50px',
            }}
          >
            {number}
          </div>
        ))}
      </div>
      <p>Next number: {nextNumber}</p>
      <p>{message}</p>
    </div>
  );
}

export default NumberGame;
