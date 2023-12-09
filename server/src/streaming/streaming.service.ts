import { Injectable } from '@nestjs/common';
import { CreateStreamingDto } from './dto/create-streaming.dto';
import { UpdateStreamingDto } from './dto/update-streaming.dto';
import { VisitRepo } from '../visit/visit.repo';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import { AuthRepo } from 'src/auth/auth.repo';
import { AuthService } from 'src/auth/auth.service';
import { DepartmentService } from 'src/department/department.service';
import { VisitService } from 'src/visit/visit.service';

@Injectable()
export class StreamingService {
  constructor(private readonly visitRepo: VisitRepo) { }

  create(createStreamingDto: CreateStreamingDto) {
    return 'This action adds a new streaming';
  }

  async findAllVisits() {
    return await this.visitRepo.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} streaming`;
  }

  update(id: number, updateStreamingDto: UpdateStreamingDto) {
    return `This action updates a #${id} streaming`;
  }

  remove(id: number) {
    return `This action removes a #${id} streaming`;
  }
}
