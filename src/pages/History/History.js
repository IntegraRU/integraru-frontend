import React, { useEffect, useState, useReducer } from "react";
import styles from "./History.module.css";
import { Header, HistoryCard } from "../../components";
import api from "../../services/api";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const defaultFilters = {
  page: 1
}

const filterReducer = (state = defaultFilters, action) => {
  switch (action.type) {
      case "INCREASE_PAGE":
          return { ...state, page: (state.page + 1) };
      case "DECREASE_PAGE":
          return { ...state, page: (state.page - 1) };
      default:
          return state;
  }
};

function History() {
  const [refeicoes, setRefeicoes] = useState([]);
  const [currentFilters, dispatch] = useReducer(filterReducer, defaultFilters);

  useEffect(() => {
    const fetchRefeicoes = async () => {
      try {
        const response = await api().get('/refeicoes');
        setRefeicoes(response.data)
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
        </h1>
      </div>
      <div className={styles.menu__menus}>
        {refeicoes.map((menu) => (
          <HistoryCard cardData={menu} />
        ))}
      </div>
      <div className={styles.buttons_container}>
        <button
          className={styles.leftButton}
          onClick={() => dispatch({type: 'DECREASE_PAGE'})}
          disabled={currentFilters.page === 1}
        >
          <AiOutlineLeft />
        </button>
        <button
          className={styles.rightButton}
          onClick={() => dispatch({type: 'INCREASE_PAGE'})}
          disabled={!refeicoes.length || currentFilters.page === Math.ceil(refeicoes.length / 3)}
        >
          <AiOutlineRight />
        </button>
      </div>
    </div>
  );
}

export default History;
