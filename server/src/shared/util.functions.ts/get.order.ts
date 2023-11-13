import { Sorting } from "../decorators/order.decorator"

export const getOrder = (sort: Sorting) => {
    if (!sort) return {}
    return { [sort.property]: sort.direction }
}

