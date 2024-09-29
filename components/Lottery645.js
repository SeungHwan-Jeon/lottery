"use client";

import { useEffect, useState } from "react";
import "../styles/lottery645.css";

export default function Lottery645() {
  let [currentRound, setCurrentRound] = useState(null);
  useEffect(() => {
    fetch("/api/currentRound")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setCurrentRound(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Fetch error: ", error);
      });
  }, []);

  return (
    <>
      <div>
        <div className="pick_btn">
          <div>
            <h1>
              현재 로또 회차:
              {currentRound ? currentRound : "데이터를 가져올 수 없습니다"}
            </h1>
          </div>
          <button>랜덤 뽑기</button>
          <button>확률 뽑기</button>
        </div>
        <div className="nums">
          <p>
            <span className="ball_645  ball0">1</span>
            <span className="ball_645  ball1">2</span>
            <span className="ball_645  ball2">3</span>
            <span className="ball_645  ball3">4</span>
            <span className="ball_645  ball4">5</span>
            <span className="ball_645  ball4">6</span>
          </p>
          <button className="save_btn">저장</button>
        </div>
      </div>
    </>
  );
}
