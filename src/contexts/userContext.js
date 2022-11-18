import { serviceRoutes } from "../Routes";
import { useCallback, useEffect, useReducer, createContext, useContext } from "react";
import api from '../services/api';

const userReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOGGED_USER":
            return action.payload;
        case "RESET_USER":
            return null;
        default:
            return state;
    }
};

const UserContext = createContext();

const mockUser = {
    name: "Fulana",
    admin: true
}

export function UserProvider({ children }) {
    const [currentUser, dispatch] = useReducer(userReducer, mockUser);

    useEffect( () => {
        const token = localStorage.getItem('@iru/token') || sessionStorage.getItem('@iru/token');
        const getUser = async() => {
            try{
                const response = await api().get('/user', {token});
                dispatch({ type: 'SET_LOGGED_USER', payload: response.data});
            } catch(e) {
                alert(e);
            }
        };
        // getUser();
    }, []);

    const performLogin = useCallback(async (userData, persistantLogin) => {
        const response = await api().post('/login', userData);

        if(persistantLogin) localStorage.setItem('@iru/token', response.data.token);
        else sessionStorage.setItem('@iru/token', response.data.token);
        dispatch({ type: 'SET_LOGGED_USER', payload: response.data });
    }, []);

    const performRegistration = useCallback(async (userData) => {
        const response = await api().post('/register', userData);
        localStorage.setItem('@iru/token', response.data.token);
        dispatch({ type: 'SET_LOGGED_USER', payload: response.data });
    }, []);

    const performLogout = useCallback(async () => {
        await api().put('/logout');
        dispatch({ type: 'RESET_USER' });
    }, []);

    const getUserRoutes = useCallback(() => {
        if (!currentUser) return [];
        const userType = currentUser?.admin ? "admin" : "user";
        return serviceRoutes.filter((route) => route.type === userType);
    }, [currentUser]);

    return (
        <UserContext.Provider value={{ currentUser, performLogin, performRegistration, performLogout, getUserRoutes }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error("Sem contexto de usuário")
    const {currentUser, performLogin, performRegistration, performLogout, getUserRoutes} = context;
    return {currentUser, performLogin, performRegistration, performLogout, getUserRoutes};
}