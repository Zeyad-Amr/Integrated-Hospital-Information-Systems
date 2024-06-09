import { PrismaGenericRepo } from '../shared/services/prisma-client/prisma-generic.repo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import { Prisma, Surgery } from '@prisma/client';
import { CreateSurgeryDto } from './dto/create-surgery.dto';

@Injectable()
export class SurgeryRepo extends PrismaGenericRepo<Surgery> {
  constructor(private prismaService: PrismaService) {
    super('surgery', prismaService);
  }

  async addSurgery(data: CreateSurgeryDto, creatorId: string) {
    try {
        const { patientId, visitCode, ...surgeryData } = data;
        const surgery = await this.prismaService.surgery.create({
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
                author: {
                    connect: {
                        id: creatorId
                    }
                },
                ...surgeryData
            }
        });
        return surgery;
    } catch (error) {
        throw error;
    }
  }

  includeObj: Prisma.SurgeryInclude = {
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
    author: {
      include: {
        subdepartments: true,
        role: true,
        shift: true,
        person: {
          include: {
            verificationMethod: true,
            gender: true,
            governate:true
          }
        }
      }
    }
  };
}
