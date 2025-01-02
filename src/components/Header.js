import React from "react";
import {Link} from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <a href="/ReturnZero" className="homelink">
        <h1>Return 0</h1>
      </a>
      <Link to="/ReturnZero/rank">랭킹</Link>
      <Link to="/ReturnZero/different-letter-game">ㅇㅇ</Link>
    </div>
  );
}

export default Header;