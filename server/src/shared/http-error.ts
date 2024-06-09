import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export function handleError(error: any) {
  console.log(error);
  if (error.code === 'P2025') throw new NotFoundException(error?.meta?.cause);

  if (error.code === 'P2002')
    throw new ConflictException(`${error.meta.target[0]} already exists`);

  if (error.code === 'P2014')
    throw new ConflictException(
      `${error.meta.relation_name} relation already exists`,
    );

  if (error.status && error.status != 500) throw error;
  console.log(error);
  throw new InternalServerErrorException();
}
