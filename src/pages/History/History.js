import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./History.module.css";
import { Header, HistoryCard } from "../../components";
import Calendar from "../../assets/schedule-icon.png";
import button1 from "../../assets/button1.png";
import button2 from "../../assets/button2.png";
import api from "../../services/api";
import { useUser } from '../../contexts/userContext';


function History() {
  const [refeicoes, setRefeicoes] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useUser();

  useEffect(() => {
    const fetchRefeicoes = async () => {
      try {
        const response = await api().get("/refeicao");
        setRefeicoes(response.data);
      } catch (e) {
        alert(e);
      }
    };
    fetchRefeicoes();
  }, []);

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
        {refeicoes.map((menu) => (
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
