import { Injectable } from '@nestjs/common';
import { VisitRepo } from '../visit/visit.repo';

@Injectable()
export class StreamingService {
  constructor(private readonly visitRepo: VisitRepo) {}

  async findAllVisits() {
    return await this.visitRepo.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} streaming`;
  }
}
