import React, { useEffect, useState } from "react";
import drone from "../../scaleDrone/scaledroneClient";
import "./styles/rank.css"

function Rank() {
  const [rankings, setRankings] = useState([]);

    // Scaledrone 방 구독
    const room = drone.subscribe("rankings", {
        historyCount: 10
    });
    room.on("history_message", (message) => {
        const { name, time } = message.data;

      // 새로운 데이터를 추가하고 정렬
        setRankings((prev) => {
            const updatedRankings = [...prev, { name, time }];
            const arr = updatedRankings.sort((a, b) => a.time - b.time);
            const uniqueArray = arr.reduce((unique, item) => 
                unique.includes(item) ? unique : [...unique, item], 
            []);
            return uniqueArray; // 시간 기준 오름차순
        });
    });

  return (
    <>
    <h2 className="title">Rankings</h2>
    <div className="rank-page">
      <ol>
        {rankings.map((rank, index) => (
          <li key={index}>
            {rank.name}: {rank.time}s
          </li>
        ))}
      </ol>
    </div>
    </>
  );
}

export default Rank;
