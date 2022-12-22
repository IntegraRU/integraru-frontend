import styles from "./ConfirmCheckout.module.css";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { MenuCard, Header } from "../../components";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight} from 'react-icons/ai';
import { format } from 'date-fns'
import { useUser } from '../../contexts/userContext';
import api from '../../services/api';

const defaultFilters = {
    search: "",
    page: 1,
    meal: "ALMOCO"
}

const filterReducer = (state = defaultFilters, action) => {
    switch (action.type) {
        case "SET_SEARCH":
            return { ...state, search: action.payload };
        case "SET_MEAL":
            return { ...state, meal: action.payload };
        case "INCREASE_PAGE":
            return { ...state, page: (state.page + 1) };
        case "DECREASE_PAGE":
            return { ...state, page: (state.page - 1) };
        default:
            return state;
    }
};


export default function ConfirmCheckout() {

    const [currentFilters, dispatch] = useReducer(filterReducer, defaultFilters);
    const [checkoutMeals, setCheckoutMeals] = useState([
        {
            nome: "Fulano de tal",
            matricula: "11921111",
            tipo: "ALMOCO"

        },
        {
            nome: "Fulano de tal 2",
            matricula: "11821111",
            tipo: "ALMOCO"

        },
        {
            nome: "Fulano de tal 3",
            matricula: "11331111",
            tipo: "JANTAR"

        }
    ]);
    const navigate = useNavigate();
    const { currentUser } = useUser();

    useEffect(() => {
        const fetchCheckoutUsers = async () => {
            try {
                // const response = await api().get('/pratos', {
                //     params: {
                //         date: format(currentFilters.date, 'dd/MM/yyyy'),
                //         type: currentFilters.meal
                //     }
                // });
                // setCurrentMenus(response.data);
            } catch (e) {
                alert(e);
            }
        }
        fetchCheckoutUsers();
    }, [currentFilters]);

    const handleCheckout = useCallback((checkoutInfo)=> {
        console.log(checkoutInfo);
        // chama API
    }, []);

    return (
        <div className={styles.confirm}>
            <Header />
            <h1 className={styles.confirm__title}>Confirmar Refeição</h1>
            <div className={styles.confirm__filters}>
                <input value={currentFilters.search} onChange={e => dispatch({ type: 'SET_SEARCH', payload: e.target.value })} placeholder="Pesquisar" />
                <select value={currentFilters.meal} onChange={e => dispatch({ type: 'SET_MEAL', payload: e.target.value })} >
                    <option value='CAFE'>Café da manhã</option>
                    <option value='ALMOCO'>Almoço</option>
                    <option value='JANTAR'>Jantar</option>
                </select>
            </div>
            <div className={styles.confirm__boxes}>
                { checkoutMeals
                    .filter(meal => meal.tipo === currentFilters.meal)
                    .filter(meal => meal.matricula.startsWith(currentFilters.search) || new RegExp(`^${currentFilters.search}.*`, "gi").test(meal.nome))
                    .map((checkout, idx) => (
                        <div className={styles.confirm__box} key={idx}>
                            <div>
                                <span>{checkout.nome}</span>
                                <span className={styles.confirm__boxRegistration}>{checkout.matricula}</span>
                            </div>
                            <button className={styles.confirm__boxSubmit} onClick={()=>handleCheckout(checkout)}>Confirmar</button>
                        </div>))}
            </div>
            <div className={styles.confirm__pageButtons}>
                <button className={styles.confirm__leftButton} onClick={() => dispatch({type: "DECREASE_PAGE"})} disabled={currentFilters.page === 1}>
                    <AiOutlineLeft />
                </button>
                <button className={styles.confirm__rightButton} onClick={() => dispatch({type: "INCREASE_PAGE"})} disabled={!checkoutMeals.length || currentFilters.page === Math.ceil(checkoutMeals.length / 4)}>
                    <AiOutlineRight />
                </button>
            </div>
        </div>
    );
}
