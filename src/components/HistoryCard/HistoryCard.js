import styles from "./HistoryCard.module.css";
import fullStar from "../../assets/fullStar_.png";
import halfEmptyStar from "../../assets/halfEmptyStar.png";

export default function HistoryCard({ cardData }) {
  return (
    <div className={styles.card}>
      <div className={styles.card__info}>
        <img
          className={styles.card__image}
          src={cardData.image}
          alt={cardData.title}
        />
        <div className={styles.card__cardInfo}>
          <h1>{cardData.title}</h1>
          <h4>{cardData.date}</h4>
          <h3>
            <img src={fullStar} />
            <img src={fullStar} />

            <img src={fullStar} />
            <img src={halfEmptyStar} />
          </h3>
          <button className={styles.card__editButton}>Avaliar</button>
        </div>
      </div>
    </div>
  );
}
