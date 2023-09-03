import React, { useEffect, useState } from "react";
import water from "../assets/glass-water.svg";
import arrow from "../assets/arrow.svg";
import colons from "../assets/colons.svg";
import "./style.sass.scss";

export default function Home() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isCounting, setIsCounting] = useState(false); // indica se contagem que está em andamento
  const [totalSeconds, setTotalSeconds] = useState(0); // tempo total em segundos

  const [dailyGoal, setDailyGoal] = useState(3000); // Meta diária em ml
  const [mlPerTime, setMlPerTime] = useState(300); // Quantidade por timer em ml
  const [consumedWater, setConsumedWater] = useState(0);
  const [percentage, setPercentage] = useState(0); // Porcentagem de água consumida


  useEffect(() => {
    let intervalId;

    if (isCounting) {
      intervalId = setInterval(() => {
        if (totalSeconds <= 0) {
          clearInterval(intervalId);
          setIsCounting(false);
        } else {
          setTotalSeconds(totalSeconds - 1);
          const newHours = Math.floor(totalSeconds / 3600);
          const newMinutes = Math.floor((totalSeconds % 3600) / 60);
          const newSeconds = totalSeconds % 60;
          setHours(newHours);
          setMinutes(newMinutes);
          setSeconds(newSeconds);
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isCounting, totalSeconds]);

  const startCountdown = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTotalSeconds(totalSeconds);
    setIsCounting(true);
    updateConsumedWater();
  };

  const updateConsumedWater = () => {
    setConsumedWater(consumedWater + mlPerTime);
  };

  const handleDailyGoalChange = (e) => {
    setDailyGoal(Number(e.target.value));
   
  };

  const handleMlPerTime = (e) => {
    setMlPerTime(Number(e.target.value))
  }

  useEffect(() => {
    // Calcula a porcentagem de água consumida sempre que consumedWater ou dailyGoal mudar
    const newPercentage = (consumedWater / dailyGoal) * 100;
    setPercentage(newPercentage);

    // Verifica se o tempo acabou e o percentual é menor que 100%
    if (totalSeconds === 0 && newPercentage < 100) {
      setIsCounting(false);
      // exibir a modal ou fazer outras ações quando o tempo acaba
      // alert("Lembre-se de beber água!");
    }
  }, [consumedWater, dailyGoal, totalSeconds]);
  return (
    <div className="wrapper">
      <div className="left-container">
        <span className="percent">{percentage.toFixed(0)}%</span>
        <img className="water-icon" src={water} />
        <h3>Beber água</h3>
        <span className="goal">Meta: {dailyGoal}ml</span>
        <spa>Quant: {mlPerTime} ml</spa>
      </div>

      <div className="right-container">
        <div className="daily-goal">
          <div className="title-daily-goal">
            <span className="range-title">Meta diária</span>{" "}
            <span className="quantity">3000ml</span>
          </div>
          <input
            type="range"
            className="custom-range campo"
            min={0}
            max={3000}
            value={dailyGoal}
            onChange={handleDailyGoalChange}
            step={50}
          />
        </div>

        <div className="amount-per-time">
          <div className="title-amount-per-time">
            <span className="range-title">Quantidade por timer</span>
            <span className="quantity">300ml</span>
          </div>
          <input
            type="range"
            className="custom-range campo"
            min={0}
            max={3000}
            step={50}
            value={mlPerTime}
            onChange={handleMlPerTime}
         />
        </div>

        <div className="timer-container">
          <input
            className="time"
            type="number"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />
          <span className="hours-style">h</span>
          <img src={colons} className="colons-icons" />
          <input
            type="number"
            className="time"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
          />
          <span className="hours-style">m</span>
          <input
            type="number"
            className="time"
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
          />
          <span className="hours-style">s</span>
        </div>

      <div style={{color: 'white', textAlign:'center'}}>
        {isCounting ? (
          <p>
            Tempo restante: {hours}h {minutes}m {seconds}s
          </p>
        ) : (
          <p>Aguardando para começar a contagem</p>
        )}
      </div>
        <button onClick={startCountdown} className="start-button">
          Começar <img className="arrow-icon" src={arrow} />
        </button>
      </div>
    </div>
  );
}
