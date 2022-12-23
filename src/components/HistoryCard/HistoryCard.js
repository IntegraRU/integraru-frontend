import { useState } from "react";
import styles from "./HistoryCard.module.css";
import Meal from "../../assets/food.png";
import ModalComponent from "../Modal";
import { getAvaliacoes } from "../../util/getAvaliacao";

export default function HistoryCard({ cardData }) {
  const [modalOpen, setModalOpen] = useState(false);

  const avaliarRefeicao = () => {
    //TODO
  };

  return (
    <>
      {modalOpen && (
        <ModalComponent
          setShow={setModalOpen}
          show={modalOpen}
          refeicao={cardData}
        />
      )}
      <div className={styles.card}>
        <div className={styles.card__info}>
          <img className={styles.card__image} src={cardData.prato.urlImagem} alt={cardData.title} />
          <div className={styles.card__cardInfo}>
            <h1>{cardData.prato.nome}</h1>
            <h4>{cardData.prato.data}</h4>
            <h3 className={styles.card__paragraph}>
              {getAvaliacoes(cardData.dataCheckout, cardData.avaliacaoQuant)}
            </h3>
            {cardData.dataCheckout && (
              <button
                className={styles.card__editButton}
                onClick={() => setModalOpen(!modalOpen)}
              >
                {!cardData.avaliacaoQuant ? "Avaliar" : "Alterar Avaliação"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
