import styles from "./HistoryCard.module.css";
import Meal from "../../assets/food.png";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';


export default function HistoryCard({ cardData }) {
  const getAvaliacoes = () => {
    if(!cardData.dataCheckout) {
      return "Refeição não realizada";
    } else if (!cardData.avaliacaoQuant) {
      return "Não avaliado";
    }
    return Array.from(Array(5)).map((_, i)=>((_, i+1) <= cardData.avaliacaoQuant ? <AiFillStar /> : <AiOutlineStar />));
  };

  const avaliarRefeicao = () => {
    //TODO
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__info}>
        <img className={styles.card__image} src={Meal} alt={cardData.title} />
        <div className={styles.card__cardInfo}>
          <h1>{cardData.prato.nome}</h1>
          <h4>{cardData.prato.data}</h4>
          <h3 className={styles.card__paragraph}>{getAvaliacoes()}</h3>
          {cardData.dataCheckout && 
            <button className={styles.card__editButton} onClick={avaliarRefeicao}>
              {!cardData.avaliacaoQuant ? "Avaliar" : "Alterar Avaliação"}
            </button>
          }
        </div>
      </div>
    </div>
  );
}
