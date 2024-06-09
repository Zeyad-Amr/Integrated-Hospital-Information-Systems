import { PrismaGenericRepo } from '../shared/services/prisma-client/prisma-generic.repo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import { Prisma, Diagnosis } from '@prisma/client';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';

@Injectable()
export class DiagnosisRepo extends PrismaGenericRepo<Diagnosis> {
  constructor(private prismaService: PrismaService) {
    super('diagnosis', prismaService);
  }

  async addDiagnosis(data: CreateDiagnosisDto, creatorId: string) {
    try {
        const { patientId, visitCode, ...diagnosisData } = data;
        const diagnosis = await this.prismaService.diagnosis.create({
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
                ...diagnosisData
            }
        });
        return diagnosis;
    } catch (error) {
        throw error;
    }
  }

  includeObj: Prisma.DiagnosisInclude = {
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
