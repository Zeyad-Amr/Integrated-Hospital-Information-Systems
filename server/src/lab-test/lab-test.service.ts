import { Injectable } from '@nestjs/common';
import { CreateLabTestDto } from './dto/create-lab-test.dto';
import { UpdateLabTestDto } from './dto/update-lab-test.dto';
import { LabTestRepo } from './lab-test.repo';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Filter } from 'src/shared/decorators/filters.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';

@Injectable()
export class LabTestService {
  constructor(private labTestRepo: LabTestRepo) {}

  async create(createLabTestDto: CreateLabTestDto, creatorId: string) {
    try {
      const labTest = await this.labTestRepo.addLabTest(createLabTestDto, creatorId);
      return labTest;
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    paginationParams: Pagination,
    filters?: Array<Filter>,
    sort?: Sorting,) {
    try {
      const labTest = await this.labTestRepo.getAll({paginationParams,
        filters,
        sort,
        include: this.labTestRepo.includeObj});
      return labTest;
    } catch (error) {
      throw error;
    }
  }

 async findOne(id: string) {
    try {
      const labTest = await this.labTestRepo.getByID(id);
      return labTest;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateLabTestDto: UpdateLabTestDto) {
    try {
      const labTest = await this.labTestRepo.update(id,updateLabTestDto);
      return labTest;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const labTest = await this.labTestRepo.delete(id);
      return labTest;
    } catch (error) {
      throw error;
    }
  }
}
