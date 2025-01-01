import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    background: ${(props) =>
      props.nextNumber - props.number < 1
        ? "linear-gradient(to right bottom, #b7d9e9, #86fcaf)"
        : "#4CAF50"};
    color: white;
    display: flex;
    justifyContent: center;
    alignItems: center;
    fontSize: 20px;
    fontWeight: bold;
    cursor: pointer
    width: 50px;
    height: 50px;
    transition: all 0.5s;
`;

function NumberButton({ children, number, nextNumber }) {
  return (
    <StyledButton number={number} nextNumber={nextNumber}>
      {children}
    </StyledButton>
  );
}

export default NumberButton;
