import React from "react";
import water from "../assets/glass-water.svg";
import arrow from "../assets/arrow.svg";
import colons from "../assets/colons.svg";
import "./style.sass.scss";

export default function Home() {
  return (
    <div className="wrapper">
      <div className="left-container">
        <span className="percent">80%</span>
        <img className="water-icon" src={water} />
        <h3>Beber água</h3>
        <span className="goal">Meta: 3L</span>
      </div>
      <div className="right-container">
        <div className="daily-goal">
          <div className="title-daily-goal">
            <span className="range-title">Meta diária</span>{" "}
            <span className="quantity">3000ml</span>
          </div>
          <input type="range" className="custom-range campo"  min={0} max={3000} />
        </div>
        <div className="amount-per-time">
          <div className="title-amount-per-time">
            <span className="range-title">Quantidade por timer</span>
            <span className="quantity">300ml</span>
          </div>
          <input type="range" className="custom-range campo"  min={0} max={3000}/>
        </div>
        <div className="timer-container">
          <button className="time">00</button>{" "}
          <span className="hours-style">h</span>
          <img src={colons} className="colons-icons" />
          <button className="time">01</button>
          <span className="hours-style">m</span>
        </div>
        <button className="start-button">
          Começar <img className="arrow-icon" src={arrow} />{" "}
        </button>
      </div>
    </div>
  );
}
