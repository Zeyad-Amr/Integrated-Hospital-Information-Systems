import { Filter } from "../decorators/filters.decorator";
import { FilterRule } from "../decorators/filters.decorator";
import { Sorting } from "../decorators/order.decorator";


export const getWhere = (filters: Array<Filter>) => {
    if (!filters || filters.length == 0) {
        return {}
    }
    let whereCondition: any = {
        AND:
            []
    }
    filters.forEach(filter => {
        if (filter.rule === FilterRule.IS_NULL) {
            whereCondition.AND.push({ [filter.property]: null })
        }
        if (filter.rule === FilterRule.IS_NOT_NULL) {
            whereCondition.AND.push({ NOT: { [filter.property]: null } })
        }
        if (filter.rule == FilterRule.EQUALS) {
            if (filter.property == 'createdAt' || filter.property == 'updatedAt') {
                const startOfTheDay = new Date(filter.value)
                startOfTheDay.setHours(0, 0, 0, 0);

                const endOfTheDay = new Date(filter.value)
                endOfTheDay.setHours(23, 59, 59, 999);

                filter.value = startOfTheDay.toISOString();
                whereCondition.AND.push({ [filter.property]: { gte: filter.value } })

                filter.value = endOfTheDay.toISOString();
                whereCondition.AND.push({ [filter.property]: { lte: filter.value } })
            }
            else {
                whereCondition.AND.push({ [filter.property]: filter.value })
            }

        };
        if (filter.rule == FilterRule.NOT_EQUALS) {
            whereCondition.AND.push({ NOT: { [filter.property]: filter.value } })
        };
        if (filter.rule == FilterRule.GREATER_THAN) {
            if (filter.property == 'createdAt' || filter.property == 'updatedAt') {
                const startOfTheDay = new Date(filter.value)
                startOfTheDay.setHours(0, 0, 0, 0);
                filter.value = startOfTheDay.toISOString();
            }
            whereCondition.AND.push({ [filter.property]: { gt: filter.value } })
        }
        if (filter.rule == FilterRule.GREATER_THAN_OR_EQUALS) {
            if (filter.property == 'createdAt' || filter.property == 'updatedAt') {
                const startOfTheDay = new Date(filter.value)
                startOfTheDay.setHours(0, 0, 0, 0);
                filter.value = startOfTheDay.toISOString();
            }
            whereCondition.AND.push({ [filter.property]: { gte: filter.value } })
        }
        if (filter.rule == FilterRule.LESS_THAN) {
            if (filter.property == 'createdAt' || filter.property == 'updatedAt') {
                const endOfTheDay = new Date(filter.value)
                endOfTheDay.setHours(23, 59, 59, 999);
                filter.value = endOfTheDay.toISOString();
            }
            whereCondition.AND.push({ [filter.property]: { lt: filter.value } })
        }
        if (filter.rule == FilterRule.LESS_THAN_OR_EQUALS) {
            if (filter.property == 'createdAt' || filter.property == 'updatedAt') {
                const startOfTheDay = new Date(filter.value)
                startOfTheDay.setHours(23, 59, 59, 999);
                filter.value = startOfTheDay.toISOString();
            }
            whereCondition.AND.push({ [filter.property]: { lte: filter.value } })
        }
        if (filter.rule == FilterRule.LIKE) {
            whereCondition.AND.push({ [filter.property]: { contains: filter.value } })
        }
        if (filter.rule == FilterRule.STARTS_WITH) {
            whereCondition.AND.push({ [filter.property]: { startsWith: filter.value } })
        }
    });
    return whereCondition
}


export const getOrder = (sort: Sorting) => {
    if (!sort) return {}
    return { [sort.property]: sort.direction }
}

