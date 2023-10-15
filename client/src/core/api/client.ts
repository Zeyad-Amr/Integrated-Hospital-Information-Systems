import axios, { AxiosRequestConfig } from 'axios';
import { HOST_API } from '@/config/settings/app-config';
import ErrorResponse from './error-response';
// ----------------------------------------------------------------

//* Create a custom axios instance
const axiosInstance = axios.create({ baseURL: HOST_API });

//* Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Modify the request configuration here (e.g., add headers, authentication tokens, etc.)
        return config;
    },
    (error) => {
        const errorResponse: ErrorResponse = error.response.data;
        return Promise.reject(errorResponse);
    }
);

//* Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Modify the response or perform other tasks
        return response;
    },
    (error) => {
        const errorResponse: ErrorResponse = error.response.data;
        return Promise.reject(errorResponse);
    }
);
export default axiosInstance;