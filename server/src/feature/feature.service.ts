import { Injectable } from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { FeatureRepo } from './feature.repo';

@Injectable()
export class FeatureService {
  constructor(private featureRepo: FeatureRepo) { }

  create(createFeatureDto: CreateFeatureDto) {
    try {
      return this.featureRepo.create(createFeatureDto);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.featureRepo.findAll();
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    try {
      return this.featureRepo.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateFeatureDto: UpdateFeatureDto) {
    try {
      return this.featureRepo.update(id, updateFeatureDto);
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    try {
      return this.featureRepo.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
