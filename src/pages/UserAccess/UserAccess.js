import styles from "./UserAccess.module.css";
import React, { useReducer } from "react";
import {LoginForm, RegisterForm} from "../../components";

const tabReducer = (state, action) => {
    switch (action) {
        case "SET_LOGIN_TAB":
            return "LOGIN";
        case "SET_REGISTER_TAB":
            return "REGISTER";
        default:
            return state;
    }
};

export default function UserAccess() {
    const [shownTab, dispatch] = useReducer(tabReducer, "REGISTER");

    return (
        <div className={styles.login}>
            <h1 className={styles.login__logo}>IntegraRU</h1>
            <div className={styles.login__tab}>
                <button
                    className={ shownTab === "LOGIN" ? styles.login__tab__checked : "" }
                    onClick={() => dispatch("SET_LOGIN_TAB")}
                >
                    Entrar
                </button>
                <button
                    className={ shownTab === "REGISTER" ? styles.login__tab__checked : "" }
                    onClick={() => dispatch("SET_REGISTER_TAB")}
                >
                    Registrar
                </button>
            </div>
            {shownTab === 'LOGIN' ?
                <LoginForm changeForm={()=>dispatch('SET_REGISTER_TAB')} /> :
                <RegisterForm />
            }
        </div>
    );
}
