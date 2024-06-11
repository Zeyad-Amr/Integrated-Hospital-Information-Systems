import { PrismaGenericRepo } from '../shared/services/prisma-client/prisma-generic.repo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import { Prisma, TriageAx } from '@prisma/client';
import { CreateTriageAxDto } from './dto/create-triage-ax.dto';

@Injectable()
export class TriageAxRepo extends PrismaGenericRepo<TriageAx> {
  constructor(private prismaService: PrismaService) {
    super('triageAx', prismaService);
  }

  async addTriageAx(data: CreateTriageAxDto, creatorId: string) {
    try {
        const {  visitCode, ...triageAxData } = data;
        const triageAx = await this.prismaService.triageAx.create({
            data: {
                visit: {
                    connect: {
                        code: visitCode
                    }
                },
                ...triageAxData
            }
        });
        return triageAx;
    } catch (error) {
        throw error;
    }
  }

  includeObj: Prisma.TriageAxInclude = {
    consciousnessLevel:true,
    triage:true
  };
}
