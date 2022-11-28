import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import format from "date-fns/format";

import { Header } from "../../components";

import styles from "./Checkout.module.css";

export default function Checkout() {
  const { state: menuData } = useLocation();
  const navigate = useNavigate();

  const handleConfirm = useCallback(() => {
    alert("Confirmando");
    // TODO: BACK
    navigate(-1);
  }, []);

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
          <span id={styles.checkout__date}>{format(menuData.date, "dd/MM/yyyy")}</span>
          <span id={styles.checkout__meal}>{menuData.meal}</span>
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
          <button onClick={handleConfirm}>Confirmar Reserva</button>
          <button onClick={() => navigate(-1)}>Alterar Refeição</button>
        </div>
      </main>
    </div>
  );
}
