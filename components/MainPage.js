"use client";
import "../styles/mainPage.css";

import { useState } from "react";
import Lottery645 from "./Lottery645";
import Lottery720 from "./Lottery720";

export default function MainPage() {
  let [selected, setSelected] = useState("lottery645");

  return (
    <>
      <div className="container">
        <div className="select-box">
          <button
            className={`${selected == "lottery645" ? "isSelected" : ""}`}
            onClick={() => {
              setSelected("lottery645");
            }}
          >
            로또 6/45
          </button>
          <button
            className={`${selected == "lottery720" ? "isSelected" : ""}`}
            onClick={() => {
              setSelected("lottery720");
            }}
          >
            로또 720+
          </button>
        </div>

        <div>
          {selected == "lottery645" ? (
            <Lottery645></Lottery645>
          ) : (
            <Lottery720></Lottery720>
          )}
        </div>
      </div>
    </>
  );
}
