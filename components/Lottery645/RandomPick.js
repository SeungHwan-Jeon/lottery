"use client";

import { randomPickFunction } from "@/lib/pickFunctions";

export default function RandomPick({ setSelectedNumbers }) {
  return (
    <>
      <div>
        <button
          onClick={() => {
            let numbers = randomPickFunction();
            setSelectedNumbers(numbers);
          }}
        >
          뽑기
        </button>
        <button>저장</button>
      </div>
    </>
  );
}
