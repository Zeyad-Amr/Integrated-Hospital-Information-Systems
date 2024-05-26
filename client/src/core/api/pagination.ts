export interface PaginatedList<T> {
    total: number;
    items: T[];
    page: number;
    size: number;
}

export interface PaginatedApiRequestParams {
    page: number;
    size: number;
}

export class PaginatedListModel<T> {
    total: number;
    items: T[];
    page: number;
    size: number;

    constructor(data: PaginatedList<T>) {
        this.total = data.total;
        this.items = data.items;
        this.page = data.page;
        this.size = data.size;
    }

    public static fromJson<T>(json: any, items: T[]): PaginatedList<T> {
        return new PaginatedListModel<T>({
            total: json.total,
            items: items,
            page: json.page,
            size: json.size,
        });
    }

    public static default<T>(): PaginatedList<T> {
        return {
            total: 0,
            items: [],
            page: 0,
            size: 0,
        };
    }

}