import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Meal from '../../assets/food.png';
import format from "date-fns/format";
import {useUser} from "../../contexts/userContext";

import { Header } from "../../components";

import styles from "./Checkout.module.css";

export default function Checkout() {
  const { state: menuData } = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useUser();

  const handleConfirm = useCallback(() => {
    alert("Confirmando");
    // TODO: BACK
    navigate(-1);
  }, [navigate]);

  return (
    <div className={styles.checkout}>
      <Header />
      <main>
        <h1>Confirmar Reserva</h1>
        <div className={styles.checkout__available}>
          <h2>Saldo disponível</h2>
          <span>
            R$ <span id={styles.checkout__value}>{currentUser.credito || '0,00'}</span>
          </span>
        </div>
        <div className={styles.checkout__chosenMenu}>
          <img
            className={styles.checkout__menuImage}
            src={Meal}
            alt={menuData.nome}
          />
          <div className={styles.checkout__menuInfo}>
            <span>Menu {menuData.tipo.toLowerCase()}</span>
            <span>{menuData.nome}</span>
            <div id={styles.checkout__ingredients}>
              <span>Ingredientes</span>
              <ul>
                {menuData.itens?.split(',').map((ingredient, index) => {
                  return <li key={index}>{ingredient}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
        <h1 className={styles.checkout__value}>Taxa: <span>R$ 18,50</span></h1>
        <div className={styles.checkout__actionArea}>
          <button onClick={handleConfirm}>Confirmar Reserva</button>
          <button onClick={() => navigate(-1)}>Alterar Refeição</button>
        </div>
      </main>
    </div>
  );
}
