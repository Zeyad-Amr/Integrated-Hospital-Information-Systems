import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffRepo } from './staff.repo';
import { HTTP_CONFLICT, HTTP_NOT_FOUND } from 'src/shared/constants/http-codes';

@Injectable()
export class StaffService {
  constructor(private staffRepo: StaffRepo) {}
  async create(createStaffDto: CreateStaffDto) {
    try {
      const newStaff = await this.staffRepo.create(createStaffDto);
      return newStaff;
    } catch (error) {
      if (error.code === HTTP_CONFLICT)
        return new ConflictException('staff member already exists');

      return new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return await this.staffRepo.getAll();
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      const staff = await this.staffRepo.getByID(id);
      return staff;
    } catch (error) {
      if (error.code === HTTP_NOT_FOUND)
        return new NotFoundException('staff member not found');
      return InternalServerErrorException;
    }
  }

  async update(id: string, updateStaffDto: UpdateStaffDto) {
    try {
      const staff = await this.staffRepo.update(id, updateStaffDto);
      return staff;
    } catch (error) {
      if (error.code === HTTP_NOT_FOUND)
        return new NotFoundException('staff member not found');
      return InternalServerErrorException;
    }
  }

  async delete(id: string) {
    try {
      await this.staffRepo.delete(id);
    } catch (error) {
      if (error.code === HTTP_NOT_FOUND) return new NotFoundException();
      return new InternalServerErrorException();
    }
  }
}
