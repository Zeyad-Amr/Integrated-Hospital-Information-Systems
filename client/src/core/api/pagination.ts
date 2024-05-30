import { FilterQuery } from "./filters";

export interface PaginatedList<T> {
    total: number;
    items: T[];
    page: number;
    size: number;
    filters: FilterQuery[];
    isInitial: boolean;
}

export interface PaginatedApiRequestParams {
    page: number;
    size: number;
}

export class PaginatedListModel {


    public static fromJson<T>(json: any, items: T[], filters: FilterQuery[]): PaginatedList<T> {
        return {
            total: json.total,
            items: items,
            filters: filters,
            page: json.page,
            size: json.size,
            isInitial: false,
        }
    }


    public static default<T>(): PaginatedList<T> {
        return {
            total: 0,
            items: [],
            filters: [],
            page: 0,
            size: 0,
            isInitial: false,
        };
    }

    public static isInitialFilter(prevValue: boolean): boolean {
        return prevValue === true ? false : prevValue;
    }

    public static updatePaginatedList<T>(prevValue: PaginatedList<T>, newValue: PaginatedList<T>): PaginatedList<T> {
        return {
            total: newValue.total,
            items: newValue.items,
            filters: newValue.filters,
            page: newValue.page,
            size: newValue.size,
            isInitial: this.isInitialFilter(prevValue.isInitial),
        }
    }


    public static resetPaginatedList<T>(prevValue: PaginatedList<T>): PaginatedList<T> {
        return {
            total: prevValue.total,
            items: prevValue.items,
            filters: prevValue.filters,
            page: prevValue.page,
            size: prevValue.size,
            isInitial: true,
        }
    }
}