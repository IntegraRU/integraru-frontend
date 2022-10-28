import styles from "./Login.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useReducer } from "react";
import Checkbox from '@mui/material/Checkbox';

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

export default function Login() {
    const [shownTab, dispatch] = useReducer(tabReducer, "LOGIN");

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
            <form className={styles.login__form}>
                <h2 className={styles.login__form__title}>Bem-vindo(a) de volta!</h2>
                <p className={styles.login__form__subtitle}>
                    É sempre um prazer ter você conosco. Faça o login e confirme seu
                    pedido!
                </p>
                <div className={styles.login__form__textField}>
                    <label for="registration">Matrícula</label>
                    <input placeholder="ex: 119210000" name="registration" />
                </div>
                <div className={styles.login__form__textField}>
                    <label for="password">Senha</label>
                    <input placeholder="Insira sua senha" name="password" type="password" />
                </div>
                <div className={styles.login__form__checkField}>
                    <Checkbox 
                        name="stay_connected"
                        sx={{   
                            color: 'var(--dark-blue)',
                            '& .MuiSvgIcon-root': { fontSize: "1.9rem" },
                            '&.Mui-checked': {
                                color: 'var(--dark-blue)',
                            }}}
                    />
                    <label for="stay_connected">Continuar conectado?</label>
                </div>
                <p className={styles.login__form__registerLink}>
                    Ainda não possui conta? <button type="button" onClick={()=>dispatch('SET_REGISTER_TAB')}>Registre-se!</button>
                </p>
                <button type="submit" className={styles.login__form__submit}>
                    <AiOutlineArrowRight />
                </button>
            </form>
        </div>
    );
}
