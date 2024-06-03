import { BadRequestException } from '@nestjs/common';
import { Filter } from '../decorators/filters.decorator';
import { FilterRule } from '../decorators/filters.decorator';

export const getWhere = (
  filters: Array<Filter>,
  additionalWhereConditions?: Array<any>,
) => {
  const whereCondition: any = {};
  if (additionalWhereConditions) {
    whereCondition.AND = [];
    additionalWhereConditions.forEach((cond) => {
      whereCondition.AND.push(cond);
    });
  }

  if (!filters || filters.length == 0) {
    return whereCondition;
  }
  if (!additionalWhereConditions) {
    whereCondition.AND = [];
  }

  filters.forEach((filter) => {
  const { property } = filter;
  // Split the property string into an array to handle nested properties
  const propertyArr = property.split('.');
  // Pop the last element from the property array to use as the target property
  const target = propertyArr.pop();
  // Initialize an empty query object
  let query = {};

  // Handle different filter rules
  if (filter.rule === FilterRule.ANY) {
     // Throw an error for invalid properties for the ANY rule
    if (['createdAt', 'updatedAt', 'code'].includes(target) ) {
      throw new BadRequestException(
        `Invalid filter property for "any" role : ${target}`,
      );
    }
    // Initialize OR condition array
    whereCondition.OR = [];
    // Split the value by commas to handle multiple values
    filter.value.split(',').map((v) => {
      let queryAny={}
      queryAny = { [target]: isNaN(v as any) ? v : +v };
      if (propertyArr.length > 0) {
        propertyArr.reverse().forEach((element) => {
          queryAny = { [element]: queryAny };
        });
      }
      whereCondition.OR.push(queryAny);
    });
  } else {
    // Switch statement to handle other filter rules
    switch (filter.rule) {
      case FilterRule.IS_NULL:
        query = { [target]: null };
        break;
      case FilterRule.IS_NOT_NULL:
        query = { NOT: { [target]: null } };
        break;
      case FilterRule.EQUALS:
        if (['createdAt', 'updatedAt'].includes(target)) {
          // Handle date fields by creating a range query for the entire day
          const startOfTheDay = new Date(filter.value);
          startOfTheDay.setHours(0, 0, 0, 0);
          const endOfTheDay = new Date(filter.value);
          endOfTheDay.setHours(23, 59, 59, 999);
          query = { AND: [{ [target]: { gte: startOfTheDay.toISOString() } }, { [target]: { lte: endOfTheDay.toISOString() } }] };
        } else {
          query = { [target]: target === 'isCompleted' ? filter.value === 'true' : filter.value };
        }
        break;
      case FilterRule.NOT_EQUALS:
        query = { NOT: { [target]: filter.value } };
        break;
      case FilterRule.GREATER_THAN:
      case FilterRule.GREATER_THAN_OR_EQUALS:
        if (['createdAt', 'updatedAt'].includes(target)) {
          // Handle date fields to start from the beginning of the day
          const startOfTheDay = new Date(filter.value);
          startOfTheDay.setHours(0, 0, 0, 0);
          query = { [target]: { [filter.rule === FilterRule.GREATER_THAN ? 'gt' : 'gte']: startOfTheDay.toISOString() } };
        } else {
          query = { [target]: { [filter.rule === FilterRule.GREATER_THAN ? 'gt' : 'gte']: filter.value } };
        }
        break;
      case FilterRule.LESS_THAN:
      case FilterRule.LESS_THAN_OR_EQUALS:
        if (['createdAt', 'updatedAt'].includes(target)) {
          // Handle date fields to end at the end of the day
          const endOfTheDay = new Date(filter.value);
          endOfTheDay.setHours(23, 59, 59, 999);
          query = { [target]: { [filter.rule === FilterRule.LESS_THAN ? 'lt' : 'lte']: endOfTheDay.toISOString() } };
        } else {
          query = { [target]: { [filter.rule === FilterRule.LESS_THAN ? 'lt' : 'lte']: filter.value } };
        }
        break;
      case FilterRule.LIKE:
        query = { [target]: { contains: filter.value, mode: 'insensitive' } };
        break;
      case FilterRule.STARTS_WITH:
        query = { [target]: { startsWith: filter.value, mode: 'insensitive' } };
        break;
    }

    // Handle nested properties by constructing the query object
    if (propertyArr.length > 0) {
      propertyArr.slice().reverse().forEach((element) => {
        query = { [element]: query };
      });
    }

    // Add the constructed query to the AND condition if it's not empty
    if (Object.keys(query).length > 0) {
      whereCondition.AND.push(query);
    }
  }
});

  return whereCondition;
};
