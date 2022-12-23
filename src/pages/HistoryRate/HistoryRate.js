import styles from "./HistoryRate.module.css";
import React, { useEffect, useReducer, useState } from "react";
import Meal from '../../assets/food.png';
import { Header } from "../../components";
import { AiOutlineLeft, AiOutlineRight, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { format } from 'date-fns';
import api from '../../services/api';

const defaultFilters = {
    date: null,
    meal: "TODOS",
    page: 1
}

const filterReducer = (state = defaultFilters, action) => {
    switch (action.type) {
        case "SET_MENU_DATE":
            return { ...state, date: action.payload };
        case "SET_MENU_MEAL":
            return { ...state, meal: action.payload };
        case "INCREASE_PAGE":
            return { ...state, page: (state.page + 1) };
        case "DECREASE_PAGE":
            return { ...state, page: (state.page - 1) };
        default:
            return state;
    }
};


export default function HistoryRate() {
    const [currentFilters, dispatch] = useReducer(filterReducer, defaultFilters);
    const [currentRates, setCurrentRates] = useState([]);

    useEffect(() => {
        const fetchPratos = async () => {
            try {
                const response = await api().get('/refeicoes', {
                    params: {
                        date: currentFilters.date ? format(currentFilters.date, 'dd/MM/yyyy') : undefined,
                        type: currentFilters.meal === "TODOS" ? undefined : currentFilters.meal
                    }
                });
                setCurrentRates(response.data);
            } catch (e) {
                alert(e);
            }
        }
        fetchPratos();
    }, [currentFilters]);

    return (
        <div className={styles.history}>
            <Header />
            <h1 className={styles.history__title}>Histórico de Avaliações</h1>
            <div className={styles.history__filters}>
                {/* <DatePicker
                    selected={currentFilters.date}
                    placeholderText="xx/xx/xxxx"
                    onChange={(date) => dispatch({ type: 'SET_MENU_DATE', payload: date })}
                    className={styles.history__datepicker}
                    dateFormat="dd/MM/yyyy"
                    locale='pt-BR'
                />
                <select value={currentFilters.meal} onChange={e => dispatch({ type: 'SET_MENU_MEAL', payload: e.target.value })} >
                    <option value='TODOS'>Todos</option>
                    <option value='CAFE'>Café da manhã</option>
                    <option value='ALMOCO'>Almoço</option>
                    <option value='JANTAR'>Jantar</option>
                </select> */}
            </div>
            <div className={styles.history__rates}>
                {currentRates
                    .filter((_, idx) => (idx >= (currentFilters.page - 1) * 4 && idx < currentFilters.page * 4))
                    .filter(rate => rate.dataCheckout && rate.avaliacaoQuant)
                    .map((rate) => 
                    <div className={styles.history__rate} key={rate.refeicaoID}>
                        <img src={rate.prato.urlImagem || Meal} alt="Refeição" />
                        <div className={styles.history__rateInfo}>
                            <h2 className={styles.history__rateTitle}>{rate.prato.nome}</h2>
                            <p className={styles.history__rateDate}>{rate.prato.data}</p>
                            <span className={styles.history__rateStars}>{Array.from(Array(5)).map((_, i)=>((_, i+1) <= rate.avaliacaoQuant ? <AiFillStar /> : <AiOutlineStar />))}
                            </span>
                            <p>{rate.avaliacaoComentario}</p>
                        </div>
                    </div>)}
            </div>
            <div className={styles.history__page_buttons}>
                <button className={styles.history__leftButton} onClick={() => dispatch({type: "DECREASE_PAGE"})} disabled={currentFilters.page === 1}>
                    <AiOutlineLeft />
                </button>
                <button className={styles.history__rightButton} onClick={() => dispatch({type: "INCREASE_PAGE"})} disabled={currentFilters.page === Math.ceil(currentRates.length / 4)}>
                    <AiOutlineRight />
                </button>
            </div>
        </div>
    );
}
