import { serviceRoutes } from "../Routes";
import { useCallback, useEffect, useReducer, createContext, useContext } from "react";
import api from '../services/api';
import jwt_decode from 'jwt-decode';

const userReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOGGED_USER":
            return {...action.payload, admin: false };
        case "SET_LOGGED_ADMIN":
            return {...action.payload, admin: true};
        case "RESET_USER":
            localStorage.removeItem('@iru/token');
            sessionStorage.removeItem('@iru/token');
            return null;
        default:
            return state;
    }
};

const UserContext = createContext();

export function UserProvider({ children }) {
    const [currentUser, dispatch] = useReducer(userReducer, null);

    useEffect( () => {
        const getUserData = async() => {
            const token = localStorage.getItem('@iru/token') || sessionStorage.getItem('@iru/token');
            if(token){
                try{
                    const jwtInfo = jwt_decode(token);
                    const response = await api().get(`/user/${jwtInfo.sub}`);
                    if(response.status !== 200){
                        dispatch({ type: 'RESET_USER' });
                    } else {
                        dispatch({ 
                            type: jwtInfo.role === "ROLE_ADMINISTRADOR" ? 'SET_LOGGED_ADMIN' : 'SET_LOGGED_USER', 
                            payload: response.data
                        });
                    }
                } catch(e) {
                    alert(e);
                }
            } else {
                dispatch({ type: 'RESET_USER' });
            }
        };
        getUserData();
    }, []);

    const performLogin = useCallback(async (userData, persistantLogin) => {
        const response = await api().post('/login', userData);

        if(persistantLogin) localStorage.setItem('@iru/token', response.data.token);
        else sessionStorage.setItem('@iru/token', response.data.token);
    }, []);

    const performRegistration = useCallback(async (userData) => {
        const response = await api().post('/user', userData);
        await performLogin({
            username: userData.matricula,
            password: userData.senha
        }, true);
        dispatch({ type: 'SET_LOGGED_USER', payload: response.data });
    }, [performLogin]);

    const performLogout = useCallback(async () => {
        dispatch({ type: 'RESET_USER' });
    }, []);

    const performEdit = useCallback(async (userNewData) => {

    }, []);

    const getUserRoutes = useCallback(() => {
        if (!currentUser) return [];
        const userType = currentUser?.admin ? "admin" : "user";
        const abbr = currentUser?.admin ? "admin/" : "";
        return serviceRoutes.filter((route) => route.type === userType && route.directAccess).map(route => ({...route, route: `${abbr}${route.route}`}));
    }, [currentUser]);

    return (
        <UserContext.Provider value={{ currentUser, performLogin, performRegistration, performLogout, performEdit, getUserRoutes }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error("Sem contexto de usuário")
    const {currentUser, performLogin, performRegistration, performLogout, performEdit, getUserRoutes} = context;
    return {currentUser, performLogin, performRegistration, performLogout, performEdit, getUserRoutes};
}