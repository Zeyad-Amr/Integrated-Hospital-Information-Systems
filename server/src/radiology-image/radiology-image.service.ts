import { Injectable } from '@nestjs/common';
import { CreateRadiologyImageDto } from './dto/create-radiology-image.dto';
import { UpdateRadiologyImageDto } from './dto/update-radiology-image.dto';
import { RadiologyImageRepo } from './radiology-image.repo';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Filter } from 'src/shared/decorators/filters.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';

@Injectable()
export class RadiologyImageService {
  constructor(private radiologyImageRepo: RadiologyImageRepo) {}

  async create(createRadiologyImageDto: CreateRadiologyImageDto, creatorId: string) {
    try {
      const radiologyImage = await this.radiologyImageRepo.addRadiologyImage(createRadiologyImageDto, creatorId);
      return radiologyImage;
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    paginationParams: Pagination,
    filters?: Array<Filter>,
    sort?: Sorting,) {
    try {
      const radiologyImage = await this.radiologyImageRepo.getAll({paginationParams,
        filters,
        sort,
        include: this.radiologyImageRepo.includeObj});
      return radiologyImage;
    } catch (error) {
      throw error;
    }
  }

 async findOne(id: string) {
    try {
      const radiologyImage = await this.radiologyImageRepo.getByID(id);
      return radiologyImage;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateRadiologyImageDto: UpdateRadiologyImageDto) {
    try {
      const radiologyImage = await this.radiologyImageRepo.update(id,updateRadiologyImageDto);
      return radiologyImage;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const radiologyImage = await this.radiologyImageRepo.delete(id);
      return radiologyImage;
    } catch (error) {
      throw error;
    }
  }
}
