import { useNavigate } from "react-router-dom";
import styles from "./MenuCard.module.css";

export default function MenuCard({cardData}) {
    const navigate = useNavigate();

    return (
        <div className={styles.card}>
            <div className={styles.card__info}>
                <img className={styles.card__image} src={cardData.image} alt={cardData.title} />
                <div className={styles.card__mainInfo}>
                    <p>Menu {cardData.type}</p>
                    <h1>{cardData.title}</h1>
                </div>
            </div>
            <ul className={styles.card__ingredients}>
                {cardData.ingredients.map((ingredient, idx) => <li key={idx}>{ingredient}</li>)}
            </ul>
            <button className={styles.card__editButton} onClick={()=>navigate('/admin/cardapio/editar', { state: cardData })}>Editar cardápio</button>
        </div>
    );
}
