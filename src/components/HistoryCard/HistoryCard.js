import styles from "./HistoryCard.module.css";
import fullStar from "../../assets/fullStar_.png";
import Meal from "../../assets/food.png";


export default function HistoryCard({ cardData }) {
  const getAvaliacoes = (avaliacao) => {
    if (!avaliacao) {
      return <p className={styles.card__paragraph}>Não avaliado</p>;
    }
    return [...Array(avaliacao).keys()].map(() => <img src={fullStar} />);
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__info}>
        <img className={styles.card__image} src={Meal} alt={cardData.title} />
        <div className={styles.card__cardInfo}>
          <h1>{cardData.modalidade}</h1>
          <h4>{cardData.data}</h4>
          <h3>{getAvaliacoes(cardData.avaliacaoQuant)}</h3>
          <button className={styles.card__editButton}>
            {!cardData.avaliacaoQuant ? "Avaliar" : "Alterar Avaliação"}
          </button>
        </div>
      </div>
    </div>
  );
}
