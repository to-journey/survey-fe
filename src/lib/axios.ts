import { default as Axios } from 'axios';
import { getToken } from '../utils/storage';

const axios = Axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Authorization': `Bearer ${getToken()}`
    }
});

axios.interceptors.request.use(
    config => {
        const token = getToken();
        if (token)
            config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;
