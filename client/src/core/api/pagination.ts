export interface PaginatedApiResponse<T> {
    total: number;
    items: T[];
    page: number;
    size: number;
}

export interface PaginatedApiResponseParams {
    page: number;
    size: number;
}