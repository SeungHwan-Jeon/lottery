"use client";

import "../styles/lottery645.css";
import React from "react";
import { useEffect, useState } from "react";
import RandomPick from "./Lottery645/RandomPick";
import ProbabilityPick from "./Lottery645/FavoritePick";
import UnderdogPick from "./Lottery645/UnderdogPick";
import { randomPickFunction } from "@/lib/pickFunctions";

export default function Lottery645() {
  let [currentRound, setCurrentRound] = useState(null);
  let [isLoading, setIsLoading] = useState(true);

  const [selectedButton, setSelectedButton] = useState("random");
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [numArrayList, setNumArrayList] = useState([]);

  function handleButtonClick(buttonType) {
    setSelectedButton(buttonType);
  }

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/test")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setCurrentRound(data.round);
        setIsLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error("Fetch error: ", error);
        setIsLoading(false);
      });
  }, []);

  function getBallClass(number) {
    if (number <= 9) return "ball0";
    if (number <= 19) return "ball1";
    if (number <= 29) return "ball2";
    if (number <= 39) return "ball3";
    return "ball4";
  }

  return (
    <>
      <div>
        <div>
          <h1>
            현재 로또 회차:
            {isLoading
              ? "로딩 중..."
              : currentRound
              ? currentRound
              : "데이터를 가져올 수 없습니다"}
          </h1>
        </div>

        <div className="button-container">
          <button
            className={`pick-button ${
              selectedButton === "random" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("random")}
          >
            랜덤 픽
          </button>
          <button
            className={`pick-button ${
              selectedButton === "probability" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("probability")}
          >
            확률 픽
          </button>
          <button
            className={`pick-button ${
              selectedButton === "underdog" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("underdog")}
          >
            언더독 픽
          </button>
        </div>

        {selectedButton === "random" && (
          <RandomPick
            setSelectedNumbers={setSelectedNumbers}
            numArrayList={numArrayList}
            setNumArrayList={setNumArrayList}
          />
        )}
        {selectedButton === "probability" && <ProbabilityPick />}
        {selectedButton === "underdog" && <UnderdogPick />}

        <div className="nums">
          <p>
            {numArrayList.map((item, index) => {
              return (
                <>
                  <div key={index}>
                    {item.map((number, index) => (
                      <>
                        <span
                          key={index}
                          className={`ball_645 ${getBallClass(number)}`}
                        >
                          {number}
                        </span>
                      </>
                    ))}
                    <button
                      onClick={() => {
                        setNumArrayList(
                          numArrayList.filter((_, i) => i !== index)
                        );
                      }}
                      className="action-button delete-button"
                    >
                      삭제
                    </button>
                    <button className="action-button save-button">저장</button>
                  </div>
                </>
              );
            })}
          </p>
        </div>
      </div>
    </>
  );
}
