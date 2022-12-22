import { useNavigate } from "react-router-dom";
import {useCallback} from 'react';
import Meal from '../../assets/food.png';
import styles from "./MenuCard.module.css";

export default function MenuCard({ cardData, type }) {
  const navigate = useNavigate();

  const menuInteraction = useCallback(()=>{
    if(type === 'edit') navigate("/admin/cardapio/editar", { state: cardData });
    else navigate('/checkout', { state: cardData });
  }, [cardData, navigate, type]);

  return (
    <div className={styles.card}>
      <div className={styles.card__info}>
        <img
          className={styles.card__image}
          src={Meal}
          alt={cardData.nome}
        />
        <div className={styles.card__mainInfo}>
          <p>Menu {cardData.tipo}</p>
          <h1>{cardData.nome}</h1>
        </div>
      </div>
      <h1 className={styles.card__ingredients__title}>Ingredientes</h1>
      <ul className={styles.card__ingredients}>
        {cardData.itens?.split(',').map((ingredient, idx) => (
          <li key={idx}>{ingredient.trim()}</li>
        ))}
      </ul>
      <button
        className={styles.card__editButton}
        onClick={menuInteraction}
      >
        {type === 'edit' ? "Editar Prato" : "Efetuar Reserva"}
      </button>
    </div>
  );
}
