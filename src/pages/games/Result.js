import React from 'react';
import { useLocation } from "react-router-dom";
import "./styles/Result.css"

function Result() {
    const location = useLocation();
    const handleSubmit = (e) => {
        e.preventDefault(); // 기본 동작 방지
        
    };
    
    return (
        <div>
            <h1 className="title time-result" style={{textAlign: "center"}}>{(location.state.time/1000 + 1).toFixed(1)}초</h1>
            <h2 className="content">학번과 이름을 입력하시면 순위를 보여드립니다.</h2>
            <form autoComplete="off" className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    autoFocus
                    id="text-input"
                    autoComplete="off"
                    placeholder="10100 홍길동"
                    style={{
                        marginTop: "5vh",
                        width: "70%"
                    }}
                />
                <button
                    className="start-btn"
                    style={{
                        padding: 0,
                        marginTop: "5vh",
                        width: "25%",
                        height: "35px",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems:"center",
                        textAlign:"center",
                        fontSize: "18px",
                        fontFamily: "Noto Sans KR"
                    }}
                    onClick={handleSubmit}
                >제출</button>
            </form>
        </div>
    );
}

export default Result;