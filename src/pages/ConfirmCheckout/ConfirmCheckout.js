import styles from "./ConfirmCheckout.module.css";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Header } from "../../components";
import { AiOutlineLeft, AiOutlineRight} from 'react-icons/ai';
import { format } from 'date-fns'
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
    const [checkoutMeals, setCheckoutMeals] = useState([]);

    useEffect(() => {
        const fetchCheckoutUsers = async () => {
            try {
                const response = await api().get('/refeicoes');
                setCheckoutMeals(response.data);
            } catch (e) {
                alert(e);
            }
        }
        fetchCheckoutUsers();
    }, [currentFilters]);

    const handleCheckout = useCallback(async (checkoutInfo)=> {
        try{
            await api().put('/checkout', {
                matriculaUser: checkoutInfo.usuarioMatricula,
                dataCheckout: new Date(),
                refeicaoID: checkoutInfo.refeicaoID
            });
            alert("Checkout confirmado!");
            setCheckoutMeals(old => old.filter(meal => meal !== checkoutInfo));
        } catch(e){
            alert(e);
        }
    }, []);

    return (
        <div className={styles.confirm}>
            <Header />
            <h1 className={styles.confirm__title}>Confirmar Refeição do Dia Atual</h1>
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
                    .filter(checkout => checkout.prato.data === format(new Date(), 'dd/MM/yyyy') && !checkout.dataCheckout)
                    .filter(checkout => checkout.prato.modalidadePrato === currentFilters.meal)
                    .filter(checkout => checkout.usuarioMatricula.startsWith(currentFilters.search) || new RegExp(`^${currentFilters.search}.*`, "gi").test(checkout.prato.nome))
                    .map((checkout, idx) => (
                        <div className={styles.confirm__box} key={idx}>
                            <div>
                                <span>{checkout.usuarioNome}</span>
                                <span className={styles.confirm__boxRegistration}>{checkout.usuarioMatricula}</span>
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
