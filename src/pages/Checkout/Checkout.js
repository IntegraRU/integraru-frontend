import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Meal from '../../assets/food.png';
import { useUser } from "../../contexts/userContext";

import { Header } from "../../components";

import styles from "./Checkout.module.css";
import api from "../../services/api";

export default function Checkout() {
  const { state: menuData } = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useUser();

  const defaultTax = 10;
  const validBalance = currentUser.credito >= defaultTax;

  const handleConfirm = useCallback(() => {
    if (validBalance) {
    const confirm = async () => {
      try {
        await api().post('/refeicao', {
          usuarioMatricula: currentUser.matricula,
          usuarioNome: currentUser.nome,
          dataReserva: new Date(),
          prato: {
            id: menuData.id,
            tipo: menuData.tipo,
            modalidadePrato: menuData.modalidadePrato,
            nome: menuData.nome,
            itens: menuData.itens,
            urlImagem: menuData.urlImagem,
            data: menuData.data
          }
        }).then(() => {
          navigate(-1);
        })
      } catch (err) {
        return false;
      }
    }
    confirm();
  }
  }, [])

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <div className={styles.checkout}>
      <Header />
      <main>
        <h1>Confirmar Reserva</h1>
        <div className={styles.checkout__available}>
          <h2>Saldo disponível</h2>
          <span>
            R$ <span id={styles.checkout__value}>{currentUser.credito.toFixed(2).replace('.', ',')}</span>
          </span>
        </div>
        <div className={styles.checkout__chosenMenu}>
          <img
            className={styles.checkout__menuImage}
            src={menuData.urlImagem || Meal}
            alt={capitalize(menuData.nome)}
          />
          <div className={styles.checkout__menuInfo}>
            <span>Menu {capitalize(menuData.tipo)}</span>
            <span>{capitalize(menuData.nome)}</span>
            <div id={styles.checkout__ingredients}>
              <span>Ingredientes</span>
              <ul>
                {menuData.itens.split(', ').map((ingredient, index) => {
                  return <li key={index}>{capitalize(ingredient)}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
        <p>
          <span>Taxa:</span>
          <span>R$</span>
          <span>{defaultTax.toFixed(2).replace('.', ',')}</span>
          <span id={validBalance ? styles.hidden : ''}>Saldo insuficiente</span>
        </p>
        <div className={styles.checkout__actionArea}>
          <button id={!validBalance ? styles.disableButton : styles.commonButton} onClick={handleConfirm}>Confirmar Reserva</button>
          <button onClick={() => navigate(-1)}>Alterar Refeição</button>
        </div>
      </main>
    </div>
  );
}
