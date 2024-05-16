import axios from 'axios';
import { HOST_API } from '@/config/settings/app-config';
import ErrorResponse from './error-response';
import { LocalStorage, LocalStorageKeys } from '../shared/utils/local-storage';
import AlertService from '../shared/utils/alert-service';
import LoadingService from '../shared/utils/loading-service';

// Create a custom axios instance
const axiosInstance = axios.create({ baseURL: HOST_API });

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        LoadingService.showLoading();
        // Modify the request configuration here (e.g., add headers, authentication tokens, etc.)  
        const token: string = localStorage.getItem('token') ?? '';
        if (token.length > 0) {
            config.headers['Authorization'] = 'Bearer ' + LocalStorage.fetch<string>(LocalStorageKeys.token) ?? '';
        }
        // if (!config.url?.includes('page') && config.method?.toLowerCase() === 'get') {
        //     config.params = {
        //         ...config.params,
        //         page: 1,
        //         size: 100
        //     }
        // }
        return config;
    },
    (error) => {
        LoadingService.hideLoading();
        const errorResponse: ErrorResponse = error.response.data;
        return Promise.reject(errorResponse);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        LoadingService.hideLoading();
        // Modify the response or perform other tasks
        return response;
    },
    (error) => {
        LoadingService.hideLoading();
        /*
        *   By default,
        *
        *   Axios response success range from 200 to 299:
        *   200-299: Successful responses
        *
        *   Axios response errors range from 300 to 599:
        *   300-399: Redirection
        *   400-499: Client errors
        *   500-599: Server errors
        */
        // debugger
        const errorResponse: ErrorResponse = error.response.data;
        return Promise.reject(errorResponse);
    }
);

export default axiosInstance;