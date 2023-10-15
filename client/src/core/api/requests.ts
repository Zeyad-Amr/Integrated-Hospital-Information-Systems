import { AxiosRequestConfig } from 'axios';
import axiosInstance from './client';
// ----------------------------------------------------------------

//* API Client class
class ApiClient {
  private static instance: ApiClient;

  private constructor() { }

  //* Singleton pattern implementation to get the same instance of the class every time
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }

    return ApiClient.instance;
  }

  //* Method to replace route parameters in the endpoint URL with values from pathVariables
  private replacePathVariables(endpoint: string, pathVariables: { [key: string]: string }) {
    // Replace route parameters in the endpoint URL with values from pathVariables
    let url = endpoint;
    if (pathVariables) {
      Object.keys(pathVariables).forEach((variable) => {
        url = url.replace(`:${variable}`, pathVariables[variable]);
      });
    }
    return url;
  }

  //* GET method to make a GET request to the API
  //* @param endpoint - API endpoint
  //* @param queryParams - Query parameters to be sent with the request
  //* @param pathVariables - Path variables to be replaced in the endpoint URL
  //* @param config - Axios request config
  public async get(endpoint: string, { queryParams, pathVariables, config }: { queryParams?: any; pathVariables?: any; config?: AxiosRequestConfig } = {}) {
    const url = this.replacePathVariables(endpoint, pathVariables);
    const requestConfig: AxiosRequestConfig = {
      params: queryParams,
      ...config,
    };

    try {
      const response = await axiosInstance.get(url, requestConfig);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //* POST method to make a POST request to the API
  // @param endpoint - API endpoint
  // @param data - Request body
  // @param queryParams - Query parameters to be sent with the request
  // @param pathVariables - Path variables to be replaced in the endpoint URL
  // @param config - Axios request config
  public async post(endpoint: string, { data, queryParams, pathVariables, config }: { data?: any; queryParams?: any; pathVariables?: any; config?: AxiosRequestConfig } = {}) {
    const url = this.replacePathVariables(endpoint, pathVariables);
    const requestConfig: AxiosRequestConfig = {
      params: queryParams,
      ...config,
    };

    try {
      const response = await axiosInstance.post(url, data, requestConfig);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //* PUT method to make a PUT request to the API
  // @param endpoint - API endpoint
  // @param data - Request body
  // @param queryParams - Query parameters to be sent with the request
  // @param pathVariables - Path variables to be replaced in the endpoint URL
  // @param config - Axios request config
  public async put(endpoint: string, { data, queryParams, pathVariables, config }: { data?: any; queryParams?: any; pathVariables?: any; config?: AxiosRequestConfig } = {}) {
    const url = this.replacePathVariables(endpoint, pathVariables);
    const requestConfig: AxiosRequestConfig = {
      params: queryParams,
      ...config,
    };

    try {
      const response = await axiosInstance.put(url, data, requestConfig);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //* PATCH method to make a PATCH request to the API
  // @param endpoint - API endpoint
  // @param data - Request body
  // @param queryParams - Query parameters to be sent with the request
  // @param pathVariables - Path variables to be replaced in the endpoint URL
  // @param config - Axios request config
  public async patch(endpoint: string, { data, queryParams, pathVariables, config }: { data?: any; queryParams?: any; pathVariables?: any; config?: AxiosRequestConfig } = {}) {
    const url = this.replacePathVariables(endpoint, pathVariables);
    const requestConfig: AxiosRequestConfig = {
      params: queryParams,
      ...config,
    };

    try {
      const response = await axiosInstance.patch(url, data, requestConfig);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //* DELETE method to make a DELETE request to the API
  // @param endpoint - API endpoint
  // @param queryParams - Query parameters to be sent with the request
  // @param pathVariables - Path variables to be replaced in the endpoint URL
  // @param config - Axios request config
  public async delete(endpoint: string, { queryParams, pathVariables, config }: { queryParams?: any; pathVariables?: any; config?: AxiosRequestConfig } = {}) {
    const url = this.replacePathVariables(endpoint, pathVariables);
    const requestConfig: AxiosRequestConfig = {
      params: queryParams,
      ...config,
    };

    try {
      const response = await axiosInstance.delete(url, requestConfig);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ApiClient.getInstance();
