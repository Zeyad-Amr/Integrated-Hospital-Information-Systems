class APIFilter {
    static equals(field: string, value: string): FilterQueryParam {
        return { filter: `${field}:eq:${value}` };
    }

    static notEquals(field: string, value: string): FilterQueryParam {
        return { filter: `${field}:neq:${value}` };
    }

    static greaterThan(field: string, value: string): FilterQueryParam {
        return { filter: `${field}:gt:${value}` };
    }

    static greaterThanOrEquals(field: string, value: string): FilterQueryParam {
        return { filter: `${field}:gte:${value}` };
    }

    static lessThan(field: string, value: string): FilterQueryParam {
        return { filter: `${field}:lt:${value}` };
    }

    static lessThanOrEquals(field: string, value: string): FilterQueryParam {
        return { filter: `${field}:lte:${value}` };
    }

    static like(field: string, pattern: string): FilterQueryParam {
        return { filter: `${field}:like:${pattern}` };
    }

    static startsWith(field: string, value: string): FilterQueryParam {
        return { filter: `${field}:stw:${value}` };
    }

    static isNull(field: string): FilterQueryParam {
        return { filter: `${field}:isnull` };
    }

    static isNotNull(field: string): FilterQueryParam {
        return { filter: `${field}:isnotnull` };
    }

    static sortAscending(field: string): FilterQueryParam {
        return { filter: `${field}:asc` };
    }

    static sortDescending(field: string): FilterQueryParam {
        return { filter: `${field}:desc` };
    }
}

interface FilterQueryParam {
    filter: string;
}

export default APIFilter;
export type { FilterQueryParam };

