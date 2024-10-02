"use client";

import { randomPickFunction } from "@/lib/pickFunctions";
import styles from "../../styles/RandomPick.module.css";

export default function RandomPick({
  setSelectedNumbers,
  setNumArrayList,
  numArrayList,
}) {
  return (
    <>
      <div className={styles.randomPickContainer}>
        <button
          className={styles.randomPickButton}
          onClick={() => {
            if (numArrayList.length == 5) {
              console.log("5개 초과");
            } else {
              let numbers = randomPickFunction();
              setSelectedNumbers(numbers);
              setNumArrayList([...numArrayList, numbers]);
            }
          }}
        >
          뽑기
        </button>
      </div>
    </>
  );
}
