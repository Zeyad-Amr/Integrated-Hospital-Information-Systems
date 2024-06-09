import { Injectable } from '@nestjs/common';
import { CreateTriageAxDto } from './dto/create-triage-ax.dto';
import { UpdateTriageAxDto } from './dto/update-triage-ax.dto';

@Injectable()
export class TriageAxService {
  create(createTriageAxDto: CreateTriageAxDto) {
    return 'This action adds a new triageAx';
  }

  findAll() {
    return `This action returns all triageAx`;
  }

  findOne(id: number) {
    return `This action returns a #${id} triageAx`;
  }

  update(id: number, updateTriageAxDto: UpdateTriageAxDto) {
    return `This action updates a #${id} triageAx`;
  }

  remove(id: number) {
    return `This action removes a #${id} triageAx`;
  }
}
