export interface PaginatedApiResponse<T> {
    total: number;
    items: T[];
    page: number;
    size: number;
}

export interface PaginatedApiRequestParams {
    page: number;
    size: number;
}