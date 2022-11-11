import styles from "./ViewMenus.module.css";
import React, { useReducer } from "react";
import { MenuCard, ReturnButton } from "../../components";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from 'react-icons/ai';
import Meal from '../../assets/food.png';

const defaultFilters = {
    date: new Date(),
    meal: "Almoço"
}

const filterReducer = (state = defaultFilters, action) => {
    switch (action.type) {
        case "SET_MENU_DATE":
            return {...state, date: action.payload};
        case "SET_MENU_MEAL":
            return {...state, meal: action.payload};
        default:
            return state;
    }
};

// TODO: REMOVE AFTER BACKEND
const mockMenus = [
    {
        title: 'Feijoada com Arroz',
        type: 'Comum',
        meal: 'Almoço',
        image: Meal,
        ingredients: [
            'Feijão preto',
            'Arroz branco',
            'Farinha de mandioca'
        ],
        date: new Date()
    },
    {
        title: 'Sopinha de legumes',
        type: 'Vegetariano',
        meal: 'Jantar',
        image: Meal,
        ingredients: [
            'Cenoura',
            'Batata',
            'Queijo de xuxu'
        ],
        date: new Date()
    },
    {
        title: 'Cuscuz recheado',
        type: 'Vegano',
        meal: 'Almoço',
        image: Meal,
        ingredients: [
            'Flocão de milho',
            'Tomate assado',
            'Beterraba cozida'
        ],
        date: new Date()
    }
]

export default function ViewMenus() {

    const [currentFilters, dispatch] = useReducer(filterReducer, defaultFilters);
    const navigate = useNavigate();

    return (
        <div className={styles.view}>
            <ReturnButton />
            <h1 className={styles.view__title}>Cardápio</h1>
            <div className={styles.view__filters}>
                <DatePicker
                    selected={currentFilters.date}
                    onChange={(date)=>dispatch({type: 'SET_MENU_DATE', payload: date})}
                    className={styles.view__datepicker}
                    dateFormat="dd/MM/yyyy"
                    locale='pt-BR'
                />
                <select value={currentFilters.meal} onChange={e=>dispatch({type: 'SET_MENU_MEAL', payload: e.target.value})} >
                    <option>Almoço</option>
                    <option>Jantar</option>
                </select>
            </div>
            <div className={styles.view__menus}>
                {mockMenus.filter(menu => menu.meal === currentFilters.meal && menu.date.toDateString() === currentFilters.date.toDateString())
                          .map((menu, idx) => <MenuCard cardData={menu} key={idx} />)}
            </div>
            <button className={styles.view__addButton} onClick={()=>navigate('/admin/cardapio/novo')}>
                <AiOutlinePlus />
            </button>
        </div>
    );
}
