import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

export interface Sorting {
  property: string;
  direction: string;
}

export const SortingParams = createParamDecorator(
  (data, ctx: ExecutionContext): Sorting => {
    try {
      const req: Request = ctx.switchToHttp().getRequest();
      const sort = req.query.sort as string;
      if (!sort) return null;

      const { property, direction } = getSortProperties(sort);
      if (!data.includes(property)) {
        throw new BadRequestException(`Invalid sort property: ${property}`);
      }
      return { property, direction };
    } catch (error) {
      throw error;
    }
  },
);

function getSortProperties(sort: string): Sorting {
  try {
    const [property, direction] = sort.split(':');
    if (!property || !direction) {
      throw new BadRequestException('Invalid sorting parameter');
    }
    if ((direction as string) != 'asc' && (direction as string) != 'desc') {
      throw new BadRequestException('Invalid sorting direction');
    }

    return { property, direction };
  } catch (error) {
    throw error;
  }
}
