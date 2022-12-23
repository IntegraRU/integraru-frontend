import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./Modal.module.css";
import { getAvaliacoes } from "../../util/getAvaliacao";
import api from "../../services/api";

function ModalComponent({ show, setShow, refeicao }) {
  console.log(refeicao);
  const handleShow = () => setShow(true);
  const [avaliacaoComentario, setAvaliacaoComentario] = useState("");

  useEffect(() => {
    setAvaliacaoComentario(refeicao.avaliacaoComentario);
  }, []);

  const handleChange = (event) => {
    setAvaliacaoComentario(event.target.value);
  };

  const handleClose = () => {
    const putRefeicao = async () => {
      try {
        const response = await api().get(`/refeicao/${refeicao.refeicaoID}`, {
          method: "put",
          data: {
            avaliacaoQuantitativa: refeicao.avaliacaoQuant,
            avaliacaoComentario: avaliacaoComentario,
          },
        });
      } catch (e) {
        alert(e);
      }
    };
    putRefeicao();
    setShow(false);
  };

  return (
    <>
      <button onClick={handleShow}>Launch demo modal</button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="borderRadious 20px"
        className={styles.modalStyle}
      >
        <div className={styles.modalStyle}>
          <Modal.Header closeButton>
            <Modal.Title className={styles.title}>Avaliação</Modal.Title>
          </Modal.Header>
          <div className={styles.bodyStyle}>
            <p>
              {getAvaliacoes(refeicao.dataCheckout, refeicao.avaliacaoQuant)}
            </p>
            <textarea
              className={styles.textarea}
              value={avaliacaoComentario}
              onChange={handleChange}
            ></textarea>
            <button
              variant="secondary"
              onClick={handleClose}
              className={styles.editButton}
            >
              Salvar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalComponent;
