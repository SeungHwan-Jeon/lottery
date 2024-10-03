"use client";

import { probabilityPickFunction } from "@/lib/pickFunctions";
import styles from "../../styles/RandomPick.module.css";
import { useEffect, useState } from "react";

export default function ProbabilityPick({ setNumArrayList, numArrayList }) {
  let [probabilityData, setProbabilityData] = useState();

  useEffect(() => {
    fetch("/api/probabilityData")
      .then((res) => res.json())
      .then((data) => {
        let tempArray = [];
        for (let i = 1; i <= 45; i++) {
          tempArray.push(data[0]["num" + i]);
        }
        setProbabilityData(tempArray); // 상태로 배열 설정
      });
  }, []);

  console.log(probabilityData);

  return (
    <>
      <div className={styles.randomPickContainer}>
        <button
          className={styles.randomPickButton}
          onClick={() => {
            if (numArrayList.length == 5) {
              console.log("5개 초과");
            } else {
              probabilityPickFunction(probabilityData);
            }
          }}
        >
          뽑기
        </button>
      </div>
    </>
  );
}
