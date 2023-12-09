import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export function handleError(error: any) {
  
  if (error.code === 'P2025') throw new NotFoundException();

  if (error.code === 'P2002')
    throw new ConflictException(`${error.meta.target[0]} already exists`);

  if (error.code === 'P2014')
    throw new ConflictException(`${error.meta.relation_name} relation already exists`);

  console.log(error);
  throw new InternalServerErrorException();
}
