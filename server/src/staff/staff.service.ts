import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) { }
  async create(createStaffDto: CreateStaffDto) {
    const newStaff = await this.prisma.staff.create({ data: createStaffDto })
    return newStaff;
  }

  async findAll() {
    const staff = await this.prisma.staff.findMany()
    return staff;
  }

  async findOne(id: string) {
    const staff = await this.prisma.staff.findFirstOrThrow({ where: { id } })
    // if(!staff){
    //   throw new NotFoundException('Staff NOt found')
    // }
    return staff;
  }

  async update(id: string, updateStaffDto: UpdateStaffDto) {
    const staff = await this.prisma.staff.update({
      where: { id },
      data: updateStaffDto
    })
    return staff;
  }

  async remove(id: string) {
    await this.prisma.staff.delete({ where: { id } })
  }
}
