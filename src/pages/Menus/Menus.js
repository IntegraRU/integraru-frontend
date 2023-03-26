import styles from "./Menus.module.css";
import React, { useEffect, useReducer, useState, useCallback } from "react";
import { MenuCard, Header } from "../../components";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from 'react-icons/ai';
import { addDays, format, isAfter, startOfDay, subDays } from 'date-fns'
import { useUser } from '../../contexts/userContext';
import api from '../../services/api';

const defaultFilters = {
    date: new Date(),
    meal: "ALMOCO"
}

const filterReducer = (state = defaultFilters, action) => {
    switch (action.type) {
        case "SET_MENU_DATE":
            return { ...state, date: action.payload };
        case "SET_MENU_MEAL":
            return { ...state, meal: action.payload };
        default:
            return state;
    }
};

export default function Menus() {

    const [currentFilters, dispatch] = useReducer(filterReducer, defaultFilters);
    const [currentMenus, setCurrentMenus] = useState([]);
    const navigate = useNavigate();
    const { currentUser } = useUser();

    useEffect(() => {
        const fetchPratos = async () => {
            try {
                const response = await api().get('/pratos', {
                    params: {
                        date: format(currentFilters.date, 'dd/MM/yyyy'),
                        type: currentFilters.meal
                    }
                });
                setCurrentMenus(response.data);
            } catch (e) {
                alert(e);
            }
        }
        fetchPratos();
    }, [currentFilters]);

    const shouldShowDate = useCallback((date) => {
        const tomorrow = startOfDay(addDays(new Date(), 1));
        if(date >= tomorrow){
            return true;
        } else {
            if((new Date()).getHours() < 19) return true;
        }
        return false;
    }, []);

    useEffect(()=>{
        if(!shouldShowDate(new Date())){
            const tomorrow = startOfDay(addDays(new Date(), 1));
            dispatch({ type: 'SET_MENU_DATE', payload: tomorrow });
        }
    }, [shouldShowDate]);

    const shouldShowMeal = useCallback((which) => {
        const today = startOfDay(new Date());
        if(today.getTime() == startOfDay(currentFilters.date).getTime()){
            switch(which){
                case 'breakfast':
                    today.setHours(9);
                    if(isAfter(currentFilters.date, today)) return false;
                    break;
                default:
                    today.setHours(14);
                    if(isAfter(currentFilters.date, today)) return false;
            }
        }
        return true;
    }, [currentFilters.date]);

    return (
        <div className={styles.menus}>
            <Header />
            <h1 className={styles.menus__title}>Cardápio</h1>
            <div className={styles.menus__filters}>
                <DatePicker
                    selected={currentFilters.date}
                    onChange={(date) => dispatch({ type: 'SET_MENU_DATE', payload: date })}
                    className={styles.menus__datepicker}
                    dateFormat="dd/MM/yyyy"
                    filterDate={date => shouldShowDate(date) }
                    locale='pt-BR'
                />
                <select value={currentFilters.meal} onChange={e => dispatch({ type: 'SET_MENU_MEAL', payload: e.target.value })} >
                    { shouldShowMeal('breakfast') && <option value='CAFE'>Café da manhã</option>}
                    { shouldShowMeal('lunch') && <option value='ALMOCO'>Almoço</option> }
                    <option value='JANTAR'>Jantar</option>
                </select>
            </div>
            <div className={styles.menus__menus}>
                {currentMenus.map((menu, idx) => <MenuCard cardData={menu} key={idx} type={currentUser.admin ? 'edit' : 'checkout'} />)}
            </div>
            {currentUser.admin &&
                <button className={styles.menus__addButton} onClick={() => navigate('/admin/cardapio/novo')}>
                    <AiOutlinePlus />
                </button>
            }
        </div>
    );
}
