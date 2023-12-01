import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

export interface Pagination {
  page: number;
  limit: number;
  size: number;
  offset: number;
}

export const PaginationParams = createParamDecorator(
  (data, ctx: ExecutionContext): Pagination => {
    const req: Request = ctx.switchToHttp().getRequest();
    let page = parseInt(req.query.page as string);
    let size = parseInt(req.query.size as string);
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }

    if (isNaN(page) || page < 0 || isNaN(size) || size <= 0) {
      throw new BadRequestException('Invalid pagination params');
    }
    if (size > 100) {
      throw new BadRequestException(
        'Invalid pagination params: Max size is 100',
      );
    }

    const limit = size;
    const offset = limit * (page - 1);

    return { page, limit, size, offset };
  },
);
