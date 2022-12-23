import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./Modal.module.css";
import { getAvaliacoes } from "../../util/getAvaliacao";
import api from "../../services/api";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function ModalComponent({ show, setShow, refeicao }) {
  const handleShow = () => setShow(true);
  const [stars, setStars] = useState(refeicao.avaliacaoQuant || 0);
  const [avaliacaoComentario, setAvaliacaoComentario] = useState("");

  useEffect(() => {
    setAvaliacaoComentario(refeicao.avaliacaoComentario);
  }, [refeicao.avaliacaoComentario]);

  const handleChange = (event) => {
    setAvaliacaoComentario(event.target.value);
  };

  const handleClose = () => {
    const putRefeicao = async () => {
      try {
        const response = await api().put(`/refeicao/${refeicao.refeicaoID}`, {
            avaliacaoQuantitativa: stars || 1,
            avaliacaoComentario: avaliacaoComentario,
        });
        alert('Avaliação feita!');
        window.location.reload();
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
        onBackdropClick={()=>setShow(false)}
        onHide={()=>setShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="borderRadious 20px"
        className={styles.modalStyle}
      >
        <div className={styles.modalStyle}>
          <Modal.Header closeButton className={styles.headerStyle}>
            <Modal.Title className={styles.title}>Avaliação</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.bodyStyle}>
            <p className={styles.stars}>
              {Array.from(Array(stars)).map((_, i) => <AiFillStar onClick={()=>setStars(i+1)} />)}
              {Array.from(Array(5-stars)).map((_, i) => <AiOutlineStar onClick={()=>setStars(stars + i+1)} />)}
            </p>
            <h2>Comentário</h2>
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
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default ModalComponent;
