import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

function NumberGame() {
  const [numbers, setNumbers] = useState(generateNumbers());
  const [nextNumber, setNextNumber] = useState(1);
  const [end, setEnd] = useState(false);
  const navigate = useNavigate();

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
    console.log('d');
    if (number === nextNumber) {
      setNextNumber(nextNumber + 1);
      if (number === 25) {
        setEnd(true);
        setTimeout(() => {
          navigate('/color-word-game');
        }, 1000);
      }
    } else {
      setNextNumber(1);
      setNumbers(generateNumbers());
    }
  };

  return (
    <div className={`column-align fadein ${end ? "fadeout" : ""}`}>
      <h2 className="game-title">Number Game</h2>
      <p className="game-desc">1부터 25까지 순서대로 클릭하세요!</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "10px",
          maxWidth: "300px",
          margin: "0 auto"
        }}
      >
        {numbers.map((number) => (
          <button
            onClick={() => handleNumberClick(number)}
            number={number}
            nextNumber={nextNumber}
            style={{
              background: nextNumber <= number ? "#9eebcb" : "#161616",
              border: "none",
              outline: "none",
              color: nextNumber <= number ? "#161616" : "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "30px",
              fontWeight: "bold",
              cursor: "pointer",
              width: "50px",
              height: "50px"
            }}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NumberGame;
