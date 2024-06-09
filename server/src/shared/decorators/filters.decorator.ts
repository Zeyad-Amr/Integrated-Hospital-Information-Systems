import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';
export interface Filter {
  property: string;
  rule: string;
  value: string;
}

export enum FilterRule {
  EQUALS = 'eq',
  NOT_EQUALS = 'neq',
  GREATER_THAN = 'gt',
  GREATER_THAN_OR_EQUALS = 'gte',
  LESS_THAN = 'lt',
  LESS_THAN_OR_EQUALS = 'lte',
  LIKE = 'like',
  STARTS_WITH = 'stw',
  IS_NULL = 'isnull',
  IS_NOT_NULL = 'isnotnull',
  ANY = 'any'
}

export const FilteringParams = createParamDecorator(
  (data, ctx: ExecutionContext): Array<Filter> => {
    const req: Request = ctx.switchToHttp().getRequest();
    let filters = req.query.filters;

    if (!filters) {
      return null;
    }
    filters = filters as Array<string>;
    if (typeof filters == 'string') {
      const tempFilters: Array<string> = [];
      tempFilters.push(filters);
      filters = tempFilters;
    }
    const filtersArray: Array<Filter> = [];
    filters.forEach((filter) => {
      try {
        filter = filter as string;
        let { property, rule, value } = getFilterProperties(filter);
        let val: any;
        const valueInt = +value;
        if (!isNaN(valueInt)) {
          val = valueInt;
        }
        else {
          val = value;
        }
        if (!data.includes(property))
          throw new BadRequestException(`Invalid filter property: ${property}`);
        if (!Object.values(FilterRule).includes(rule as FilterRule))
          throw new BadRequestException(`Invalid filter rule: ${rule}`);
        filtersArray.push({ property, rule, value: val });
      } catch (error) {
        throw error;
      }
    });
    return filtersArray;
  },
);

function getFilterProperties(filter: string) {
  try {
    const [property, rule, value] = filter.split(':');
    if (!property || !rule) {
      throw new BadRequestException('Invalid filter parameter');
    }
    if (
      !value &&
      (rule as FilterRule) != FilterRule.IS_NULL &&
      (rule as FilterRule) != FilterRule.IS_NOT_NULL
    ) {
      console.log((rule as FilterRule) != FilterRule.IS_NOT_NULL);
      throw new BadRequestException('Invalid filter parameter');
    }
    return { property, rule, value };
  } catch (error) {
    throw error;
  }
}


export const CustomFilters = createParamDecorator((data, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();
  let filters = req.query.customfilters;
  if (!filters) {
    return null;
  }
  filters = filters as Array<string>;
  if (typeof filters == 'string') {
    const tempFilters: Array<string> = [];
    tempFilters.push(filters);
    filters = tempFilters;
  }
  const filtersArray: Array<Filter> = [];

  filters.forEach((filter) => {
    try {
      filter = filter as string;
      const { property, rule, value } = getFilterProperties(filter);
      if (!data.includes(property))
        throw new BadRequestException(`Invalid filter property: ${property}`);
      if (!Object.values(FilterRule).includes(rule as FilterRule))
        throw new BadRequestException(`Invalid filter rule: ${rule}`);
      filtersArray.push({ property, rule, value });
    } catch (error) {
      throw error;
    }
  });
  return filtersArray;
})