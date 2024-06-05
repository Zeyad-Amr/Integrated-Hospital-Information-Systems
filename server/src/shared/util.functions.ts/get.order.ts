import { Sorting } from '../decorators/order.decorator';

export const getOrder = (sort: Sorting) => {
  if (!sort) return {};
  // Split the property string into an array to handle nested properties
  const propertyArr = sort.property.split('.');
  // Pop the last element from the property array to use as the target property
  const target = propertyArr.pop();
  // Initialize an empty query object
  let query = {};
  
  query = { [target]: sort.direction };

   // Handle nested properties by constructing the query object
   if (propertyArr.length > 0) {
    propertyArr.slice().reverse().forEach((element) => {
      query = { [element]: query };
    });
  }
  return query
};
