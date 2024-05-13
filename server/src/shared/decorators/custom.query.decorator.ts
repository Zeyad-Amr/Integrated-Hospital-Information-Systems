import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function CustomGetAllParamDecorator() {
  return applyDecorators(
    ApiQuery({ name: 'page', required: false, description: 'page number' }),
    ApiQuery({
      name: 'size',
      required: false,
      description: 'size for one page',
    }),
    ApiQuery({
      name: 'filters',
      type: 'array',
      required: false,
      description: 'filters',
    }),
    ApiQuery({ name: 'sort', required: false, description: 'sorting by key' }),
  );
}
