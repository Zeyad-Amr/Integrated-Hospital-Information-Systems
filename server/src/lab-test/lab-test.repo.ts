import { PrismaGenericRepo } from '../shared/services/prisma-client/prisma-generic.repo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import { Prisma, LabTest } from '@prisma/client';
import { CreateLabTestDto } from './dto/create-lab-test.dto';

@Injectable()
export class LabTestRepo extends PrismaGenericRepo<LabTest> {
  constructor(private prismaService: PrismaService) {
    super('labTest', prismaService);
  }

  async addLabTest(data: CreateLabTestDto, creatorId: string) {
    try {
        const { patientId, visitCode, ...labTestData } = data;
        const labTest = await this.prismaService.labTest.create({
            data: {
                patient: {
                    connect: {
                        id: patientId
                    }
                },
                visit: {
                    connect: {
                        code: visitCode
                    }
                },
                ...labTestData
            }
        });
        return labTest;
    } catch (error) {
        throw error;
    }
  }

  includeObj: Prisma.LabTestInclude = {
    patient: {
      include: {
        person: {
          include: {
            verificationMethod: true,
            gender: true,
            governate:true
          }
        }
      }
    },
  };
}
