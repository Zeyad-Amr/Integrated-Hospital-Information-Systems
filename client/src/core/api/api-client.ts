import { AxiosRequestConfig } from 'axios';
import axiosInstance from './config';
import { PaginatedApiRequestParams } from './pagination';
import { FilterQuery } from '.';
// ----------------------------------------------------------------

//* API Client class
class ApiClient {

  //* Method to replace route parameters in the endpoint URL with values from pathVariables
  private replacePathVariables(endpoint: string, pathVariables: { [key: string]: string }): string {
    let url = endpoint;

    // Replace route parameters in the endpoint URL with values from pathVariables
    if (pathVariables) {
      Object.keys(pathVariables).forEach((variable) => {
        url = url.replace(`:${variable}`, pathVariables[variable]);
      });
    }
    return url;
  }

  //* Method to add query parameters to the endpoint URL
  private addQueryParams(endpoint: string, queryParams?: { [key: string]: string }, filters?: FilterQuery[]): string {
    let url = endpoint;

    // Adding ? to the URL if there are query parameters or filters
    if (queryParams || filters) {
      url = url.concat('?');
    }

    // Add query parameters to the URL
    if (queryParams) {

      Object.keys(queryParams).forEach((param) => {
        url = url.concat(`${param}=${queryParams[param]}&`);
      });
    }

    // Add filters to the URL
    if (filters) {
      filters.forEach((f: FilterQuery) => {
        url = url.concat(`filters=${f.filter}&`);
      });
    }

    // Remove the last '&' or '?' from the URL
    if (queryParams || filters) {
      url = url.slice(0, -1);
    }

    return url;
  }

  //* GET method to make a GET request to the API
  //* @param endpoint - API endpoint
  //* @param queryParams - Query parameters to be sent with the request
  //* @param pathVariables - Path variables to be replaced in the endpoint URL
  //* @param config - Axios request config
  public async get(endpoint: string, { pagination, filters, queryParams, pathVariables, config }: { pagination?: PaginatedApiRequestParams, filters?: FilterQuery[]; queryParams?: any; pathVariables?: any; config?: AxiosRequestConfig } = {}) {
    if (pagination) {
      if (pagination.page) {
        queryParams = { ...queryParams, page: pagination.page ?? 1, pageSize: pagination.size ?? 10 };
      }
    }
    let url = this.replacePathVariables(endpoint, pathVariables);
    url = this.addQueryParams(url, { ...queryParams, }, filters);
    const requestConfig: AxiosRequestConfig = {
      ...config,
    };
    try {
      const response = await axiosInstance.get(url, requestConfig);
      return response;
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
  public async post(endpoint: string, data: any, { filters, queryParams, pathVariables, config }: { filters?: FilterQuery[]; queryParams?: any; pathVariables?: any; config?: AxiosRequestConfig } = {}) {
    let url = this.replacePathVariables(endpoint, pathVariables);
    url = this.addQueryParams(url, queryParams, filters);
    const requestConfig: AxiosRequestConfig = {
      ...config,
    };

    try {
      const response = await axiosInstance.post(url, data, requestConfig);
      return response;
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
  public async put(endpoint: string, data: any, { filters, queryParams, pathVariables, config }: { filters?: FilterQuery[]; queryParams?: any; pathVariables?: any; config?: AxiosRequestConfig } = {}) {
    let url = this.replacePathVariables(endpoint, pathVariables);
    url = this.addQueryParams(url, queryParams, filters);
    const requestConfig: AxiosRequestConfig = {
      ...config,
    };

    try {
      const response = await axiosInstance.put(url, data, requestConfig);
      return response;
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
  public async patch(endpoint: string, data: any, { filters, queryParams, pathVariables, config }: { filters?: FilterQuery[]; queryParams?: any; pathVariables?: any; config?: AxiosRequestConfig } = {}) {
    let url = this.replacePathVariables(endpoint, pathVariables);
    url = this.addQueryParams(url, queryParams, filters);
    const requestConfig: AxiosRequestConfig = {
      ...config,
    };

    try {
      const response = await axiosInstance.patch(url, data, requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //* DELETE method to make a DELETE request to the API
  // @param endpoint - API endpoint
  // @param queryParams - Query parameters to be sent with the request
  // @param pathVariables - Path variables to be replaced in the endpoint URL
  // @param config - Axios request config
  public async delete(endpoint: string, { filters, queryParams, pathVariables, config }: { filters?: FilterQuery[]; queryParams?: any; pathVariables?: any; config?: AxiosRequestConfig } = {}) {
    let url = this.replacePathVariables(endpoint, pathVariables);
    url = this.addQueryParams(url, queryParams, filters);
    const requestConfig: AxiosRequestConfig = {
      ...config,
    };

    try {
      const response = await axiosInstance.delete(url, requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default ApiClient;

