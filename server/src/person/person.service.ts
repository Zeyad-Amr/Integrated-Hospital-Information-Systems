import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonRepo } from './person.repo';

@Injectable()
export class PersonService {
  constructor(private readonly personRepo: PersonRepo) { }
  async create(createPersonDto: CreatePersonDto) {

    try {
      return await this.personRepo.createIfNotExist(createPersonDto)
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      return await this.personRepo.getAll()
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string) {
    try {
      return await this.personRepo.getByID(id)
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    try {
      updatePersonDto.updatedAt = new Date();
      return await this.personRepo.update(id, updatePersonDto)
    } catch (error) {
      throw error
    }
  }

  async remove(id: string) {
    try {
      return await this.personRepo.delete(id)
    } catch (error) {
      throw error
    }
  }
}
