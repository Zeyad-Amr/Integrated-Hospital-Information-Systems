export type PaginatedResource<T> = {
    total: number,
    items: T[],
    size: number,
    page: number
}