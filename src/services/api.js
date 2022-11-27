import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api`;

const defaultOptions = {
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
};

export default function api(){
    const instance = axios.create(defaultOptions);
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem("@iru/token") || sessionStorage.getItem("@iru/token");
        config.headers.Authorization =  token ? `Bearer ${token}` : null;
        return config;
    });
    return instance;
};