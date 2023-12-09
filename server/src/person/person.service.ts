import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { PersonRepo } from './person.repo';
import { Sorting } from 'src/shared/decorators/order.decorator';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Filter } from 'src/shared/decorators/filters.decorator';

@Injectable()
export class PersonService {
  constructor(private readonly personRepo: PersonRepo) {}
  async create(createPersonDto: CreatePersonDto) {
    try {
      return await this.personRepo.createIfNotExist(createPersonDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    paginationParams: Pagination,
    sort?: Sorting,
    filters?: Array<Filter>,
  ) {
    try {
      return this.personRepo.getAll({ paginationParams, filters, sort });
    } catch (error) {
      throw error;
    }
  }

  async findOne(ssn: string) {
    try {
      return await this.personRepo.findBySSN(ssn);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.personRepo.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
