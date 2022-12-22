import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./History.module.css";
import { Header, HistoryCard } from "../../components";
import Calendar from "../../assets/schedule-icon.png";
import button1 from "../../assets/button1.png";
import button2 from "../../assets/button2.png";
import api from "../../services/api";
import { useUser } from "../../contexts/userContext";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function History() {
  const [refeicoes, setRefeicoes] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useUser();
  // const [currentFilters, dispatch] = useReducer(filterReducer, defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [mealsPerPage, setMealsPerPage] = useState(5);

  const idexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = idexOfLastMeal - mealsPerPage;
  const currentMeals = refeicoes.slice(indexOfFirstMeal, idexOfLastMeal);

  const increasePage = () => setCurrentPage(currentPage + 1);
  const decreasePage = () => setCurrentPage(currentPage - 1);

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
        {currentMeals.map((menu) => (
          <HistoryCard cardData={menu} />
        ))}
      </div>
      <div className={styles.buttons_container}>
        <button
          className={styles.leftButton}
          onClick={() => decreasePage()}
          disabled={currentPage === 1}
        >
          <AiOutlineLeft />
        </button>
        <button
          className={styles.rightButton}
          onClick={() => increasePage()}
          disabled={currentPage === Math.ceil(refeicoes.length / mealsPerPage)}
        >
          <AiOutlineRight />
        </button>
      </div>
    </div>
  );
}

export default History;
