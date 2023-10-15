import axios, { AxiosRequestConfig } from 'axios';
import { HOST_API } from '@/config/settings/app-config';

// Create a custom axios instance
export const axiosInstance = axios.create({
  baseURL: HOST_API, headers: {
    "Content-Type": "application/json",
  },
});

// // Add a request interceptor
// axiosInstance.interceptors.response.use(
//   (res) => res,
//   (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
// );

// API Client class
class ApiClient {
  private static instance: ApiClient;

  private constructor() { }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }

    return ApiClient.instance;
  }

  private replacePathVariables(endpoint: string, pathParams: { [key: string]: string }) {
    // Replace route parameters in the endpoint URL with values from pathParams
    let url = endpoint;
    if (pathParams) {
      Object.keys(pathParams).forEach((param) => {
        url = url.replace(`:${param}`, pathParams[param]);
      });
    }
    return url;
  }

  public async get(endpoint: string, { data, queryParams, pathParams, config }: { data?: any; queryParams?: any; pathParams?: any; config?: AxiosRequestConfig } = {}) {
    const url = this.replacePathVariables(endpoint, pathParams);
    const requestConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        'Content-Type': 'application/json',
      },
      params: queryParams,

    };
    return axiosInstance.get(url, requestConfig);
  }

  public async post(endpoint: string, { data, queryParams, pathParams, config }: { data?: any; queryParams?: any; pathParams?: any; config?: AxiosRequestConfig } = {}) {
    const url = this.replacePathVariables(endpoint, pathParams);
    const requestConfig: AxiosRequestConfig = {
      params: queryParams,
      ...config,
    };
    return axiosInstance.post(url, data, requestConfig);
  }

  public async put(endpoint: string, { data, queryParams, pathParams, config }: { data?: any; queryParams?: any; pathParams?: any; config?: AxiosRequestConfig } = {}) {
    const url = this.replacePathVariables(endpoint, pathParams);
    const requestConfig: AxiosRequestConfig = {
      params: queryParams,
      ...config,
    };
    return axiosInstance.put(url, data, requestConfig);
  }

  public async patch(endpoint: string, { data, queryParams, pathParams, config }: { data?: any; queryParams?: any; pathParams?: any; config?: AxiosRequestConfig } = {}) {
    const url = this.replacePathVariables(endpoint, pathParams);
    const requestConfig: AxiosRequestConfig = {
      params: queryParams,
      ...config,
    };
    return axiosInstance.patch(url, data, requestConfig);
  }

  public async delete(endpoint: string, { queryParams, pathParams, config }: { queryParams?: any; pathParams?: any; config?: AxiosRequestConfig } = {}) {
    const url = this.replacePathVariables(endpoint, pathParams);
    const requestConfig: AxiosRequestConfig = {
      params: queryParams,
      ...config,
    };
    return axiosInstance.delete(url, requestConfig);
  }
}

export default ApiClient.getInstance();
