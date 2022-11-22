import { useNavigate } from "react-router-dom";
import {useCallback} from 'react';
import {useUser} from "../../contexts/userContext";
import styles from "./MenuCard.module.css";

export default function MenuCard({ cardData, type }) {
  const navigate = useNavigate();

  const menuInteraction = useCallback(()=>{
    if(type === 'edit') navigate("/admin/cardapio/editar", { state: cardData });
    // TODO: rota não implementada ainda
    else navigate('/checkout');
  }, [cardData, navigate, type]);

  return (
    <div className={styles.card}>
      <div className={styles.card__info}>
        <img
          className={styles.card__image}
          src={cardData.image}
          alt={cardData.title}
        />
        <div className={styles.card__mainInfo}>
          <p>Menu {cardData.type}</p>
          <h1>{cardData.title}</h1>
        </div>
      </div>
      <h1 className={styles.card__ingredients__title}>Ingredientes</h1>
      <ul className={styles.card__ingredients}>
        {cardData.ingredients.map((ingredient, idx) => (
          <li key={idx}>{ingredient}</li>
        ))}
      </ul>
      <button
        className={styles.card__editButton}
        onClick={menuInteraction}
      >
        {type === 'edit' ? "Editar Cardápio" : "Efetuar Reserva"}
      </button>
    </div>
  );
}
