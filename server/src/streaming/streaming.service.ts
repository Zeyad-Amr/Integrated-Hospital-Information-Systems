import { Injectable } from '@nestjs/common';
import { VisitService } from 'src/visit/visit.service';

@Injectable()
export class StreamingService {
  constructor(private readonly visitService: VisitService) { }

  async getERareaVisits() {    
    return await this.visitService.findERAreaVisits();
  }

  findOne(id: number) {
    return `This action returns a #${id} streaming`;
  }
}
