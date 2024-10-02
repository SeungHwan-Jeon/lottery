"use client";

import { randomPickFunction } from "@/lib/pickFunctions";
import styles from "../../styles/RandomPick.module.css";

export default function RandomPick({ setNumArrayList, numArrayList }) {
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
