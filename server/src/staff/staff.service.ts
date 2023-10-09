import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffRepo } from './staff.repo';

@Injectable()
export class StaffService {
  constructor(private staffRepo: StaffRepo) { }
  async create(createStaffDto: CreateStaffDto) {
    const newStaff = await this.staffRepo.create(createStaffDto)
    return newStaff;
  }

  async findAll() {
    const staff = await this.staffRepo.getAll()
    return staff;
  }

  async findOne(id: string) {
    const staff = await this.staffRepo.get(id)
    return staff;
  }

  async update(id: string, updateStaffDto: UpdateStaffDto) {
    const staff = await this.staffRepo.update(id, updateStaffDto)
    return staff;
  }

  async remove(id: string) {
    try {
      await this.staffRepo.delete(id)
      return { msg: 'Deleted successfully' }

    } catch (error) {
      throw new Error(error)
    }
  }
}

