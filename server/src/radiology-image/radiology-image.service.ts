import { Injectable } from '@nestjs/common';
import { CreateRadiologyImageDto } from './dto/create-radiology-image.dto';
import { UpdateRadiologyImageDto } from './dto/update-radiology-image.dto';

@Injectable()
export class RadiologyImageService {
  create(createRadiologyImageDto: CreateRadiologyImageDto) {
    return 'This action adds a new radiologyImage';
  }

  findAll() {
    return `This action returns all radiologyImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} radiologyImage`;
  }

  update(id: number, updateRadiologyImageDto: UpdateRadiologyImageDto) {
    return `This action updates a #${id} radiologyImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} radiologyImage`;
  }
}
