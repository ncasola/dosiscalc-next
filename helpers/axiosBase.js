import axios from "axios";

const AxiosBase = axios.create({
    baseURL: "/api",
    headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
    },
});

AxiosBase.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default AxiosBase;