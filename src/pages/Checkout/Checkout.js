import { Header } from "../../components";
import Meal from "../../assets/food.png";
import styles from "./Checkout.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const defaultFilters = {
  date: new Date(),
  meal: "Almoço",
};

export default function Checkout() {
  const { state: menuData } = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(menuData);
  // }, []);

  return (
    <div className={styles.checkout}>
      <Header />
      <main>
        <h1>Confirmar Reserva</h1>
        <div className={styles.checkout__available}>
          <h2>Saldo disponível</h2>
          <span>
            R$ <span id={styles.checkout__value}>30.00</span>
          </span>
        </div>
        <div className={styles.checkout__filters}>
          <span id={styles.checkout__date}>
            {defaultFilters.date.toDateString()}
          </span>
          <span id={styles.checkout__meal}>{defaultFilters.meal}</span>
        </div>
        <div className={styles.checkout__chosenMenu}>
          <img
            className={styles.checkout__menuImage}
            src={menuData.image}
            alt={menuData.title}
          />
          <div className={styles.checkout__menuInfo}>
            <span>Menu {menuData.type}</span>
            <span>{menuData.title}</span>
            <div id={styles.checkout__ingredients}>
              <span id={styles.checkout__}>Ingredientes</span>
              <ul>
                {menuData.ingredients.map((ingredient, index) => {
                  return <li key={index}>{ingredient}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.checkout__actionArea}>
          <button>Confirmar Reserva</button>
          <button onClick={() => navigate(-1)}>Alterar Refeição</button>
        </div>
      </main>
    </div>
  );
}
