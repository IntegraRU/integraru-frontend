import React from "react";
import styles from "./History.module.css";
import { Header, HistoryCard } from "../../components";
import Meal from "../../assets/food.png";
import Calendar from "../../assets/schedule-icon.png";
import button1 from "../../assets/button1.png";
import button2 from "../../assets/button2.png";

// TODO: REMOVE AFTER BACKEND
const mockMeals = [
  {
    title: "Ensopado",
    image: Meal,
    rate: 1,
    date: "20/01/2022",
  },
  {
    title: "Sopinha de legumes",
    image: Meal,
    rate: 1,
    date: "20/01/2022",
  },
  {
    title: "Cuscuz recheado",
    image: Meal,
    rate: 1,
    date: "20/01/2022",
  },
  {
    title: "Cuscuz recheado",
    image: Meal,
    rate: 1,
    date: "20/01/2022",
  },
];

function History() {
  return (
    <div className={styles.menu}>
      <Header />
      <div className={styles.menu__title_area}>
        <h1 className={styles.menu__title}>
          Histórico de Refeições
          <img src={Calendar} />
        </h1>
      </div>
      <div className={styles.menu__menus}>
        {mockMeals.map((menu) => (
          <HistoryCard cardData={menu} />
        ))}
      </div>
      <div className={styles.buttons_container}>
        <button className={styles.button}>
          <img src={button1} />
        </button>
        <button className={styles.last_button}>
          <img src={button2} />
        </button>
      </div>
    </div>
  );
}

export default History;
