import axios, { AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders, AxiosError } from 'axios';
import { ApiError } from '@/interface/api/ApiError';
import router from '@/router';

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
    headers: AxiosRequestHeaders
}

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8"
};

const axiosInstance = axios.create({
    baseURL: process.env.DEV_URL_V1,
    responseType: "json",
    headers,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config): AdaptAxiosRequestConfig => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//TODO: Retry logic


// Add a response interceptor
axiosInstance.interceptors.response.use(
    async (response: AxiosResponse) => {
        return Promise.resolve(response);
    },
    (error) => {
        const errorCode = error.response.data.error
        if (!error.response) {
            return Promise.reject(error)
        }

        if (errorCode === ApiError.UNAUTHORIZED) {
            //TODO: navigate to logout screen 
        }

        if (errorCode === ApiError.INVALID_CREDENTIALS) {
            return Promise.reject(error)
        }

        if (errorCode === ApiError.UNAUTHORIZED) {
            // TODO: remove bearer token from localStorage, remove user data
            // and redirect to login page

            if (
                router.currentRoute.value.name !== "login" &&
                router.currentRoute.value.name !== "rc-update"
            ) {
                router.push({ name: "login" })
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
