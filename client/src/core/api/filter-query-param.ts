class FilterQueryParam {
    static equals(field: string, value: string): string {
        return `${field}:eq:${value}`;
    }

    static notEquals(field: string, value: string): string {
        return `${field}:neq:${value}`;
    }

    static greaterThan(field: string, value: string): string {
        return `${field}:gt:${value}`;
    }

    static greaterThanOrEquals(field: string, value: string): string {
        return `${field}:gte:${value}`;
    }

    static lessThan(field: string, value: string): string {
        return `${field}:lt:${value}`;
    }

    static lessThanOrEquals(field: string, value: string): string {
        return `${field}:lte:${value}`;
    }

    static like(field: string, pattern: string): string {
        return `${field}:like:${pattern}`;
    }

    static startsWith(field: string, value: string): string {
        return `${field}:stw:${value}`;
    }

    static isNull(field: string): string {
        return `${field}:isnull`;
    }

    static isNotNull(field: string): string {
        return `${field}:isnotnull`;
    }

    static ascending(field: string): string {
        return `${field}:asc`;
    }

    static descending(field: string): string {
        return `${field}:desc`;
    }
}

export default FilterQueryParam;