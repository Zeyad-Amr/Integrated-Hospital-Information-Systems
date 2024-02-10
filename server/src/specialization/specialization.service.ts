import { Injectable } from '@nestjs/common';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { SpecializationRepo } from './specialization.repo';

@Injectable()
export class SpecializationService {
  constructor(private specializationRepo: SpecializationRepo) { }
  create(createSpecializationDto: CreateSpecializationDto) {
    try {
      return this.specializationRepo.create(createSpecializationDto);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.specializationRepo.findAll();
    } catch (error) {
      throw error;
    }
  }

  findOne(id: string) {
    try {
      return this.specializationRepo.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  update(id: string, updateSpecializationDto: UpdateSpecializationDto) {
    try {
      return this.specializationRepo.update(+id, updateSpecializationDto);
    } catch (error) {
      throw error;
    }
  }


  remove(id: string) {
    try {
      return this.specializationRepo.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
